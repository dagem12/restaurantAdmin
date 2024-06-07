<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header
            data-background-color=""
            class="header-with-button"
          >
            <div>
              <h4 class="title">Users</h4>
              <p class="category">Explore and manage your users</p>
            </div>
            <!-- Add Item button -->
            <div class="add-item-button">
              <md-button color="primary" @click="this.showAddItemDialog">
                <md-icon>add</md-icon>
                <span>Add Item</span>
              </md-button>
            </div>
          </md-card-header>
          <md-card-content>
            <dynamic-table table-header-color="red" :columns="columns" :data-items="dataItems" :actions="actions" />
          </md-card-content>
        </md-card>
      </div>
    </div>
    <MenuForm ref="menuFormDialog" />
  </div>
</template>
<script>
import DynamicTable from "../../../components/Tables/DynamicTable.vue";
import MenuForm from "../components/MenuForm.vue";
export default {
  name: "usersList",
  components: {
    DynamicTable,
    MenuForm
  },
  data() {
    return {
      columns: [
        { label: "Id", field: "id" },
        { label: "Login", field: "login" },
        { label: "Email", field: "email" },
        { label: "Profiles", field: "profiles" },
        { label: "CreateTime", field: "createTime" },
      ],
      dataItems: [
        {
          email: "kebeded@gmail.com",
          login: "Kebede",
          id: "1",
          profiles: "Active",
          createTime: "22-10-2024",
        },
        {
          email: "abebe@gmail.com",
          login: "Abebe",
          id: "2",
          profiles: "Active",
          createTime: "22-10-2024",
        },
      ],
      actions: [
        {
          label: "Edit",
          method: this.editItem,
          icon: "edit",
          color: "blue",
        },
        {
          label: "Delete",
          method: this.deleteItem,
          icon: "delete",
          color: "red",
        },
      ],
    };
  },
  methods: {
    editItem(item) {
      console.log("Editing item:", item);
    },
    deleteItem(item) {
      console.log("Deleting item:", item);
    },
    viewItem(item) {
      console.log("Viewing item:", item);
    },
    addItem() {
      console.log("Adding new item");
      // Add your logic here to handle adding a new item
    },
    showAddItemDialog() {
      // Show the MenuForm dialog
      this.$refs.menuFormDialog.showDialog = true;
    },
  },
};
</script>
<style>
.table {
  padding: 1%;
}
.md-card-header{
  background-color: #5335AB !important;
}
</style>
