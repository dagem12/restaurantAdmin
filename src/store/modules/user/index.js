import { Module } from 'vuex';
import AccountService from '../../../views/Login/api/account.service';
const defaultAccountState = {
  logon: false,
  userIdentity: null,
  authenticated: false,
  ribbonOnProfiles: '',
  activeProfiles: '',
};

export const accountStore = {
  state: { ...defaultAccountState },
  getters: {
    logon: state => state.logon,
    account: state => state.userIdentity,
    authenticated: state => state.authenticated,
    activeProfiles: state => state.activeProfiles,
    ribbonOnProfiles: state => state.ribbonOnProfiles,
  },
  mutations: {
    authenticate(state) {
     
      state.logon = true;
    },
    authenticated(state, identity) {
      state.userIdentity = identity;
      state.authenticated = true;
      state.logon = false;
    },
    logout(state) {
      console.log("logout is not work")
      state.userIdentity = null;
      state.authenticated = false;
      state.logon = false;
     
    },
    setActiveProfiles(state, profile) {
      
      state.activeProfiles = profile;
    },
    setRibbonOnProfiles(state, ribbon) {
  
      state.ribbonOnProfiles = ribbon;
    },

    initializeApp() {
      const storedToken = localStorage.getItem('authenticationToken') || sessionStorage.getItem('authenticationToken');
      if (storedToken) {
        // Assuming you have an API endpoint to fetch user data based on the token
        new AccountService().retrieveAccount();
      }
    },
  

  },
};
