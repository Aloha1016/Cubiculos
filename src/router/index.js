import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import InterUsuarioView from "../views/InterUsuarioView.vue";
import AjustesView from "../views/AjustesView.vue";
import RecuperacionPasswordView from "../views/RecuperacionPasswordView.vue";
import PerfilView from "../views/PerfilView.vue";
import ReservarCubiculosView from "../views/ReservarCubiculosView.vue";
import AdminView from "../views/admin/AdminView.vue";
import AdminCubiculosView from "../views/admin/AdminCubiculosView.vue";
import AdminReservasView from "../views/admin/AdminReservasView.vue";
import AdminAvisosView from "../views/admin/AdminAvisosView.vue";
import AchievementsView from "../views/admin/AchievementsView.vue";
import SanctionsView from "../views/admin/SanctionsView.vue";
import ChangePasswordView from "../views/ChangePasswordView.vue";
import ReservarCubiculosUserView from "../views/ReservarCubiculosUserView.vue";
import FinalizarReservas from "../views/admin/FinalizarReservasView.vue";

const routes = [
  {
    path: "/",
    name: "Inicio",
    component: HomeView,
  },
  {
    path: "/admin",
    name: "Dashboard",
    component: AdminView,
    children: [
      {
        path: "",
        name: "admin",
        component: AdminCubiculosView,
      },
      {
        path: "cubiculos",
        name: "Cubiculos",
        component: AdminCubiculosView,
      },
      {
        path: "reservas",
        name: "Reservas",
        component: AdminReservasView,
      },
      {
        path: "avisos",
        name: "Avisos",
        component: AdminAvisosView,
      },
      {
        path: "achievements",
        name: "Logros",
        component: AchievementsView,
      },
      {
        path: "finalizarReservas",
        name: "Finalizar Reservas",
        component: FinalizarReservas,
      },
      {
        path: "sanctions",
        name: "Sanciones",
        component: SanctionsView,
      },
    ],
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/InterUsuario",
    name: "InterUsuario",
    component: InterUsuarioView,
  },
  {
    path: "/Ajustes",
    name: "Ajustes",
    component: AjustesView,
  },
  {
    path: "/Recuperacion",
    name: "Recuperacion",
    component: RecuperacionPasswordView,
  },
  {
    path: "/Reservar",
    name: "Reservar",
    component: ReservarCubiculosView,
  },
  {
    path: "/Historial",
    name: "Historial",
    component: PerfilView,
  },
  {
    path: "/change-password",
    name: "ChangePassword",
    component: ChangePasswordView,
  },
  {
    path: "/ReservarUser",
    name: "ReservarUser",
    component: ReservarCubiculosUserView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
