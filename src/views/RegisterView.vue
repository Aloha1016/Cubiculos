<template>
  <div class="container-fluid p-0 h-100">
    <div class="row g-0 h-100">
      <!-- Columna de la imagen de fondo -->
      <div class="col-lg-6 d-none d-lg-flex align-items-center justify-content-center position-relative vh-100 bg-image">
        <div class="position-absolute top-50 start-50 translate-middle text-center text-dark w-75">
          <!-- Contenido adicional ?? -->
        </div>
      </div>
      <!-- Columna del formulario de registro -->
      <div class="col-lg-6 d-flex align-items-center justify-content-center position-relative vh-100 bg-color">
        <div class="position-absolute top-50 start-50 translate-middle text-center text-dark w-75">
          <div class="card-background p-4 p-sm-5 shadow">
            <img src="@/assets/logo.png" class="img-fluid mb-4" alt="ug image" />
            <form @submit.prevent="crearUser">
              <div class="mb-3">
                <input type="text" class="form-control" id="nombre" placeholder="Nombre" v-model="usu_nombre" required />
              </div>
              <div class="mb-3">
                <input type="text" autocomplete="lastname" class="form-control" id="apellido" placeholder="Apellido" v-model="usu_apellido" required />
              </div>
              <div class="mb-3">
                <input type="email" autocomplete="email" class="form-control" id="correo" placeholder="Correo electrónico" v-model="usu_correo" required />
              </div>
              <div class="mb-3">
                <input type="password" autocomplete="current-password" class="form-control" id="contraseña" placeholder="Contraseña" v-model="usu_contraseña" required />
              </div>
              <div class="mb-3">
                <button type="button" class="btn me-2 mb-2" @click="rolest" :class="{ active: rolSeleccionado === 'estudiante' }">
                  Estudiante
                </button>
                <button type="button" class="btn mb-2" @click="roladmin" :class="{ active: rolSeleccionado === 'administrador' }">
                  Administrador
                </button>
              </div>
              <div v-if="rolSeleccionado === 'estudiante'" class="mb-3">
                <input type="text" id="nua" placeholder="NUA" class="form-control" v-model="usu_id" />
              </div>
              <div v-if="rolSeleccionado === 'administrador'" class="mb-3">
                <input type="text" id="nue" placeholder="NUE" class="form-control" v-model="usu_id" />
              </div>
              <div class="mb-3">
                <button id="Registro" type="submit" class="btn btn-primary w-100">
                  Registrarse
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification,onAuthStateChanged } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const router = useRouter();
const auth = getAuth();

const rolSeleccionado = ref("estudiante");
const usu_nombre = ref("");
const usu_apellido = ref("");
const usu_correo = ref("");
const usu_contraseña = ref("");
const usu_id = ref("");
const usu_rol = ref("estudiante");
var usuario = "";
const crearUser = async () => {
  if (
    usu_nombre.value &&
    usu_apellido.value &&
    usu_correo.value &&
    usu_contraseña.value &&
    usu_id.value &&
    usu_rol.value
  ) {
    if (usu_correo.value.includes("@")) {
      try {
        await createUserWithEmailAndPassword(auth, usu_correo.value, usu_contraseña.value);
        console.log("Usuario Creado");
        await onAuthStateChanged(auth,  (user) => {
  
  
            if (user) {

              usuario= user.uid;
              console.log(usuario);

          } else {
              console.log("No existe usuario loggeado");
              router.push("/");
            }
          });


        await addDoc(collection(db, 'users'), {
          u_id: usu_id.value,
          u_uid: usuario,
          u_nombre: usu_nombre.value,
          u_apellido: usu_apellido.value,
          u_correo: usu_correo.value,
          u_rol: usu_rol.value,
          u_logros : 0,
          u_sanciones : 0
        });
        console.log("Usuario guardado");
        await sendEmailVerification(auth.currentUser);
        alert("Se ha enviado un correo de verificación. Verifique su correo para iniciar sesión");
        console.log("Correo de verificación enviado");
        router.push("/");
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    } else {
      alert("La dirección de correo no pertenece a la organización");
    }
  } else {
    alert("Complete todos los campos para continuar");
  }
};

const rolest = () => {
  rolSeleccionado.value = "estudiante";
  usu_rol.value = "estudiante";
};
const roladmin = () => {
  rolSeleccionado.value = "administrador";
  usu_rol.value = "administrador";
};
</script>

<style scoped>
.active {
  border: 1px solid #c9a400 !important;
  background-color: #c9a400 !important;
  color: white !important;
}

.bg-image {
  background-image: url("@/assets/escalinatas.png");
  background-size: cover;
  background-position: center;
}

.bg-color {
  background-color: #fdf7d2;
}

.card-background {
  border-radius: 20px;
  background-color: white;
}

@media (min-width: 992px) {
  .bg-color {
    background-image: none;
  }
}
</style>
