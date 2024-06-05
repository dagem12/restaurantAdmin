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
      removeId: null,
      itemsPerPage: 20,
      queryCount: null,
      page: 1,
      previousPage: 1,
      propOrder: 'id',
      reverse: false,
      totalItems: 0,
      organizations: [],
      isFetching: false,
      organizationService: new OrganizationService(),
      columns: [
        { label: "Id", field: "id" },
        { label: "Code", field: "code" },
        { label: "Name", field: "name" },
        { label: "Description", field: "description" },
        { label: "Enable", field: "enable" },
        { label: "CreateTime", field: "createTime" },
       
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
          method: this.removeOrganization,
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
    clear() {
      this.page = 1;
      this.retrieveAllOrganizations();
    },
    retrieveAllOrganizations() {
      this.isFetching = true;
      const paginationQuery = {
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
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
    handleSyncList() {
      this.clear();
    },
    prepareRemove(instance) {
      this.removeId = instance.id;
      if (this.$refs.removeEntity) {
        this.$refs.removeEntity.show();
      }
    },
    removeOrganization() {
      this.organizationService.delete(this.removeId)
        .then(() => {
          const message = this.$t('anywhereApp.organization.deleted', { param: this.removeId });
          this.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'danger',
            solid: true,
            autoHideDelay: 5000,
          });
          this.removeId = null;
          this.retrieveAllOrganizations();
          this. showAddItemDialog();
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
      this.retrieveAllOrganizations();
    },
    changeOrder(propOrder) {
      this.propOrder = propOrder;
      this.reverse = !this.reverse;
      this.transition();
    },
    showAddItemDialog() {
      // Show the MenuForm dialog
      this.$refs.menuFormDialog.showDialog = true;
    },
    editItem(item) {
      console.log("Editing item:", item);
    },
  },
};
</script>
<style>
.table {
  padding: 1%;
}
</style>
