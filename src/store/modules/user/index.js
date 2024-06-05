import { Module } from 'vuex';

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
      console.log("authenticate",state)
      state.logon = true;
    },
    authenticated(state, identity) {
      state.userIdentity = identity;
      state.authenticated = true;
      state.logon = false;
    },
    logout(state) {
      console.log("logout",state)
      // state.userIdentity = null;
      // state.authenticated = false;
      // state.logon = false;
    },
    setActiveProfiles(state, profile) {
      console.log("setActiveProfiles",state)
      state.activeProfiles = profile;
    },
    setRibbonOnProfiles(state, ribbon) {
      console.log("setRibbonOnProfiles",state)
      state.ribbonOnProfiles = ribbon;
    },
  },
};
