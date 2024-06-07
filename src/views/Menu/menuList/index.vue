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
                <md-button color="primary" @click="showAddItemDialog">
                  <md-icon>add</md-icon>
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
    <MenuForm ref="menuFormDialog" />
  </div>
</template>

<script>
import DynamicTable from "@/components/Tables/DynamicTable.vue";
import MenuForm from "../components/MenuForm.vue";
import ProductService from "./Api/index"

export default {
  components: {
    DynamicTable,
    MenuForm
  },
  data() {
    return {
      columns: [
        { label: "Name", field: "name" },
        { label: "Price", field: "price" },
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
        {
          label: "View",
          method: this.viewItem,
          icon: "visibility",
          color: "primary",
        },
        { label: "Edit", method: this.editItem, icon: "edit", color: "amber" },
      ],
      productService:new ProductService(),
      removeId: null,
      itemsPerPage: 20,
      queryCount: null,
      page: 1,
      previousPage: 1,
      propOrder: 'id',
      reverse: false,
      totalItems: 0,
      products: [],
      isFetching: false,
    };
  },
  mounted() {
      this.retrieveAllProducts();
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
      if (this.$refs.removeEntity) {
        this.$refs.removeEntity.show();
      }
    },
    removeProduct() {
      this.productService
        .delete(this.removeId)
        .then(() => {
          const message = this.$t('anywhereApp.product.deleted', { param: this.removeId });
          this.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'danger',
            solid: true,
            autoHideDelay: 5000,
          });
          this.removeId = null;
          this.retrieveAllProducts();
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
    },
    viewItem(item) {
      console.log("Viewing item:", item);
    },
    showAddItemDialog() {
      // Show the MenuForm dialog
      this.$refs.menuFormDialog.showDialog = true;
    }
  
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
.md-card-header{
  background-color: #5335AB !important;
}
</style>
