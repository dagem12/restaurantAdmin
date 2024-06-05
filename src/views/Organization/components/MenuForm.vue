<template>
  <q-dialog v-model="showDialog" class="customdialog" transition-show="rotate" transition-hide="rotate">
    <q-card class="q-pa-md" style="width: 600px; max-width: 90vw;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Add New Organization</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-input v-model="organizationItem.name" label="Name" class="q-mb-md" />

        <q-input v-model="organizationItem.description" label="Description" type="textarea" class="q-mb-md" />

        <q-input v-model="organizationItem.merchantId" label="Merchant Id" type="number" class="q-mb-md" />
        <q-input v-model="organizationItem.merchantCode" label="Merchant Code" type="number" class="q-mb-md" />
        <q-toggle v-model="organizationItem.orderService" label="Order Service" class="q-mb-md" />
        <q-select v-model="organizationItem.admin" label="Admin" class="q-mb-md" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="Add" @click="addItem" />
        <q-btn color="secondary" label="Cancel" @click="cancelAddItem" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import OrganizationService from "../api/organization.service.js";
export default {
  data() {
    return {
      showDialog: false,
      organizationService: new OrganizationService(),
      organizationItem: {
        name: '',
        merchantId: '',
        description: '',
        merchantCode: null,
        tinNumber: null,
        orderService: '',
        admin: '',
      }
    };
  },
  methods: {
    async addItem() {
      console.log('Adding new Organization item:', this.organizationItem);


      const newOrganization = {
        name: this.organizationItem.name,
        merchantId: this.organizationItem.merchantId,
        description: this.organizationItem.description,
        merchantCode: this.organizationItem.merchantCode,
        tinNumber: this.organizationItem.tinNumber,
        orderService: this.organizationItem.orderService,
        admin: this.organizationItem.admin
      };

      this.organizationService.create(newOrganization)
        .then(() => {
          console.log('New Organization added successfully.');
          this.showDialog = false;
          this.resetMenuItem();
        })
        .catch(error => {
          console.error('Error adding new Organization:', error);
        });
    },
    cancelAddItem() {
      this.showDialog = false;
      this.resetMenuItem();
    },
    resetMenuItem() {
      this.organizationItem = {
        name: '',
        merchantId: '',
        description: '',
        merchantCode: null,
        tinNumber: null,
        orderService: '',
        admin: '',
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
