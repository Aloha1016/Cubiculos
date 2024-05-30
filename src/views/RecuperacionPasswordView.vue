<template>
  <div class="recovery-page">
    <header>
      <img src="@/assets/logo.png" alt="Logo de la empresa">
      <h1 style="color: #cca300;">Recuperar Contraseña</h1>
      <router-link to="/login" style="color: #705f7b;">Volver al inicio de sesión</router-link>
    </header>

    <form @submit.prevent="sendMail">
      <label for="email" style="color: #cca300;">Correo Electrónico:</label>
      <input type="email" id="email" v-model="email" required style="background-color: #e6e6b8; border: 1px solid #705f7b;">
      <button type="submit" style="background-color: #cca300;">Enviar</button>
    </form>

    <div class="instructions" style="color: #cca300;">
      <p>Ingrese su dirección de correo electrónico y le enviaremos un enlace seguro para restablecer su contraseña.</p>
    </div>

    <footer style="color: #cca300;">
    </footer>
  </div>
</template>

<script setup>
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const auth = getAuth();
const email = ref("");

const sendMail = () => {
  if (email.value !== "" && email.value.includes("@")) {
    sendPasswordResetEmail(auth, email.value).then(() => {
      alert("Se ha enviado el correo para restablecer su contraseña");
      router.push("/");
    }).catch((error) => {
      console.log(error);
      alert("Algo salió mal. Intente de nuevo más tarde");
    });
  } else {
    alert("Por favor, ingrese una dirección de correo electrónico válida.");
  }
};
</script>

<style scoped>
.recovery-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 20px;
}

form {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #cca300;
  color: #fff;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #b38600;
}

footer {
  text-align: center;
  margin-top: 20px;
}

footer a {
  margin-right: 10px;
}
</style>
