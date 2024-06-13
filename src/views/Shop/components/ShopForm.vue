<template>
  <q-dialog v-model="showDialog" class="customdialog" transition-show="rotate" transition-hide="rotate">
    <q-card class="q-pa-md" style="width: 600px; max-width: 90vw;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Add New Shop</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-input ref="name" v-model="shopItem.name" label="Name" class="q-mb-md" :rules="[rules.required]" />

        <q-input v-model="shopItem.description" label="Description" type="textarea" class="q-mb-md" />
        <!-- <q-select v-model="shopItem.contact" :options="contactOptions" label="Contact" class="q-mb-md" /> -->
        <!-- <q-select v-model="shopItem.tenant" :options="tenantOptions" label="Tenant" type="select" class="q-mb-md" /> -->
        <q-toggle v-model="shopItem.enable" label="Enable" type="number" class="q-mb-md" />
        <q-input ref="address" v-model="shopItem.address" label="Address" type="text" class="q-mb-md"
          :rules="[rules.required]" />
        <q-toggle v-model="shopItem.orderService" label="Order Service" class="q-mb-md" />

        <q-uploader url="http://localhost:8081/upload" label="Click or Drag logo " @added="onFileAdded"
          @uploaded="onFileUploaded" :headers="uploadHeaders" :factory="uploadFactory" />


      </q-card-section>



      <q-card-actions align="right">
        <q-btn color="primary" label="Add" @click="validateForm" />
        <q-btn color="secondary" label="Cancel" @click="cancelAddItem" />
      </q-card-actions>


    </q-card>
  </q-dialog>
</template>

<script>
import ShopService from "../Api/index.js";
import fileService from "../../../utils/file.service.js"
import { Notify } from 'quasar';
export default {
  props: ['retrieveAllShops'],
  data() {
    return {
      showDialog: false,
      shopService: new ShopService(),
      uploadHeaders: {
        Authorization: 'Bearer YOUR_AUTH_TOKEN'
      },
      rules: {
        required: val => !!val || 'Field is required',
        email: val => /.+@.+\..+/.test(val) || 'Email must be valid',
        minLength: len => val => (val && val.length >= len) || `Minimum ${len} characters required`,
        onlyAlphabets: val => /^[a-zA-Z]+$/.test(val) || 'Only alphabets are allowed'
      },
      shopItem: {
        name: '',
        // tenant: null,
        description: '',
        address: '',
        enable: false,
        orderService: false,
        // contact: null,
        shortcutIcon: ''
      },


    };
  },
  methods: {
    validateForm() {

      // Perform form validation
      const inputs = [
        this.$refs.name,
        this.$refs.address

      ];

      const valid = inputs.reduce((acc, input) => acc && input.validate(), true);

      if (valid) {
        this.addItem();
      }
    },
    async addItem() {
      console.log('Adding new shopItem item:', this.shopItem);


      const newShop = {
        name: this.shopItem.name,
        // tenant: this.shopItem.tenant,
        description: this.shopItem.description,
        address: this.shopItem.address,
        enable: this.shopItem.enable,
        orderService: this.shopItem.orderService,
        // contact: this.shopItem.contact.name,
        shortcutIcon: this.shopItem.shortcutIcon,
        code: this.shopItem.name
      };

      this.shopService.create(newShop)
        .then(() => {
          console.log('New Shop added successfully.');

          this.showDialog = false;
          this.notifySuccess('Shop added successfully');
          this.$emit('getShop');
          this.resetMenuItem();
        })
        .catch(error => {
          console.error('Error adding new Shop:', error);
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
        shortcutIcon: ""
      };
    },
    onFileAdded(files) {
      console.log('Files added:', files);
      const formDataFile = new FormData();
      formDataFile.append('file', files[0]);
      fileService.createFile(formDataFile).then(res => {

        this.shopItem.shortcutIcon = res.data.fileName
      }).catch(err => {
        console.log("err", err)
      })
    },
    onFileUploaded(response) {
      console.log('File uploaded:', response);
    },
    uploadFactory(files) {
      // Customize how files are uploaded, if necessary
      return files.map(file => ({
        url: 'http://localhost:8081/upload',
        formData: {
          file
        }
      }));
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
