import { createRouter } from "vue-router";
import { createWebHistory } from "vue-router";
import DefaultLayout from "../components/DefaultLayout.vue";
import Dashboard from "../views/Dashboard.vue";
import login from "../views/Login.vue";
import register from "../views/Register.vue";
import surveys from "../views/Surveys.vue";
import store from "../store";
import AuthLayout from "../components/AuthLayout.vue";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    name: "Dashboard",
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/surveys",
        name: "Surveys",
        component: surveys,
      },
    ],
  },
  {
    path: "/auth",
    redirect: "/login",
    name: "Auth",
    component: AuthLayout,
    meta: { isGuest: true },
    children: [
      {
        path: "/register",
        name: "Register",
        component: register,
      },
      {
        path: "/login",
        name: "Login",
        component: login,
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !(store.state.user.token)) {
    next({ name: "Login" });
  } else if (
    store.state.user.token &&
    (to.meta.isGuest)
    // (to.name === "Login" || to.name === "Register")
  ) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;
