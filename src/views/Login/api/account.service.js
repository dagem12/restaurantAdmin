import axios from '../../../axios/axios';
import store from '../../../store';
import router from '../../../routes';


export default class AccountService {
  constructor() {



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
          if (account != null) {
            store.commit('authenticated', account);
            // if (this.store.getters.currentLanguage !== account.langKey) {
            //  store.commit('currentLanguage', account.langKey);
            // }
            if (sessionStorage.getItem('requested-url')) {
              this.router.replace(sessionStorage.getItem('requested-url'));
              sessionStorage.removeItem('requested-url');
            } else {
              router.push('/');
            }
          } else {
            if (this.router.currentRoute.path !== '/') {
              router.push('/');
            }
            sessionStorage.removeItem('requested-url');
          }

          resolve(true);
        })
        .catch((err) => {
          // store.commit('logout');
          resolve(false);
        });
    });
  }
  forgetPassword(body){
    return axios({
      url:'/account/reset-password/init',
      method:'post',
      data:{"mail":body}
    })
  }

  resetPassword(body){
    return axios({
      url:'/account/reset-password/finish',
      method:'post',
      data:body
    })
  }
  //  changePassword(body) {
  //   return axios({
  //     url: '/account/change-password',
  //     method: 'post',
  //     data:body
  //   })
  // }
  changePassword(entity) {
    return new Promise((resolve, reject) => {
      fetch('api/account/change-password', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jhi-authenticationToken'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entity)
      })
      .then(response => {
        if (response.ok) {
          resolve(response)
        } else {
          return response.json().then(error => {
            reject(error.title);
          });
        }
      })
      .catch(err => {
        reject(new Error(`Network error: ${err.message}`));
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
          // console.log("userrr", resp)
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
    return store.getters.authenticated;
  }

  get userAuthorities() {
    // console.log("user dddddddddd", store.getters.account?.authorities)
    return store.getters.account?.authorities;
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

  hasAuthorities(authorities) {
    if (this.userAuthorities) {
      if (this.userAuthorities.includes(authorities)) {
        return true;
      }

    }
    return false;
  }

}