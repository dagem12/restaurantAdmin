import axios from '@/axios/axios';

import buildPaginationQueryOpts from '@/utils/sorts';

const baseApiUrl = '/product-orders';

export default class ProductOrderService {
  constructor() {

  }
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

  totalOrders() {
    return new Promise((resolve, reject) => {
      axios
        .get(`/total-orders`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  searchOrder(name) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/product-order?name=${name}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }


  totalPayments() {
    return new Promise((resolve, reject) => {
      axios
        .get(`/total-payments`)
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
  retrieveFilter(filter) {
    return axios.get(`/product-orders?${filter}&sort=id,desc`);
  }

  topDish(paginationQuery) {
    return new Promise((resolve, reject) => {
      axios
        .get('/top-dish' + `?${buildPaginationQueryOpts(paginationQuery)}`)
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
  changeOrderStatus(id, statusId) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/product-order/complete/${id}`, statusId)
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

