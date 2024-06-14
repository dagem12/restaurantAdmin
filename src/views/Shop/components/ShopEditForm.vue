<template>
    <q-dialog v-model="showDialogEdit" class="customdialog" transition-show="rotate" transition-hide="rotate">
        <q-card class="q-pa-md" style="width: 600px; max-width: 90vw;">
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Update Shop</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section>
                <q-input ref="name" v-model="shop.name" label="Name" class="q-mb-md" :rules="[rules.required]" />

                <q-input v-model="shop.description" label="Description" type="textarea" class="q-mb-md" />
                <q-select v-model="shop.contact" :options="contactOptions" label="Contact" class="q-mb-md" />
                <q-select v-model="shop.tenant" :options="tenantOptions" label="Tenant" type="select" class="q-mb-md" />
                <q-toggle v-model="shop.enable" label="Enable" type="number" class="q-mb-md" />
                <q-input  ref="address" v-model="shop.address" label="Address" type="text" class="q-mb-md" :rules="[rules.required]" />
                <q-toggle v-model="shop.orderService" label="Order Service" class="q-mb-md" />

                <q-uploader ref="imageUploader" url="http://localhost:8081/upload" label="Click or Drag logo "
                    @added="onFileAdded" @uploaded="onFileUploaded" :headers="uploadHeaders" :factory="uploadFactory" />
                <label></label>

            </q-card-section>



            <q-card-actions align="right">
                <q-btn color="primary" label="Update" :loading="loading" @click="validateForm" />
                <q-btn color="secondary" label="Cancel" @click="cancelAddItem" />
            </q-card-actions>


        </q-card>
    </q-dialog>
</template>

<script>
import ShopService from "../Api/index.js";
import fileService from "../../../utils/file.service.js";
import { Notify } from 'quasar';
export default {
    props: {
        retrieveAllShops: {
            type: Function,
        },
        shop: {
            type: Object
        }
    },
    data() {
        return {
            imageError: '',
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
            showDialogEdit: false,
            showDialog: false,
            shopService: new ShopService(),
            uploadHeaders: {
                Authorization: 'Bearer YOUR_AUTH_TOKEN'
            },
            loading: false,
            shopItem: {
                name: '',
                tenant: null,
                description: '',
                address: '',
                enable: false,
                orderService: false,
                contact: null,
                shortcutIcon: ''
            },
            contactOptions: [
                { label: 'Abebe', value: '1' },
                { label: 'Kebede', value: '2' },
                { label: 'Rebede', value: '3' }
            ],
            tenantOptions: [
                { label: 'Et Restaurnt', value: '1' },
                { label: 'Kaldis Restaurant', value: '2' }
            ]

        };
    },
    methods: {
        validateForm() {

        // Perform form validation
        const inputs = [
            this.$refs.name,
            this.$refs.address,

        ];

        const valid = inputs.reduce((acc, input) => acc && input.validate(), true);

        if (valid) {
            this.updateItem();
        }
        },

        async updateItem() {
            this.loading = true;
            console.log('Updating shopItem item:', this.shop);


            const newShop = {
                id: this.shop?.id,
                name: this.shop?.name,
                tenant: this.shop?.tenant,
                description: this.shop?.description,
                address: this.shop?.address,
                enable: this.shop?.enable,
                orderService: this.shop?.orderService,
                contact: this.shop?.contact?.name,
                createTime: this.shop?.createTime,
                shortcutIcon: this.shop?.shortcutIcon,
                code: this.shop?.name,
                shopKey: this.shop?.shopKey
            };

            this.shopService.update(newShop)
                .then(() => {
                    console.log(' Shop Updated successfully.');
                    this.loading = false;
                    this.showDialogEdit = false;

                    this.notifySuccess('Shop Updated successfully');
                    this.$emit('getShop');
                    this.resetMenuItem();
                })
                .catch(error => {
                    this.loading = false;
                    this.showDialogEdit = false;
                    console.error('Error adding new Shop:', error);
                });
        },
        cancelAddItem() {
            this.showDialogEdit = false;
            this.resetMenuItem();
        },
        resetMenuItem() {
            this.shop = {
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
        onFileAdded(files) {
            console.log('Files added:', files);
            const formDataFile = new FormData();
            formDataFile.append('file', files[0]);
            fileService.createFile(formDataFile).then(res => {

                this.shop.shortcutIcon = res.data.fileUrl
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
