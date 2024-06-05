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
              <h4 class="title">Menus</h4>
              <p class="category">
                Explore and manage your restaurant's menu items
              </p>
            </div>
            <!-- Add Item button -->
            <div class="add-item-button">
              <md-button color="primary" @click="addItem">
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
import DynamicTable from "@/components/Tables/DynamicTable.vue";

export default {
  components: {
    DynamicTable,
  },
  data() {
    return {
      columns: [
        { label: "Name", field: "name" },
        { label: "Country", field: "country" },
        { label: "City", field: "city" },
        { label: "Salary", field: "salary" },
      ],
      dataItems: [
        {
          name: "Dakota Rice",
          salary: "$36,738",
          country: "Niger",
          city: "Oud-Turnhout",
        },
        {
          name: "Minerva Hooper",
          salary: "$23,738",
          country: "Curaçao",
          city: "Sinaai-Waas",
        },
        {
          name: "Sage Rodriguez",
          salary: "$56,142",
          country: "Netherlands",
          city: "Overland Park",
        },
        {
          name: "Philip Chaney",
          salary: "$38,735",
          country: "Korea, South",
          city: "Gloucester",
        },
        {
          name: "Doris Greene",
          salary: "$63,542",
          country: "Malawi",
          city: "Feldkirchen in Kārnten",
        },
        {
          name: "Mason Porter",
          salary: "$78,615",
          country: "Chile",
          city: "Gloucester",
        },
      ],
      actions: [
        {
          label: "View",
          method: this.viewItem,
          icon: "visibility",
          color: "primary",
        },
        { label: "Edit", method: this.editItem, icon: "edit", color: "amber" },
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
.header-with-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-item-button {
  margin-top: 10px;
}
</style>
