<template>
    <q-dialog v-model="showDialogEdit" class="customdialog" transition-show="rotate" transition-hide="rotate">
        <q-card class="q-pa-md" style="width: 600px; max-width: 90vw;">
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Update User</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section>
                <q-input ref="login" v-model="user.login" label="User Name*" class="q-mb-md" :rules="[rules.required]" />
                <q-input ref="firstName" v-model="user.firstName" label="First Name*" class="q-mb-md"  :rules="[rules.required, rules.onlyAlphabets]"  />
                <q-input ref="lastName" v-model="user.lastName" label="Last Name*" class="q-mb-md"  :rules="[rules.required, rules.onlyAlphabets]" />
                <q-input  ref="email" v-model="user.email" label="Email*" class="q-mb-md" :rules="[rules.required, rules.email]" />
                <q-toggle v-model="user.activated" label="Activated" class="q-mb-md" />

                <q-select ref="org" :rules="[rules.required]"  v-if="this.accountService.hasAuthorities(this.authority.ADMIN)" v-model="user.orgId"
                    label="Organization*" :options="organizations" option-label="name" option-value="id"
                    class="q-mb-md" />

                <q-select ref="shop"  v-model="user.shopId"   :rules="[rules.required]" v-if="this.accountService.hasAuthorities(this.authority.ORGANIZATION_ADMIN)" label="Shop*" :options="shops" option-label="name" option-value="id"
                    class="q-mb-md" />
                <q-select ref="authority" v-model="user.authorities" label="Authority*" :options="authorities" option-label="label"
                    option-value="value" multiple class="q-mb-md" :rules="[rules.required]"/>

            </q-card-section>

            <q-card-actions align="right">
                <q-btn color="primary" label="Update" :loading="loading" @click="validateForm" />
                <q-btn color="secondary" label="Cancel" @click="cancelAddItem" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import UserService from "../Api/index.js";
import AccountService from "../../Login/api/account.service";
import { Authority } from "../../../utils/authority";
import { Loading, Notify } from 'quasar';
export default {
    data() {
        return {

            showDialog: false,
            userService: new UserService(),

            authority: new Authority(),
            accountService: new AccountService(),
            loading: false,
            showDialogEdit: false,
            rules: {
        required: val => !!val || 'Field is required',
        email: val => /.+@.+\..+/.test(val) || 'Email must be valid',
        minLength: len => val => (val && val.length >= len) || `Minimum ${len} characters required`,
        onlyAlphabets: val => /^[a-zA-Z]+$/.test(val) || 'Only alphabets are allowed'
      },
            

        };
    },
    props: {
        organizations: [],
        shops: [],
        authorities: [],
        user: {}

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
         let inputs=[]
        // Perform form validation
        if(this.accountService.hasAuthorities(this.authority.ORGANIZATION_ADMIN)){
             inputs = [
        this.$refs.login,
        this.$refs.firstName,
        this.$refs.lastName,
        this.$refs.email,
        this.$refs.authority,
        this.$refs.shop

        ];
        }else if(this.accountService.hasAuthorities(this.authority.ADMIN)){
            inputs = [
        this.$refs.login,
        this.$refs.firstName,
        this.$refs.lastName,
        this.$refs.email,
        this.$refs.org,
        this.$refs.authority

        ];
        }
       

        const valid = inputs.reduce((acc, input) => acc && input.validate(), true);

        if (valid) {
        this.addItem();
        }
        },
        async addItem() {
            console.log('updating new New User item:', this.user);
            this.loading = true;
        console.log("data data ",this.user.orgId)
        let orgId=this.accountService.hasAuthorities(this.authority.ORGANIZATION_ADMIN)?this.$store.getters.account.orgId:this.user.orgId.id
        console.log("data data ",orgId)  
           
     

            this.userService.update(this.user)
                .then(() => {
                    console.log('User Updated successfully.');
                    this.showDialogEdit = false;
                    this.loading = false;
                    this.$emit('getUsers');
                    this.notifySuccess('User Updated successfully');
                    this.resetMenuItem();
                })
                .catch(error => {
                    this.showDialogEdit = false;
                    this.loading = false;
                    console.error('Error adding new User:', error);
                    this.notifyError('Error Happens')
                });
        },
        cancelAddItem() {
            this.showDialogEdit = false;
            this.resetMenuItem();
        },
        resetMenuItem() {
            this.user = {
                login: '',
                firstName: '',
                lastName: '',
                email: null,
                activated: false,
                shopId: null,
                orgId: null,
                langKey: null,
                authorities: [],
                password: null
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
