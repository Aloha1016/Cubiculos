<template>

  <div class="container-xl my-4 py-4 rounded shadow" style="background-color: #002F6C;">
    <div class="row d-flex justify-content-center">
      <div class="col-md-6">
        <div class="card shadow p-3 my-3">
          <div class="d-flex justify-content-center pt-3">
            <img src="@/assets/logo3.png" class="img-fluid t-imagen" alt="ug image" />
          </div>
          
          <div class="px-5 py-1">
            <form @submit.prevent="LogIn">
                <div class="row">
                  <div class="col-md-12 mb-3 d-flex">
                    <i class="bi bi-person-fill fs-5 d-block w-25 py-2 rounded me-2 text-white" style="background-color: #002F6C;"></i>
                    <input id="correo" type="email" v-model="email" placeholder="Email ID" class="form-control">
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 mb-3 d-flex">
                      <i class="bi bi-lock-fill fs-5 d-block w-25 py-2 rounded me-2 text-white" style="background-color: #002F6C;"></i>
                      <input id="contraseña" type="password" v-model="pass" placeholder="Password" class="form-control form-control">
                  </div>
                </div>
                
                <div class="mb-3">
                  <input type="submit" value="Acceder" class="btn text-white w-100 mt-3" style="background-color: #002F6C;">
                </div>
                
                <p class="text-secondary my-4">Al continuar, aceptas las <span>Condiciones de servicio</span>; y reconoces que leíste nuestra Política de privacidad.
                Aviso de recopilación de información.</p>
                
              
                <div class="row mt-3">
                  <div class="col-12 col-md-6">
                    <a href="/Register">¿Aún no estás en CubiBiblio?  Regístrate </a>
                  </div>
                  <div class="col-12 col-md-6">
                    <a href="/Recuperacion">¿Olvidaste tu contraseña?  Recupérala aquí</a>
                  </div>
                </div>
               
            </form>
          </div>
        </div>
      </div>
    </div>
  </div> 
</template>

<script setup>
import { getAuth, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const email = ref("");
const pass = ref("");

const router = useRouter();

const LogIn = async () => {
  const auth = getAuth();
  const db = getFirestore();

  if (email.value !== "" && pass.value !== "") {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.value, pass.value);
      const user = userCredential.user;
      console.log(user);

      if (user.emailVerified) {
        const q = query(collection(db, "users"), where("u_correo", "==", email.value));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            const userRole = userData.u_rol;
            const userName = userData.u_nombre;

            // Store the user's name in localStorage
            localStorage.setItem('username', userName + " "+userData.u_apellido);

            if (userRole === "administrador") {
              router.push('/admin');
            } else if (userRole === "estudiante") {
              router.push('/InterUsuario');
            } else {
              alert("Rol de usuario no reconocido");
            }
          });
        } else {
          alert("No se encontraron datos del usuario en la base de datos");
        }
      } else {
        alert("El email no ha sido verificado, reenviamos un correo de verificación a su dirección de correo");
        await sendEmailVerification(user);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  } else {
    alert("Complete los campos para continuar : )");
  }
}
</script>


<style scoped>
.t-imagen{
  width: 30%;
  margin-bottom:30px;
}
</style>