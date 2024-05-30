<template>
    <div class="container py-2">
      <div class="row mb-4">
        <div class="col">
          <button
            type="button"
            class="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#createSanctionModal"
          >
            <i class="bi bi-plus-circle"></i> Crear Sanción
          </button>
        </div>
      </div>
  
      <div class="row">
        <div v-for="sancion in sanciones" :key="sancion.id" class="col-md-10 col-lg-4">
          <div class="card mb-4 shadow-sm">
            <article class="card-body">
              <section class="d-flex justify-content-between align-items-center">
                <h5 class="card-title">{{ sancion.s_nombre }}</h5>
                <!-- <span :class="['badge', sanction.active ? 'bg-danger' : 'bg-secondary']">
                  {{ sanction.active ? 'Activa' : 'Inactiva' }}
                </span> -->
              </section>
              <p class="card-text">{{ sancion.s_descripcion }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#assignSanctionModal"
                    @click="selectSanctionForAssignment(sanction)"
                  >
                    <i class="bi bi-person-plus"></i> Asignar
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#editSanctionModal"
                    @click="selectSanctionForEdit(sanction)"
                  >
                    <i class="bi bi-pencil"></i> Editar
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-danger"
                    @click="deleteSanction(sanction.id)"
                  >
                    <i class="bi bi-trash"></i> Eliminar
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
  
      <!-- Modal para Crear Sanción -->
      <div class="modal fade" id="createSanctionModal" tabindex="-1" aria-labelledby="createSanctionModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="createSanctionModalLabel">Crear Nueva Sanción</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="createSanction">
                <div class="mb-3">
                  <label for="createName" class="form-label">Nombre</label>
                  <input type="text" id="createName" v-model="newSanction.name" class="form-control" />
                </div>
                <div class="mb-3">
                  <label for="createDescription" class="form-label">Descripción</label>
                  <input type="text" id="createDescription" v-model="newSanction.description" class="form-control" />
                </div>
                <button type="submit" class="btn btn-primary">Crear</button>
              </form>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal para Asignar Sanción -->
      <div class="modal fade" id="assignSanctionModal" tabindex="-1" aria-labelledby="assignSanctionModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="assignSanctionModalLabel">Asignar Sanción</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="assignSanction">
                <div class="mb-3">
                  <label for="student" class="form-label">Estudiante</label>
                  <select id="student" v-model="selectedStudent" class="form-select">
                    <option v-for="student in students" :key="student.id" :value="student.id">
                      {{ student.name }}
                    </option>
                  </select>
                </div>
                <button type="submit" class="btn btn-primary">Asignar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal para Editar Sanción -->
      <div class="modal fade" id="editSanctionModal" tabindex="-1" aria-labelledby="editSanctionModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editSanctionModalLabel">Editar Sanción</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="editSanction">
                <div class="mb-3">
                  <label for="editName" class="form-label">Nombre</label>
                  <input type="text" id="editName" v-model="editSanctionForm.name" class="form-control" />
                </div>
                <div class="mb-3">
                  <label for="editDescription" class="form-label">Descripción</label>
                  <input type="text" id="editDescription" v-model="editSanctionForm.description" class="form-control" />
                </div>
                <div class="mb-3 form-check">
                  <input type="checkbox" id="editActive" v-model="editSanctionForm.active" class="form-check-input" />
                  <label for="editActive" class="form-check-label">Activa</label>
                </div>
                <button type="submit" class="btn btn-primary">Guardar Cambios</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue'
  import * as bootstrap from 'bootstrap'
  import { getFirestore, collection,onSnapshot,addDoc } from 'firebase/firestore';
  
  const db = getFirestore();
  const sanciones = ref ([]);

  const logrosCollection =collection (db,"sancion");
  onSnapshot(logrosCollection, (snapshot) => {
    sanciones.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log (sanciones.value)
  });

  // Datos simulados para estudiantes y sanciones
  const students = [
    { id: 1, name: 'Juan Pérez' },
    { id: 2, name: 'María López' },
    { id: 3, name: 'Carlos Sánchez' }
  ]
  
  const sanctions = reactive([
    { id: 1, name: 'Sanción 1', description: 'Mal uso del cubículo', active: true },
    { id: 2, name: 'Sanción 2', description: 'Retraso en la entrega del cubículo', active: false },
    { id: 3, name: 'Sanción 3', description: 'Ruido excesivo', active: false }
  ])
  
  const newSanction = reactive({ name: '', description: '' })
  const selectedStudent = ref(null)
  const editSanctionForm = reactive({ id: null, name: '', description: '', active: false })
  
  // const filteredSanctions = computed(() =>
  //   sanctions.filter((sanction) =>
  //     sanction.name.toLowerCase().includes('')
  //   )
  // )
  
  async function createSanction() {
    if ( newSanction.name && newSanction.description)
  {
      await addDoc(collection (db,"sancion"), 
      {
        s_nombre : newSanction.name,
        s_descripcion : newSanction.description

        
      });

    }
    
    
    
    // sanctions.push({
    //   id: sanctions.length + 1,
    //   name: newSanction.name,
    //   description: newSanction.description,
    //   active: true
    // })

    newSanction.name = ''
    newSanction.description = ''
    hideModal('createSanctionModal')
  }
  
  function assignSanction() {
    if (selectedStudent.value !== null) {
      console.log(`Asignada la sanción ${editSanctionForm.id} a ${selectedStudent.value}`)
      hideModal('assignSanctionModal')
    }
  }
  
  function selectSanctionForAssignment(sanction) {
    editSanctionForm.id = sanction.id
    selectedStudent.value = null
  }
  
  function selectSanctionForEdit(sanction) {
    editSanctionForm.id = sanction.id
    editSanctionForm.name = sanction.name
    editSanctionForm.description = sanction.description
    editSanctionForm.active = sanction.active
  }
  
  function editSanction() {
    const sanction = sanctions.find((san) => san.id === editSanctionForm.id)
    if (sanction) {
      sanction.name = editSanctionForm.name
      sanction.description = editSanctionForm.description
      sanction.active = editSanctionForm.active
    }
    hideModal('editSanctionModal')
  }
  
  function deleteSanction(id) {
    const index = sanctions.findIndex((san) => san.id === id)
    if (index !== -1) {
      sanctions.splice(index, 1)
    }
  }
  
  function hideModal(modalId) {
    const modalElement = document.getElementById(modalId)
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement)
      if (modalInstance) {
        modalInstance.hide()
      } else {
        const newModalInstance = new bootstrap.Modal(modalElement)
        newModalInstance.hide()
      }
    }
  }
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
  
  .btn-primary {
    color: #ffffff;
    background-color: #c9a400;
    border-color: #c9a400;
  }
  
  .btn-primary:hover {
    background-color: #bfa303;
    border-color: #bfa303;
  }
  
  .btn-outline-danger {
    color: #dc3545;
    border-color: #dc3545;
  }
  
  .btn-outline-danger:hover {
    color: #ffffff;
    background-color: #dc3545;
    border-color: #dc3545;
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
  
  .badge.bg-success {
    background-color: #28a745;
  }
  
  .badge.bg-warning {
    background-color: #ffc107;
  }
  
  .modal-content {
    background-color: #ffffff;
    border-radius: 8px;
  }
  
  .modal-title {
    color: #002f6c;
  }
  </style>
  