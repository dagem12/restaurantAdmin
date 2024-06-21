import axios from '../../../axios/axios';
import buildPaginationQueryOpts from '@/utils/sorts';
import buildFilterQuery from '@/utils/filter';


const baseApiUrl = '/shops';

export default class ShopService {
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

    retrieve(paginationQuery) {
        return new Promise((resolve, reject) => {
            axios
                .get(`/shops?${buildPaginationQueryOpts(paginationQuery)}`)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
    retrieveFilter(paginationQuery,reqFilter) {
        const filterKey = Object.keys(reqFilter)[0]; // Get the first key from reqFilter
        const filterValue = reqFilter[filterKey]; 
        return axios.get(`/shopsFilter?${buildPaginationQueryOpts(paginationQuery)}&${filterKey}=${filterValue}`);
      }
    searchShop(name) {
        return new Promise((resolve, reject) => {
            axios
                .get(`/shop?name=${name}`)
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