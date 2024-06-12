import axios from "@/axios/axios";
import buildPaginationQueryOpts from "../../../utils/sorts";

export default class UserManagementService {
  get(userId) {
    return axios.get(`/admin/users/${userId}`);
  }

  create(user) {
    return axios.post("/admin/users", user);
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

  retrieveAuthorities() {
    return axios.get("/authorities");
  }
}
