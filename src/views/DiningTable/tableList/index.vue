<template>
  <div class="content">
    <div class="md-layout" ref="box">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header :data-background-color="vaColor" class="header-with-button">
            <div>
              <h4 class="title">Dining Tables</h4>
              <p class="category">Explore and manage your Dining Tables</p>
            </div>
            <div style="display: flex;">
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
            <dynamic-table table-header-color="red" :columns="columns" :data-items="diningTables" :actions="actions" />
            <q-pagination v-if="diningTables.length > 0" v-model="current" :max="totalPages"
              @update:model-value="loadPage" direction-links flat color="grey" active-color="primary" />
          </md-card-content>
          <div v-if="diningTables.length == 0">
            <md-empty-state md-rounded md-icon="description" md-label="Not Found !" md-description="No record founded">
            </md-empty-state>
          </div>
        </md-card>
      </div>
    </div>
    <MenuForm :shops="shops" :organizations="organizations" ref="menuFormDialog"
      @getDiningTable="retrieveAllDiningTables" />
    <DiningTableEditForm :shops="shops" :organizations="organizations" ref="editFormDialog"
      @getDiningTable="retrieveAllDiningTables" :dining="dining" />
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure to delete this Table</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Confirm" :loading="loading" @click="removeDiningTable()" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import DynamicTable from "../../../components/Tables/DynamicTable.vue";
import DiningTableService from "../Api/index.js";
import MenuForm from "../components/DinnigTableForm";
import DiningTableEditForm from "../components/DiningTableEditForm";
import ShopService from "../../Shop/Api/index.js";
import OrganizationService from "../../Organization/api/organization.service.js";
import AccountService from "../../Login/api/account.service.js";
import { Notify } from 'quasar';
import QRCode from 'qrcode';
import { gsap } from 'gsap';
import { accountStore } from "../../../store/modules/user/index.js";
// import QRCode from 'qrcode';

export default {
  name: "diningTableList",
  components: {
    DynamicTable,
    MenuForm,
    DiningTableEditForm
  },
  data() {
    return {
      current: 1,
      showSearchInput: false,
      searchKeyword: '',
      columns: [
        { label: "Id", field: "id" },
        { label: "Name", field: "name" },
        { label: "Description", field: "description" },
        { label: "CreateTime", field: "createTime", isCreateTime: true },
        { label: "Enable", field: "enable" },
        { label: "CreateBy", field: "createBy" },
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
        {

          label22: "GenerateQR",
          method: this.generateQR,
          loadingS: false
        },
      ],
      dining: {},
      confirm: false,
      loading: false,
      removeId: null,
      itemsPerPage: 20,
      queryCount: null,
      page: 1,
      previousPage: 1,
      propOrder: "createTime",
      reverse: true,
      totalItems: 0,
      diningTables: [],
      isFetching: false,
      diningTableService: new DiningTableService(),
      vaColor: "#5335AB",
      shopService: new ShopService(),
      organizationService: new OrganizationService(),
      accountService: new AccountService(),
      organizations: [],
      shops: [],

    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    }
  },
  mounted() {
    this.retrieveAllDiningTables();
    const box = this.$refs.box;

    // Using GSAP to animate the row
    gsap.from(box, { duration: 0.5, opacity: 0, y: 1000, ease: "power1.out" });
    this.initRelationships();
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
      immediate: true, // This ensures the watch is triggered immediately after the component is created
      deep: true // This allows the watch to watch for changes in nested properties of the prop
    }
  },
  methods: {
    clear2() {
      this.searchKeyword = '';
      this.retrieveAllDiningTables();
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
      this.diningTableService.searchDine(this.searchKeyword).then(res => {
        if (res.data.length == 0) {
          this.notifyNotfound("Not Found");
        }


        // Clear the po array
        console.log("am IN", this.diningTables);
        this.diningTables = [];
        // Assign the new data to the po array
        this.diningTables = [...res.data];
        console.log("haha in", this.diningTables);
      }).catch(err => {

        console.log(err)
      })
    }
    ,
    clear() {
      this.page = 1;
      this.retrieveAllDiningTables();
    },
    async generateQR(item) {
      this.actions[2].loadingS = true;
      const tableId = item?.tableId;
      const shopKey = item?.shop?.shopKey;
      try {
        const qrText = `${shopKey}/${tableId}`;
        const qrCodeImage = await QRCode.toDataURL(qrText);

        const downloadLink = document.createElement('a');
        downloadLink.href = qrCodeImage;
        downloadLink.download = item?.name + '_' + 'qr_code.png';

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        this.actions[2].loadingS = false;
      } catch (error) {
        console.error('Error generating QR code:', error);
        this.actions[2].loadingS = false;
      }
    },
    retrieveAllDiningTables() {
      this.isFetching = true;
      const paginationQuery = {
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      };
      this.diningTableService
        .retrieve(paginationQuery)
        .then(res => {
          this.diningTables = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
          console.log("dining tables", this.diningTables)
        })
        .catch(err => {
          this.isFetching = false;

        });
    },
    prepareRemove(instance) {
      this.removeId = instance.id;
      if (this.removeId) {
        this.confirm = true;
      }
    },

    handleSyncList() {
      this.clear();
    },
    removeDiningTable() {
      this.loading = true;
      this.diningTableService
        .delete(this.removeId)
        .then(() => {


          this.removeId = null;
          this.loading = false;
          this.confirm = false;
          this.notifySuccess('Table deleted succuessfuly!')
          this.retrieveAllDiningTables();
        })
        .catch(error => {
          this.loading = false;
          this.confirm = false;
          this.notifyError('Error happens on Deleting Table');
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
        this.current = page;
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
    editItem(item) {
      console.log("Editing item:", item);
      this.dining = item;
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
    showAddItemDialog() {
      // Show the MenuForm dialog
      this.$refs.menuFormDialog.showDialog = true;
    },
    initRelationships() {

      // this.organizationService
      //   .retrieve()
      //   .then(res => {
      //     this.organizations = res.data;
      //   }).catch(err=>{
      //     console.log(err)
      //   });

      this.shopService
        .retrieve()
        .then(res => {
          this.shops = res.data;
        }).catch(err => {
          console.log(err)
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

::v-deep .md-card-header {
  justify-content: space-between;
}

.add-item-button {
  margin-top: 10px;
}

.custom-input .q-field__native {
  color: white !important;
}

.md-card-header {
  background-color: #5335AB !important;
}
</style>
