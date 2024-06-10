import axios from 'axios'
import store from '@/store'

  
const request = axios.create({
  baseURL: 'api/', 
  headers: {
   
  },
    timeout: 120000,
  withCredentials: true,
})

let isRefreshing = false;
let refreshSubscribers = [];

 

request.interceptors.request.use(
  config => {
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem("jhi-authenticationToken");

    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


  
const handleError = async(error) => {
  // Handle response errors here
  if (error.response) {
    if (error.response.status === 404) {
      store.dispatch("errors/addError", error.response.data.message).then(response => {
       console.log(store.state.errors.error);
       },
       (error) => {
      console.log("error",error)
       
     });
     return Promise.resolve();
    } else if (error.response.status === 500) {

     
     return Promise.resolve();
    } else if (error.response.status === 401 || error.response.status===403 ){
     
      return Promise.resolve();
    }else{
     
      return Promise.resolve();
    }
  } else {
    // Handle network or other errors

    return Promise.resolve();
  }
  
  // Pass the error along
  return Promise.reject(error);
};
 

request.interceptors.response.use(
  response => {

    // let res = response.data;
   
    // if (response.config.responseType === 'blob') {
    //   return res
    // }
    
    // // if (typeof res === 'string') {
    // //   res = res ? JSON.parse(res) : res
    // // }
    return response;
  },
  error => handleError(error)
)
 
 
export default request