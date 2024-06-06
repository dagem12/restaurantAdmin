<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="orange" class="header-with-button">
            <div>
              <h4 class="title">Menu Catalog</h4>
              <p class="category">Explore and manage your menu catalogs</p>
            </div>
            <!-- Add Item button -->
            <div class="add-item-button">
              <md-button color="primary" @click="this.showAddItemDialog">
                <md-icon>add</md-icon>
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
    <MenuForm ref="menuFormDialog" />
  </div>
</template>
<script>
import DynamicTable from "../../../components/Tables/DynamicTable.vue";
import ProductCatalogService from "./Api/index";
import MenuForm from "../components/MenuCatalogForm.vue";
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
        { label: "Code", field: "code" },
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
      removeId: null,
      itemsPerPage: 20,
      queryCount: null,
      page: 1,
      previousPage: 1,
      propOrder: 'id',
      reverse: false,
      totalItems: 0,
      productCatalogs: [],
      isFetching: false,
      productCatalogService: new ProductCatalogService()
    };
  },
  mounted() {
    this.retrieveAllProductCatalogs();
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
      if (this.$refs.removeEntity) {
        this.$refs.removeEntity.show();
      }
    },
    removeProductCatalog() {
      this.productCatalogService
        .delete(this.removeId)
        .then(() => {
          const message = this.$t('anywhereApp.productCatalog.deleted', { param: this.removeId });
          this.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'danger',
            solid: true,
            autoHideDelay: 5000,
          });
          this.removeId = null;
          this.retrieveAllProductCatalogs();
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
    editItem(item) {
      console.log("Editing item:", item);
    },
    deleteItem(item) {
      console.log("Deleting item:", item);
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
  },
};
</script>
<style>
.table {
  padding: 1%;
}
</style>
