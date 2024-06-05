<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header
            data-background-color="orange"
            class="header-with-button"
          >
            <div>
              <h4 class="title">Menu Catalog</h4>
              <p class="category">Explore and manage your menu catalogs</p>
            </div>
            <!-- Add Item button -->
            <div class="add-item-button">
              <md-button color="primary" @click="this.addItem">
                <md-icon>add</md-icon>
                <span>Add Item</span>
              </md-button>
            </div>
          </md-card-header>
          <md-card-content>
            <dynamic-table
              table-header-color="red"
              :columns="columns"
              :data-items="dataItems"
              :actions="actions"
            />
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>
<script>
import DynamicTable from "../../../components/Tables/DynamicTable.vue";
export default {
  name: "menuCatalogList",
  components: {
    DynamicTable,
  },
  data() {
    return {
      columns: [
        { label: "Id", field: "id" },
        { label: "Code", field: "code" },
        { label: "Name", field: "name" },
        { label: "Description", field: "description" },
        { label: "Enable", field: "enable" },
        { label: "CreateTime", field: "createTime" },
        { label: "Shop", field: "shop" },
        { label: "Poster", field: "poster" },
      ],
      dataItems: [
        {
          name: "Fasting",
          code: "ASSD$#",
          id: "1",
          description: "best Menu",
          enable: "true",
          createTime: "22-10-2024",
          shop: "Et Shop",
          poster: "poster.jpg",
        },
        {
          name: "Burgers",
          code: "ASSD$#",
          id: "2",
          description: "best Menu",
          enable: "true",
          createTime: "22-10-2024",
          shop: "Et Shop",
          poster: "poster.jpg",
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
  },
};
</script>
<style>
.table {
  padding: 1%;
}
</style>
