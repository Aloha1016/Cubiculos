<template>
  <div class="user-dashboard">
    <header class="header">
      <div class="header-content">
        <div class="user-welcome">
          <h1>Bienvenido, {{ username }}</h1>
        </div>
        <div class="profile" @click="toggleMenu">
          <img src="@/assets/escalinatas.png" alt="Imagen de perfil" class="profile-image">
        </div>
      </div>
      <ul v-show="showMenu" class="profile-menu active">
        <li>{{ username }}</li>
        <li><router-link to="/Historial">Panel de avisos</router-link></li>
        <li><router-link to="/Ajustes">Ajustes</router-link></li>
        <li><button class="btn" @click="logout">Cerrar sesión</button></li>
      </ul>
    </header>

    <main>
      <div class="Cuerpo">
        <div class="fibonacci-container">
          <div class="fibonacci-item fibonacci1">
            <p>CUBICULOS</p>
            <div class="container py-2">
              <div class="row">
                <div class="col-md-10 col-lg-4" v-for="cubiculo in paginatedCubiculos" :key="cubiculo.id">
                  <div class="card mb-4">
                    <div class="card-body">
                      <h5 class="card-title">{{ cubiculo.cub_nombre }}</h5>
                      <p class="card-text">{{ cubiculo.cub_descripcion }}</p>
                      <p>Capacidad: {{ cubiculo.cub_capacidad }}</p>
                      <p v-if="cubiculo.usuario">Usuario: {{ cubiculo.usuario.name }}</p>
                      <p v-else>Usuario: Ninguno</p>
                      <p v-if="cubiculo.usuario">
                        Fecha de inicio: {{ cubiculo.start_date }}
                      </p>
                      <p v-if="cubiculo.usuario">Fecha de fin: {{ cubiculo.end_date }}</p>
                      <p :class="cubiculo.usuario ? 'text-danger' : 'text-success'">
                        {{ cubiculo.usuario ? "Ocupado" : "Disponible" }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="navigation-buttons">
                <button class="btn" @click="previousPage" :disabled="currentPage === 1">Atrás</button>
                <button class="btn" @click="nextPage" :disabled="currentPage === totalPages">Adelante</button>
              </div>
            </div>
          </div>
          <div class="fibonacci-item fibonacci3">
            <p>MI CUBÍCULO</p>
            <div v-if="!miCubiculo">
              <p>No tienes cubículo, puedes solicitar uno</p>
              <router-link to="/ReservarUser">
                <button class="btn">Solicitar cubículo</button>
              </router-link>
            </div>
          </div>
          <div class="fibonacci-item fibonacci2">
            <p>SANCIONES</p>
            <div v-if="!sanciones.length">
              <p>No tienes sanciones</p>
            </div>
          </div>
          <div class="fibonacci-item fibonacci4">
            <p>LOGROS</p>
            <div v-if="!logros.length">
              <p>No tienes logros</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer>
      <p>&copy; 2024 Cubículos Biblioteca</p>
    </footer>
  </div>
</template>

<script>
import { reactive, toRefs, computed, onMounted } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default {
  data() {
    return {
      showMenu: false,
      miCubiculo: null,
      sanciones: [],
      logros: [],
      username: localStorage.getItem('username') || 'Usuario'
    };
  },
  setup() {
    const state = reactive({
      cubiculos: [],
      currentPage: 1,
      itemsPerPage: 3
    });

    const totalPages = computed(() => Math.ceil(state.cubiculos.length / state.itemsPerPage));
    const paginatedCubiculos = computed(() => {
      const start = (state.currentPage - 1) * state.itemsPerPage;
      const end = start + state.itemsPerPage;
      return state.cubiculos.slice(start, end);
    });

    async function fetchCubiculos() {
      const querySnapshot = await getDocs(collection(db, "cubiculo"));
      querySnapshot.forEach((doc) => {
        state.cubiculos.push({ id: doc.id, ...doc.data() });
      });
    }

    function nextPage() {
      if (state.currentPage < totalPages.value) {
        state.currentPage++;
      }
    }

    function previousPage() {
      if (state.currentPage > 1) {
        state.currentPage--;
      }
    }

    onMounted(() => {
      fetchCubiculos();
    });

    return {
      ...toRefs(state),
      nextPage,
      previousPage,
      paginatedCubiculos,
      totalPages
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    logout() {
      localStorage.removeItem('username'); 
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 25px 0;
  background-color: #001c3f;
}

.header-content {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

.user-welcome {
  flex-grow: 1;
  max-width: 800px; 
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  color: #ffffff; /* Texto blanco para mayor legibilidad */
}

.profile {
  cursor: pointer;
  position: relative;
  z-index: 1000; 
}

.profile-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: #ffffff; /* Blanco */
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  list-style: none;
  z-index: 1001; 
  display: none;
}

.profile-menu li {
  margin-bottom: 10px;
}

.profile-menu.active {
  display: block;
}

.profile-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.Cuerpo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.fibonacci-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.fibonacci-item {
  flex-grow: 1;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
  margin: 10px;
  padding: 10px;
  border-radius: 20px;
  color: #333;
}

.fibonacci1 {
  background-color: #002f6c; /* Azul oscuro */
  color: #ffffff;
  flex-basis: 100%;
}

.fibonacci2 {
  background-color: #143867; /* Azul oscuro */
  color: #ffffff;
  flex-basis: 25%;
}

.fibonacci3 {
  background-color: #1c4b88; /* Azul oscuro */
  color: #ffffff;
  flex-basis: 50%;
}

.fibonacci4 {
  background-color: #002f6c; /* Azul oscuro */
  color: #ffffff;
  flex-basis: 25%;
}

.container {
  padding-top: 20px;
}

.card {
  background-color: #fff9e6; /* Amarillo claro */
  margin-bottom: 20px;
  border: 1px solid #e8c14e; /* Amarillo oscuro */
  border-radius: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.card-body {
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.card-text {
  flex-grow: 1;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn {
  background-color: #e8c14e; /* Amarillo oscuro */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn:hover {
  background-color: #d1a83a; /* Amarillo un poco más oscuro */
  color: white;
  transform: scale(1.05);
}

.text-danger {
  color: red;
}

.text-success {
  color: green;
}

footer {
  text-align: center;
  padding: 10px;
  background-color: #001c3f; /* Azul oscuro */
  color: #ffffff; /* Texto blanco para mayor legibilidad */
}
</style>
