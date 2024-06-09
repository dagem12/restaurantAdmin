import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store/index';
import routes from './routes';

Vue.use(VueRouter);

// Fix vue-router NavigationDuplicated
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return VueRouterPush.call(this, location).catch((err) => err);
};
const VueRouterReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return VueRouterReplace.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  routes,
  linkExactActiveClass: "nav-item active",
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !store.getters.authenticated) {
    if (store.getters.authenticated) {
      next();
    } else {
      next("/login");
    }
  } else if ((to.path === "/login" || to.path === "/register") && store.getters.authenticated) {
    next("/");
  } else {
    next();
  }
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router;
