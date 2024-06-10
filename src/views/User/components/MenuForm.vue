<template>
  <q-dialog v-model="showDialog" class="customdialog" transition-show="rotate" transition-hide="rotate">
    <q-card class="q-pa-md" style="width: 600px; max-width: 90vw;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Add New User</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-input v-model="user.login" label="User Name" class="q-mb-md" />
        <q-input v-model="user.firstName" label="First Name" class="q-mb-md" />
        <q-input v-model="user.lastName" label="Last Name" class="q-mb-md" />
        <q-input v-model="user.email" label="Email" class="q-mb-md" />
        <q-toggle v-model="user.activated" label="Activated" class="q-mb-md" />

        <q-select v-if="this.accountService.hasAuthorities(this.authority.ADMIN)" v-model="user.orgId"
          label="Organization" :options="organizations" option-label="name" option-value="id" class="q-mb-md" />

        <q-select v-model="user.shopId" label="Shop" :options="shops" option-label="name" option-value="id"
          class="q-mb-md" />
        <q-select v-model="user.authorities" label="Authority" :options="authorities" option-label="label"
          option-value="value" multiple class="q-mb-md" />
        <q-input v-model="user.password" label="Password" class="q-mb-md" />

      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="Add" @click="addItem" />
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

    notifyError(message) {
      Notify.create({

        message: message,
        timeout: 3000,
        position: 'center',
        color: 'red'
      });
    },
    async addItem() {
      console.log('Adding new New User item:', this.user);


      const newUser = {
        login: this.user.login,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        activated: this.user.activated,
        shopId: this.user.shopId?.id,
        orgId: this.$store.getters.account.orgId,
        langKey: this.user.langKey,
        authorities: this.user.authorities,
        password: this.user.password,

      };

      this.userService.create(newUser)
        .then(() => {
          console.log('New User added successfully.');
          this.showDialog = false;
          this.$emit('getUsers');
          this.notifySuccess('User added successfully');
          this.resetMenuItem();
        })
        .catch(error => {
          console.error('Error adding new User:', error);
          this.notifyError('Error Happens')
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
