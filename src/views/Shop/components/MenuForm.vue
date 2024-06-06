<template>
  <q-dialog v-model="showDialog" class="customdialog" transition-show="rotate" transition-hide="rotate">
    <q-card class="q-pa-md" style="width: 600px; max-width: 90vw;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Add New Shop</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-input v-model="shopItem.name" label="Name" class="q-mb-md" />

        <q-input v-model="shopItem.description" label="Description" type="textarea" class="q-mb-md" />
        <q-select v-model="shopItem.contact" :options="contactOptions" label="Contact" class="q-mb-md" />
        <q-select v-model="shopItem.tenant" :options="tenantOptions" label="Tenant" type="select" class="q-mb-md" />
        <q-toggle v-model="shopItem.enable" label="Enable" type="number" class="q-mb-md" />
        <q-input v-model="shopItem.address" label="Address" type="text" class="q-mb-md" />
        <q-toggle v-model="shopItem.orderService" label="Order Service" class="q-mb-md" />

      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="Add" @click="addItem" />
        <q-btn color="secondary" label="Cancel" @click="cancelAddItem" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import ShopService from "../Api/index.js";
export default {
  data() {
    return {
      showDialog: false,
      shopService: new ShopService(),
      shopItem: {
        name: '',
        tenant: null,
        description: '',
        address: '',
        enable: false,
        orderService: false,
        contact: null,
      },
      contactOptions: [
        { label: 'Abebe', value: '1' },
        { label: 'Kebede', value: '2' },
        { label: 'Rebede', value: '3' }
      ],
      tenantOptions: [
        { label: 'Et Restaurnt', value: '1' },
        { label: 'Kaldis Restaurant', value: '2' }
      ],
    };
  },
  methods: {
    async addItem() {
      console.log('Adding new shopItem item:', this.shopItem);


      const newShop = {
        name: this.shopItem.name,
        tenant: this.shopItem.tenant,
        description: this.shopItem.description,
        address: this.shopItem.address,
        enable: this.shopItem.enable,
        orderService: this.shopItem.orderService,
        contact: this.shopItem.contact
      };

      this.shopService.create(newShop)
        .then(() => {
          console.log('New Shop added successfully.');
          this.showDialog = false;
          this.resetMenuItem();
        })
        .catch(error => {
          console.error('Error adding new Shop:', error);
        });
    },
    cancelAddItem() {
      this.showDialog = false;
      this.resetMenuItem();
    },
    resetMenuItem() {
      this.shopItem = {
        name: '',
        tenant: null,
        description: '',
        address: '',
        enable: '',
        orderService: '',
        contact: null,
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
