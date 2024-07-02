<template>
  <div class="content">
    <div class="md-layout" ref="diningbox">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="" class="header-with-button">
            <div>
              <h4 class="title">Payments</h4>
              <p class="category"> manage your Payments</p>
            </div>
            <!-- Add Item button -->
            <div style="display: flex;justify-content: space-between;">
              <div class="sort-container">
                <q-select  v-model="selectedSort"  :options="sortModel" label="Sort By" @input="handleSortSelection"  style="color:white !important;width:150px;"  class="custom-select">
                  <template v-slot:prepend>
                    <q-icon  style="color:white !important" name="sort" />
                  </template>
                </q-select>
              </div>
              <!-- <div class="search-container">
                <div  v-show="showSearchInput" style="padding: 10px;" @click="clear2">
                  <md-icon label="Search" style="color:white !important">close</md-icon>
                </div>
                <q-input style="color:white !important" v-model="searchKeyword" v-show="showSearchInput" @keyup.enter="performSearch"
                  placeholder="Enter search keyword" class="custom-input"></q-input>
                <div style="padding: 10px;" @click="toggleSearch">
                  <md-icon label="Search" style="color:white !important">search</md-icon>
                </div>

              </div> -->
             
            </div>
          </md-card-header>
          <md-card-content>
            <dynamic-table table-header-color="red" :columns="columns" :data-items="payments" :actions="actions" />
            <q-pagination style="display: flex;justify-content: center;"  v-if="payments.length > 0" v-model="page" :max="totalPages" @input="onPageChange"
              direction-links flat color="grey" active-color="primary" />
          </md-card-content>
          <div v-if="payments.length == 0">
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

import PaymentService from '../Api/index';

import { gsap } from 'gsap';


export default {
  name: "shopList",
  components: {
    DynamicTable,
   
    },
     


  data() {
    return {
      current: 1,
      showSearchInput: false,
      searchKeyword: '',
      columns: [
  
        
          { label: "merchantCode", field: "merchantCode" },
          { label: "merchantId", field: "merchantId" },
             { label: "amount", field: "amount" },
              { label: "status", field: "status", isRelation:true },
        { label: "createTime", field: "createTime", isCreateTime: true   },
       
       
      ],
      sortModel: [
        'createTime',
        
      ],
      selectedSort:'',
      actions: [
      // {
      //     label: "Edit",
      //     label2: "Update Status",
      //     label2Options: ['Active', 'Inactive'],
      //     method: this.editItem,
      //     methodOptions: this.updateStatus,
      //     loadingS: false,
      //     specificItem: null,
      //     icon: "edit",
      //     color: "blue",
        //   },
      
        // {
        //   label: "Delete",
        //   method: this.deleteItem,
        //   icon: "edit",
        //   color: "blue",
        // }
      ],
      removeId: null,
      loading: false,
      itemsPerPage: 20,
      queryCount: null,
      page: 1,
      previousPage: 1,
      propOrder: 'createTime',
      reverse: true,
      totalItems: 0,
      payments: [],
      isFetching: false,
      paymentService: new PaymentService(),
      confirm: false,
      shop: {},
      searchWord: ''
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    }
  },
  mounted() {
    this.retrieveAllShops();
    const diningbox = this.$refs.diningbox;

    // Using GSAP to animate the row
    gsap.from(diningbox, { duration: 0.5, opacity: 0, y: 1000, ease: "power1.out" });
  },
  methods: {
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
    clear2() {
      this.searchKeyword = '';
      this.retrieveAllShops();
    },
    notifyNotfound(message) {
      Notify.create({

        message: message,
        timeout: 3000,
        position: 'center',
        color: 'blue'
      });
    },
    toggleSearch() {
      this.showSearchInput = !this.showSearchInput;
      if (this.showSearchInput) {
        this.$nextTick(() => this.$refs.searchInput.focus());
      }
    },
    performSearch() {
      // Your search logic here
      console.log('Search performed:', this.searchKeyword);
      this.paymentService.searchPayment(this.searchKeyword).then(res => {

        if (res.data.length == 0) {
          this.notifyNotfound("Not Found");
        }
        // Clear the users array
        this.payments = [];
        // Assign the new data to the users array
        this.payments = [...res.data];
      }).catch(err => {
        console.log(err)
      })
    }
    ,
   
    deleteItem(item) {
      this.prepareRemove(item);
    },
    generateQR(item) {

    },
    clear() {
      this.page = 1;
      this.retrieveAllShops();
    },
    retrieveAllShops() {
    //   console.log("data ", this.waiterCalls)
      this.isFetching = true;
      const paginationQuery = {
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      };

      this.paymentService.retrieve(paginationQuery)
        .then(
          res => {
            console.log(res)
            this.payments = res.data;
            this.totalItems = Number(res.headers['x-total-count']);
            this.queryCount = this.totalItems;
            this.isFetching = false;
            //console.log("data ", this.payments)
          },

        ).catch(err => {
          console.log(err)
          this.isFetching = false;

        });
     // console.log("data data")
    },
    handleSyncList() {
      this.clear();
    },
    prepareRemove(instance) {
      this.removeId = instance.id;

      if (this.removeId) {
        this.confirm = true;
      }
    },
   
    sort() {
      const result = [this.propOrder + ',' + (this.reverse ? 'desc' : 'asc')];
      if (this.propOrder !== 'id') {
        result.push('id');
      }
      return result;
    },
   
    transition() {
      this.retrieveAllShops();
    },
    changeOrder(propOrder) {
      this.propOrder = propOrder;
      // this.reverse = !this.reverse;
      this.transition();
    },
    closeDialog() {
      if (this.$refs.removeEntity) {
        this.$refs.removeEntity.hide();

      }
    },
    showAddItemDialog() {
      // Show the AdvertForm dialog

      this.$refs.AdvertFormDialog.showDialog = true;
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
      });
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

// this.productOrderService.changeOrderStatus(item.id, statuscode).then((res) => {

//   this.actions[1].loadingS = false;
//   this.notifySuccess(`Order Status Changed To ${option} successfully`);
//   this.retrieveAllProductOrders();
// }).catch(err => {
//   console.log(err)
//   this.actions[1].loadingS = false;
//   this.notifyError('Error Occured')

// })


}






  },
};
</script>

<style>
.table {
  padding: 1%;
}

.search-container {
  display: flex;
  justify-content: flex-end;
  align-items: end;
  text-align: end;
}
.search-container{
  
}

::v-deep .md-card-header {
  justify-content: space-between;
}


.md-card-header {
  background-color: #5335AB !important;
}

.custom-input .q-field__native {
  color: white !important;
}

.md-button {
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
