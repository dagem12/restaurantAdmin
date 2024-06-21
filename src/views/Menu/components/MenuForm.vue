<template>
  <q-dialog v-model="showDialog" class="customdialog" transition-show="rotate" transition-hide="rotate">
    <q-card class="q-pa-md" style="width: 600px; max-width: 90vw;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Add New Menu Item</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-input ref="name" v-model="menuItem.name" label="Name" class="q-mb-md" :rules="[rules.required]" />
        <q-input ref="price" v-model="menuItem.price" label="Price" type="number"
          :rules="[rules.required, rules.onlyNumbers]" class="q-mb-md" />
        <q-input v-model="menuItem.description" label="Description" type="textarea" class="q-mb-md" />
        <!-- <q-select v-model="menuItem.category" :options="categoryOptions" label="Category" class="q-mb-md" /> -->
        <!-- <q-select
          v-model="menuItem.dietary"
          :options="dietaryOptions"
          label="Dietary Information"
          class="q-mb-md"
        /> -->
        <q-input v-model="menuItem.prepTime" label="Preparation Time (minutes)" type="number" class="q-mb-md" />
        <q-input v-model="menuItem.calories" label="Calories" type="number" class="q-mb-md" />
        <q-toggle v-model="menuItem.isVisible" label="Is Visible" class="q-mb-md" />
        <q-select ref="shop" v-model="menuItem.shop" :options="shops" option-label="name" option-value="id" label="Shop"
          class="q-mb-md" v-if="accountService.hasAuthorities(authority.ORGANIZATION_ADMIN)"
          :rules="[rules.required]" />
        <q-select ref="catalog" v-model="menuItem.catalog" :options="productCatalogs" option-label="name"
          option-value="id" label="Product Catalog" class="q-mb-md" :rules="[rules.required]" />
        <q-uploader ref="imageUploader" :rules="[rules.validImage]" url="http://localhost:8081/upload"
          label="Click or Drag image of menu " @added="onFileAdded" @uploaded="onFileUploaded" :headers="uploadHeaders"
          :factory="uploadFactory" /><label style="color:red" v-if="imageError != null || imageError != ''">{{
            imageError
          }}</label>

      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="Add" :loading="loading" @click="validateForm" />
        <q-btn color="secondary" label="Cancel" @click="cancelAddItem" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import ProductService from '../menuList/Api/index'
import ProductCatalogService from '../menuCatalog/Api';
import AccountService from "../../Login/api/account.service.js";
import { Authority } from "../../../utils/authority.js";
import fileService from '../../../utils/file.service.js';
import { Notify } from 'quasar';
export default {
  props: {
    productCatalogs: [],
    shops: []
  },
  data() {

    return {
      imageError: '',
      showDialog: false,
      productService: new ProductService(),
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
      menuItem: {
        name: '',
        price: 0,
        description: '',
        category: null,
        dietary: null,
        prepTime: 0,
        ingredients: '',
        calories: 0,
        isVisible: true,
        imageUrl: null
      },
      loading: false,
      baseUrl: process.env.VUE_APP_SERVER_URL,
      productCatalogService: new ProductCatalogService(),
      authority: new Authority(),
      accountService: new AccountService(),
      categoryOptions: [
        { label: 'Appetizers', value: 'appetizers' },
        { label: 'Main Courses', value: 'main_courses' },
        { label: 'Desserts', value: 'desserts' },
        { label: 'Beverages', value: 'beverages' }
      ],
      dietaryOptions: [
        { label: 'Vegan', value: 'vegan' },
        { label: 'Vegetarian', value: 'vegetarian' },
        { label: 'Gluten-Free', value: 'gluten_free' },
        { label: 'Nut-Free', value: 'nut_free' },
        { label: 'Dairy-Free', value: 'dairy_free' }
      ]
    };
  },
  methods: {
    validateForm() {

     
      let inputs=[];
      if(this.accountService.hasAuthorities(this.authority.ORGANIZATION_ADMIN)){
             inputs = [
             this.$refs.name,
        this.$refs.price,
        this.$refs.shop,
        this.$refs.catalog
        ];
        }else if(this.accountService.hasAuthorities(this.authority.SHOP_ADMIN)){
            inputs = [
            this.$refs.name,
        this.$refs.price,
        this.$refs.catalog
        ];
        }


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
    addItem() {
      // console.log('Adding new menu item:', this.menuItem);

      this.loading = true;
      const newProduct = {
        name: this.menuItem.name,
        description: this.menuItem.description,
        unitPrice: this.menuItem.price,
        enable: this.menuItem.isVisible,
        catalog: this.menuItem.catalog,
        imageUrl: this.menuItem.imageUrl,
        shop: this.menuItem.shop

      };

      this.productService.create(newProduct)
        .then(() => {
          // console.log('New product added successfully.');
          this.showDialog = false;
          this.loading = false;
          this.notifySuccess('New Menu Item created successfully')

          this.$emit('getProduct');
          this.resetMenuItem();
        })
        .catch(error => {
          this.loading = false;
          this.notifyError('Server Error')
          console.error('Error adding new product:', error);
        });
    },
    cancelAddItem() {
      this.showDialog = false;
      this.resetMenuItem();
    },
    onFileAdded(files) {
      // console.log('Files added:', files);
      const formDataFile = new FormData();
      formDataFile.append('file', files[0]);
      fileService.createFile(formDataFile).then(res => {

        this.menuItem.imageUrl = res.data.fileName
      }).catch(err => {
        console.log("err", err)
      })
    },
    onFileUploaded(response) {
      // console.log('File uploaded:', response);
    },
    uploadFactory(files) {
      // Customize how files are uploaded, if necessary
      return files.map(file => ({
        url: 'http://localhost:8081/upload',
        formData: {
          file
        }
      }));
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

    resetMenuItem() {
      this.menuItem = {
        name: '',
        price: 0,
        description: '',
        category: null,
        dietary: null,
        prepTime: 0,
        ingredients: '',
        calories: 0,
        isVisible: true,
        image: null
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
