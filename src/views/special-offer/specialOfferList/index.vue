<template>
  <div class="content">
    <div class="md-layout" ref="diningbox">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="" class="header-with-button">
            <div>
              <h4 class="title">Special Offers</h4>
              <p class="category"> manage your Special Offer</p>
            </div>
            <!-- Add Item button -->
            <div style="display: flex;justify-content: space-between;" class="sortHolder">
              <div class="sort-container">
                <q-select  v-model="selectedSort"  :options="sortModel" label="Sort By" @input="handleSortSelection"  style="color:white !important;width:150px;"  class="custom-select">
                  <template v-slot:prepend>
                    <q-icon  style="color:white !important" name="sort" />
                  </template>
                </q-select>
              </div>
              <div class="search-container">
                <div  v-show="showSearchInput" style="padding: 10px;" @click="clear2">
                  <md-icon label="Search" style="color:white !important">close</md-icon>
                </div>
                <q-input style="color:white !important" v-model="searchKeyword" v-show="showSearchInput" @keyup.enter="performSearch"
                  placeholder="Enter search keyword" class="custom-input"></q-input>
                <div style="padding: 10px;" @click="toggleSearch">
                  <md-icon label="Search" style="color:white !important">search</md-icon>
                </div>

                <!-- <q-btn @click="toggleSearch" label="Search" color="primary"></q-btn> -->
              </div>
              <div class="add-item-button">
                <md-button md-theme="" style="background-color: white !important;color:black !important"
                  @click="this.showAddItemDialog">
                  <md-icon style="color:black !important">add</md-icon>
                  <span>Add Item</span>
                </md-button>
              </div>
            </div>
          </md-card-header>
          <md-card-content>
            <dynamic-table table-header-color="red" :columns="columns" :data-items="specialOffers" :actions="actions" />
            <q-pagination style="display: flex;justify-content: center;"  v-if="specialOffers.length > 0" v-model="page" :max="totalPages" @input="onPageChange"
              direction-links flat color="grey" active-color="primary" />
          </md-card-content>
          <div v-if="specialOffers.length == 0">
            <md-empty-state md-rounded md-icon="description" md-label="Not Found !" md-description="No record founded">
            </md-empty-state>
          </div>
        </md-card>
      </div>
    </div>
    <SpecialOfferForm ref="SpecialOffersDialog" @getShop="retrieveAllSpecialOffer" :shops="shops" :products="products" />
    <ShopEditForm ref="editFormDialog" :shop="shop" @getShop="retrieveAllSpecialOffer" />
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure to delete this Specail Offer</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Confirm" :loading="loading" @click="removeShop()" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>


<script>
import DynamicTable from "../../../components/Tables/DynamicTable.vue";
import { mapActions, mapState } from 'vuex';
import AdvertService from '../Api/index';
import SpecialOfferForm from "../components/SpecialOfferForm.vue";
import ShopEditForm from "../components/ShopEditForm.vue";
import { gsap } from 'gsap';
import { Notify } from 'quasar';
import ShopService from "../../Shop/Api";
import ProductService from "../../Menu/menuList/Api";

export default {
  name: "specialOfferList",
  components: {
    DynamicTable,
    SpecialOfferForm,
    ShopEditForm
  },


  data() {
    return {
      current: 1,
      showSearchInput: false,
      searchKeyword: '',
      columns: [
  
        { label: "newPrice", field: "newPrice", },
        { label: "organization", field: "organization", isRelation:true  },
        { label: "shop", field: "shop",  isRelation:true },
        { label: "createTime", field: "createTime", isCreateTime: true   },
        { label: "startDate", field: "startDate", isCreateTime: true   },
        { label: "endDate", field: "endDate", isCreateTime: true   },
         { label: "product", field: "product", isRelation:true },
         { label: "isActive", field: "isActive" },
         { label: "isVisible", field: "isVisible" },
         { label: "priorityLevel", field: "priorityLevel" },
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
        {
          label: "Delete",
          method: this.deleteItem,
          icon: "delete",
          color: "red",
        }
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
      specialOffers: [],
      isFetching: false,
      advertService: new AdvertService(),
      shopService:new ShopService(),
      productService: new ProductService(),
      confirm: false,
      shop: {},
      shops:[],
      products:[],
      searchWord: ''
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    }
  },
  mounted() {
    this.retrieveAllSpecialOffer();
    this.initRelationships();
    const diningbox = this.$refs.diningbox;

    // Using GSAP to animate the row
    gsap.from(diningbox, { duration: 0.5, opacity: 0, y: 1000, ease: "power1.out" });
  },
  methods: {
    onPageChange(page) {
    
      if (page !== this.previousPage) {
        this.previousPage = page;
        this.page = page;
        this.transition(); // Ensure this method is defined and works as expected
      }
    },
     handleSortSelection(value) {
     
      this.changeOrder(value);
      // Implement your logic based on the selected value (e.g., update sorting order)
    },
    clear2() {
      this.searchKeyword = '';
      this.retrieveAllSpecialOffer();
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
      
      this.advertService.searchShop(this.searchKeyword).then(res => {

        if (res.data.length == 0) {
          this.notifyNotfound("Not Found");
        }
        // Clear the users array
        this.specialOffers = [];
        // Assign the new data to the users array
        this.specialOffers = [...res.data];
      }).catch(err => {
       
      })
    }
    ,
    addItem() {
      // Define your add item logic here
    },
    editItem(item) {
      
      this.shop = item;
      this.$refs.editFormDialog.showDialogEdit = true;

      // Define your edit item logic here
    },
    deleteItem(item) {
      this.prepareRemove(item);
    },
    generateQR(item) {

    },
    clear() {
      this.page = 1;
      this.retrieveAllSpecialOffer();
    },
    retrieveAllSpecialOffer() {
     
      this.isFetching = true;
      const paginationQuery = {
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      };

      this.advertService.retrieve(paginationQuery)
        .then(
          res => {
           
            this.specialOffers = res.data;
            this.totalItems = Number(res.headers['x-total-count']);
            this.queryCount = this.totalItems;
            this.isFetching = false;
           
          },

        ).catch(err => {
          
          this.isFetching = false;

        });
     
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
    removeShop() {
      this.loading = true;
      this.advertService.delete(this.removeId)
        .then(() => {

          this.loading = false;
          this.confirm = false;
          this.notifySuccess('advert deleted succuessfuly!')
          this.removeId = null;

          this.retrieveAllSpecialOffer();

        })
        .catch(error => {
          this.loading = false;
          this.confirm = false;

          this.notifyError('Error happens on Deleting shop')

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
      this.retrieveAllSpecialOffer();
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

      this.$refs.SpecialOffersDialog.showDialog = true;
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
    initRelationships() {

this.shopService
  .retrieve()
  .then(res => {
    this.shops = res.data;
  }).catch(err => {
  
  });

this.productService
  .retrieve()
  .then(res => {
    this.products = res.data;
  }).catch(err => {
    
  });
},




  },
};
</script>

<style>
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
