import Vue from "vue";
import VueRouter from "vue-router";
import Diagram from "../views/Diagram.vue";
import About from "../views/About.vue";
import Resources from "../views/Resources.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Diagram",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Diagram.vue")
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/resources",
    name: "Resources",
    component: () => import("../views/Resources.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
