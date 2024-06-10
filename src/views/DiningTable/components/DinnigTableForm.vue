<template>
  <q-dialog v-model="showDialog" class="customdialog" transition-show="rotate" transition-hide="rotate">
    <q-card class="q-pa-md" style="width: 600px; max-width: 90vw;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Add New Dining Table</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-input v-model="diningItem.name" label="Name" class="q-mb-md" />

        <q-input v-model="diningItem.description" label="Description" type="textarea" class="q-mb-md" />
        <!-- <q-select v-model="diningItem.tenant" label="Organization" :options="organizations" option-label="name"
          option-value="id" class="q-mb-md" /> -->


        <q-select v-model="diningItem.shop" :options="shops" option-label="name" option-value="id" label="Shop"
          class="q-mb-md" v-if="accountService.hasAuthorities(authority.ORGANIZATION_ADMIN)"/>
        <q-toggle v-model="diningItem.enable" label="Enable" class="q-mb-md" />

      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="Add" @click="addItem" />
        <q-btn color="secondary" label="Cancel" @click="cancelAddItem" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import DiningService from "../Api/index.js";
import { Notify } from 'quasar';
import AccountService from "../../Login/api/account.service.js";
import { Authority } from "../../../utils/authority.js";
export default {
  props: {
    shops: [],
    organizations: []
  },
  data() {
    return {
      showDialog: false,
      diningService: new DiningService(),
      authority: new Authority(),
      accountService: new AccountService(),
      diningItem: {
        name: '',
        shop: null,
        description: '',
        enable: false,
        tenant: null
      }
    };
  },
  methods: {
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
    async addItem() {
      console.log('Adding new Dinind item:', this.diningItem);


      const newDining = {
        name: this.diningItem.name,
        shop: this.diningItem.shop,
        description: this.diningItem.description,
        enable: this.diningItem.enable,
        tenant: this.diningItem.tenant
      };

      this.diningService.create(newDining)
        .then(() => {
        
          this.showDialog = false;
          this.$emit('getDiningTable');
          this.notifySuccess('Dinnig Table added successfully');
         
          this.resetMenuItem();
        })
        .catch(error => {
          this.notifyError('error happens')
          console.error('Error adding new Dining Table:', error);
        });
    },
    cancelAddItem() {
      this.showDialog = false;
      this.resetMenuItem();
    },
    resetMenuItem() {
      this.diningItem = {
        name: '',
        shop: null,
        description: '',
        enable: false,
        tenant: null

      };
    }
  }
};
</script>

<style scoped>
.q-pa-md {
  padding: 16px;
}

.q-mb-md {
  margin-bottom: 16px;
}

.customdialog /deep/ .q-dialog__backdrop {
  backdrop-filter: blur(4px) !important;
}
</style>
