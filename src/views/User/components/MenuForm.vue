<template>
  <q-dialog v-model="showDialog" class="customdialog" transition-show="rotate" transition-hide="rotate">
    <q-card class="q-pa-md" style="width: 600px; max-width: 90vw;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Add New User</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-input ref="login" v-model="user.login" label="User Name*" class="q-mb-md" :rules="[rules.required]" />
        <q-input ref="firstName" v-model="user.firstName" label="First Name*" class="q-mb-md"
          :rules="[rules.required, rules.onlyAlphabets]" />
        <q-input ref="lastName" v-model="user.lastName" label="Last Name*" class="q-mb-md"
          :rules="[rules.required, rules.onlyAlphabets]" />
        <q-input ref="email" v-model="user.email" label="Email*" class="q-mb-md"
          :rules="[rules.required, rules.email]" />
        <q-toggle v-model="user.activated" label="Activated" class="q-mb-md" />

        <q-select ref="org"   :rules="[rules.required]" v-if="this.accountService.hasAuthorities(this.authority.ADMIN)" v-model="user.orgId"
          label="Organization*" :options="organizations" option-label="name" option-value="id" class="q-mb-md" />

        <q-select ref="shop"   :rules="[rules.required]"  v-if="this.accountService.hasAuthorities(this.authority.ORGANIZATION_ADMIN)" v-model="user.shopId" label="Shop*" :options="shops" option-label="name" option-value="id"
          class="q-mb-md" />
        <q-select ref="authority" v-model="user.authorities" label="Authority*" :options="authorities"
          option-label="label" option-value="value" multiple class="q-mb-md" :rules="[rules.required]" />
        <q-input ref="password"  v-model="user.password" label="Password*" class="q-mb-md"
          :rules="[rules.required, rules.minLength(6)]" />

      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="Add" :loading="loading" @click="validateForm" />
        <q-btn color="secondary" label="Cancel" @click="cancelAddItem" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import UserService from "../Api/index.js";
import AccountService from "../../Login/api/account.service";
import { Authority } from "../../../utils/authority";
import { Notify } from 'quasar';
export default {
  data() {
    return {
      showDialog: false,
      userService: new UserService(),
      loading: false,
      user: {
        login: '',
        firstName: '',
        lastName: '',
        email: null,
        activated: false,
        shopId: null,
        orgId: null,
        langKey: null,
        authorities: [],
        password: null,
        orgId: null,



      },
      rules: {
        required: val => !!val || 'Field is required',
        email: val => /.+@.+\..+/.test(val) || 'Email must be valid',
        minLength: len => val => (val && val.length >= len) || `Minimum ${len} characters required`,
        onlyAlphabets: val => /^[a-zA-Z]+$/.test(val) || 'Only alphabets are allowed'
      },
      authority: new Authority(),
      accountService: new AccountService()

    };
  },
  props: {
    organizations: [],
    shops: [],
    authorities: []
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
        this.$refs.shop,
        this.$refs.password

        ];
        }else if(this.accountService.hasAuthorities(this.authority.ADMIN)){
            inputs = [
        this.$refs.login,
        this.$refs.firstName,
        this.$refs.lastName,
        this.$refs.email,
        this.$refs.org,
        this.$refs.authority,
        this.$refs.password

        ];
        }

      const valid = inputs.reduce((acc, input) => acc && input.validate(), true);

      if (valid) {
        this.addItem();
      }
    },

    notifyError(message) {
      Notify.create({

        message: message,
        timeout: 3000,
        position: 'center',
        color: 'red'
      });
    },
    async addItem() {
      this.loading = true;
      // console.log('Adding new New User item:', this.user);


      const newUser = {
        login: this.user.login,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        activated: this.user.activated,
        shopId: this.user?.shopId?.id,
        orgId: this.accountService.hasAuthorities(this.authority.ORGANIZATION_ADMIN) ? this.$store.getters.account.orgId : this.user.orgId.id,
        langKey: this.user.langKey,
        authorities: this.user.authorities,
        password: this.user.password,

      };
      // console.log("new user ", newUser)

      this.userService.create(newUser)
        .then(() => {
          // console.log('New User added successfully.');
          this.showDialog = false;
          this.$emit('getUsers');
          this.loading = false;
          this.notifySuccess('User added successfully');
          this.resetMenuItem();
        })
        .catch(error => {
      //    console.error('Error adding new User:', error);
          this.loading = false;
          this.notifyError(`${error}`);
        });
    },
    cancelAddItem() {
      this.showDialog = false;
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
