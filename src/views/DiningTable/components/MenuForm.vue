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

        <q-input v-model="diningItem.shop" label="Shop" class="q-mb-md" />
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
export default {
  data() {
    return {
      showDialog: false,
      diningService: new DiningService(),
      diningItem: {
        name: '',
        shop: '',
        description: '',
        enable: false
      }
    };
  },
  methods: {
    async addItem() {
      console.log('Adding new Dinind item:', this.diningItem);


      const newDining = {
        name: this.diningItem.name,
        shop: this.diningItem.shop,
        description: this.diningItem.description,
        enable: this.diningItem.enable
      };

      this.diningService.create(newDining)
        .then(() => {
          console.log('New Dining added successfully.');
          this.showDialog = false;
          this.resetMenuItem();
        })
        .catch(error => {
          console.error('Error adding new Dining Table:', error);
        });
    },
    cancelAddItem() {
      this.showDialog = false;
      this.resetMenuItem();
    },
    resetMenuItem() {
      this.diningItem = {
        name: this.diningItem.name,
        shop: this.diningItem.shop,
        description: this.diningItem.description,
        enable: this.diningItem.enable
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
