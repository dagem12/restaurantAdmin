<template>
  <div style="margin-top: 20px;">
    <div class="content">
      <div class="md-layout">
        <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
          <md-card>
            <md-card-header data-background-color="" class="header-with-button">
              <div>
                <h4 class="title">Menus</h4>
                <p class="category">Explore and manage your restaurant's menu items</p>
              </div>
              <!-- Add Item button -->
              <div class="add-item-button">
                <md-button md-theme="" style="background-color: white !important;color:black !important"
                  @click="this.showAddItemDialog">
                  <md-icon style="color:black !important">add</md-icon>
                  <span>Add Item</span>
                </md-button>
              </div>
            </md-card-header>
            <md-card-content>
              <dynamic-table table-header-color="red" :columns="columns" :data-items="products" :actions="actions" />
            </md-card-content>
          </md-card>
        </div>
      </div>
    </div>

    <!-- MenuForm dialog -->
    <MenuForm ref="menuFormDialog" :productCatalogs="productCatalogs" :shops="shops"
      @getProduct="retrieveAllProducts" />
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
import ProductService from "./Api/index"
import ProductCatalogService from "../menuCatalog/Api";
import ShopService from "../../Shop/Api/index";
import { Notify } from 'quasar';


export default {
  components: {
    DynamicTable,
    MenuForm
  },
  data() {
    return {
      columns: [
      { label: "Image", field: "imageUrl",  isImage:true},
        { label: "Name", field: "name" },
        { label: "Price", field: "unitPrice" },
        { label: "Description", field: "description" }
      ],
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
    };
  },
  mounted() {
    this.retrieveAllProducts();
    this.initRelationships()
  },

  methods: {

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

.add-item-button {
  margin-top: 10px;
}

.md-card-header {
  background-color: #5335AB !important;
}
</style>
