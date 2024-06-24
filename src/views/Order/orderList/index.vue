<template>
  <div class="content">
    <div class="md-layout" ref="box">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="" class="header-with-button">
            <div>
              <h4 class="title">Orders</h4>
              <p class="category">
                Explore and manage your restaurant's orders
              </p>
            </div>
            <div style="display: flex;justify-content: space-between;" class="sortHolder">
              <div class="filter-container" style="display: flex;" >
                <div style="margin:auto;" @click="clearFilter">
                  <md-icon label="Filter" style="color:white !important">close</md-icon>
                </div>
                <q-select  v-model="filter"  :options="filterModel" label="Filter By" @input="handleFilterSelection"  style="color:white !important;width:150px;"  class="custom-select">
                  <template v-slot:prepend>
                    <q-icon  style="color:white !important" name="filter" />
                  </template>
                </q-select>
              </div>
            
                <div class="sort-container">
                <q-select  style="color:white !important;width:150px" v-model="selectedSort"  :options="sortModel" label="Sort By" @input="handleSortSelection" class="custom-select">
                  <template v-slot:prepend>
                    <q-icon  style="color:white !important" name="sort" />
                  </template>
                </q-select>
              </div>
              <div class="search-container">
                <div v-show="showSearchInput" style="padding: 10px;" @click="clear2">
                  <md-icon label="Search" style="color:white !important">close</md-icon>
                </div>
                <q-input v-model="searchKeyword" v-show="showSearchInput" @keyup.enter="performSearch"
                  placeholder="Enter search keyword" class="custom-input"></q-input>
                <div style="padding: 10px;" @click="toggleSearch">
                  <md-icon label="Search" style="color:white !important">search</md-icon>
                </div>

                <!-- <q-btn @click="toggleSearch" label="Search" color="primary"></q-btn> -->
              </div>
              <!-- Add Item button -->
              <div class="add-item-button">
                <!-- <md-button color="primary" @click="this.addItem">
                <md-icon>add</md-icon>
                <span>Add Item</span>
              </md-button> -->
              </div>
            </div>
          </md-card-header>
          <md-card-content>
            <dynamic-table table-header-color="red" :columns="columns" :data-items="productOrders" :actions="actions" />
              <q-pagination style="display: flex;justify-content: center;"  v-if="productOrders.length > 0" v-model="page" :max="totalPages"
                @input="onPageChange"  direction-links flat color="grey" active-color="primary" />
          </md-card-content>
          <div v-if="productOrders.length == 0">
            <md-empty-state md-rounded md-icon="description" md-label="Not Found !" md-description="No record founded">
            </md-empty-state>
          </div>
        </md-card>
      </div>
    </div>
  </div>
</template>
<script>
import DynamicTable from "../../../components/Tables/DynamicTable.vue";
import ProductOrderService from "./Api/index";
import { Notify } from 'quasar';
import { gsap } from 'gsap';
import { TRUE } from "sass";
export default {
  name: "orderList",
  components: {
    DynamicTable,
  },
  data() {
    return {
      current: 1,
      showSearchInput: false,
      searchKeyword: '',
      columns: [
        { label: "Code", field: "code", isRelation: false },
        { label: "Status", field: "status", isRelation: true },
        { label: "Total Price", field: "payment", isRelationPO: true },
        { label: "Additional Note", field: "addtionalNote" },
        { label: "Payment Status", field: "payment",isRelationPOP: true  },
        { label: "CreateBy", field: "createBy" },
        { label: "CreateTime", field: "createTime", isRelation: false, isCreateTime: true },
        { label: "DiningTable", field: "diningTable", isRelation: true },
      ],
      sortModel: [
  
        'createTime',
        'createBy',
        'status',
        'name'

        
      ],
      filter:null,
      filterModel: [
      {
          label: 'Open Orders',
          colmun:`statusId.equals`,
          value:7001
        },
        {
          label: 'Preparing Orders',
          colmun:`statusId.equals`,
          value:7002
        },
        {
          label: 'Deliverd Orders',
          colmun:`statusId.equals`,
          value:7003 
        },
        {
          label: 'Paid Orders',
          colmun:`statusId.equals`,
          value:7004 
        },
        {
          label: 'Cancelled Orders',
          colmun:`statusId.equals`,
          value:7005 
        },
      ],
      selectedSort:'',
      dataItems: [
        {
          name: "Bureger",
          code: "ASSD$#",
          id: "1",
          status: "completed",
          createTime: "22-10-2024",
          shop: "Et Shop",
          diningTable: "1",
        },
        {
          name: "Pizza",
          code: "ASSD$#",
          id: "2",
          status: "completed",
          createTime: "22-10-2024",
          shop: "Et Shop",
          diningTable: "2",
        },
      ],
      actions: [
        {
          label: "View",
          method: this.viewItem,
          icon: "visibility",
          color: "primary",
        },
        {
          label: "Edit",
          label2: "Update Status",
          label2Options: ['Open', 'Preparing', 'Delivered', 'Paid', 'Cancelled'],
          method: this.editItem,
          methodOptions: this.updateStatus,
          loadingS: false,
          specificItem: null,
          icon: "edit",
          color: "blue",
        },
        // {
        //   label: "Delete",
        //   method: this.deleteItem,
        //   icon: "delete",
        //   color: "red",
        // },
      ],
      productOrderService: new ProductOrderService(),

      removeId: null,
      itemsPerPage: 20,
      queryCount: null,
      page: 1,
      previousPage: 1,
      propOrder: 'createTime',
      reverse: true,
      totalItems: 0,
      productOrders: [],
      isFetching: false,
      loadingStatus: false
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    }
  },
  mounted() {
    this.retrieveAllProductOrders();
    const box = this.$refs.box;

    // Using GSAP to animate the row
    gsap.from(box, { duration: 0.5, opacity: 0, y: 1000, ease: "power1.out" });
  },
  methods: {
    handleFilterSelection(value){
      const key = value?.colmun; 
      const val = value?.value; 
   

      const reqFilter = {
          [key]: val
      };
   
      const paginationQuery = {
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
  
      };

         this.productOrderService.retrieveFilter(paginationQuery,reqFilter).then(res => {

            if (res.data.length == 0) {
              this.notifyNotfound("Not Found");
            }
            // Clear the users array
            this.productOrders = [];
            // Assign the new data to the users array
            this.productOrders = [...res.data];
            }).catch(err => {
            console.log(err)
            })
     
    },
    clearFilter() {
      this.filter = null;
      this.retrieveAllProductOrders();
    },
    onPageChange(page) {
      console.log(`Page changed to: ${page}`);
      if (page !== this.previousPage) {
        this.previousPage = page;
        this.page = page;
        this.transition(); // Ensure this method is defined and works as expected
      }
    },
     handleSortSelection(value) {
      console.log('Selected sort option:', value);
      this.changeOrder(value);
      // Implement your logic based on the selected value (e.g., update sorting order)
    },
    toggleSearch() {
      this.showSearchInput = !this.showSearchInput;
      if (this.showSearchInput) {
        this.$nextTick(() => this.$refs.searchInput.focus());
      }
    },
    clear2() {
      this.searchKeyword = '';
      this.retrieveAllProductOrders();
    },
    performSearch() {
      // Your search logic here
      console.log('Search performed:', this.searchKeyword);
      this.productOrderService.searchOrder(this.searchKeyword).then(res => {
        if (res.length == 0) {
          this.notifyNotfound("Not Found");
        }


        // Clear the po array
        console.log("am IN", this.productOrders);
        this.productOrders = [];
        // Assign the new data to the po array
        this.productOrders = [...res];
        console.log("haha in", this.productOrders);
      }).catch(err => {

        console.log(err)
      })
    }
    ,
    notifySuccess(message) {
      Notify.create({

        message: message,
        timeout: 3000,
        position: 'center',
        color: 'green'
      });
    },
    notifyNotfound(message) {
      Notify.create({

        message: message,
        timeout: 3000,
        position: 'center',
        color: 'blue'
      });
    },

    notifyError(message) {
      Notify.create({

        message: message,
        timeout: 3000,
        position: 'center',
        color: 'red'
      });
    },
    clear() {
      this.page = 1;
      this.retrieveAllProductOrders();
    },
    retrieveAllProductOrders() {
      this.isFetching = true;
      const paginationQuery = {
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      };
      this.productOrderService
        .retrieve(paginationQuery)
        .then(res => {
          this.productOrders = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        })
        .catch(err => {
          this.isFetching = false;

        });
    },
    handleSyncList() {
      this.clear();
    },
    prepareRemove(instance) {
      this.removeId = instance.id;
      if (this.$refs.removeEntity) {
        this.$refs.removeEntity.show();
      }
    },
    removeProductOrder() {
      this.productOrderService
        .delete(this.removeId)
        .then(() => {
          const message = this.$t('anywhereApp.productOrder.deleted', {
            param: this.removeId
          });
          this.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'danger',
            solid: true,
            autoHideDelay: 5000
          });
          this.removeId = null;
          this.retrieveAllProductOrders();
          this.closeDialog();
        })
        .catch(error => {

        });
    },
    sort() {
      const result = [this.propOrder + ',' + (this.reverse ? 'desc' : 'asc')];
      if (this.propOrder !== 'id') {
        result.push('id');
      }
      return result;
    },
    
    transition() {
      this.retrieveAllProductOrders();
    },
    changeOrder(propOrder) {
      this.propOrder = propOrder;
      // this.reverse = !this.reverse;
      this.transition();
    },
    closeDialog() {
      this.$refs.removeEntity.hide();
    },
    editItem(item) {
      console.log("Editing item:", item);
    },
    deleteItem(item) {
      console.log("Deleting item:", item);
    },
    viewItem(item) {
      console.log("Viewing item:", item);
      this.$router.push({ name: 'Order Detail', params: { orderId: item.id } });
    },
    addItem() {
      console.log("Adding new item");
      // Add your logic here to handle adding a new item
    },
    updateStatus(option, item) {

      let statuscode = '';
      if (option == 'Preparing') {
        statuscode = 7002
      } else if (option == 'Delivered') {
        statuscode = 7003
      } else if (option == 'Open') {
        statuscode = 7001
      } else if (option == 'Paid') {
        statuscode = 7004
      } else if (option == 'Cancelled') {
        statuscode = 7005
      }

      this.actions[1].loadingS = true;
      this.actions[1].specificItem = item;

      this.productOrderService.changeOrderStatus(item.id, statuscode).then((res) => {

        this.actions[1].loadingS = false;
        this.notifySuccess(`Order Status Changed To ${option} successfully`);
        this.retrieveAllProductOrders();
      }).catch(err => {
        console.log(err)
        this.actions[1].loadingS = false;
        this.notifyError('Error Occured')

      })


    }
  }
};
</script>
<style scoped>
.table {
  padding: 1%;
}
@media (max-width: 768px) {
  .sortHolder {
    flex-direction: column !important; /* Stack items vertically */
    align-items: flex-end; /* Align items to the start of the flex container */
  
    justify-content: end;

  }
  .category{
    display: none;
  }
  .title{
   font-size: large !important;
  }
}
.search-container {
  display: flex;
  justify-content: flex-end;
  align-items: end;
  text-align: end;
}

::v-deep .md-card-header {
  justify-content: space-between;
}

.custom-input .q-field__native {
  color: white !important;
}

.md-card-header {
  background-color: #5335AB !important;
}



.custom-select {
  width: 150px;
  color: white !important;
  --q-select--text-color: white;
  --q-select--label-color: white;
  --q-select--background-color: transparent;
  --q-select--focus-border-color: white;
}

.custom-select .q-field__native {
  color: white !important;
}

.custom-select .q-field__control-container .q-field__control {
  color: white !important;
}

.custom-select .q-field__label {
  color: white !important;
}

.custom-icon {
  color: white !important;
}
</style>
