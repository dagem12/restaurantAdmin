<template>
  <q-dialog v-model="showDialog" class="customdialog" transition-show="rotate" transition-hide="rotate">
    <q-card class="q-pa-md" style="width: 600px; max-width: 90vw;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Add New Advert</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-input  v-model="advertItem.title" label="Title" class="q-mb-md" :rules="[rules.required]" />

     
        <!-- <q-select v-model="advertItem.tenant" :options="tenantOptions" label="Tenant" type="select" class="q-mb-md" /> -->
       
        <q-input ref="address" v-model="advertItem.address" label="Address" type="text" class="q-mb-md"
          :rules="[rules.required]" />
       
        <q-uploader ref="imageUploader" url="http://localhost:8081/upload" label="Click or Drag logo "
          @added="onFileAdded" :rules="[rules.validImage]" @uploaded="onFileUploaded" :headers="uploadHeaders" :factory="uploadFactory" />

          <div class="date-picker" >
    <q-input filled v-model="advertItem.stateDate" mask="date" :rules="['date']">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="advertItem.stateDate">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
  <div class="date-picker" >
    <q-input filled v-model="advertItem.endDate" mask="date" :rules="['date']">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="advertItem.endDate">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
      </q-card-section>
      <label v-if="imageError" style="color:red">{{ imageError }}</label>



      <q-card-actions align="right">
        <q-btn color="primary" label="Add" :loading="loading" @click="validateForm" />
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
      imageError: '',
      loading: false,
      showDialog: false,
      shopService: new ShopService(),
      uploadHeaders: {
        Authorization: 'Bearer YOUR_AUTH_TOKEN'
      },
      rules: {
        required: val => !!val || 'Field is required',
        email: val => /.+@.+\..+/.test(val) || 'Email must be valid',
        minLength: len => val => (val && val.length >= len) || `Minimum ${len} characters required`,
        onlyAlphabets: val => /^[a-zA-Z]+$/.test(val) || 'Only alphabets are allowed',
        onlyNumbers: val => /^[0-9]+$/.test(val) || 'Only numbers are allowed',
        validImage: file => {
          const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
          const maxSize = 2 * 1024 * 1024; // 2MB

          if (!file) return 'Image is required';
          if (!allowedTypes.includes(file.type)) return 'Only JPEG, PNG, and GIF formats are allowed';
          if (file.size > maxSize) return 'Image size must be less than 2MB';

          return true;
        }

      },
      advertItem: {
        title: '',
        // tenant: null,
        imageUrl: '',
        stateDate: '',
        endDate: false,
        organazation:""
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


      const valid = inputs.reduce((acc, input) => {
        if (input && input.validate) {
          return acc && input.validate(); // Validate if input has a validate method
        }
        return acc;
      }, true);
      const file = this.$refs.imageUploader.files[0]; // Access the uploaded file

      // Validate using the validImage rule
      const validImage = this.rules.validImage(file);
      if (validImage != true) {

        this.imageError = validImage;
      }


      if (valid && validImage == true) {
        this.addItem();
      }
    },
    async addItem() {
      this.loading = true;
      console.log('Adding new advertItem item:', this.advertItem);


     

      this.shopService.create(newShop)
        .then(() => {
         

          this.showDialog = false;
          this.loading = false;
          this.notifySuccess('Shop Advert successfully');
          this.$emit('getShop');

          this.resetMenuItem();
        })
        .catch(error => {
          this.loading = false;
          this.notifyError('Server Error');
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
      this.advertItem = {
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

        this.advertItem.imageUrl = res.data.fileName
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
.date-picker{
  margin-top: 15px;
}

::v-deep .q-field--filled .q-field__control:before {
  background: white !important;
  border: none;
}
::v-deep .q-field--filled .q-field__control{
  background: white !important;
  border-bottom: 1px solid rgba(163, 161, 161, 0.663);
}

::v-deep .q-uploader__header{
  background-color:#5335AB
}
</style>
