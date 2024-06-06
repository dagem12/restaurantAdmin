<template>
    <q-dialog v-model="showDialog" class="customdialog" transition-show="rotate" transition-hide="rotate">
        <q-card class="q-pa-md" style="width: 600px; max-width: 90vw;">
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Add New Menu Catalog</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section>
                <q-input v-model="menuItem.name" label="Name" class="q-mb-md" />

                <q-input v-model="menuItem.description" label="Description" type="textarea" class="q-mb-md" />
                <q-toggle v-model="menuItem.enable" label="Price" type="number" class="q-mb-md" />
                <q-uploader v-model="menuItem.poster" label="Upload Image" accept="image/*" class="q-mb-md" />


                <q-card-actions align="right">
                    <q-btn color="primary" label="Add" @click="addItem" />
                    <q-btn color="secondary" label="Cancel" @click="cancelAddItem" />
                </q-card-actions>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script>
import ProductCatalogService from '../menuCatalog/Api/index'
export default {
    data() {
        return {
            showDialog: false,
            menuItem: {
                name: '',
                enable: false,
                description: '',
                poster: null,

            },
            productCatalogService: new ProductCatalogService()

        };
    },
    methods: {
        async addItem() {
            console.log('Adding new ProductCatalog item:', this.menuItem);


            const newProduct = {
                name: this.menuItem.name,
                description: this.menuItem.description,
                enable: this.menuItem.enable,
                poster: this.menuItem.poster,

            };

            this.productCatalogService.create(newProduct)
                .then(() => {
                    console.log('New product  Menu Catalog successfully.');
                    this.showDialog = false;
                    this.resetMenuItem();
                })
                .catch(error => {
                    console.error('Error adding new Menu Catalog:', error);
                });
        },
        cancelAddItem() {
            this.showDialog = false;
            this.resetMenuItem();
        },
        resetMenuItem() {
            this.menuItem = {
                name: '',
                enable: false,
                description: '',
                poster: null,

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
