<template>
    <q-dialog v-model="showDialogEdit" class="customdialog" transition-show="rotate" transition-hide="rotate">
        <q-card class="q-pa-md" style="width: 600px; max-width: 90vw;">
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Update Dining Table</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section>
                <q-input  ref="name" v-model="dining.name" label="Name" class="q-mb-md" :rules="[rules.required]"/>

                <q-input v-model="dining.description" label="Description" type="textarea" class="q-mb-md" />
                <!-- <q-select v-model="diningItem.tenant" label="Organization" :options="organizations" option-label="name"
          option-value="id" class="q-mb-md" /> -->


                <q-select ref="shop" v-model="dining.shop" :options="shops" option-label="name" option-value="id" label="Shop"
                    class="q-mb-md" v-if="accountService.hasAuthorities(authority.ORGANIZATION_ADMIN)" :rules="[rules.required]" />
                <q-toggle v-model="dining.enable" label="Enable" class="q-mb-md" />

            </q-card-section>

            <q-card-actions align="right">
                <q-btn color="primary" label="Update" :loading="loading" @click="validateForm" />
                <q-btn color="secondary" label="Cancel" @click="cancelAddItem" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import DiningService from "../Api/index.js";
import { Notify } from 'quasar';
import AccountService from "../../Login/api/account.service.js";
import { Authority } from "../../../utils/authority.js";
export default {
    props: {
        shops: [],
        organizations: [],
        dining: {}
    },
    data() {
        return {
            showDialogEdit: false,
            showDialog: false,
            loading: false,
            diningService: new DiningService(),
            authority: new Authority(),
            accountService: new AccountService(),
            diningItem: {
                name: '',
                shop: null,
                description: '',
                enable: false,
                tenant: null
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
        };
    },
    methods: {
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
        validateForm() {

            let inputs=[];
      if(this.accountService.hasAuthorities(this.authority.ORGANIZATION_ADMIN)){
             inputs = [
        this.$refs.name,
        this.$refs.shop,



        ];
        }else if(this.accountService.hasAuthorities(this.authority.SHOP_ADMIN)){
            inputs = [
        this.$refs.name,
      

        ];
        }

            const valid = inputs.reduce((acc, input) => acc && input.validate(), true);

            if (valid) {
            this.addItem();
            }
            },
        async addItem() {
            console.log('Updating new Dining item:', this.dining);
            this.loading = true;

       

            this.diningService.update(this.dining)
                .then(() => {
                    this.loading = false;
                    this.showDialogEdit = false;
                    this.$emit('getDiningTable');

                    this.notifySuccess('Dinnig Table updated successfully');

                    this.resetMenuItem();
                })
                .catch(error => {
                    this.loading = false;
                    this.showDialogEdit = false;
                    this.notifyError('error happens');
                    console.error('Error  updating Dining Table:', error);
                });
        },
        cancelAddItem() {
            this.showDialogEdit = false;
            this.resetMenuItem();
        },
        resetMenuItem() {
            this.dining = {
                name: '',
                shop: null,
                description: '',
                enable: false,
                tenant: null

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
