<template>
  <div class="content">
    <div class="md-layout" ref="box">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="" class="header-with-button">
            <div>
              <h4 class="title">Menu Catalog</h4>
              <p class="category">Explore and manage your menu catalogs</p>
            </div>
            <div style="display: flex;justify-content: space-between;">
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
                <md-button md-theme="" style="background-color: white !important;color:black !important"
                  @click="this.showAddItemDialog">
                  <md-icon style="color:black !important">add</md-icon>
                  <span>Add Item</span>
                </md-button>
              </div>
            </div>
          </md-card-header>
          <md-card-content>
            <dynamic-table table-header-color="red" :columns="columns" :data-items="productCatalogs"
              :actions="actions" />
            <q-pagination style="display: flex;justify-content: center;"  v-if="productCatalogs.length > 0" v-model="page" :max="totalPages"
              @input="onPageChange" direction-links flat color="grey" active-color="primary" />
          </md-card-content>
          <div v-if="productCatalogs.length == 0">
            <md-empty-state md-rounded md-icon="description" md-label="Not Found !" md-description="No record founded">
            </md-empty-state>
          </div>
        </md-card>
      </div>
    </div>
    <MenuForm ref="menuFormDialog" :shops="shops" @getMenuCatalog="retrieveAllProductCatalogs" />
    <MenuFormEdit ref="editFormDialog" :shops="shops" @getMenuCatalog="retrieveAllProductCatalogs" :menu="menu" />
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure to delete this Menu Catalog</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Confirm" :loading="loading" @click="removeProductCatalog()" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import DynamicTable from "../../../components/Tables/DynamicTable.vue";
import ProductCatalogService from "./Api/index";
import MenuForm from "../components/MenuCatalogForm.vue";

import MenuFormEdit from "../components/MenuCatalogEditForm.vue";
import ShopService from "../../Shop/Api";
import { Notify } from 'quasar';
import { gsap } from 'gsap';
export default {
  name: "menuCatalogList",
  components: {
    DynamicTable,
    MenuForm,
    MenuFormEdit
  },
  data() {
    return {
      current: 1,
      showSearchInput: false,
      searchKeyword: '',
      columns: [
        { label: "Name", field: "name" },
        { label: "Description", field: "description" },
        { label: "Enable", field: "enable" },
        { label: "CreateTime", field: "createTime", isCreateTime: true },
        // { label: "Shop", field: "shop" },
        // { label: "Poster", field: "poster" },
      ],
         sortModel: [
        'name',
        'createTime'

        
      ],
      selectedSort:'',

      actions: [
        {
          label: "Edit",
          method: this.editItem,
          icon: "edit",
          color: "blue",
        },
        {
          label: "Delete",
          method: this.deleteItem,
          icon: "delete",
          color: "red",
        },
      ],
      confirm: false,
      loading: false,
      removeId: null,
      itemsPerPage: 20,
      queryCount: null,
      page: 1,
      previousPage: 1,
      propOrder: 'createTime',
      reverse: true,
      totalItems: 0,
      productCatalogs: [],
      isFetching: false,
      shops: [],
      productCatalogService: new ProductCatalogService(),
      shopService: new ShopService(),
      menu: {}
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    }
  },

  watch: {
    shops: {
      handler(newVal) {
        if (!newVal) {
          this.initRelationships();
        }
      },
      immediate: true, // This ensures the watch is triggered immediately after the component is created
      deep: true // This allows the watch to watch for changes in nested properties of the prop
    }
  },
  mounted() {
    this.retrieveAllProductCatalogs();
    this.initRelationships();
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
    clear2() {
      this.searchKeyword = '';
      this.retrieveAllProductCatalogs();
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


      this.productCatalogService.searchMenuCat(this.searchKeyword).then(res => {
        if (res.data.length == 0) {
          this.notifyNotfound("Not Found");
        }


        // Clear the po array
        console.log("am IN", this.productCatalogs);
        this.productCatalogs = [];
        // Assign the new data to the po array
        this.productCatalogs = [...res.data];
        console.log("haha in", this.productCatalogs);
      }).catch(err => {

        console.log(err)
      })
    }
    ,

    clear() {
      this.page = 1;
      this.retrieveAllProductCatalogs();
    },
    retrieveAllProductCatalogs() {
      this.isFetching = true;
      const paginationQuery = {
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      };
      this.productCatalogService
        .retrieve(paginationQuery)
        .then(res => {
          this.productCatalogs = res.data;
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
      if (this.removeId) {
        this.confirm = true;
      }
    },
    removeProductCatalog() {
      this.loading = true;
      this.productCatalogService
        .delete(this.removeId)
        .then(() => {

          this.removeId = null;

          this.loading = false;
          this.confirm = false;
          this.notifySuccess('Menu Catalog deleted succuessfuly!')
          this.retrieveAllProductCatalogs();
          this.closeDialog();
        })
        .catch(error => {
          this.loading = false;
          this.confirm = false;
          this.notifyError('Error happens on Deleting Menu Catalog');

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
      this.retrieveAllProductCatalogs();
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
    initRelationships() {

      // this.organizationService
      //   .retrieve()
      //   .then(res => {
      //     this.organizations = res.data;
      //   }).catch(err=>{
      //     console.log(err)
      //   });

      this.shopService
        .retrieve()
        .then(res => {
          this.shops = res.data;
        }).catch(err => {
          console.log(err)
        });
    },
    editItem(item) {
      console.log("Editing item:", item);
      this.menu = item;
      this.$refs.editFormDialog.showDialogEdit = true;


    },
    deleteItem(item) {
      console.log("Deleting item:", item);
      this.prepareRemove(item);
    },
    viewItem(item) {
      console.log("Viewing item:", item);
    },
    addItem() {
      console.log("Adding new item");
      // Add your logic here to handle adding a new item
    },
    showAddItemDialog() {
      // Show the MenuForm dialog
      this.$refs.menuFormDialog.showDialog = true;
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
  },
};
</script>
<style>
.table {
  padding: 1%;
}

::v-deep .md-card-header {
  justify-content: space-between;
}

.add-item-button {
  margin-top: 10px;
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
