<template>
  <q-dialog v-model="showDialog" class="customdialog" transition-show="rotate" transition-hide="rotate">
    <q-card class="q-pa-md" style="width: 600px; max-width: 90vw;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Add New Menu Item</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-input v-model="menuItem.name" label="Name" class="q-mb-md" />
        <q-input v-model="menuItem.price" label="Price" type="number" class="q-mb-md" />
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
        <q-select v-model="menuItem.shop" :options="shops" option-label="name" option-value="id" label="Shop"
        class="q-mb-md" v-if="accountService.hasAuthorities(authority.ORGANIZATION_ADMIN)"/>
        <q-select v-model="menuItem.catalog" :options="productCatalogs" option-label="name" option-value="id" label="Product Catalog"
        class="q-mb-md" />
        <q-uploader
      url="http://localhost:8081/upload"
      label="Click or Drag image of menu "
      @added="onFileAdded"
      @uploaded="onFileUploaded"
      :headers="uploadHeaders"
      :factory="uploadFactory"
    />

      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="Add" @click="addItem" />
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
export default {
  props: {
    productCatalogs: [],
    shops:[]
  },
  data() {
    
    return {
      showDialog: false,
      productService: new ProductService(),
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
     addItem() {
      console.log('Adding new menu item:', this.menuItem);


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
          console.log('New product added successfully.');
          this.showDialog = false;
          this.$emit('getProduct');
          this.resetMenuItem();
        })
        .catch(error => {
          console.error('Error adding new product:', error);
        });
    },
    cancelAddItem() {
      this.showDialog = false;
      this.resetMenuItem();
    },
    onFileAdded(files) {
      console.log('Files added:', files);
      const formDataFile = new FormData();
      formDataFile.append('file', files[0]);
      fileService.createFile(formDataFile).then(res=>{
 
        this.menuItem.imageUrl = res.data.fileUrl
      }).catch(err=>{
        console.log("err",err)
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
