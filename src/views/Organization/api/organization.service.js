import axios from '../../../axios/axios';
import buildPaginationQueryOpts from '@/utils/sorts';


export default class OrganizationService {
  constructor() {

  }
  find(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/organizations/${id}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  retrieve(paginationQuery) {
    return new Promise((resolve, reject) => {
      // console.log("out side service")
      axios
        .get(`/organizations?${buildPaginationQueryOpts(paginationQuery)}`)
        .then((res) => {
          // console.log("res ", res)
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  
  retrieveFilter(paginationQuery,reqFilter) {
    const filterKey = Object.keys(reqFilter)[0]; 
    const filterValue = reqFilter[filterKey]; 
    return axios.get(`/organizationsFilter?${buildPaginationQueryOpts(paginationQuery)}&${filterKey}=${filterValue}`);
  }

  searchOrg(name) {
    return new Promise((resolve, reject) => {

      axios
        .get(`/organization?name=${name}`)
        .then((res) => {
          // console.log("res ", res)
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/organizations/${id}`)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  create(entity) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/organizations`, entity)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  update(entity) {
    return new Promise((resolve, reject) => {
      axios
        .put(`/organizations/${entity.id}`, entity)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  partialUpdate(entity) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`/organizations/${entity.id}`, entity)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
