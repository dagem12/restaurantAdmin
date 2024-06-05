import axios from "axios";
import buildPaginationQueryOpts from "../../../../utils/sorts";

const baseApiUrl = "api/products";

export default class ProductService {
    constructor() {
        this.api = axios.create({
            baseURL: baseApiUrl
        });
    };


    find(id) {
        return this.api.get(`/${id}`).then(res => res.data);
    }

    retrieve(paginationQuery) {
        return this.api.get(`?${buildPaginationQueryOpts(paginationQuery)}`).then(res => res.data);
    }

    delete(id) {
        return this.api.delete(`/${id}`).then(res => res.data);
    }

    create(entity) {
        return this.api.post('', entity).then(res => res.data);
    }

    update(entity) {
        return this.api.put(`/${entity.id}`, entity).then(res => res.data);
    }

    partialUpdate(entity) {
        return this.api.patch(`/${entity.id}`, entity).then(res => res.data);
    }
}
