<template>
  <div class="card">
    <div class="card-header border-0 pb-0 d-sm-flex d-block">
      <div>
        <h4 class="card-title mb-1">{{ title }}</h4>
        <small class="mb-0">{{ description }}</small>
      </div>
      <div class="card-action card-tabs mt-3 mt-sm-0">
        <q-tabs
          v-model="activeTab"
          class="q-tabs-card"
          dense
          align="left"
          indicator-color="primary"
          active-color="primary"
        >
          <q-tab
            v-for="tab in tabs"
            :key="tab.id"
            :label="tab.label"
            :name="tab.id"
            :active-class="'text-primary'"
               @click="handleTabChange(tab)"
              :disable="activeTab !== tab.id && tabLoading"
          />
        </q-tabs>
      </div>
    </div>
    <div class="card-body tab-content">
       <template v-if="tabLoading">
        <div  class="skeleton-loader">
          <div v-for="n in 5" :key="n" class="media mb-4 items-list-2">
            <div class="skeleton-image mr-3" style="width: 85px; height: 85px; background: #e0e0e0;"></div>
            <div class="media-body col-6 px-0">
              <div class="skeleton-title mb-1" style="height: 20px; background: #e0e0e0;"></div>
              <div class="skeleton-category mb-3" style="height: 14px; background: #e0e0e0; width: 50%;"></div>
              <div class="skeleton-text" style="height: 14px; background: #e0e0e0; width: 70%;"></div>
              <div class="skeleton-text" style="height: 14px; background: #e0e0e0; width: 40%;"></div>
            </div>
            <div class="media-footer align-self-center ml-auto d-block align-items-center d-sm-flex">
              <div class="skeleton-price" style="height: 24px; background: #e0e0e0; width: 50px;"></div>
            </div>
          </div>
        </div>
       </template>
       <template  v-else >
                      <md-empty-state v-if="trendingData.length === 0"
    
    md-icon="access_time"
    md-label="No Data Found"
    md-description="Currently, there is no data please check again after a while.">
  </md-empty-state>
          <div v-else
            v-for="item in trendingData"
            :key="item.id"
            class="media mb-4 items-list-2"
          >
            <img :src="item.imageUrl" class="img-fluid rounded mr-3" :alt="item.title" width="75" @error="handleImageError">
            <div class="media-body col-6 px-0">
              <h5 class="mt-0 mb-1 text-black">{{ item.title }}</h5>
              <small class="text-primary font-w500 mb-3">{{ item.category }}</small>
              <ul class="fs-14 list-inline">
                <li class="mr-3">{{ item.serving }}</li>
                <li>{{ item.preparationTime }} min</li>
              </ul>
            </div>
            <div class="media-footer align-self-center ml-auto d-block align-items-center d-sm-flex">
              <h3 class="mb-0 font-w600 text-secondary">{{ item.price }}</h3>
            </div>
          </div>
       </template>
      
    </div>
  </div>
</template>

<script>
import { Notify } from 'quasar';

import DashBoardManagementService from '../../../pages/Api/index'
export default {
  name: "MostSell",
  components:{
  
  },
  props: {
    title: String,
    description: String,
  },
  data() {
    return {
      activeTab: 'daily',
      tabLoading:false,
      data: {
        monthly: [],
        weekly: [],
        daily: []
      },
      tabs: [
        { id: 'monthly', label: 'Monthly' },
        { id: 'weekly', label: 'Weekly' },
        { id: 'daily', label: 'Daily' }
      ],
      loading: false,
      trendingData:[],
      API: new DashBoardManagementService(),
    };
  },
  computed: {
    tabData() {
      return this.data[this.activeTab];
    }
  },

  mounted() {
    this.trendingDataFetch(this.activeTab)
  },
  methods: {
    handleImageError(event) {
    event.target.src = 'https://via.placeholder.com/70';
  },
    notifySuccess(message) {
      Notify.create({
        message: message,
        timeout: 3000,
        position: 'center',
        color: 'green'
      });
    },

    notifyError(message) {
      Notify.create({
        message: message,
        timeout: 3000,
        position: 'center',
        color: 'red'
      });}
      ,
    isActiveTab(tabId) {
      return this.activeTab === tabId;
    },
    trendingDataFetch(tab){
      this.tabLoading=true
    this.API.getDashBoardDataTrendingOrders(tab).then( res =>{
        //  console.log(res)
      this.trendingData = res.data.trendingData.topProducts.map((product, index) => ({
                id: index + 1,
                imageUrl:'/api/images/'+ product.imageUrl || 'https://via.placeholder.com/70',
                title: product.name,
                category: product.category,
                serving: `${product.count} servings`,
                preparationTime: product.preparationTime || 30,
                price: `Br ${(product.amount).toFixed(2)}`  
            }));
            this.tabLoading = false;
          // console.log("trending data" , this.trendingData)
    }).catch(err =>{
     this.notifyError('Error Occured Please Contact System Administrator')
     this.tabLoading = false;
    })
    },
    handleTabChange(tab) {
  this.tabLoading=true
  this.activeTab = tab.id; // Set active tab
  this.tabs.forEach(t => {
    if (t.id !== tab.id) {
      t.disabled = true;
    }
  });

  this.trendingDataFetch(tab.id)
 
},
  },
};
</script>

  <style scoped>
  .skeleton-loader {
  display: flex;
  flex-direction: column;
}

.skeleton-image,
.skeleton-title,
.skeleton-category,
.skeleton-text,
.skeleton-price {
  background: #e0e0e0;
  margin-bottom: 8px;
}

.skeleton-image {
  width: 85px;
  height: 85px;
}

.skeleton-title {
  height: 20px;
}

.skeleton-category {
  height: 14px;
  width: 50%;
}

.skeleton-text {
  height: 14px;
}

.skeleton-price {
  height: 24px;
  width: 50px;
}
  .card {
    margin-bottom: 1.875rem;
    background-color: #fff;
    transition: all 0.5s ease-in-out;
    position: relative;
    border: 0px solid transparent;
    border-radius: 20px;
    box-shadow: 0px 12px 23px 0px rgba(62, 73, 84, 0.04);
    height: calc(100% - 30px);
  }
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.75rem;
  }
  .card-header:first-child {
    border-radius: calc(0.75rem - 1px) calc(0.75rem - 1px) 0 0;
  }
  .card-header {
    border-color: #f0f1f5;
    position: relative;
    background: transparent;
    padding: 12px  1.875rem 1.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .pb-0,
  .py-0 {
    padding-bottom: 0 !important;
  }
  .d-block {
    display: block !important;
  }
  @media (min-width: 576px) {
    .d-sm-flex {
      display: flex !important;
    }
  }
  
  .border-0 {
    border: 0 !important;
  }
  .card-header {
    padding: 0.75rem 1.25rem;
    margin-bottom: 0;
    background-color: rgba(0, 0, 0, 0.03);
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  }
  
  .card-body {
    padding: 1.875rem;
  }
  .card-body {
    flex: 1 1 auto;
    padding: 1.25rem;
  }
  
  .card-header .card-title {
    margin-bottom: 0px;
  }
  .card-title {
    font-size: 20px;
    font-weight: 500;
    color: #000;
    text-transform: capitalize;
  }
  .mb-1,
  .my-1 {
    margin-bottom: 0.25rem !important;
  }
  .card-title {
    margin-bottom: 0.75rem;
  }
  h4,
  .h4 {
    font-size: 1.125rem;
  }
  .mb-0,
  .my-0 {
    margin-bottom: 0 !important;
  }
  small,
  .small {
    font-size: 80%;
    font-weight: 400;
  }
  small {
    font-size: 80%;
  }
  
  @media (min-width: 576px) {
    .mt-sm-0,
    .my-sm-0 {
      margin-top: 0 !important;
    }
  }
  .mt-3,
  .my-3 {
    margin-top: 1rem !important;
  }
  
  .mb-4,
  .my-4 {
    margin-bottom: 1.5rem !important;
  }
  .media {
    display: flex;
    align-items: flex-start;
  }
  
  .media img {
    border-radius: 3px;
  }
  .rounded {
    border-radius: 0.375rem !important;
  }
  .mr-3,
  .mx-3 {
    margin-right: 1rem !important;
  }
  .rounded {
    border-radius: 0.75rem !important;
  }
  .img-fluid {
    max-width: 100%;
    height: 75px;
  }
  img {
    vertical-align: middle;
    border-style: none;
  }
  
  .pl-0,
  .px-0 {
    padding-left: 0 !important;
  }
  .pr-0,
  .px-0 {
    padding-right: 0 !important;
  }
  .media-body {
    flex: 1;
  }
  .col-6 {
    flex: 0 0 50%;
    max-width: 50%;
  }
  
  .text-black {
    color: #000 !important;
  }
  .mb-1,
  .my-1 {
    margin-bottom: 0.25rem !important;
  }
  .mt-0,
  .my-0 {
    margin-top: 0 !important;
  }
  h5,
  .h5 {
    font-size: 1rem;
  }
  .font-w500 {
    font-weight: 500;
  }
  .text-primary {
    color: #2f4cdd !important;
  }
  .mb-3,
  .my-3 {
    margin-bottom: 1rem !important;
  }
  small,
  .small {
    font-size: 80%;
    font-weight: 400;
  }
  small {
    font-size: 80%;
  }
  .text-secondary {
    color: #3e4954 !important;
  }
  .mr-2,
  .mx-2 {
    margin-right: 0.5rem !important;
  }
  .fs-14 {
    font-size: 14px !important;
    line-height: 1.5;
  }
  .list-inline {
    padding-left: 0;
    list-style: none;
  }
  ul {
    padding: 0;
    margin: 0;
  }
  
  .list-inline li {
    display: inline-block;
  }
  .mr-3,
  .mx-3 {
    margin-right: 1rem !important;
  }
  li {
    list-style: none;
  }
  .list-inline li {
    display: inline-block;
  }
  li {
    list-style: none;
  }
  .ml-auto,
  .mx-auto {
    margin-left: auto !important;
  }
  .align-self-center {
    align-self: center !important;
  }
  .align-items-center {
    align-items: center !important;
  }
  .font-w600 {
    font-weight: 600;
  }
  .text-secondary {
    color: #3e4954 !important;
  }
  .mb-0,
  .my-0 {
    margin-bottom: 0 !important;
  }
  h3,
  .h3 {
    font-size: 1.5rem;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  .h1,
  .h2,
  .h3,
  .h4,
  .h5,
  .h6 {
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
    color: #3d4465;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  .card-tabs .nav-tabs {
    border-bottom: 0px;
    background: #f4f6fd;
    padding: 5px;
    border-radius: 6px;
  }
  .nav-tabs {
    border-bottom: 1px solid #dee2e6;
  }
  .nav {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
  }
  ul {
    padding: 0;
    margin: 0;
  }
  .nav-tabs .nav-item {
    margin-bottom: -1px;
  }
  li {
    list-style: none;
  }
  .card-tabs .nav-tabs .nav-link.active {
    background: #fff;
    color: #000000;
  }
  .card-tabs .nav-tabs .nav-link {
    border-radius: 6px;
    padding: 8px 12px;
    font-weight: 500;
    font-size: 14px;
    border: 0;
  }
  .nav-tabs .nav-link.active,
  .nav-tabs .nav-item.show .nav-link {
    color: #495057;
    background-color: #fbfbfb;
    border-color: #dee2e6 #dee2e6 #fbfbfb;
  }
  .nav-tabs .nav-link {
    border: 1px solid transparent;
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
  }
  a:hover,
  a:focus,
  a.active {
    text-decoration: none;
  }
  .nav-link {
    display: block;
    padding: 0.5rem 1rem;
  }
  a {
    color: #7e7e7e;
  }
  a {
    color: #2f4cdd;
    text-decoration: none;
    background-color: transparent;
  }
  
  .card-header:first-child {
    border-radius: calc(0.75rem - 1px) calc(0.75rem - 1px) 0 0;
  }
  .card-header {
    border-color: #f0f1f5;
    position: relative;
    background: transparent;
    padding: 12px  1.875rem 1.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .pb-0,
  .py-0 {
    padding-bottom: 0 !important;
  }
  </style>
  