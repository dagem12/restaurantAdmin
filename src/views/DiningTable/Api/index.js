import axios from '../../../axios/axios';
import buildPaginationQueryOpts from '@/utils/sorts';

const baseApiUrl = '/dining-tables';

class DiningTableService {
  find(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/${id}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  retrieve(paginationQuery) {
    return new Promise((resolve, reject) => {
      axios
        .get(baseApiUrl + `?${buildPaginationQueryOpts(paginationQuery)}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  retrieveFilter(paginationQuery,reqFilter) {
    const filterKey = Object.keys(reqFilter)[0]; 
    const filterValue = reqFilter[filterKey]; 
    return axios.get(`/dining-tablesFilter?${buildPaginationQueryOpts(paginationQuery)}&${filterKey}=${filterValue}`);
  }

  searchDine(name) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/diningTable` + `?name=${name}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${baseApiUrl}/${id}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  create(entity) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseApiUrl}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  update(entity) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/${entity.id}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  partialUpdate(entity) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`${baseApiUrl}/${entity.id}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

export default DiningTableService;
