<template>
    <q-dialog v-model="showDialogEdit" class="customdialog" transition-show="rotate" transition-hide="rotate">
        <q-card class="q-pa-md" style="width: 600px; max-width: 90vw;">
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Update Menu Item</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section>
                <q-input ref="name" v-model="menu.name" label="Name" class="q-mb-md" :rules="[rules.required]"/>
                <q-input ref="price" v-model="menu.unitPrice" label="Price" type="number" class="q-mb-md" :rules="[rules.required, rules.onlyNumbers]"/>
                <q-input v-model="menu.description" label="Description" type="textarea" class="q-mb-md" />
                <!-- <q-select v-model="menuItem.category" :options="categoryOptions" label="Category" class="q-mb-md" /> -->
                <!-- <q-select
          v-model="menuItem.dietary"
          :options="dietaryOptions"
          label="Dietary Information"
          class="q-mb-md"
        /> -->
                <q-input v-model="menu.prepTime" label="Preparation Time (minutes)" type="number" class="q-mb-md" />
                <q-input v-model="menu.calories" label="Calories" type="number" class="q-mb-md" />
                <q-toggle v-model="menu.enable" label="Is Visible" class="q-mb-md" />
                <q-select  ref="shop" v-model="menu.shop" :options="shops" option-label="name" option-value="id" label="Shop"
                    class="q-mb-md" v-if="accountService.hasAuthorities(authority.ORGANIZATION_ADMIN)"  :rules="[rules.required]" />
                <q-select ref="catalog"  v-model="menu.catalog" :options="productCatalogs" option-label="name" option-value="id"
                    label="Product Catalog" class="q-mb-md"  :rules="[rules.required]"  />
                <q-uploader url="http://localhost:8081/upload" label="Click or Drag image of menu " @added="onFileAdded"
                    @uploaded="onFileUploaded" :headers="uploadHeaders" :factory="uploadFactory" />

            </q-card-section>

            <q-card-actions align="right">
                <q-btn color="primary" label="Update" :loading="loading" @click="validateForm" />
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
        shops: [],
        menu: {}
    },
    data() {

        return {
            showDialog: false,
            showDialogEdit: false,
            loading: false,
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
            ],
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
        };
    },
    methods: {
        validateForm() {

            // Perform form validation
            const inputs = [
                this.$refs.name,
                this.$refs.shop,
                this.$refs.catalog,
                this.$refs.price

            ];

            const valid = inputs.reduce((acc, input) => acc && input.validate(), true);

            if (valid) {
                this.addItem();
            }
            },
        addItem() {
            this.loading = true;
            console.log('updateing new menu item:', this.menu);


            const newProduct = {
                id: this.menu?.id,
                code: this.menu?.code,
                name: this.menu?.name,
                description: this.menu?.description,
                unitPrice: this.menu?.unitPrice,
                prepTime: this.menu?.prepTime,
                enable: this.menu?.enable,
                catalog: this.menu?.catalog,
                imageUrl: this.menu?.imageUrl,
                createTime: this.menu?.createTime,
                createBy: this.menu?.createBy

            };

            this.productService.update(newProduct)
                .then(() => {
                    console.log(' Menu Item Updated successfully.');
                    this.loading = false;
                    this.showDialogEdit = false;
                    this.notifySuccess('Menu Item updated successfully');
                    this.$emit('getProduct');
                    this.resetMenuItem();
                })
                .catch(error => {
                    this.showDialogEdit = false;
                    this.loading = false;
                    this.notifyError('Error Happens');
                    console.error('Error updating  Menu ITem:', error);
                });
        },
        cancelAddItem() {
            this.showDialogEdit = false;
            this.resetMenuItem();
        },
        onFileAdded(files) {
            console.log('Files added:', files);
            const formDataFile = new FormData();
            formDataFile.append('file', files[0]);
            fileService.createFile(formDataFile).then(res => {

                this.menu.imageUrl = res.data.fileName
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
            this.menu = {
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
