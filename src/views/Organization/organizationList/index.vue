<template>
  <div class="content">
    <div class="md-layout" ref="box">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="" class="header-with-button">
            <div>
              <h4 class="title">Organization</h4>
              <p class="category">Explore and manage your organizations</p>
            </div>
            <div style="display: flex;justify-content: space-between;">
                    <div class="sort-container">
                <q-select  style="color:white !important;width:150px" v-model="selectedSort"  :options="sortModel" label="Sort By" @input="handleSortSelection" class="custom-select">
                  <template v-slot:prepend>
                    <q-icon  style="color:white !important" name="sort" />
                  </template>
                </q-select>
              </div>
              <div class="search-container">
                <div v-show="showSearchInput" style="padding: 10px;" @click="clear2">
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
            <dynamic-table table-header-color="red" :columns="columns" :data-items="organizations" :actions="actions" />
               <q-pagination style="display: flex;justify-content: center;" v-if="organizations.length > 0" v-model="page" :max="totalPages" @input="onPageChange"
              direction-links flat color="grey" active-color="primary" />
          </md-card-content>
          <div v-if="organizations.length == 0">
            <md-empty-state md-rounded md-icon="description" md-label="Not Found !" md-description="No record founded">
            </md-empty-state>
          </div>

        </md-card>
      </div>
    </div>
    <MenuForm :users="users" @getOrganizations="retrieveAllOrganizations" ref="menuFormDialog" />
    <EditForm :organization="organization" @getOrganizations="retrieveAllOrganizations" :users="users"
      ref="editFormDialog" />
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure to delete this Organization</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Confirm" :loading="loading" @click="removeOrganization()" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import DynamicTable from "../../../components/Tables/DynamicTable.vue";
import OrganizationService from "../api/organization.service.js";
import UserService from "../../User/Api/index.js";
import { watch } from 'vue';
import MenuForm from "../components/MenuForm.vue";
import EditForm from "../components/EditForm.vue";
import { gsap } from 'gsap';
import { Notify } from 'quasar';

export default {
  name: "organizationList",
  components: {
    DynamicTable,
    MenuForm,
    EditForm
  },

  data() {
    return {
    current:1,
      showSearchInput: false,
      searchKeyword: '',
      loading: false,
      confirm: false,
      removeId: null,
      itemsPerPage: 20,
      queryCount: null,
      page: 1,
      previousPage: 1,
      users: [],
      propOrder: 'id',
      reverse: true,
      totalItems: 0,
      organizations: [],
      isFetching: false,
      showMenuForm: false,
      userService: new UserService(),
      organizationService: new OrganizationService(),
      organization: {},
      columns: [
        { label: "Name", field: "name" },
        { label: "Description", field: "description" },
        { label: "Enable", field: "enable" },
        { label: "CreateTime", field: "createTime", isCreateTime: true },

      ],
      sortModel: [
        'name',
        'createTime',
 
       
      ],
      selectedSort:'',
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
   computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    }
  },
  mounted() {
    this.retrieveAllOrganizations();
    const box = this.$refs.box;

    // Using GSAP to animate the row
    gsap.from(box, { duration: 0.5, opacity: 0, y: 1000, ease: "power1.out" });
    this.initRelationships();
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
    clear2() {
      this.searchKeyword = '';
      this.retrieveAllShops();
    },
    notifyNotfound(message) {
      Notify.create({

        message: message,
        timeout: 3000,
        position: 'center',
        color: 'blue'
      });
    },
    toggleSearch() {
      this.showSearchInput = !this.showSearchInput;
      if (this.showSearchInput) {
        this.$nextTick(() => this.$refs.searchInput.focus());
      }
    },
    performSearch() {
      // Your search logic here
      console.log('Search performed:', this.searchKeyword);
      this.organizationService.searchOrg(this.searchKeyword).then(res => {

        if (res.data.length == 0) {
          this.notifyNotfound("Not Found");
        }
        // Clear the users array
        this.organizations = [];
        // Assign the new data to the users array
        this.organizations = [...res.data];
      }).catch(err => {
        console.log(err)
      })
    }
    ,
    initRelationships() {
      this.userService
        .retrieve()
        .then(res => {
          this.users = res.data;

        });
    },
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
      if (this.removeId) {
        this.confirm = true;
      }
    },
    removeOrganization() {
      this.loading = true;
      this.organizationService.delete(this.removeId)
        .then(() => {

          this.removeId = null;
          this.loading = false;
          this.confirm = false;
          this.notifySuccess('Organization deleted succuessfuly!')
          this.retrieveAllOrganizations();
          // this.showAddItemDialog();
        })
        .catch(error => {
          this.loading = false;
          this.confirm = false;
          this.notifyError('Error happens on Deleting Organization');
        });
    },
    sort() {
      const result = [this.propOrder + ',' + (this.reverse ? 'desc' : 'asc')];
      if (this.propOrder !== 'id') {
        result.push('id');
      }
      return result;
    },
  
    transition() {
      this.retrieveAllOrganizations();
    },
    changeOrder(propOrder) {
      this.propOrder = propOrder;
      // this.reverse = !this.reverse;
      this.transition();
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
    showAddItemDialog() {
      // Show the MenuForm dialog
      this.$refs.menuFormDialog.showDialog = true;

    },
    editItem(item) {
      console.log("Editing item:", item);
      this.organization = item;
      this.$refs.editFormDialog.showDialogEdit = true;
    },
    deleteItem(item) {
      this.prepareRemove(item);
    }
  },
};
</script>
<style>
.table {
  padding: 1%;
}

.search-container {
  display: flex;
  justify-content: flex-end;
  align-items: end;
  text-align: end;
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
