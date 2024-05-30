<template>
  <div class="container-fluid py-2">
    <div class="row w-100 d-flex justify-content-center">
      <main class="col-md-9 col-lg-10 px-md-4">
        <div class="pt-3 pb-2 mb-3 border-bottom">
          <h1 class="h2">Crear Aviso</h1>
        </div>
        <div class="container">
          <form @submit.prevent="crearAviso">
            <div class="mb-3">
              <label for="titulo" class="form-label">Título</label>
              <input type="text" class="form-control" id="titulo" v-model="nuevoAviso.titulo" required />
            </div>
            <div class="mb-3">
              <label for="contenido" class="form-label">Contenido</label>
              <textarea class="form-control" id="contenido" v-model="nuevoAviso.contenido" required></textarea>
            </div>
            <div class="mb-3">
              <label for="duracion" class="form-label">Duración (días)</label>
              <input type="number" class="form-control" id="duracion" v-model="nuevoAviso.duracion" required />
            </div>
            <button type="submit" class="btn btn-primary">Crear Aviso</button>
          </form>
        </div>
        <div class="mt-4">
          <h2>Lista de Avisos</h2>
          <div v-for="aviso in avisos" :key="aviso.id" class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">{{ aviso.titulo }}</h5>
              <p class="card-text">{{ aviso.contenido }}</p>
              <p class="text-muted">Expira el: {{ aviso.fechaExpiracion }}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";

export default {
  setup() {
    const state = reactive({
      nuevoAviso: {
        titulo: "",
        contenido: "",
        duracion: 1,
      },
      avisos: [],
    });

    function crearAviso() {
      const fechaCreacion = new Date();
      const fechaExpiracion = new Date();
      fechaExpiracion.setDate(fechaCreacion.getDate() + parseInt(state.nuevoAviso.duracion));

      const nuevoAviso = {
        id: Date.now(),
        titulo: state.nuevoAviso.titulo,
        contenido: state.nuevoAviso.contenido,
        fechaExpiracion: fechaExpiracion.toLocaleDateString(),
      };

      state.avisos.push(nuevoAviso);

      // Limpiar los campos del formulario
      state.nuevoAviso.titulo = "";
      state.nuevoAviso.contenido = "";
      state.nuevoAviso.duracion = 1;
    }

    const avisosVigentes = computed(() => {
      const hoy = new Date();
      return state.avisos.filter((aviso) => {
        const fechaExpiracion = new Date(aviso.fechaExpiracion);
        return fechaExpiracion >= hoy;
      });
    });

    return {
      ...toRefs(state),
      crearAviso,
      avisosVigentes,
    };
  },
};
</script>

<style scoped>
.container-fluid {
  background: #002f6c;
  color: #ffffff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.btn-primary {
  color: #ffffff;
  background-color: #c9a400;
  border-color: #c9a400;
}

.btn-primary:hover {
  background-color: #bfa303;
  border-color: #bfa303;
}

.card {
  background-color: #ffffff;
  border: 1px solid #ced4da;
  border-radius: 8px;
  color: #002f6c;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
}

.card-text {
  color: #6c757d;
}

.border-bottom {
  border-bottom: 1px solid #ffffff !important;
}
</style>
