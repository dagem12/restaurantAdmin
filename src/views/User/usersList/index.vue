<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="orange" class="header-with-button">
            <div>
              <h4 class="title">Users</h4>
              <p class="category">Explore and manage your users</p>
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
            <dynamic-table table-header-color="red" :columns="columns" :data-items="users" :actions="actions" />
          </md-card-content>
        </md-card>
      </div>
    </div>
    <MenuForm :shops="shops" :organizations="organizations" :authorities="authorities" ref="menuFormDialog" />
  </div>
</template>
<script>
import DynamicTable from "../../../components/Tables/DynamicTable.vue";
import OrganizationService from "../../Organization/api/organization.service";
import ShopService from "../../Shop/Api";
import { Authority } from "../../../utils/authority";
import MenuForm from "../components/MenuForm.vue";
import AccountService from "../../Login/api/account.service";
import UserManagementService from "../Api/index.js";


export default {
  name: "usersList",
  components: {
    DynamicTable,
    MenuForm
  },
  data() {
    return {
      columns: [
        { label: "Id", field: "id" },
        { label: "Login", field: "login" },
        { label: "Email", field: "email" },
        { label: "Create By", field: "createdBy" },
        { label: "Activated", field: "activated" },
      ],
      dataItems: [
        {
          email: "kebeded@gmail.com",
          login: "Kebede",
          id: "1",
          profiles: "Active",
          createTime: "22-10-2024",
        },
        {
          email: "abebe@gmail.com",
          login: "Abebe",
          id: "2",
          profiles: "Active",
          createTime: "22-10-2024",
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
      shopService: new ShopService(),
      organizationService: new OrganizationService(),
      organizations: [],
      shops: [],
      authorities: [],
      accountService: new AccountService(),
      authority: new Authority(),
      userManagementService: new UserManagementService(),
      itemsPerPage: 20,
      queryCount: null,
      page: 1,
      previousPage: 1,
      propOrder: 'id',
      reverse: false,
      totalItems: 0,
      isLoading: false,
      users: []

    };
  },
  mounted() {
    this.initRelationships();
    this.initAuthorities();
    this.loadAll();

  },
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
    showAddItemDialog() {

      this.$refs.menuFormDialog.showDialog = true;
    },
    sort() {
      const result = [this.propOrder + ',' + (this.reverse ? 'desc' : 'asc')];
      if (this.propOrder !== 'id') {
        result.push('id');
      }
      return result;
    },
    loadAll() {
      this.isLoading = true;

      this.userManagementService
        .retrieve({
          page: this.page - 1,
          size: this.itemsPerPage,
          sort: this.sort(),
        })
        .then(res => {
          this.isLoading = false;
          this.users = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          console.log("users", this.users);
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    initAuthorities() {

      if (this.hasAnyAuthority('ROLE_ADMIN')) {

        this.authorities.push(this.authority.ORGANIZATION_ADMIN);
        this.authorities.push(this.authority.SHOP_ADMIN);

      } else if (this.hasAnyAuthority(this.authority.ORGANIZATION_ADMIN)) {

        this.authorities.push(this.authority.SHOP_ADMIN);
      }



    },
    hasAnyAuthority(authorities) {
      return this.accountService.hasAuthorities(authorities);


    },
    initRelationships() {
      if (this.accountService.hasAuthorities(this.authority.ADMIN)) {
        this.organizationService
          .retrieve()
          .then(res => {
            this.organizations = res.data;
          });
      }


      this.shopService
        .retrieve()
        .then(res => {
          this.shops = res.data;
        });
    }
  },
};
</script>
<style>
.table {
  padding: 1%;
}
</style>