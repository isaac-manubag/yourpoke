import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";

const guestGuard = () => {
  const authStore = useAuthStore();
  if (authStore?.user) {
    return { path: "/" };
  }

  return true;
};

const authGuard = () => {
  const authStore = useAuthStore();
  if (authStore?.user) {
    return true;
  } else if (localStorage.getItem("access_token")) {
    return authStore.fetchUserProfile().then(() => true);
  }

  return { path: "/login" };
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      beforeEnter: authGuard,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      beforeEnter: guestGuard,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      beforeEnter: guestGuard,
    },
    {
      path: "/community",
      name: "community",
      component: () => import("../views/Community.vue"),
      beforeEnter: authGuard,
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/Profile.vue"),
      beforeEnter: authGuard,
    },
  ],
});

export default router;
