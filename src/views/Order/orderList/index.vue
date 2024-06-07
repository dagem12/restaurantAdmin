<template>
  <div class="content">
    <div class="md-layout" ref="box">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header
            data-background-color=""
            class="header-with-button"
          >
            <div>
              <h4 class="title">Orders</h4>
              <p class="category">
                Explore and manage your restaurant's orders
              </p>
            </div>
            <!-- Add Item button -->
            <div class="add-item-button">
              <!-- <md-button color="primary" @click="this.addItem">
                <md-icon>add</md-icon>
                <span>Add Item</span>
              </md-button> -->
            </div>
          </md-card-header>
          <md-card-content>
            <dynamic-table table-header-color="red" :columns="columns" :data-items="productOrders" :actions="actions" />
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>
<script>
import DynamicTable from "../../../components/Tables/DynamicTable.vue";
import ProductOrderService from "./Api/index";
import { gsap } from 'gsap';
export default {
  name: "orderList",
  components: {
    DynamicTable,
  },
  data() {
    return {
      columns: [
        { label: "Id", field: "id", isRelation: false },
        { label: "Code", field: "code", isRelation: false },
        { label: "Name", field: "name", isRelation: false },
        { label: "Status", field: "status", isRelation: true },
        { label: "CreateTime", field: "createTime", isRelation: false },
        { label: "DiningTable", field: "diningTable", isRelation: true },
      ],
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
      productOrderService: new ProductOrderService(),

      removeId: null,
      itemsPerPage: 20,
      queryCount: null,
      page: 1,
      previousPage: 1,
      propOrder: 'createTime',
      reverse: false,
      totalItems: 0,
      productOrders: [],
      isFetching: false
    };
  },
  mounted() {
    this.retrieveAllProductOrders();
    const box = this.$refs.box;

    // Using GSAP to animate the row
    gsap.from(box, { duration: 0.5, opacity: 0, y: 1000, ease: "power1.out" });
  },
  methods: {
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
      const result = [this.propOrder + ',' + (this.reverse ? 'asc' : 'desc')];
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
      this.retrieveAllProductOrders();
    },
    changeOrder(propOrder) {
      this.propOrder = propOrder;
      this.reverse = !this.reverse;
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
      this.$router.push("/order-detail");
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
.md-card-header{
  background-color: #5335AB !important;
}
</style>
