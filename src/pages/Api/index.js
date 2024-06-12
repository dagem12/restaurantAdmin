import axios from "@/axios/axios";


export default class DashBoardManagementService {
  getDashBoardData(){
    return axios.get('/dashboarData/cardCount');
  }
}
