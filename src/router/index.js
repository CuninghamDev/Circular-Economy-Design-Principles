import Vue from "vue";
import VueRouter from "vue-router";
import goTo from "vuetify/lib/services/goto";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Home.vue")
  },

  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/About.vue")
  },
  {
    path: "/discover",
    name: "Discover",
    component: () => import("../views/Diagram.vue")
  },
  {
    path: "/evaluation",
    name: "Evaluation",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Circular-Evaluation.vue")
  },
  {
    path: "/resources",
    name: "Resources",
    component: () => import("../views/Resources.vue")
  },
  {
    path: "/suggest-resource",
    name: "Suggest Resource",
    component: () => import("../views/SuggestResource.vue")
  }
];

const router = new VueRouter({
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0;

    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      scrollTo = savedPosition.y;
    }

    return goTo(scrollTo);
  }
});

export default router;
