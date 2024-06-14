import axios from "@/axios/axios";


export default class DashBoardManagementService {
  getDashBoardData(){
    return axios.get('/dashboarData/cardCount');
  }
  getDashBoardDataSummaryData(tab){
    return axios.get(`/dashboarData/summaryData/${tab}`);
  }
  getDashBoardDataTrendingOrders(tab){
    return axios.get(`/dashboarData/trendingData/${tab}`);
  }
  getDashBoardCustomerMapData(tab){
    return axios.get(`/dashboarData/customerMapData/${tab}`);
  }
  getDashBoardRevenueData(tab){
    return axios.get(`/dashboarData/revenueData/${tab}`);
  }
}
