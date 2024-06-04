<template>
  <div class="table">
    <dynamic-table :tableHeaderColor="'green'" :columns="columns" :dataItems="dataItems" :actions="actions" />
  </div>
</template>
<script>

import DynamicTable from '../../../components/Tables/DynamicTable.vue';
export default {
  name: "Shop List",
  components: {
    DynamicTable
  },
  data() {
    return {
      columns: [
        { label: 'Id', field: 'id' },
        { label: 'Code', field: 'code' },
        { label: 'Name', field: 'name' },
        { label: 'Description', field: 'description' },
        { label: 'Enable', field: 'enable' },
        { label: 'CreateTime', field: 'createTime' },
        { label: 'Admin', field: 'admin' },
      ],
      dataItems: [
        { name: 'John Doe', code: 'ASSD$#', id: '1', description: 'best Organization', enable: 'true', createTime: '22-10-2024', Admin: 'Abbee' },
        { name: 'John Doe', code: 'ASSD$#', id: '1', description: 'best Organization', enable: 'true', createTime: '22-10-2024', Admin: 'Abbee' },
      ],
      actions: [
        {
          label: 'Edit',
          method: this.editItem,
          icon: 'edit',
          color: 'blue',
        },
        {
          label: 'Delete',
          method: this.deleteItem,
          icon: 'delete',
          color: 'red',
        },
      ],

    };
  },

};

</script>
<style>
.table {
  padding: 1%;
}
</style>