import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);

export function createRouter() {
  return new VueRouter({
    mode: "history",
    routes: [
      {
        path: "/home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "/list",
        component: () => import("../views/List.vue"),
      },
    ],
  });
}
