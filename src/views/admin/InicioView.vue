<template>
    <div class="container py-2">
      <h2>Gestión de Cubículos y Reservas</h2>
  
      <!-- Filtro de cubículos -->
      <div class="row">
        <div class="col-md-3 mb-3">
          <label for="statusFilter" class="form-label">Filtrar por estado:</label>
          <select class="form-select" v-model="statusFilter">
            <option value="all">Todos</option>
            <option value="available">Disponible</option>
            <option value="unavailable">Ocupado</option>
          </select>
        </div>
      </div>
  
      <div class="row" style="max-height: 550px; overflow-y: auto">
        <div v-for="cubiculo in cubiculosFiltrados" :key="cubiculo.id" class="col-md-10 col-lg-4">
          <div class="card mb-4 shadow-sm">
            <article class="card-body">
              <section class="d-flex justify-content-between align-items-center">
                <h5 class="card-title">{{ cubiculo.name }}</h5>
                <Badge :status="cubiculo.status" />
              </section>
              <p class="card-text">{{ cubiculo.descripcion }}</p>
              <p v-if="cubiculo.usuario">Usuario: {{ cubiculo.usuario.name }}</p>
              <p v-else>Usuario: Ninguno</p>
              <p v-if="cubiculo.usuario">Fecha de inicio: {{ cubiculo.start_date }}</p>
              <p v-if="cubiculo.usuario">Fecha de fin: {{ cubiculo.end_date }}</p>
              <button type="button" class="btn btn-sm btn-outline-primary" @click="selectUser(cubiculo.usuario)">
                Ver Perfil
              </button>
            </article>
          </div>
        </div>
      </div>
  
      <!-- Modal para Perfil de Usuario -->
      <div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="userModalLabel">Perfil del Usuario</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div v-if="selectedUser">
                <h3>{{ selectedUser.name }}</h3>
                <p><strong>Check-in:</strong> {{ selectedUser.checkIn || 'Pendiente' }}</p>
                <p><strong>Check-out:</strong> {{ selectedUser.checkOut || 'Pendiente' }}</p>
                <button @click="checkIn" class="btn btn-primary">Check-in</button>
                <button @click="checkOut" class="btn btn-secondary ms-2">Check-out</button>
                <hr />
                <h4>Logros</h4>
                <ul>
                  <li v-for="logro in selectedUser.logros" :key="logro.id">{{ logro.descripcion }}</li>
                </ul>
                <hr />
                <h4>Sanciones</h4>
                <ul>
                  <li v-for="sancion in selectedUser.sanciones" :key="sancion.id">{{ sancion.descripcion }}</li>
                </ul>
                <hr />
                <h4>Asignar Logros y Sanciones</h4>
                <div class="mb-3">
                  <label for="assignTipo" class="form-label">Tipo</label>
                  <select id="assignTipo" v-model="assignTipo" class="form-select">
                    <option value="logro">Logro</option>
                    <option value="sancion">Sanción</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="assignDescripcion" class="form-label">Descripción</label>
                  <textarea id="assignDescripcion" v-model="assignDescripcion" class="form-control"></textarea>
                </div>
                <button @click="asignar" class="btn btn-primary">Asignar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, computed } from 'vue';
  import Badge from "@/components/BadgeStatus.vue";
  import * as bootstrap from 'bootstrap';
  
  const state = reactive({
    statusFilter: 'all',
    cubiculos: [
      { id: 1, name: "Cubículo 1", descripcion: "Cubículo de 4x4 metros", status: false, usuario: { name: "Usuario 1", checkIn: null, checkOut: null, logros: [], sanciones: [] }, start_date: '2024-05-21', end_date: '2024-05-21' },
      { id: 2, name: "Cubículo 2", descripcion: "Cubículo de 4x4 metros", status: true, usuario: { name: "Usuario 2", checkIn: null, checkOut: null, logros: [], sanciones: [] }, start_date: '2024-05-21', end_date: '2024-05-21' },
      // Más datos de cubículos aquí
    ],
    selectedUser: null,
    assignTipo: 'logro',
    assignDescripcion: ''
  });
  
  const selectUser = (usuario) => {
    state.selectedUser = usuario;
    const userModal = new bootstrap.Modal(document.getElementById('userModal'), {});
    userModal.show();
  };
  
  const checkIn = () => {
    const now = new Date().toLocaleString();
    state.selectedUser.checkIn = now;
  };
  
  const checkOut = () => {
    const now = new Date().toLocaleString();
    state.selectedUser.checkOut = now;
  };
  
  const asignar = () => {
    if (state.assignTipo === 'logro') {
      state.selectedUser.logros.push({ id: Date.now(), descripcion: state.assignDescripcion });
    } else {
      state.selectedUser.sanciones.push({ id: Date.now(), descripcion: state.assignDescripcion });
    }
    state.assignDescripcion = '';
  };
  
  const cubiculosFiltrados = computed(() => {
    if (state.statusFilter === 'available') {
      return state.cubiculos.filter(c => c.status);
    } else if (state.statusFilter === 'unavailable') {
      return state.cubiculos.filter(c => !c.status);
    } else {
      return state.cubiculos;
    }
  });
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
    background: #002f6c;
    border-radius: 15px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    color: #ffffff;
  }
  
  .btn-outline-primary {
    color: #007bff;
    border-color: #007bff;
  }
  
  .btn-outline-primary:hover {
    color: #ffffff;
    background-color: #007bff;
    border-color: #007bff;
  }
  
  .card {
    background-color: #ffffff;
    border: 1px solid #ced4da;
    border-radius: 8px;
  }
  
  .card-title {
    font-size: 18px;
    font-weight: bold;
    color: #343a40;
  }
  
  .card-text {
    color: #6c757d;
  }
  
  .list-group-item {
    background-color: #ffffff;
    color: #002f6c;
  }
  
  .badge {
    padding: 5px 10px;
    border-radius: 5px;
    color: #fff;
  }
  </style>
  