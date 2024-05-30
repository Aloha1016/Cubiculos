<template>
  <div class="profile">
    <div class="profile-header">
      <h2>{{ userData.username }}</h2>
      <img :src="userData.avatar" alt="Avatar" class="avatar">
    </div>
    <div class="profile-info">
      <h3>Información</h3>
      <div class="form-group">
        <label for="username">Nombre de Usuario:</label>
        <input type="text" id="username" v-model="userData.username">
      </div>
      <div class="form-group">
        <label for="email">Correo Electrónico:</label>
        <input type="email" id="email" v-model="userData.email">
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="userData.password">
      </div>
      <div class="form-group">
        <label for="bio">Biografía:</label>
        <textarea id="bio" v-model="userData.bio"></textarea>
      </div>
      <div class="form-group">
        <label for="avatar">Cambiar Avatar:</label>
        <input type="file" id="avatar" @change="handleAvatarChange">
      </div>
      <button @click.prevent="saveSettings">Guardar Cambios</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        username: 'usuario_ejemplo',
        email: 'usuario@ejemplo.com',
        password: '',
        bio: '¡Hola! Soy un usuario de ejemplo.',
        avatar: 'https://via.placeholder.com/150' // URL del avatar de ejemplo
      },
      avatarPreview: null
    };
  },
  methods: {
    saveSettings() {
      // Aquí puedes enviar los datos del usuario a tu servidor para guardarlos
      console.log('Guardando ajustes...', this.userData);
      // Puedes hacer una petición HTTP aquí para guardar los datos
    },
    handleAvatarChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.userData.avatar = URL.createObjectURL(file);
        this.avatarPreview = this.userData.avatar;
      } else {
        this.userData.avatar = null;
        this.avatarPreview = null;
      }
    }
  }
}
</script>

<style scoped>
.profile {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.profile-header {
  text-align: center;
}

.profile-header h2 {
  margin-bottom: 10px;
  font-size: 24px;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
}

.profile-info h3 {
  margin-bottom: 15px;
  font-size: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="password"],
textarea {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #4267B2;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #405D9B;
}

</style> 