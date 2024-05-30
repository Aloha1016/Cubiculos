<template>
  <div class="container py-2">
    <div class="row">
      <div data-v-3ad15a8a="" class="pt-3 pb-2 mb-3 border-bottom">
        <h1 data-v-3ad15a8a="" class="h2">
          Cubiculos
        </h1>
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
                <div class="btn-reservar">
                  <button 
                    type="button"
                    class="btn btn-sm btn-outline-success"
                    @click="reservarCubiculo()">
                    Reservar
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
      <div class="modal fade" id="reservarCubiculoModal" tabindex="-1" aria-labelledby="reservarCubiculoModal" aria-hidden="true" modal-dialog>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="reservarCubiculoModalLabel">Reservar Cubiculo</h5>
            </div>
            <div class="modal-body">
              <div>
                <label for="nombre">Nombre del reservante</label>
                <input type="text" class="form-control" v-model="nombre" />
                <label for="fecha">Fecha</label>
                <input type="date" class="form-control" v-model="fecha" />
                <label for="horaInicio">Hora de inicio</label>
                <input type="time" class="form-control" v-model="horaInicio" />
                <label for="horaFin">Hora de fin</label>
                <input type="time" class="form-control" v-model="horaFin" />
                <button class="btn btn-primary mt-2" @click="confirmarReserva" :disabled="!fecha || !horaInicio || !horaFin || horaInicio >= horaFin">
                  Confirmar Reserva
                </button>
                <button type="button" class="btn btn-secondary ms-2 mt-2" @click="cancelarReserva" data-bs-dismiss="modal">Cancelar</button>
              </div>
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
        nombre: '',
        fecha: '',
        horaInicio: '',
        horaFin: '',
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
        ]
      })

    const reservarCubiculo = () => {
      //visual, falta funcionalidad
      state.nombre = ''
      state.fecha = ''        
      state.horaInicio = ''   
      state.horaFin = ''      
      const modal = document.getElementById('reservarCubiculoModal')
      if (modal) {
        modal.classList.add('show')
        modal.style.display = 'block'
      }
    }

    const confirmarReserva = () => {
      // Verificar que la hora de inicio sea menor que la hora de fin
      if (state.horaInicio >= state.horaFin) {
        // Mostrar un mensaje de error o tomar la acción correspondiente
        return
      }
      // solo es visual, falta funcionalidad
      const modal = document.getElementById('reservarCubiculoModal')
      if (modal) {
        modal.classList.remove('show')
        modal.style.display = 'none'
      }
    }

    const cancelarReserva = () => {
      //solo visual, falta funcionalidad
      const modal = document.getElementById('reservarCubiculoModal')
      if (modal) {
        modal.classList.remove('show')
        modal.style.display = 'none'
      }
    }
  
      return {
        ...toRefs(state),
        reservarCubiculo,
        confirmarReserva,
        cancelarReserva,
      }
    }
  }
  </script>