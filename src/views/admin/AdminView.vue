<template>
  <div>
    <header class="navbar navbar-dark d-flex" style="background-color: #002147">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Panel de Administrador</a>
        <div>
          <button @click="logout" class="btn btn-outline-light" type="button">Cerrar Sesión</button>
        </div>
      </div>
    </header>

    <div class="container-fluid">
      <div class="row w-100">
        <nav id="sidebar" class="col-md-3 col-lg-2 d-md-block sidebar py-4" style="background-color: #002147">
          <div class="position-sticky">
            <ul class="nav d-flex flex-column gap-2 list-group">
              <RouterLink
                v-for="link in links"
                :key="link.to"
                :to="link.to"
                class="nav-item nav-link text-light list-group-item transition-colors rounded-3 d-flex justify-content-start align-items-center gap-2"
                :class="{ active: $route.path === link.to }">
                <i :class="link.icon"></i>
                <p class="p-0 m-0 d-flex justify-content-start" style="text-align: left">
                  {{ link.text }}
                </p>
              </RouterLink>
            </ul>
          </div>
        </nav>

        <main class="col-md-9 col-lg-10 px-md-4">
          <div class="pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">
              {{ links.find((link) => link.to === $route.path)?.text || "Inicio" }}
            </h1>
          </div>
          <div class="container">
            <router-view />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
  router.push("/");
};

const links = [
  { to: "/admin", text: "Inicio", icon: "bi bi-house" },
  { to: "/admin/cubiculos", text: "Cubículos", icon: "bi bi-box" },
  { to: "/admin/reservas", text: "Reservas", icon: "bi bi-calendar" },
  { to: "/admin/avisos", text: "Avisos", icon: "bi bi-bookmark" },
  { to: "/admin/achievements", text: "Logros", icon: "bi bi-trophy" },
  { to: "/admin/sanctions", text: "Sanciones", icon: "bi bi-exclamation-circle" }
];
</script>

<style scoped>
.active {
  background-color: #c9a400;
}

/* Sidebar Styles */
.container-fluid {
  display: flex;
}

#sidebar {
  max-width: 200px;
  height: calc(100vh - 56px);
  background-color: #e3f2fd;
  padding: 0.8rem;
  border-right: 1px solid #dee2e6;
  overflow-y: auto;
}
.nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  font-size: 1rem;
  list-style-type: none;
  transition: 300ms all;
  background-color: #002147;
  box-shadow: 0;
  border: 1px solid #002147;
  border-radius: 10px;
  margin-bottom: 10px;
}

.nav-item:hover {
  background-color: #c9a400;
  color: white !important;
}

.nav-item.active {
  color: white !important;
  border: 1px solid #c9a400;
  background-color: #c9a400;
}

.nav-item.active {
  color: #ffffff !important;
  border: 1px solid #c9a400;
  background-color: #c9a400;
}

.btn-aceptar {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-cancelar {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-aceptar:hover,
.btn-cancelar:hover {
  background-color: #218838;
  border-color: #218838;
}

.navbar-dark .navbar-brand {
  color: #c9a400;
}

.navbar-dark .btn-outline-light {
  color: #c9a400;
  border-color: #c9a400;
}

.navbar-dark .btn-outline-light:hover {
  color: #002147;
  background-color: #c9a400;
  border-color: #c9a400;
}
</style>
