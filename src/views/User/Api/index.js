import axios from "@/axios/axios";
import buildPaginationQueryOpts from "../../../utils/sorts";

export default class UserManagementService {
  get(userId) {
    return axios.get(`/admin/users/${userId}`);
  }

  // create(user) {
  //   return axios.post("/admin/users", user);
  // }
  


  create(entity) {
    return new Promise((resolve, reject) => {
      fetch('api/admin/users', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jhi-authenticationToken'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entity)
      })
      .then(response => {
        if (response.ok) {
          return response.json().then(data => resolve(data));
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
  

  

  update(user) {
    return axios.put("/admin/users", user);
  }
  searchUser(name) {
    return axios.get(`/admin/user?name=${name}`);
  }
  remove(userId) {
    return axios.delete(`/admin/users/${userId}`);
  }

  retrieve(req) {
    return axios.get(`/admin/users?${buildPaginationQueryOpts(req)}`);
  }
  retrieveFilter(paginationQuery,reqFilter) {
    const filterKey = Object.keys(reqFilter)[0]; 
    const filterValue = reqFilter[filterKey]; 
    return axios.get(`/admin/usersFilter?${buildPaginationQueryOpts(paginationQuery)}&${filterKey}=${filterValue}`);
  }


  retrieveAuthorities() {
    return axios.get("/authorities");
  }
}
