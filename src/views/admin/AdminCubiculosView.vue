<template>
  <div class="container py-2">
    <div class="row">
      <div class="py-4">
        <button
          type="button"
          class="btn btn-outline-warning"
          data-bs-toggle="modal"
          data-bs-target="#crearCubiculoModal"
          data-bs-whatever="Crear cubículo">
          <i class="bi bi-plus-circle-dotted"></i>
          Crear Cubiculo
        </button>
      </div>

      <!-- Filtro de cubículos -->
      <div class="row">
        <div class="col-md-3 mb-3">
          <label for="filterStatus" class="form-label d-flex justify-content-start">Filtrar por estado:</label>
          <select id="filterStatus" class="form-select" v-model="filterStatus">
            <option value="all">Todos</option>
            <option value="available">Disponible</option>
            <option value="unavailable">Ocupado</option>
          </select>
        </div>
      </div>

      <!-- RENDER ALL CUBICLES -->
      <div class="row" style="max-height: 550px; overflow-y: auto">
        <div v-for="cubiculo in cubiculosFiltrados" :key="cubiculo.id" class="col-md-10 col-lg-4">
          <div class="card mb-4 shadow-sm">
            <article class="card-body">
              <section class="d-flex flex-column justify-content-between align-items-start mb-2">
                <h5 class="card-title">{{ cubiculo.cub_nombre }}</h5>
                <div class="d-flex flex-row justify-content-between align-items-center mb-2 gap-2">
                  <BadgeStatus :status="cubiculo.cub_status" />
                  <BadgeCapacity :capacity="cubiculo.cub_capacidad" />
                </div>
                <p class="card-text mb-2">{{ cubiculo.cub_descripcion }}</p>
              </section>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#editarCubiculoModal"
                    data-bs-whatever="Editar cubículo"
                    @click="abrirModalEdicion(cubiculo)">
                    <i class="bi bi-pencil-square"></i>
                    Editar
                  </button>
                  <button type="button" class="btn btn-sm btn-outline-danger" @click="eliminarCubiculo(cubiculo)">
                    <i class="bi bi-trash-fill"></i>
                    Eliminar
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL PARA CREAR UN CUBICULO -->
    <div
      class="modal fade"
      id="crearCubiculoModal"
      tabindex="-1"
      aria-labelledby="crearCubiculoModal"
      aria-hidden="true"
      ref="crearCubiculoModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="crearCubiculoModal">Crear Cubiculo</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-black">
            <div class="d-flex flex-column justify-content-center align-items-start">
              <label for="nombre">Nombre</label>
              <input id="nombre" class="form-control" v-model="cub_nombre" placeholder="Nombre del cubículo" />

              <label for="descripcion" class="mt-4">Descripción</label>
              <input id="descripcion" class="form-control" v-model="cub_descripcion" placeholder="Descripción del cubículo" />

              <label for="capacidad" class="mt-4">Capacidad</label>
              <input
                id="capacidad"
                type="number"
                class="form-control"
                v-model="cub_capacidad"
                placeholder="Capacidad del cubículo" />

              <div class="w-100 mt-2 d-flex justify-content-center gap-2">
                <button
                  class="btn btn-primary mt-2"
                  data-bs-dismiss="modal"
                  @click="crearCubiculo"
                  :disabled="!cub_nombre || !cub_capacidad">
                  Agregar cubículo
                </button>
                <button type="button" class="btn btn-secondary ms-2 mt-2" data-bs-dismiss="modal">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- MODAL PARA EDITAR CUBICULO -->
  <div class="modal fade" id="editarCubiculoModal" tabindex="-1" aria-labelledby="editarCubiculoModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editarCubiculoModal">Editar Cubiculo</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="d-flex flex-column justify-content-center align-items-start">
            <label for="nombre">Nombre</label>
            <input id="nombre" class="form-control" v-model="cub_nombre" placeholder="Nombre del cubículo" />

            <label for="descripcion" class="mt-4">Descripción</label>
            <input id="descripcion" class="form-control" v-model="cub_descripcion" placeholder="Descripción del cubículo" />

            <label for="capacidad" class="mt-4">Capacidad</label>
            <input
              id="capacidad"
              type="number"
              class="form-control"
              v-model="cub_capacidad"
              placeholder="Capacidad del cubículo" />
            <div class="w-100 mt-2 d-flex justify-content-center gap-2">
              <button class="btn btn-primary mt-2" data-bs-dismiss="modal" @click="guardarCambiosCubiculo">
                Guardar cambios
              </button>
              <button type="button" class="btn btn-secondary ms-2 mt-2" data-bs-dismiss="modal">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BadgeStatus from "../../components/BadgeStatus.vue";
import BadgeCapacity from "../../components/BadgeCapacity.vue";

export default {
  components: {
    BadgeStatus,
    BadgeCapacity,
  },
};
</script>

<script setup>
import { ref, onMounted, computed } from "vue";
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const cubiculos = ref([]);
const cub_nombre = ref("");
const filterStatus = ref("all");
const cub_capacidad = ref("");
const cub_descripcion = ref("");
const cubiculoId = ref("");

const crearCubiculoModal = ref(null);

const cargarCubiculos = () => {
  const cubiculosCollection = collection(db, "cubiculo");
  onSnapshot(cubiculosCollection, (snapshot) => {
    cubiculos.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log (cubiculos.value)
  });
};

const cubiculosFiltrados = computed(() => {
  if (filterStatus.value === "all") {
    return cubiculos.value;
  } else if (filterStatus.value === "available") {
    return cubiculos.value.filter((cubiculo) => cubiculo.cub_status === true);
  } else if (filterStatus.value === "unavailable") {
    return cubiculos.value.filter((cubiculo) => cubiculo.cub_status === false);
  }
  return cubiculos.value;
});

const abrirModalEdicion = (cubiculo) => {
  cub_nombre.value = cubiculo.nombre;
  cub_descripcion.value = cubiculo.descripcion;
  cub_capacidad.value = cubiculo.capacidad;
  cubiculoId.value = cubiculo.id;
};

const guardarCambiosCubiculo = async () => {
  if (!cubiculoId.value) {
    console.error("No se ha seleccionado un cubículo para editar");
    return;
  }

  const cubiculoDoc = doc(db, "cubiculo", cubiculoId.value);
  await updateDoc(cubiculoDoc, {
    cub_nombre: cub_nombre.value,
    cub_descripcion: cub_descripcion.value,
    cub_capacidad: cub_capacidad.value,
  });
};

const crearCubiculo = async () => {
  if (cub_nombre.value && cub_capacidad.value && cub_capacidad.value > 0 && cub_descripcion.value) {
    try {
      await addDoc(collection(db, "cubiculo"), {
        cub_nombre: cub_nombre.value,
        cub_capacidad: cub_capacidad.value,
        cub_descripcion: cub_descripcion.value,
        // fecha_inicio: null,
        // fecha_fin: null,
        cub_status: true,
        // user: null,
      });
      cub_nombre.value = "";
      cub_descripcion.value = "";
      cub_capacidad.value = "";
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  } else {
    alert("Complete todos los campos para continuar");
  }
};

const eliminarCubiculo = async (cubiculo) => {
  if (confirm(`¿Estás seguro de eliminar el cubículo ${cubiculo.nombre}?`)) {
    const cubiculoDoc = doc(db, "cubiculo", cubiculo.id);
    await deleteDoc(cubiculoDoc);
  }
};

onMounted(() => {
  cargarCubiculos();

  const modalElement = crearCubiculoModal.value;
  if (modalElement) {
    modalElement.addEventListener("shown.bs.modal", () => {
      cub_nombre.value = "";
      cub_descripcion.value = "";
      cub_capacidad.value = "";
    });
  }
});
</script>

<style scoped>
.container {
  padding: 20px;
  background: #002f6c;
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  margin: 20px auto;
  color: #ffffff;
}

.btn-outline-primary {
  color: #002f6c;
  border-color: #002f6c;
}

.btn-outline-primary:hover {
  color: #ffffff;
  background-color: #002f6c;
  border-color: #002f6c;
}

.card {
  background-color: #ffffff;
  border: 1px solid #ced4da;
  border-radius: 8px;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  color: #002f6c;
}

.card-text {
  color: #6c757d;
}

.modal-content {
  background-color: #ffffff;
  border-radius: 8px;
}

.modal-title {
  color: #002f6c;
}
</style>
