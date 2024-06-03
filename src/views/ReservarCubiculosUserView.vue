<template>
    <div class="reserva-cubiculo">
      <img src="../assets/logo.png" alt="Cubículo" class="img-cubiculo">
      <h1>Reservar Cubículo</h1>
      <form @submit.prevent="crearReserva">
        
        <div class="mb-3">
          <label for="cubiculo" class="form-label">Cubículo</label>
          <select class="form-select" v-model="selected_cub" required>
            <option v-for="cub in cubiculos" :key="cub.id" :value="cub.id">
              {{ cub.cub_nombre }}
            </option>
          </select>
        </div>
        
        <div class="mb-3">
          <label for="fecha" class="form-label">Fecha</label>
          <input type="date" class="form-control" v-model="fecha" required />
        </div>
        
        <div class="mb-3">
          <label for="horaInicio" class="form-label">Hora de inicio</label>
          <input type="time" class="form-control" v-model="horaInicio" required />
        </div>
        
        <div class="mb-3">
          <label for="horaFin" class="form-label">Hora de finalización</label>
          <input type="time" class="form-control" v-model="horaFin" required />
        </div>
        
        <button type="submit" class="btn btn-primary">Reservar cubículo</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { getAuth,onAuthStateChanged } from "firebase/auth";
  import { getFirestore, collection,addDoc,query,where,getDocs, updateDoc, doc } from 'firebase/firestore';
  import { ref } from 'vue';
  import { useRouter } from "vue-router";

  const router = useRouter();


  const auth = getAuth();
  var usuario = ref("");
  
  const fecha = ref("");
  const horaInicio = ref("");
  const horaFin = ref("");
  
//const status = ref("open");

 onAuthStateChanged(auth,  (user) => {
  
  
   if (user) {

     usuario= user.uid;
     console.log(usuario);

 } else {
     console.log("No existe usuario loggeado");
      router.push("/");
   }
});



  // query, where, getDocs
  const db = getFirestore();

  const cubiculos = ref([]);
  const selected_cub = ref (""); 

  const cubcollection = collection(db, "cubiculo");
  const activeCub = query(cubcollection, where("cub_status", "==", true));


    async function fetchCubiculos() {
      const querySnapshot = await getDocs(activeCub);
      querySnapshot.forEach((doc) => {
        cubiculos.value.push({ id: doc.id, ...doc.data() });
        console.log(cubiculos);
      });
    }

    fetchCubiculos ();

  
  // const cargarCubiculos = () => {
  // const cubiculosCollection = collection(db, "cubiculo");
  // onSnapshot(cubiculosCollection, (snapshot) => {
  //   cubiculos.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  //   console.log (cubiculos.value)
  // });
  // };

  // cargarCubiculos ();



const crearReserva = async () =>
{
  if ( selected_cub.value && fecha.value && horaFin.value && horaFin.value)
  {
      await addDoc(collection (db,"reserva"), 
      {
        r_usuario : usuario,
        r_cubiculo : selected_cub.value,
        r_fecha : fecha.value,
        r_hora_inicio : horaInicio.value,
        r_hora_fin : horaFin.value,
        r_username : localStorage.getItem("username"),
        r_status : "open"
        
        
      });

      const cub_ref = doc(db,"cubiculo",selected_cub.value);
   
      await updateDoc(cub_ref,
      {
        cub_status : false
      });

      // await cub_ref.doc(selected_cub.value).update(
      //   {
      //     cub_status: false
      //   }
      // );
      alert("Reserva Creada con exito")
      console.log ("Reserva Creada ");
      router.push('/InterUsuario');
      
  } else
  {
    alert("Complete todos los campos para continuar");
  }

}

console.log(localStorage.getItem("username"))

  // export default {
  //   data() {
  //     return {
  //       cubiculo: '',
  //       fecha: '',
  //       horaInicio: '',
  //       horaFin: '',
  //       cubiculos: [
  //         { id: 1, name: 'Cubículo 1' },
  //         { id: 2, name: 'Cubículo 2' },
  //         { id: 3, name: 'Cubículo 3' },
  //         { id: 4, name: 'Cubículo 4' }
  //       ]
  //     };
  //   },
  //   methods: {
  //     handleSubmit() {
  //       const reserva = {
  //         usuario: this.usuario,
  //         cubiculo: this.cubiculo,
  //         fecha: this.fecha,
  //         horaInicio: this.horaInicio,
  //         horaFin: this.horaFin
  //       };
  //       console.log('Reserva realizada:', reserva);
  //       // Aquí puedes realizar una solicitud a la API para guardar la reserva
  //     }
  //   }
  //};


</script>
  
<style scoped>
.reserva-cubiculo {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #002f6c;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: white; /* Cambia el color del texto a blanco */
}

.img-cubiculo {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 8px;
}

.mb-3 {
  margin-bottom: 1rem;
}

.btn-primary {
  background-color: #e8c158;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn-primary:hover {
  background-color: #c69c2a;
  color: white;
  transform: scale(1.05);
}
</style>
