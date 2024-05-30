<template>
    <div class="container py-2">
      <div class="row" style="max-height: 550px; overflow-y: auto">
        <div
          v-for="cubiculo in cubiculosOcupados"
          :key="cubiculo.id"
          class="col-md-10 col-lg-4">
          <div class="card mb-4 shadow-sm">
            <article class="card-body">
              <section class="d-flex justify-content-between align-items-center">
                <h5 class="card-title">{{ cubiculo.name }}</h5>
                <Badge :status="cubiculo.status" />
              </section>
              <p class="card-text">{{ cubiculo.descripcion }}</p>
              <p class="card-text"><strong>Usuario:</strong> {{ cubiculo.usuario }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-warning"
                    @click="finalizarReserva(cubiculo)">
                    <i class="bi bi-check-circle"></i>
                    Finalizar Reserva
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Badge from "@/components/BadgeStatus.vue";
  import { reactive, toRefs, computed } from "vue";
  
  export default {
    components: {
      Badge,
    },
    setup() {
      const state = reactive({
        cubiculos: [
          {
            id: 1,
            name: "Cubículo 1",
            descripcion: "Cubículo de 4x4 metros",
            status: false,
            usuario: "Usuario 1",
          },
          {
            id: 2,
            name: "Cubículo 2",
            descripcion: "Cubículo de 4x4 metros",
            status: false,
            usuario: "Usuario 2",
          },
          {
            id: 3,
            name: "Cubículo 3",
            descripcion: "Cubículo de 4x4 metros",
            status: false,
            usuario: "Usuario 3",
          },
          // Añade más cubículos según sea necesario
        ],
      });
  
      const finalizarReserva = (cubiculo) => {
        const index = state.cubiculos.findIndex((c) => c.id === cubiculo.id);
        if (index !== -1) {
          state.cubiculos[index].status = true;
        }
      };
  
      const cubiculosOcupados = computed(() => {
        return state.cubiculos.filter((c) => !c.status);
      });
  
      return {
        ...toRefs(state),
        cubiculosOcupados,
        finalizarReserva,
      };
    },
  };
  </script>
  