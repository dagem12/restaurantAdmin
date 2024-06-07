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
            <dynamic-table table-header-color="red" :columns="columns" :data-items="dataItems" :actions="actions" />
          </md-card-content>
        </md-card>
      </div>
    </div>
    <MenuForm :organizations="organizations" :authorities="authorities" :shops="shops" ref="menuFormDialog" />
  </div>
</template>
<script>
import DynamicTable from "../../../components/Tables/DynamicTable.vue";
import MenuForm from "../components/MenuForm.vue";
import OrganizationService from "../../Organization/api/organization.service.js";
import ShopService from "../../Shop/Api/index.js";
import UserService from "../Api/index.js";
import AccountService from "../../Login/api/account.service.js";

export default {
  name: "usersList",
  components: {
    DynamicTable,
    MenuForm
  },


  data() {
    return {
      organizations: [],
      authorities: [],
      shops: [],
      organizationService: new OrganizationService(),
      accountService: new AccountService(),
      hasAnyAuthorityValues: {},
      shopService: new ShopService(),
      userService: new UserService(),
      columns: [
        { label: "Id", field: "id" },
        { label: "Login", field: "login" },
        { label: "Email", field: "email" },
        { label: "Profiles", field: "profiles" },
        { label: "CreateTime", field: "createTime" },
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
    };
  },
  watch: {
    organizations: {
      handler(newVal) {
        if (!newVal) {
          this.initRelationships();
        }
      },
      immediate: true,
      deep: true
    }
  },
  watch: {
    shops: {
      handler(newVal) {
        if (!newVal) {
          this.initRelationships();
        }
      },
      immediate: true,
      deep: true
    }
  },
  watch: {
    authorities: {
      handler(newVal) {
        if (!newVal) {
          this.initAuthorities();
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.initRelationships();
    this.initAuthorities();
  },
  methods: {
    initAuthorities() {
      this.userService
        .retrieveAuthorities()
        .then(_res => {
          console.log("authore", this.authorities)
          this.authorities = _res.data
          console.log("authore", this.authorities)
        });
    },
    // initAuthorities() {
    //   this.userService
    //     .retrieveAuthorities()
    //     .then(_res => {
    //       console.log("kayole", _res.data, this.hasAnyAuthority('ROLE_ADMIN'));
    //       _res.data.forEach(element => {
    //         if (this.hasAnyAuthority('ROLE_ADMIN')) {
    //           console.log("kayyyy", this.authorities)
    //           if (element != 'ROLE_ADMIN') { this.authorities.push(element); }

    //         } else if (this.hasAnyAuthority(Authority.ORGANIZATION_ADMIN)) {
    //           if (element != 'ROLE_ORGANIZATION_ADMIN' && element != 'ROLE_ADMIN') {
    //             this.authorities.push(element);
    //           }
    //         }
    //       });
    //     });
    // },
    // hasAnyAuthority(authorities) {
    //   this.accountService
    //     .hasAnyAuthorityAndCheckAuth(authorities)
    //     .then(value => {
    //       console.log("I called", value);
    //       if (this.hasAnyAuthorityValues[authorities] !== value) {
    //         this.hasAnyAuthorityValues = { ...this.hasAnyAuthorityValues, [authorities]: value };
    //       }
    //     });
    //   return this.hasAnyAuthorityValues[authorities] ?? false;
    // },
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
      console.log("mishiole", this.authorities)
      this.$refs.menuFormDialog.showDialog = true;
    },
    initRelationships() {
      this.organizationService
        .retrieve()
        .then(res => {
          this.organizations = res.data;
        });
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
