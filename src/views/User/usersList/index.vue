<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="" class="header-with-button">
            <div>
              <h4 class="title">Users</h4>
              <p class="category">Explore and manage your users</p>
            </div>
            <div style="display: flex;justify-content: space-between;" class="sortHolder">
              <div class="filter-container" style="display: flex;" >
                <div style="margin:auto;" @click="clearFilter">
                  <md-icon label="Filter" style="color:white !important">close</md-icon>
                </div>
                <q-select  v-model="filter"  :options="filterModel" label="Filter By" @input="handleFilterSelection"  style="color:white !important;width:150px;"  class="custom-select">
                  <template v-slot:prepend>
                    <q-icon  style="color:white !important" name="filter" />
                  </template>
                </q-select>
              </div>
              <div class="sort-container">
                <q-select  style="color:white !important;width:150px" v-model="selectedSort"  :options="sortModel" label="Sort By" @input="handleSortSelection"  class="custom-select"    filled>
                  <template v-slot:prepend>
                    <q-icon  style="color:white !important" name="sort" />
                  </template>
                </q-select>
              </div>
              <div class="search-container">
                <div v-show="showSearchInput" style="padding: 10px;" @click="clear">
                  <md-icon label="Search" style="color:white !important">close</md-icon>
                </div>
                <q-input v-model="searchKeyword" v-show="showSearchInput" @keyup.enter="performSearch"
                  placeholder="Enter search keyword" class="custom-input"></q-input>
                <div style="padding: 10px;" @click="toggleSearch">
                  <md-icon label="Search" style="color:white !important">search</md-icon>
                </div>

                <!-- <q-btn @click="toggleSearch" label="Search" color="primary"></q-btn> -->
              </div>
              <!-- Add Item button -->
              <div class="add-item-button">
                <md-button md-theme="" style="background-color: white !important;color:black !important"
                  @click="this.showAddItemDialog">
                  <md-icon style="color:black !important">add</md-icon>
                  <span>Add Item</span>
                </md-button>
              </div>
            </div>
          </md-card-header>
          <md-card-content>
            <dynamic-table table-header-color="red" :columns="columns" :data-items="users" :actions="actions" />
            <q-pagination style="display: flex;justify-content: center;"  v-model="page" :max="totalPages"  @input="onPageChange" direction-links flat
              color="grey" active-color="primary" />
          </md-card-content>
          <div v-if="users.length == 0">
            <md-empty-state md-rounded md-icon="description" md-label="Not Found !" md-description="No record founded">
            </md-empty-state>
          </div>
        </md-card>
      </div>
    </div>
    <MenuForm :shops="shops" :organizations="organizations" :authorities="authorities" ref="menuFormDialog"
      @getUsers="loadAll" />
    <MenuFormEdit :shops="shops" :organizations="organizations" :authorities="authorities" ref="editFormDialog"
      @getUsers="loadAll" :user="user" />
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure to delete this User</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Confirm" :loading="loading" @click="removeUser()" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import DynamicTable from "../../../components/Tables/DynamicTable.vue";
import OrganizationService from "../../Organization/api/organization.service";
import ShopService from "../../Shop/Api";
import { Authority } from "../../../utils/authority";
import MenuForm from "../components/MenuForm.vue";
import MenuFormEdit from "../components/MenuFormEdit.vue";
import AccountService from "../../Login/api/account.service";
import UserManagementService from "../Api/index.js";
import { Notify } from 'quasar';


export default {
  name: "usersList",
  components: {
    DynamicTable,
    MenuForm,
    MenuFormEdit
  },
  data() {
    return {
      current: 1,
      showSearchInput: false,
      searchKeyword: '',
      columns: [
        { label: "Login", field: "login" },
        { label: "Email", field: "email" },
        { label: "Create By", field: "createdBy" },
        { label: "Activated", field: "activated" },
      ],
      filter:null,
      filterModel: [
      {
          label: 'Active Users',
          colmun:`activated.equals`,
          value:true
        },
        {
          label: 'Deactive Users ',
          colmun:`activated.equals`,
          value:false  
        },
        // Add more categories and options as needed
      ],
      sortModel: [
        'login',
        'email',
      
      
      ],
      selectedSort:'',
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
      confirm: false,
      loading: false,
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
      reverse: true,
      totalItems: 0,
      isLoading: false,
      users: [],
      user: {}

    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    }
  },
  mounted() {
    this.initRelationships();
    this.initAuthorities();
    this.loadAll();

  },
  methods: {
    onPageChange(page) {
      console.log(`Page changed to: ${page}`);
      if (page !== this.previousPage) {
        this.previousPage = page;
        this.page = page;
        this.transition(); // Ensure this method is defined and works as expected
      }
    },
     handleSortSelection(value) {
      console.log('Selected sort option:', value);
      this.changeOrder(value);
      // Implement your logic based on the selected value (e.g., update sorting order)
    },
    handleFilterSelection(value){
      const key = value?.colmun; 
      const val = value?.value; 
   

      const reqFilter = {
          [key]: val
      };
   
      const paginationQuery = {
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
  
      };

         this.userManagementService.retrieveFilter(paginationQuery,reqFilter).then(res => {

            if (res.data.length == 0) {
              this.notifyNotfound("Not Found");
            }
            // Clear the users array
            this.users = [];
            // Assign the new data to the users array
            this.users = [...res.data];
            }).catch(err => {
            console.log(err)
            })
     
    },
   
    toggleSearch() {
      this.showSearchInput = !this.showSearchInput;
      if (this.showSearchInput) {
        this.$nextTick(() => this.$refs.searchInput.focus());
      }
    },
    clear() {
      this.searchKeyword = '';
      this.loadAll();
    },
    clearFilter() {
      this.filter = null;
      this.loadAll();
    },
     changeOrder(propOrder) {
      this.propOrder = propOrder;
      // this.reverse = !this.reverse;
      this.transition();
    },
    performSearch() {
      // Your search logic here
      console.log('Search performed:', this.searchKeyword);
      this.userManagementService.searchUser(this.searchKeyword).then(res => {

        if (res.data.length == 0) {
          this.notifyNotfound("Not Found");
        }
        // Clear the users array
        this.users = [];
        // Assign the new data to the users array
        this.users = [...res.data];
      }).catch(err => {
        console.log(err)
      })
    }
    ,
    editItem(item) {
      console.log("Editing item:", item);
      this.user = item;
      this.$refs.editFormDialog.showDialogEdit = true;

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
    prepareRemove(instance) {
      this.removeId = instance.login;
      if (this.removeId) {
        this.confirm = true;
      }
    },

    handleSyncList() {
      this.clear();
    },
    removeUser() {
      this.loading = true;
      this.userManagementService
        .remove(this.removeId)
        .then(() => {

          this.notifySuccess('User deleted succuessfuly!')
          this.removeId = null;
          this.loading = false;
          this.confirm = false;
          this.loadAll();
        })
        .catch(error => {
          this.loading = false;
          this.confirm = false;
          this.notifyError('Error happens on Deleting User');
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
    notifyNotfound(message) {
      Notify.create({

        message: message,
        timeout: 3000,
        position: 'center',
        color: 'blue'
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
    },
   
    transition() {
      this.loadAll();
    },
  },
};
</script>
<style>
@media (max-width: 768px) {
  .sortHolder {
    flex-direction: column !important; /* Stack items vertically */
    align-items: flex-end; /* Align items to the start of the flex container */
  
    justify-content: end;
 
  }
  .category{
    display: none;
  }
  .title{
   font-size: x-large;
  }
}
.table {
  padding: 1%;
}

::v-deep .md-card-header {
  justify-content: space-between;
}

.custom-input .q-field__native {
  color: white !important;
}

.md-card-header {
  background-color: #5335AB !important;
}

.md-button {
  background-color: #5335AB !important;
}



.custom-select {
  width: 150px;
  color: white !important;
  --q-select--text-color: white;
  --q-select--label-color: white;
  --q-select--background-color: transparent;
  --q-select--focus-border-color: white;
}

.custom-select .q-field__native {
  color: white !important;
}

.custom-select .q-field__control-container .q-field__control {
  color: white !important;
}

.custom-select .q-field__label {
  color: white !important;
}

.custom-icon {
  color: white !important;
}
</style>