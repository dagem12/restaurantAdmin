<template>
  <div style="margin-top: 20px;">
    <div class="content">
      <div class="md-layout" ref="box">
        <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
          <md-card>
            <md-card-header :style="{ backgroundColor: sidebarItemColor }" class="header-with-button">
              <div>
                <h4 class="title">Menus</h4>
                <p class="category">Explore and manage your restaurant's menu items</p>
              </div>
              <div style="display: flex; justify-content: space-between;">
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
              <dynamic-table table-header-color="red" :columns="columns" :data-items="products" :actions="actions" />
              <q-pagination style="display: flex;justify-content: center;"  v-if="products.length > 0" v-model="current" :max="totalPages"
                @update:model-value="loadPage" direction-links flat color="grey" active-color="primary" />
            </md-card-content>
            <div v-if="products.length == 0">
              <md-empty-state md-rounded md-icon="description" md-label="Not Found !"
                md-description="No record founded">
              </md-empty-state>
            </div>
          </md-card>
        </div>
      </div>
    </div>

    <!-- MenuForm dialog -->
    <MenuForm ref="menuFormDialog" :productCatalogs="productCatalogs" :shops="shops"
      @getProduct="retrieveAllProducts" />
    <MenuFormEdit ref="editFormDialog" :productCatalogs="productCatalogs" :shops="shops"
      @getProduct="retrieveAllProducts" :menu="menu" />
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure to delete this Menu list Item</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Confirm" :loading="loading" @click="removeProduct()" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import DynamicTable from "@/components/Tables/DynamicTable.vue";
import MenuForm from "../components/MenuForm.vue";
import MenuFormEdit from "../components/MenuFormEdit.vue";
import ProductService from "./Api/index"
import ProductCatalogService from "../menuCatalog/Api";
import ShopService from "../../Shop/Api/index";
import { Notify } from 'quasar';
import { gsap } from 'gsap';


export default {
  components: {
    DynamicTable,
    MenuForm,
    MenuFormEdit
  },
  props: {
    sidebarItemColor: {
      type: String,
      default: "blue",
      validator: (value) => {
        let acceptedValues = ["va", "purple", "blue", "green", "orange", "red", ""];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
  },
  data() {
    return {
      current: 1,
      showSearchInput: false,
      searchKeyword: '',
      columns: [
        { label: "Image", field: "imageUrl", isImage: true },
        { label: "Name", field: "name" },
        { label: "Price", field: "unitPrice" },
        { label: "Description", field: "description" }
      ],
      sortModel: [
        'id',
        'name',
        'unitPrice',

        
      ],
      selectedSort:'id',
      dataItems: [
        {
          name: "Pasta",
          price: "$12.99",
          description: "Delicious pasta dish with homemade sauce."
        },
        {
          name: "Burger",
          price: "$8.99",
          description: "Classic beef burger with cheese and toppings."
        },
        {
          name: "Pizza",
          price: "$10.99",
          description: "Freshly baked pizza with assorted toppings."
        }
      ],
      actions: [
        // {
        //   label: "View",
        //   method: this.viewItem,
        //   icon: "visibility",
        //   color: "primary",
        // },
        { label: "Edit", method: this.editItem, icon: "edit", color: "amber" },
        {
          label: "Delete",
          method: this.deleteItem,
          icon: "delete",
          color: "red",
        },
      ],
      productService: new ProductService(),
      productCatalogService: new ProductCatalogService(),
      shopService: new ShopService(),
      removeId: null,
      confirm: false,
      loading: false,
      itemsPerPage: 20,
      queryCount: null,
      page: 1,
      previousPage: 1,
      propOrder: 'createTime',
      reverse: true,
      totalItems: 0,
      products: [],
      productCatalogs: [],
      shops: [],
      isFetching: false,
      menu: {}
    };
  },
  computed: {
    
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    }
  },
  mounted() {
    this.retrieveAllProducts();
    this.initRelationships()
    const box = this.$refs.box;

    // Using GSAP to animate the row
    gsap.from(box, { duration: 0.5, opacity: 0, y: 1000, ease: "power1.out" });
  },
  watch: {
    sidebarItemColor(newColor) {
      console.log('sidebarItemColor changed to:', newColor);
    }
  },
  methods: {
    handleSortSelection(value) {
      console.log('Selected sort option:', value);
      this.changeOrder(value);
      // Implement your logic based on the selected value (e.g., update sorting order)
    },
    clear2() {
      this.searchKeyword = '';
      this.retrieveAllProducts();
    },
    toggleSearch() {
      this.showSearchInput = !this.showSearchInput;
      if (this.showSearchInput) {
        this.$nextTick(() => this.$refs.searchInput.focus());
      }
    },
    notifyNotfound(message) {
      Notify.create({

        message: message,
        timeout: 3000,
        position: 'center',
        color: 'blue'
      });
    },
    performSearch() {
      // Your search logic here
      console.log('Search performed:', this.searchKeyword);

      this.productService.searchMenu(this.searchKeyword).then(res => {
        if (res.data.length == 0) {
          this.notifyNotfound("Not Found");
        }


        // Clear the po array
        console.log("am IN", this.products);
        this.products = [];
        // Assign the new data to the po array
        this.products = [...res.data];
        console.log("haha in", this.products);
      }).catch(err => {

        console.log(err)
      })
    }
    ,

    clear() {
      this.page = 1;
      this.retrieveAllProducts();
    },
    retrieveAllProducts() {
      this.isFetching = true;
      const paginationQuery = {
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      };
      this.productService
        .retrieve(paginationQuery)
        .then(res => {
          this.products = res.data;
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
    removeProduct() {
      this.loading = true;
      this.productService
        .delete(this.removeId)
        .then(() => {

          this.loading = false;
          this.confirm = false;
          this.notifySuccess('Menu List Item deleted succuessfuly!')
          this.removeId = null;
          this.retrieveAllProducts();
          this.closeDialog();
        })
        .catch(error => {
          this.loading = false;
          this.confirm = false;
          this.notifyError('Error happens on Deleting Menu List Item');

        });
    },
    sort() {
      const result = [this.propOrder + ',' + (this.reverse ? 'desc' : 'asc')];
      if (this.propOrder !== 'id') {
        result.push('id');
      }
      return result;
    },
    loadPage(page) {
      if (page !== this.previousPage) {
        this.previousPage = page;
        this.current = page;
        this.transition();
      }
    },
    transition() {
      this.retrieveAllProducts();
    },
    changeOrder(propOrder) {
      this.propOrder = propOrder;
      this.reverse = !this.reverse;
      this.transition();
    },
    closeDialog() {
      if (this.$refs.removeEntity) {
        this.$refs.removeEntity.hide();
      }
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
    showAddItemDialog() {
      // Show the MenuForm dialog
      this.$refs.menuFormDialog.showDialog = true;
    },
    initRelationships() {

      this.shopService
        .retrieve()
        .then(res => {
          this.shops = res.data;
        }).catch(err => {
          console.log(err)
        });

      this.productCatalogService
        .retrieve()
        .then(res => {
          this.productCatalogs = res.data;
        }).catch(err => {
          console.log(err)
        });
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
.header-with-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
