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
        <q-select v-model="user.shopId" label="Shop" class="q-mb-md" />

        <q-select v-model="user.orgId" label="Organization" class="q-mb-md" />

        <q-select v-model="user.langKey" label="Language" class="q-mb-md" />
        <q-select v-model="user.authorities" label="Role" class="q-mb-md" />
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
        authorities: null,
        password: null

      }
    };
  },
  methods: {
    async addItem() {
      console.log('Adding new Organization item:', this.user);


      const newUser = {
        login: this.user.login,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        activated: this.user.activated,
        shopId: this.user.shopId,
        orgId: this.user.orgId,
        langKey: this.user.langKey,
        authorities: this.user.authorities,
        password: this.user.password,
      };

      this.userService.create(newUser)
        .then(() => {
          console.log('New User added successfully.');
          this.showDialog = false;
          this.resetMenuItem();
        })
        .catch(error => {
          console.error('Error adding new User:', error);
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
        authorities: null,
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