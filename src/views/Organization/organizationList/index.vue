<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="orange" class="header-with-button">
            <div>
              <h4 class="title">Organization</h4>
              <p class="category">Explore and manage your organizations</p>
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
            <dynamic-table table-header-color="red" :columns="columns" :data-items="organizations" :actions="actions" />
          </md-card-content>
        </md-card>
      </div>
    </div>
    <MenuForm ref="menuFormDialog" />
  </div>
</template>
<script>
import DynamicTable from "../../../components/Tables/DynamicTable.vue";
import OrganizationService from "../api/organization.service.js";
import MenuForm from "../components/MenuForm.vue";
export default {
  name: "organizationList",
  components: {
    DynamicTable,
    MenuForm
  },
  data() {
    return {
      organizations: [],
      totalItems: 0,
      queryCount: 0,
      isFetching: false,
      page: 1,
      itemsPerPage: 10,
      organizationService: new OrganizationService(),
      columns: [
        { label: "Id", field: "id" },
        { label: "Code", field: "code" },
        { label: "Name", field: "name" },
        { label: "Description", field: "description" },
        { label: "Enable", field: "enable" },
        { label: "CreateTime", field: "createTime" },
        { label: "Admin", field: "admin" },
      ],
      dataItems: [
        {
          name: "Et Restaurant",
          code: "ASSD$#",
          id: "1",
          description: "best Organization",
          enable: "true",
          createTime: "22-10-2024",
          admin: "Abbee",
        },
        {
          name: "Cheche Restaurant",
          code: "ASSD$#",
          id: "2",
          description: "best Organization",
          enable: "true",
          createTime: "22-10-2024",
          admin: "Abbee",
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
    };
  },
  mounted() {
    this.retrieveAllOrganizations();
  },
  methods: {

    retrieveAllOrganizations() {
      this.isFetching = true;
      const paginationQuery = {
        page: this.page - 1,
        size: this.itemsPerPage,
      };
      this.organizationService.retrieve(paginationQuery)
        .then(
          res => {
            this.organizations = res.data;
            this.totalItems = Number(res.headers['x-total-count']);
            this.queryCount = this.totalItems;
            this.isFetching = false;
          },
          err => {
            this.isFetching = false;
          }
        );
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
    }
  },
};
</script>
<style>
.table {
  padding: 1%;
}
</style>
