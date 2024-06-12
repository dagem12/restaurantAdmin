<template>
  <div class="content">
    <div class="md-layout" ref="diningbox">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="" class="header-with-button">
            <div>
              <h4 class="title">Shops</h4>
              <p class="category">Explore and manage your shops</p>
            </div>
            <!-- Add Item button -->
            <div style="display: flex;">
              <div class="search-container">
                <q-input v-model="searchKeyword" v-show="showSearchInput" @keyup.enter="performSearch"
                  placeholder="Enter search keyword" class="custom-input"></q-input>
                <div style="padding: 10px;" @click="toggleSearch">
                  <md-icon label="Search" style="color:white !important">search</md-icon>
                </div>

                <!-- <q-btn @click="toggleSearch" label="Search" color="primary"></q-btn> -->
              </div>
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
            <dynamic-table table-header-color="red" :columns="columns" :data-items="shops" :actions="actions" />
          </md-card-content>
        </md-card>
      </div>
    </div>
    <MenuForm ref="menuFormDialog" @getShop="retrieveAllShops" />
    <ShopEditForm ref="editFormDialog" :shop="shop" @getShop="retrieveAllShops" />
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure to delete this shop</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Confirm" :loading="loading" @click="removeShop()" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>


<script>
import DynamicTable from "../../../components/Tables/DynamicTable.vue";
import { mapActions, mapState } from 'vuex';
import ShopService from '../Api/index';
import MenuForm from "../components/ShopForm.vue";
import ShopEditForm from "../components/ShopEditForm.vue";
import { gsap } from 'gsap';
import { Notify } from 'quasar';

export default {
  name: "shopList",
  components: {
    DynamicTable,
    MenuForm,
    ShopEditForm
  },
  data() {
    return {
      showSearchInput: false,
      searchKeyword: '',
      columns: [
        { label: "Id", field: "id" },
        { label: "Name", field: "name" },
        { label: "Description", field: "description" },
        { label: "Enable", field: "enable" },
        { label: "CreateTime", field: "createTime", isCreateTime: true },
        { label: "Address", field: "address" },
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
      loading: false,
      itemsPerPage: 20,
      queryCount: null,
      page: 1,
      previousPage: 1,
      propOrder: 'createTime',
      reverse: true,
      totalItems: 0,
      shops: [],
      isFetching: false,
      shopService: new ShopService(),
      confirm: false,
      shop: {},
      searchWord: ''
    };
  },
  mounted() {
    this.retrieveAllShops();
    const diningbox = this.$refs.diningbox;

    // Using GSAP to animate the row
    gsap.from(diningbox, { duration: 0.5, opacity: 0, y: 1000, ease: "power1.out" });
  },
  methods: {
    toggleSearch() {
      this.showSearchInput = !this.showSearchInput;
      if (this.showSearchInput) {
        this.$nextTick(() => this.$refs.searchInput.focus());
      }
    },
    performSearch() {
      // Your search logic here
      console.log('Search performed:', this.searchKeyword);
    }
    ,
    addItem() {
      // Define your add item logic here
    },
    editItem(item) {
      console.log("editing", item)
      this.shop = item;
      this.$refs.editFormDialog.showDialogEdit = true;

      // Define your edit item logic here
    },
    deleteItem(item) {
      this.prepareRemove(item);
    },
    generateQR(item) {

    },
    clear() {
      this.page = 1;
      this.retrieveAllShops();
    },
    retrieveAllShops() {
      console.log("data ", this.shops)
      this.isFetching = true;
      const paginationQuery = {
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      };

      this.shopService.retrieve(paginationQuery)
        .then(
          res => {
            console.log(res)
            this.shops = res.data;
            this.totalItems = Number(res.headers['x-total-count']);
            this.queryCount = this.totalItems;
            this.isFetching = false;
            console.log("data ", this.shops)
          },

        ).catch(err => {
          console.log(err)
          this.isFetching = false;

        });
      console.log("data data")
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
    removeShop() {
      this.loading = true;
      this.shopService.delete(this.removeId)
        .then(() => {

          this.loading = false;
          this.confirm = false;
          this.notifySuccess('Shop deleted succuessfuly!')
          this.removeId = null;

          this.retrieveAllShops();

        })
        .catch(error => {
          this.loading = false;
          this.confirm = false;

          this.notifyError('Error happens on Deleting shop')

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
      this.retrieveAllShops();
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
    showAddItemDialog() {
      // Show the MenuForm dialog

      this.$refs.menuFormDialog.showDialog = true;
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


.md-card-header {
  background-color: #5335AB !important;
}

.custom-input .q-field__native {
  color: white !important;
}

.md-button {
  background-color: #5335AB !important;
}
</style>
