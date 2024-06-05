import axios from "axios";
import buildPaginationQueryOpts from "../../../utils/sorts";

export default class UserManagementService {
  get(userId) {
    return axios.get(`api/admin/users/${userId}`);
  }

  create(user) {
    return axios.post("api/admin/users", user);
  }

  update(user) {
    return axios.put("api/admin/users", user);
  }

  remove(userId) {
    return axios.delete(`api/admin/users/${userId}`);
  }

  retrieve(req) {
    return axios.get(`api/admin/users?${buildPaginationQueryOpts(req)}`);
  }

  retrieveAuthorities() {
    return axios.get("api/authorities");
  }
}
