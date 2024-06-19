<template>
    <div class="content">
      <div class="md-layout" ref="box">
        <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
          <md-card>
            <md-card-header data-background-color="" class="header-with-button">
              <div>
                <h4 class="title">Customers Feedback</h4>
                <p class="category">
                  Explore and manage your restaurant's feedbacks
                </p>
              </div>
              <div style="display: flex;justify-content: space-between;">
                  <div class="sort-container">
                  <q-select  style="color:white !important;width:150px" v-model="selectedSort"  :options="sortModel" label="Sort By" @input="handleSortSelection" class="custom-select">
                    <template v-slot:prepend>
                      <q-icon  style="color:white !important" name="sort" />
                    </template>
                  </q-select>
                </div>
                <!-- <div class="search-container">
                  <div v-show="showSearchInput" style="padding: 10px;" @click="clear2">
                    <md-icon label="Search" style="color:white !important">close</md-icon>
                  </div>
                  <q-input v-model="searchKeyword" v-show="showSearchInput" @keyup.enter="performSearch"
                    placeholder="Enter search keyword" class="custom-input"></q-input>
                  <div style="padding: 10px;" @click="toggleSearch">
                    <md-icon label="Search" style="color:white !important">search</md-icon>
                  </div>
  
              
                </div> -->
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
              <dynamic-table table-header-color="red" :columns="columns" :data-items="feedBacks" :actions="actions" />
                <q-pagination style="display: flex;justify-content: center;"  v-if="feedBacks.length > 0" v-model="page" :max="totalPages"
                  @input="onPageChange"  direction-links flat color="grey" active-color="primary" />
            </md-card-content>
            <div v-if="feedBacks.length == 0">
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
import FeedBackService from "./api/index";
import { Notify } from 'quasar';
import { gsap } from 'gsap';
import { TRUE } from "sass";
export default {
  name: "feedbackList",
  components: {
    DynamicTable,
  },
  data() {
    return {
      current: 1,
      showSearchInput: false,
      searchKeyword: '',
      columns: [
        { label: "Comment", field: "comment" },
        { label: "Rating", field: "rating" },
        { label: "Create Time", field: "createTime",isCreateTime:true },
      ],
      sortModel: [
  
        'createTime',

        
      ],
      selectedSort:'',
      
      actions: [
        // {
        //   label: "View",
        //   method: this.viewItem,
        //   icon: "visibility",
        //   color: "primary",
        // },
        // {
        //   label: "Edit",
        //   label2: "Update Status",
        //   label2Options: ['Open', 'Preparing', 'Delivered', 'Paid', 'Cancelled'],
        //   method: this.editItem,
        //   methodOptions: this.updateStatus,
        //   loadingS: false,
        //   specificItem: null,
        //   icon: "edit",
        //   color: "blue",
        // },
        // {
        //   label: "Delete",
        //   method: this.deleteItem,
        //   icon: "delete",
        //   color: "red",
        // },
      ],
      feedBackService: new FeedBackService(),

      removeId: null,
      itemsPerPage: 20,
      queryCount: null,
      page: 1,
      previousPage: 1,
      propOrder: 'createTime',
      reverse: true,
      totalItems: 0,
      feedBacks: [],
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
    this.retrieveAllFeedBacks();
    const box = this.$refs.box;

    // Using GSAP to animate the row
    gsap.from(box, { duration: 0.5, opacity: 0, y: 1000, ease: "power1.out" });
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
    // performSearch() {
    //   // Your search logic here
    //   console.log('Search performed:', this.searchKeyword);
    //   this.productOrderService.searchOrder(this.searchKeyword).then(res => {
    //     if (res.length == 0) {
    //       this.notifyNotfound("Not Found");
    //     }


    //     // Clear the po array
    //     console.log("am IN", this.productOrders);
    //     this.productOrders = [];
    //     // Assign the new data to the po array
    //     this.productOrders = [...res];
    //     console.log("haha in", this.productOrders);
    //   }).catch(err => {

    //     console.log(err)
    //   })
    // }
    
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
      this.retrieveAllFeedBacks();
    },
    retrieveAllFeedBacks() {
      this.isFetching = true;
      const paginationQuery = {
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      };
      this.feedBackService
        .retrieve(paginationQuery)
        .then(res => {
          this.feedBacks = res.data;
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
   
  }
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
