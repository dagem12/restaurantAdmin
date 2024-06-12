import Vue from 'vue'
import Vuex from 'vuex'
import {accountStore} from './modules/user'
import  errors  from './modules/error'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    accountStore,
    errors
  }
})
