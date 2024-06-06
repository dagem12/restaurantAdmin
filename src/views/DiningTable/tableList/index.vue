<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="orange" class="header-with-button">
            <div>
              <h4 class="title">Dining Tables</h4>
              <p class="category">Explore and manage your Dining Tables</p>
            </div>
            <!-- Add Item button -->
            <div class="add-item-button">
              <md-button color="primary" @click="this.addItem">
                <md-icon>add</md-icon>
                <span>Add Item</span>
              </md-button>
            </div>
          </md-card-header>
          <md-card-content>
            <dynamic-table table-header-color="red" :columns="columns" :data-items="dataItems" :actions="actions" />
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>
<script>
import DynamicTable from "../../../components/Tables/DynamicTable.vue";
// import { Component, Vue, Inject } from 'vue-property-decorator';
// import Vue2Filters from 'vue2-filters';

import DiningTableService from "../Api/index.js";
// import QRCode from 'qrcode';

export default {
  name: "diningTableList",
  components: {
    DynamicTable,
  },
  data() {
    return {
      columns: [
        { label: "Id", field: "id" },
        { label: "Code", field: "code" },
        { label: "Name", field: "name" },
        { label: "Description", field: "description" },
        { label: "CreateTime", field: "createTime" },
        { label: "Enable", field: "enable" },
        { label: "CreateBy", field: "createBy" },
      ],
      dataItems: [
        {
          name: "1",
          code: "ASSD$#",
          id: "1",
          enable: "true",
          description: "best TABLKE",
          createTime: "22-10-2024",
          createBy: "Abebeb",
        },
        {
          name: "2",
          code: "ASSD$#",
          id: "2",
          enable: "true",
          description: "best TABLKE",
          createTime: "22-10-2024",
          createBy: "Abebe",
        },
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
      propOrder: "id",
      reverse: false,
      totalItems: 0,
      diningTables: [],
      isFetching: false,
    };
  },
  // mounted() {
  //   this.retrieveAllDiningTables();
  // },
  methods: {
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
    clear() {
      this.page = 1;
      this.retrieveAllDiningTables();
    },
    async generateQR(tableId, shopKey) {
      try {
        const qrText = `${shopKey}/${tableId}`;
        const qrCodeImage = await QRCode.toDataURL(qrText);

        const downloadLink = document.createElement("a");
        downloadLink.href = qrCodeImage;
        downloadLink.download = "qr_code.png";

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    },
    retrieveAllDiningTables() {
      this.isFetching = true;
      const paginationQuery = {
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      };
      DiningTableService.retrieve(paginationQuery).then(
        (res) => {
          this.diningTables = res.data;
          this.totalItems = Number(res.headers["x-total-count"]);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        (err) => {
          this.isFetching = false;
          alertService().showHttpError(this, err.response);
        }
      );
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
    removeDiningTable() {
      DiningTableService.delete(this.removeId)
        .then(() => {
          const message = this.$t("anywhereApp.diningTable.deleted", {
            param: this.removeId,
          });
          this.$bvToast.toast(message.toString(), {
            toaster: "b-toaster-top-center",
            title: "Info",
            variant: "danger",
            solid: true,
            autoHideDelay: 5000,
          });
          this.removeId = null;
          this.retrieveAllDiningTables();
          this.closeDialog();
        })
        .catch((error) => {
          alertService().showHttpError(this, error.response);
        });
    },
    sort() {
      const result = [this.propOrder + "," + (this.reverse ? "desc" : "asc")];
      if (this.propOrder !== "id") {
        result.push("id");
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
      this.retrieveAllDiningTables();
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
  },
};
</script>
<style>
.table {
  padding: 1%;
}
</style>
