<template>
    <q-dialog v-model="showDialogEdit" class="customdialog" transition-show="rotate" transition-hide="rotate">
         <q-card class="q-pa-md" style="width: 600px; max-width: 90vw;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Update Offer</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-input  v-model:number="specialOffers.newPrice" label="New Price" class="q-mb-md" :rules="[rules.required]" />

     
        <!-- <q-select v-model="specialOffersItem.tenant" :options="tenantOptions" label="Tenant" type="select" class="q-mb-md" /> -->
       
        
      
      

      <q-select filled v-model="specialOffers.priorityLevel" :options="options" label="Priority Level:" />
      <q-select ref="catalog" v-model="specialOffers.product" :options="products" option-label="name"
      option-value="id" label="Product " class="q-mb-md"  />
       
          <div class="date-picker" >
    <q-input filled v-model="specialOffers.startDate" mask="date" :rules="['date']" label="Start Date">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="specialOffers.startDate">
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
    <q-input filled v-model="specialOffers.endDate" mask="date" :rules="['date']" label="End Date">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="specialOffers.endDate">
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
     props: ['retrieveAllShops','products','shops','specialOffers'],
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
                  options: [
        1, 2, 3, 4, 5
      ],
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
                
        ];

        const valid = inputs.reduce((acc, input) => acc && input.validate(), true);

        if (valid) {
            this.updateItem();
        }
        },

        async updateItem() {
            this.loading = true;
            // console.log('Updating shopItem item:', this.shop);

            this.shopService.update(this.specialOffers)
                .then(() => {
                    // console.log(' Shop Updated successfully.');
                    this.loading = false;
                    this.showDialogEdit = false;

                    this.notifySuccess('Offer Updated successfully');
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
            this.specialOffers = {
              newPrice:0,
        priorityLevel:'',
        stateDate: '',
        endDate: '',
        product:null
                
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
            // console.log('Files added:', files);
            const formDataFile = new FormData();
            formDataFile.append('file', files[0]);
            fileService.createFile(formDataFile).then(res => {

                this.shop.shortcutIcon = res.data.fileName
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
