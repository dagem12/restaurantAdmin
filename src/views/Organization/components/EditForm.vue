<template>

    <q-dialog v-model="showDialogEdit" class="customdialog" transition-show="rotate" transition-hide="rotate">
        <q-card class="q-pa-md" style="width: 600px; max-width: 90vw;">
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Update Organization</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section>
                <q-input v-model="organization.name" label="Name" class="q-mb-md" />

                <q-input v-model="organization.description" label="Description" type="textarea" class="q-mb-md" />
                <q-input v-model="organization.tinNumber" label="Tin Number" type="number" class="q-mb-md" />
                <q-input v-model="organization.merchantId" label="Merchant Id" class="q-mb-md" />
                <q-input v-model="organization.merchantCode" label="Merchant Code" class="q-mb-md" />
                <q-toggle v-model="organization.orderService" label="Order Service" class="q-mb-md" />
                <q-select v-model="organization.admin" :options="users" option-label="login" option-value="id"
                    label="Admin" class="q-mb-md" />
                <q-toggle v-model="organization.enable" label="Enable" class="q-mb-md" />

                <!-- <q-select v-model="organizationItem.admin" label="Admin" class="q-mb-md" /> -->
            </q-card-section>
            <!-- <div style="display: flex; width:40%;margin-left: 5%;">
        <div> <label for="">Admin</label></div>
        <div style="margin-left: 3%;"><select v-model="organizationItem.admin.id" style="padding:5px;">

            <option :value="userOption.id" v-for="userOption in users" :key="userOption.id">
              {{ userOption.login }}
            </option>
          </select></div>
      </div> -->

            <q-card-actions align="right">
                <q-btn color="primary" label="Update" :loading="loading" @click="updateItem" />
                <q-btn color="secondary" label="Cancel" @click="cancelAddItem" />
            </q-card-actions>
        </q-card>
    </q-dialog>


</template>

<script>
import OrganizationService from "../api/organization.service.js";
import { Notify } from 'quasar';

export default {
    props: {
        users: [],
        organization: {}
    },
    data() {
        return {
            loading: false,
            showDialogEdit: false,
            organizationService: new OrganizationService(),
            alertSuccuss: false,

            // organization: {
            //     name: '',
            //     merchantId: '',
            //     description: '',
            //     merchantCode: null,
            //     tinNumber: null,
            //     orderService: false,
            //     admin: null,
            //     enable: false
            // }
        };
    },
    mounted() {

    },


    methods: {

        async updateItem() {
            this.loading = true;
            console.log('Update Organization item:', this.organization);


            const newOrganization = {
                id: this.organization?.id,
                name: this.organization?.name,
                merchantId: this.organization?.merchantId,
                description: this.organization?.description,
                merchantCode: this.organization?.merchantCode,
                tinNumber: this.organization?.tinNumber,
                orderService: this.organization?.orderService,
                admin: this.organization?.admin,
                enable: this.organization?.enable
            };

            this.organizationService.update(newOrganization)
                .then(() => {
                    console.log(' Organization Updated successfully.');
                    this.showDialogEdit = false;
                    this.loading = false;
                    this.notifySuccess('Organization Updated successfully');
                    this.$emit('getOrganizations');
                    this.resetMenuItem();
                })
                .catch(error => {
                    this.showDialogEdit = false;
                    this.loading = false;
                    console.error('Error Updating Organization:', error);
                    this.notifyError("error happen")
                });
        },
        cancelAddItem() {
            this.showDialogEdit = false;
            this.resetMenuItem();
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
            this.organizationItem = {
                name: '',
                merchantId: '',
                description: '',
                merchantCode: null,
                tinNumber: null,
                orderService: false,
                admin: {
                    id: null
                },
                enable: false
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
</style>
