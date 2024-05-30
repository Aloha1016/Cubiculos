<template>
    <div class="change-password-container">
      <h1>Cambiar Contraseña</h1>
      <form @submit.prevent="changePassword">
        <div class="form-group">
          <label for="currentPassword">Contraseña Actual:</label>
          <input type="password" id="currentPassword" v-model="currentPassword" required>
        </div>
        <div class="form-group">
          <label for="newPassword">Nueva Contraseña:</label>
          <input type="password" id="newPassword" v-model="newPassword" required>
        </div>
        <button type="submit">Cambiar Contraseña</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentPassword: '',
        newPassword: ''
      };
    },
    methods: {
      changePassword() {
        // Aquí integrarías la lógica para cambiar la contraseña
        console.log('Contraseña cambiada');
      }
    }
  }
  </script>
  
  <style scoped>
  .change-password-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  .form-group {
    margin-bottom: 15px;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }
  input[type="password"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    padding: 10px 20px;
    background-color: #0066cc;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  </style>
  