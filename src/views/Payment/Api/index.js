import axios from '../../../axios/axios';
import buildPaginationQueryOpts from '@/utils/sorts';


const baseApiUrl = '/payment-orders';

export default class WaiterCallService {
    constructor() {

    }
    // find(id) {
    //     return new Promise((resolve, reject) => {
    //         axios
    //             .get(`${baseApiUrl}/${id}`)
    //             .then(res => {
    //                 resolve(res.data);
    //             })
    //             .catch(err => {
    //                 reject(err);
    //             });
    //     });
    // }

    retrieve(paginationQuery) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${baseApiUrl}?${buildPaginationQueryOpts(paginationQuery)}`)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
    searchPayment(name) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${baseApiUrl}?name=${name}`)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

}