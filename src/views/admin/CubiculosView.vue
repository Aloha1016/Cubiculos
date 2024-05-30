<template>
  <div class="container py-2">
    <div class="row">
      <div class="py-4">
        <button
          type="button"
          class="btn btn-outline-primary"
          data-bs-toggle="modal"
          data-bs-target="#crearCubiculoModal"
          data-bs-whatever="Crear cubículo"
        >
          <i class="bi bi-plus-circle-dotted"></i>
          Crear Cubiculo
        </button>
      </div>

      <div class="row">
        <div v-for="cubiculo in cubiculos" :key="cubiculo.id" class="col-md-10 col-lg-4">
          <div class="card mb-4 shadow-sm">
            <article class="card-body">
              <section class="d-flex justify-content-between align-items-center">
                <h5 class="card-title">{{ cubiculo.name }}</h5>
                <Badge :status="cubiculo.status" />
              </section>
              <p class="card-text">{{ cubiculo.descripcion }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-success"
                    data-bs-toggle="modal"
                    data-bs-target="#editarCubiculoModal"
                    data-bs-whatever="Editar cubículo"
                    @click="editarCubiculo(cubiculo)"
                  >
                    <i class="bi bi-pencil-square"></i>
                    Editar
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-danger"
                    @click="eliminarCubiculo(cubiculo)"
                  >
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

    <div
      class="modal fade"
      id="editarCubiculoModal"
      tabindex="-1"
      aria-labelledby="editarCubiculoModal"
      aria-hidden="true"
      modal-dialog
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editarCubiculoModal">Editar Cubiculo</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div v-if="cubiculoToEdit">
              <label for="name">Nombre</label>
              <input
                id="name"
                class="form-control mt-1 mb-4"
                v-model="cubiculoToEdit.name"
                placeholder="Nombre del cubículo"
              />
              <label for="descripcion">Descripción</label>
              <input
                id="descripcion"
                class="form-control mt-1 mb-4"
                v-model="cubiculoToEdit.descripcion"
                placeholder="Descripción del cubículo"
              />
              <button class="btn btn-success mt-2" @click="saveCubiculo" data-bs-dismiss="modal">
                Guardar cambios
              </button>
              <button type="button" class="btn btn-secondary ms-2 mt-2" data-bs-dismiss="modal">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="crearCubiculoModal"
      tabindex="-1"
      aria-labelledby="crearCubiculoModal"
      aria-hidden="true"
      modal-dialog
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="crearCubiculoModal">Crear Cubiculo</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div>
              <label for="name">Nombre</label>
              <input class="form-control" v-model="name" placeholder="Nombre del cubículo" />

              <label for="descripcion">Descripción</label>
              <input
                class="form-control mt-2"
                v-model="descripcion"
                placeholder="Descripción del cubículo"
              />
              <label for="horaInicio">Hora de Reserva</label>
              <select class="form-select mt-2" id="horaInicio" v-model="reserva.horaInicio" required>
                <option v-for="hora in horas" :key="hora" :value="hora">{{ hora }}</option>
              </select>
              <button
                class="btn btn-primary mt-2"
                data-bs-dismiss="modal"
                @click="agregarCubiculo"
                :disabled="!name || !descripcion"
              >
                Agregar cubículo
              </button>
              <button
                type="button"
                class="btn btn-secondary ms-2 mt-2"
                data-bs-dismiss="modal"
                @click="clearInputs"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Badge from '@/components/BadgeStatus.vue'
import { reactive, toRefs } from 'vue'

export default {
  components: {
    Badge
  },
  setup() {
    const state = reactive({
      name: '',
      descripcion: '',
      cubiculos: [
        {
          id: 1,
          name: 'Cubículo 1',
          descripcion: 'Cubículo de 4x4 metros',
          status: false,
          usuario: 'Usuario 1'
        },
        {
          id: 2,
          name: 'Cubículo 2',
          descripcion: 'Cubículo de 5x5 metros',
          status: true,
          usuario: null
        }
      ],
      cubiculoToEdit: null,
      editDialogOpen: false,
      reserva: {
        nombreEstudiante: '',
        nuaEstudiante: '',
        horaInicio: '',
        horaFin: ''
      },
      horas: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']
    })

    const agregarCubiculo = () => {
      if (!state.name || !state.descripcion) {
        return
      }
      const newCubiculo = {
        id: state.cubiculos.length + 1,
        name: state.name,
        descripcion: state.descripcion,
        status: true,
        usuario: 'Usuario 1'
      }
      state.cubiculos.push(newCubiculo)
      state.name = ''
      state.descripcion = ''
    }

    const editarCubiculo = (cubiculo) => {
      state.cubiculoToEdit = { ...cubiculo }
      state.editDialogOpen = true
    }

    const saveCubiculo = () => {
      const index = state.cubiculos.findIndex((c) => c.id === state.cubiculoToEdit.id)
      if (index !== -1) {
        state.cubiculos[index] = state.cubiculoToEdit
        state.cubiculoToEdit = null
        state.editDialogOpen = false
      }
    }

    const eliminarCubiculo = (cubiculo) => {
      state.cubiculos = state.cubiculos.filter((c) => c.id !== cubiculo.id)
    }

    const clearInputs = () => {
      state.name = ''
      state.descripcion = ''
    }

    return {
      ...toRefs(state),
      agregarCubiculo,
      editarCubiculo,
      saveCubiculo,
      eliminarCubiculo,
      clearInputs
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
  background: #002F6C; /* Azul oscuro de la Universidad de Guanajuato */
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  margin: 20px auto;
  color: #FFFFFF; /* Texto blanco para contraste */
}

.btn-outline-primary {
  color: #007BFF; /* Azul principal */
  border-color: #007BFF; /* Azul principal */
}

.btn-outline-primary:hover {
  color: #FFFFFF; /* Texto blanco */
  background-color: #007BFF; /* Azul principal */
  border-color: #007BFF; /* Azul principal */
}

.card {
  background-color: #FFFFFF; /* Fondo blanco para las tarjetas */
  border: 1px solid #CED4DA; /* Borde gris */
  border-radius: 8px;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  color: #343A40; /* Texto oscuro */
}

.card-text {
  color: #6C757D; /* Texto gris */
}

.btn-outline-success {
  color: #28A745; /* Verde */
  border-color: #28A745; /* Verde */
}

.btn-outline-success:hover {
  color: #FFFFFF; /* Texto blanco */
  background-color: #28A745; /* Verde */
  border-color: #28A745; /* Verde */
}

.modal-content {
  background-color: #FFFFFF; /* Fondo blanco */
  border-radius: 8px;
}

.modal-title {
  color: #343A40; /* Texto oscuro */
}

.btn-primary {
  background-color: #007BFF; /* Azul principal */
  border-color: #007BFF; /* Azul principal */
}

.btn-primary:hover {
  background-color: #0056B3; /* Azul más oscuro */
  border-color: #0056B3; /* Azul más oscuro */
}
</style>
