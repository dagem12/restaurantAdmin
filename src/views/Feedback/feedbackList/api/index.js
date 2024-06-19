import axios from '@/axios/axios';

import buildPaginationQueryOpts from '@/utils/sorts';

const baseApiUrl = '/feed-backs';

export default class FeedBackService {
  constructor() {

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

}