// =========================================================
// * Vue Material Dashboard - v1.5.2
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-dashboard
// * Copyright 2024 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/vue-material-dashboard/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";

// router setup
import router from "./routes/index";
import store from './store/index'

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";
import Quasar from "quasar";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/dist/quasar.min.css";
import AccountService from "./views/Login/api/account.service";

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// configure router

Vue.prototype.$Chartist = Chartist;

Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);
// Vue.use(Quasar, quasarUserOptions)
Vue.use(Quasar);


/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: (h) => h(App),
  store,
  router,
  data: {
    Chartist: Chartist,
  },

});
