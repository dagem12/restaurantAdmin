import axios from '@/axios/axios';
import store from '../../../store';


export default class AccountService {
  constructor( translationService, router) {
  
    this.translationService = translationService;
    this.router = router;
    this.init();
  }

  init() {
    this.retrieveProfiles();
  }

  retrieveProfiles() {
    return new Promise((resolve) => {
      axios
        .get('management/info')
        .then((res) => {
          if (res.data && res.data.activeProfiles) {
           store.commit('setRibbonOnProfiles', res.data['display-ribbon-on-profiles']);
           store.commit('setActiveProfiles', res.data['activeProfiles']);
          }
          resolve(true);
        })
        .catch(() => resolve(false));
    });
  }

  retrieveAccount() {
    return new Promise((resolve) => {
      axios
        .get('/account')
        .then((response) => {
         store.commit('authenticate');
         
          const account = response.data;
          console.log("response",response)
          if (account !=null) {
           store.commit('authenticated', account);
           console.log("data inside account",  store.getters)
            if (this.store.getters.currentLanguage !== account.langKey) {
             store.commit('currentLanguage', account.langKey);
            }
            if (sessionStorage.getItem('requested-url')) {
              this.router.replace(sessionStorage.getItem('requested-url'));
              sessionStorage.removeItem('requested-url');
            }
          } else {
            console.log("Logout")
          //  store.commit('logout');
            if (this.router.currentRoute.path !== '/') {
              this.router.push('/');
            }
            sessionStorage.removeItem('requested-url');
          }
        
          resolve(true);
        })
        .catch(() => {
          console.log("Logout")
          store.commit('logout');
          resolve(false);
        });
    });
  }

  retrieveUser() {
    return new Promise((resolve) => {
      axios
        .get('/account')
        .then((response) => {
         store.commit('authenticate');
          const account = response.data;
         
          if (account) {
           store.commit('authenticated', account);
            if (this.store.getters.currentLanguage !== account.langKey) {
             store.commit('currentLanguage', account.langKey);
            }
            if (sessionStorage.getItem('requested-url')) {
              this.router.replace(sessionStorage.getItem('requested-url'));
              sessionStorage.removeItem('requested-url');
            }
          } else {
           store.commit('logout');
            if (this.router.currentRoute.path !== '/') {
              this.router.push('/');
            }
            sessionStorage.removeItem('requested-url');
          }
          
          
          resolve(account);
        })
        .catch(() => {
         store.commit('logout');
          resolve(null);
        });
    });
  }

  hasAnyAuthorityAndCheckAuth(authorities) {
    if (typeof authorities === 'string') {
      authorities = [authorities];
    }

    if (!this.authenticated || !this.userAuthorities) {
      const token = localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken');
      if (!this.store.getters.account && !this.store.getters.logon && token) {
        return this.retrieveAccount().then((resp) => {
          if (resp) {
            return this.checkAuthorities(authorities);
          }
          return Promise.resolve(false);
        });
      }
      return Promise.resolve(false);
    }

    return this.checkAuthorities(authorities);
  }

  get authenticated() {
    returnstore.getters.authenticated;
  }

  get userAuthorities() {
    returnstore.getters.account?.authorities;
  }

  checkAuthorities(authorities) {
    if (this.userAuthorities) {
      for (const authority of authorities) {
        if (this.userAuthorities.includes(authority)) {
          return Promise.resolve(true);
        }
      }
    }
    return Promise.resolve(false);
  }
  
}