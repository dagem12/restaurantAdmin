<template>
  <q-dialog v-model="showDialog" class="customdialog" transition-show="rotate" transition-hide="rotate">
    <q-card class="q-pa-md" style="width: 600px; max-width: 90vw;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Add New Advert</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-input  v-model:number="specialOffersItem.newPrice" label="New Price" class="q-mb-md" :rules="[rules.required]" />

     
        <!-- <q-select v-model="specialOffersItem.tenant" :options="tenantOptions" label="Tenant" type="select" class="q-mb-md" /> -->
       
        
      
      

      <q-select filled v-model="specialOffersItem.priorityLevel" :options="options" label="Priority Level:" />
      <q-select ref="catalog" v-model="specialOffersItem.product" :options="products" option-label="name"
      option-value="id" label="Product " class="q-mb-md"  />
       
          <div class="date-picker" >
    <q-input filled v-model="specialOffersItem.startDate" mask="date" :rules="['date']" label="Start Date">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="specialOffersItem.startDate">
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
    <q-input filled v-model="specialOffersItem.endDate" mask="date" :rules="['date']" label="End Date">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="specialOffersItem.endDate">
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
  props: ['retrieveAllShops','products','shops'],
  data() {
    return {
      imageError: '',
      loading: false,
      showDialog: false,
      options: [
        1, 2, 3, 4, 5
      ],
      shopService: new ShopService(),
      uploadHeaders: {
        Authorization: 'Bearer YOUR_AUTH_TOKEN'
      },
      rules: {
        // required: val => !!val || 'Field is required',
        // email: val => /.+@.+\..+/.test(val) || 'Email must be valid',
        // minLength: len => val => (val && val.length >= len) || `Minimum ${len} characters required`,
        // onlyAlphabets: val => /^[a-zA-Z]+$/.test(val) || 'Only alphabets are allowed',
        // onlyNumbers: val => /^[0-9]+$/.test(val) || 'Only numbers are allowed',
        // validImage: file => {
        //   const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        //   const maxSize = 2 * 1024 * 1024; // 2MB

        //   if (!file) return 'Image is required';
        //   if (!allowedTypes.includes(file.type)) return 'Only JPEG, PNG, and GIF formats are allowed';
        //   if (file.size > maxSize) return 'Image size must be less than 2MB';

        //   return true;
        // }

      },
      specialOffersItem: {
        newPrice:0,
        priorityLevel:'',
        stateDate: '',
        endDate: '',
        product:null
      },


    };
  },

  methods: {
    validateForm() {

      // Perform form validation
      const inputs = [
    


      ];


      const valid = inputs.reduce((acc, input) => {
        if (input && input.validate) {
          return acc && input.validate(); // Validate if input has a validate method
        }
        return acc;
      }, true);
      

      // Validate using the validImage rule
      


      if (valid  == true) {
        this.addItem();
      }
    },
    async addItem() {
      this.loading = true;
    


     

      this.shopService.create(this.specialOffersItem)
        .then(() => {
         

          this.showDialog = false;
          this.loading = false;
          this.notifySuccess('Create Special offer successfully');
          this.$emit('getShop');

          this.resetMenuItem();
        })
        .catch(error => {
          this.loading = false;
          this.notifyError('Server Error');
         
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
      this.specialOffersItem = {
        imageUrl: '',
        title: "",
        stateDate:'',
        endDate:''
      };
    },
   
   
   



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
