<template>
  <div class="d-flex flex-column gap-4 flex-xl-row">
    <!-- Lado Izquierdo -->
    <div class="col-md-12 col-xl-6">
      <div class="container p-6">
        <div class="row d-flex justify-content-center">
          <!-- TITULO SECCION -->
          <h4 class="mb-4">Reservas</h4>
          <!-- CONTROLES PARA LOS FILTROS -->
          <div class="row">
            <div class="col-md-12 col-lg-6">
              <label for="filterStatus" class="form-label d-flex justify-content-start">Filtrar por estado:</label>
              <select id="filterStatus" class="form-select" v-model="filterStatus">
                <option value="">Todos</option>
                <option value="available">Disponible</option>
                <option value="occupied">Ocupado</option>
              </select>
            </div>
          </div>
          <!-- RENDERIZAR TODOS LOS CUBICULOS CON INFORMACION EXTRA -->
          <div class="d-flex justify-content-center flex-wrap gap-4 my-2 p-4" style="max-height: 500px; overflow-y: auto">
            <div class="col-md-10 col-lg-5 mt-4" v-for="reserva in reservasActivas" :key="reserva.id">
              <div class="card mb-4 shadow-sm h-100">
                <div class="card-body">
                  <section class="d-flex flex-column justify-content-between align-items-start mb-2">
                    <h5 class="card-title">{{ reserva.r_username }}</h5>
                    <div class="d-flex flex-column flex-row flex-2xl-row center align-items-start mb-2 gap-2">
                      <BadgeReserva :capacity="reserva.r_status" />
                    </div>
                  </section>

                  <div class="card mb-3">
                    <div class="card-body">
                      <p class="user-title">Fecha de la Reserva: {{ reserva.r_fecha }}</p>
                      <p class="card-text"><strong>Hora de Inicio: <br /></strong> {{ reserva.r_hora_inicio }}</p>
                      <p class="card-text"><strong>Hora de Fin:<br /></strong> {{ reserva.r_hora_fin }}</p>
                    </div>
                  </div>

                  <button 
                    type="button"
                    class="btn btn-outline-primary"
                    data-bs-toggle="modal"
                    :data-bs-target="'#checkInModal' + reserva.id"
                    @click="setCurrentReserva(reserva)">
                    Check-In
                  </button>
                  <button 
                    type="button"
                    class="btn btn-secondary"
                    data-bs-toggle="modal"
                    :data-bs-target="'#checkOutModal' + reserva.id"
                    @click="setCurrentReserva(reserva)">
                    Check-Out
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal para Check-In -->
          <div v-for="reserva in reservasActivas" :key="'checkInModal' + reserva.id" class="modal fade" :id="'checkInModal' + reserva.id" tabindex="-1" aria-labelledby="checkInModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                  <h5 class="modal-title text-white" id="checkInModalLabel">Check-In</h5>
                  <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-black">
                  <p>Fecha: {{ reserva.r_fecha }}</p>
                  <p>Hora: {{ reserva.r_hora_inicio }}</p>
                  <button type="button" class="btn btn-primary" @click="checkIn(reserva)" data-bs-dismiss="modal">Check-In</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal para Check-Out -->
          <div v-for="reserva in reservasActivas" :key="'checkOutModal' + reserva.id" class="modal fade" :id="'checkOutModal' + reserva.id" tabindex="-1" aria-labelledby="checkOutModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                  <h5 class="modal-title text-white" id="checkOutModalLabel">Check-Out</h5>
                  <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-black">
                  <p>Realizando Check-Out de la reserva</p>
                  <div class="mb-3">
                    <label for="achievement" class="form-label">Agregar Logro</label>
                    <select id="achievement" class="form-select" v-model="selectedAchievement">
                      <option v-for="logro in logros" :key="logro.id" :value="logro.id">
                        {{ logro.l_nombre }}
                      </option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="sanction" class="form-label">Agregar Sanción</label>
                    <select id="sanction" class="form-select" v-model="selectedSanction">
                      <option v-for="sancion in sanciones" :key="sancion.id" :value="sancion.id">
                        {{ sancion.s_nombre }}
                      </option>
                    </select>
                  </div>
                  <button type="button" class="btn btn-primary" @click="checkOut(reserva)" data-bs-dismiss="modal">Check-Out</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal para Reservar Cubículo -->
          <div
            class="modal fade"
            id="createReservationModal"
            tabindex="-1"
            aria-labelledby="createReservationModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-md">
              <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                  <h5 class="modal-title text-white" id="createReservationModalLabel">Reservar Cubículo</h5>
                  <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-black">
                  <div class="mb-3">
                    <label for="usuario" class="form-label">Usuario</label>
                    <select class="form-select" v-model="usuario">
                      <option disabled value="">Seleccionar usuario</option>
                      <option v-for="user in usuarios" :key="user.id" :value="user.id">
                        {{ `${user.u_nombre} ${user.u_apellido}` }}
                      </option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="fecha" class="form-label">Fecha</label>
                    <input type="date" class="form-control" v-model="fecha" />
                  </div>
                  <div class="row mb-3">
                    <div class="col">
                      <label for="horaInicio" class="form-label">Hora de inicio</label>
                      <input type="time" class="form-control" v-model="horaInicio" />
                    </div>
                    <div class="col">
                      <label for="horaFin" class="form-label">Hora de finalización</label>
                      <input type="time" class="form-control" v-model="horaFin" />
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="reservarCubiculo">
                    Reservar
                  </button>
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Lado Derecho -->
    <!-- 


<div class="col-md-12 col-xl-6">
      <div class="container p-6">
  
        <h4 class="mb-4">Registro Reservas</h4>
        <div class="container p-4" style="background-color: #f8f9fa">
          <table class="table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Cubículo</th>
                <th>Fecha</th>
                <th>Hora Inicio</th>
                <th>Hora Fin</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="reserva in reservas" :key="reserva.id">
                <td>{{ getUser(reserva.r_usuario) }}</td>
                <td>{{ getCubiculoName(reserva.r_cubiculo) }}</td>
                <td>{{ reserva.r_fecha }}</td>
                <td>{{ reserva.r_hora_inicio }}</td>
                <td>{{ reserva.r_hora_fin }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

     -->
    
    
  </div>
</template>

<script>
import BadgeReserva from "../../components/BadgeReservaStatus.vue"
import { reactive, onMounted, computed, toRefs } from "vue";
import { collection, addDoc, onSnapshot, doc, updateDoc, query, getDocs, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default {
  components: {
    BadgeReserva
  },
  setup() {
    const state = reactive({
      cubiculoActual: null,
      cubiculos: [],
      reservas: [],
      reservasActivas: [],
      usuario: null,
      fecha: null,
      horaInicio: null,
      horaFin: null,
      usuarios: [],
      filterStatus: "",
      logros: [],
      sanciones: [],
      selectedAchievement: "",
      selectedSanction: "",
    });

    const usuariosCollection = collection(db, "users");
    // const cubiculosCollection = collection(db, "cubiculos");
    const reservasCollection = collection(db, "reserva");
    const reservasActivasQuery = query(reservasCollection, where("r_status", "!=", "closed"));

    // const getUser = (userId) => {
    //   const user = state.usuarios.find((u) => u.id === userId);
    //   return user ? `${user.u_nombre} ${user.u_apellido}` : "Desconocido";
    // };

    // const getCubiculoName = (cubiculoId) => {
    //   const cubiculo = state.cubiculos.find((c) => c.id === cubiculoId);
    //   return cubiculo ? cubiculo.nombre : "Desconocido";
    // };

    // const cargarCubiculos = () => {
    //   onSnapshot(cubiculosCollection, (snapshot) => {
    //     state.cubiculos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    //   });
    // };

    const cargarReservasActivas = async () => {
      const querySnapshot = await getDocs(reservasActivasQuery);
      state.reservasActivas = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    };

    

    const cargarUsuarios = () => {
      onSnapshot(usuariosCollection, (snapshot) => {
        state.usuarios = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      });
    };

    const cargarLogros = () => {
      const logrosCollection = collection(db, "logro");
      onSnapshot(logrosCollection, (snapshot) => {
        state.logros = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      });
    };

    const cargarSanciones = () => {
      const sancionesCollection = collection(db, "sancion");
      onSnapshot(sancionesCollection, (snapshot) => {
        state.sanciones = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      });
    };

    const abrirModalReserva = (cubiculo) => {
      state.cubiculoActual = cubiculo;
    };

    const reservarCubiculo = async () => {
      if (!state.usuario || !state.fecha || !state.horaInicio || !state.horaFin) {
        alert("Todos los campos son obligatorios");
        return;
      }

      try {
        const usuarioSeleccionado = state.usuarios.find((user) => user.id === state.usuario);
        if (!usuarioSeleccionado) {
          alert("El usuario seleccionado no es válido");
          return;
        }

        // Crear la reserva
        const reservaRef = await addDoc(collection(db, "reserva"), {
          r_cubiculo: state.cubiculoActual.id,
          r_usuario: usuarioSeleccionado.id,
          r_fecha: state.fecha,
          r_hora_inicio: state.horaInicio,
          r_hora_fin: state.horaFin,
        });

        // Actualizar el documento de usuario con el ID de la reserva
        const usuarioDoc = doc(db, "users", usuarioSeleccionado.id);
        await updateDoc(usuarioDoc, {
          u_reserva_id: reservaRef.id,
        });

        // Actualizar el documento del cubículo
        const cubiculoDoc = doc(db, "cubiculos", state.cubiculoActual.id);
        await updateDoc(cubiculoDoc, {
          status: false,
          user: usuarioSeleccionado.id,
          fecha_inicio: state.fecha + " " + state.horaInicio,
          fecha_fin: state.fecha + " " + state.horaFin,
        });
      } catch (error) {
        console.error("Error al reservar el cubículo: ", error);
      }
    };

    const cargarReservas = () => {
      onSnapshot(reservasCollection, (snapshot) => {
        state.reservas = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log(state.reservas);
      });
    };

    const checkIn = async (reserva) => {
      try {
        const reservaDoc = doc(db, "reserva", reserva.id);
        await updateDoc(reservaDoc, {
          r_status: "checked-in",
        });
        alert("Check-In realizado con éxito");
        await cargarReservasActivas();
      } catch (error) {
        console.error("Error al realizar el check-in: ", error);
      }
    };

    const checkOut = async (reserva) => {
      try {
      



        if (state.selectedAchievement) {
           

            await addDoc(collection(db, 'logro_usuario'), {
                ulo_userid: reserva.r_usuario,
                ulo_logro : state.selectedAchievement,
                ulo_status : true
                
              });

            
            const userCollection = collection(db, "users");
            const userQuery= query (userCollection, where ("u_uid" , "==",reserva.r_usuario) )
            console.log(reserva.r_usuario);
            const querySnapshot = await getDocs(userQuery)
            querySnapshot.forEach((document)=>
            {
              console.log(document.data().u_logros)
             
               const userDoc = doc(db,"users",document.id);
                  updateDoc(userDoc, {
                      u_logros : document.data().u_logros +1
                 }) 
              
            });

              const reservaDoc = doc(db, "reserva", reserva.id);
             await updateDoc(reservaDoc, {
             r_status: "closed",
             });
            
             const cub_ref = doc(db,"cubiculo",reserva.r_cubiculo);
   
              await updateDoc(cub_ref,
              {
                cub_status : true
              });



          // const logroDoc = doc(db, "logros", state.selectedAchievement);
          // await updateDoc(logroDoc, {
          //   r_reserva: reserva.id,
          // });
        }

        if (state.selectedSanction) {
              await addDoc(collection(db, 'sancion_usuario'), {
                    usan_userid: reserva.r_usuario,
                    usan_sancion: state.selectedSanction,
                    usan_status : true
                    
                  });

                
                const userCollection = collection(db, "users");
                const userQuery= query (userCollection, where ("u_uid" , "==",reserva.r_usuario) )
                console.log(reserva.r_usuario);
                const querySnapshot = await getDocs(userQuery)
                querySnapshot.forEach((document)=>
                {
                  console.log(document.data().u_sanciones)
                
                  const userDoc = doc(db,"users",document.id);
                      updateDoc(userDoc, {
                          u_sanciones : document.data().u_sanciones +1
                    }) 
                  
                });

                  

                const reservaDoc = doc(db, "reserva", reserva.id);
                await updateDoc(reservaDoc, {
                r_status: "closed",
                });

                const cub_ref = doc(db,"cubiculo",reserva.r_cubiculo);     
                await updateDoc(cub_ref,
                {
                  cub_status : true
                });
                
         }

        alert("Check-Out realizado con éxito");
        await cargarReservasActivas();
      } catch (error) {
        console.error("Error al realizar el check-out: ", error);
      }
    };

    const setCurrentReserva = (reserva) => {
      state.cubiculoActual = reserva;
    };

    const filteredCubiculos = computed(() => {
      if (state.filterStatus === "available") {
        return state.cubiculos.filter((cubiculo) => !cubiculo.user);
      } else if (state.filterStatus === "occupied") {
        return state.cubiculos.filter((cubiculo) => cubiculo.user);
      } else {
        return state.cubiculos;
      }
    });

    onMounted(() => {
      // cargarCubiculos();
      cargarUsuarios();
      cargarReservas();
      cargarReservasActivas();
      cargarLogros();
      cargarSanciones();
    });

    return {
      ...toRefs(state),
      // getCubiculoName,
      // getUser,
      abrirModalReserva,
      reservarCubiculo,
      filteredCubiculos,
      checkIn,
      checkOut,
      setCurrentReserva,
    };
  },
};
</script>

<style scoped>
.cubicles {
  max-height: 100px;
  overflow-y: auto;
}

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

.btn-outline-success {
  color: #28a745;
  border-color: #28a745;
}

.btn-outline-success:hover {
  color: #ffffff;
  background-color: #28a745;
  border-color: #28a745;
}

.btn-danger {
  color: #ffffff;
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
  border-color: #bd2130;
}

.btn-secondary {
  color: #ffffff;
  background-color: #007bff;
  border-color: #007bff;
}

.btn-secondary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
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

.modal-content {
  background-color: #ffffff;
  border-radius: 8px;
}

.modal-title {
  color: #002f6c;
}

.user-title {
  font-weight: bold;
}
</style>
