import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import store from '../store/index'



Vue.use(VueRouter)

// fix vue-router NavigationDuplicated
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return VueRouterPush.call(this, location).catch(err => err)
}
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return VueRouterReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  linkExactActiveClass: "nav-item active",
})




router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  console.log("Require Auth",requiresAuth)
  console.log("Require Auth",store.getters.authenticated)
  if (requiresAuth && ! store.getters.authenticated) {
    next("/login");
  } else if (
    (to.path === "/login" || to.path === "/register") &&
    store.getters.authenticated
  ) {
    next("/");
  } else {
    next();
  }

  // next()
})



router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router
