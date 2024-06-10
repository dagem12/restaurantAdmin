<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="" class="header-with-button">
            <div>
              <h4 class="title">Menu Catalog</h4>
              <p class="category">Explore and manage your menu catalogs</p>
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
            <dynamic-table table-header-color="red" :columns="columns" :data-items="productCatalogs"
              :actions="actions" />
          </md-card-content>
        </md-card>
      </div>
    </div>
    <MenuForm ref="menuFormDialog" :shops="shops" @getMenuCatalog="retrieveAllProductCatalogs" />
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
import ShopService from "../../Shop/Api";
import { Notify } from 'quasar';
export default {
  name: "menuCatalogList",
  components: {
    DynamicTable,
    MenuForm
  },
  data() {
    return {
      columns: [
        { label: "Id", field: "id" },
        { label: "Name", field: "name" },
        { label: "Description", field: "description" },
        { label: "Enable", field: "enable" },
        { label: "CreateTime", field: "createTime" },
        // { label: "Shop", field: "shop" },
        // { label: "Poster", field: "poster" },
      ],

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
      reverse: false,
      totalItems: 0,
      productCatalogs: [],
      isFetching: false,
      shops: [],
      productCatalogService: new ProductCatalogService(),
      shopService: new ShopService(),
    };
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
  },
  methods: {

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
    loadPage(page) {
      if (page !== this.previousPage) {
        this.previousPage = page;
        this.transition();
      }
    },
    transition() {
      this.retrieveAllProductCatalogs();
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

.md-card-header {
  background-color: #5335AB !important;
}
</style>
