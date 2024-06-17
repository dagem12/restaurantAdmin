<template>
  <div>
    <md-table v-model="localDataItems" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }" :class="{ 'selected-row': selectedRow === item }" @click="selectRow(item)">
        <md-table-cell v-for="column in columns" :key="column.label" :md-label="column.label">
       
          <template v-if="column.isImage">
            <img :src="`https://localhost:8080/api/images/${item[column.field]}`" style="height: 50px; width: 50px;"
              alt="Image" @error="handleImageError" />
          </template>
          <template v-else-if="column.isCreateTime">
            {{ formatDate(item[column.field]) }}
           
          </template>
          <template v-else>
            {{ column.isRelation 
    ? (item[column.field]?.name 
        ? item[column.field]?.name 
        : item[column.field]?.value) 
    : (column.isRelationPO 
        ? item[column.field]?.amount 
        : item[column.field]) 
}}
            
          </template>
        </md-table-cell>
        <md-table-cell md-label="Actions">
          <q-btn v-for="action in actions" :key="action.label" :color="action.color" :icon="action.icon"
            v-if="action.label2 == null && action.label22 == null" :label="action.label2" @click="action.method(item)"
            :dense="true" flat="true" style="margin: 2px" round />

          <q-btn-dropdown style="margin-left: 10px;" v-for="action in actions" :key="item.id"
            v-if="action.label2 != null" color="primary" :label="action.label2"
            :loading="action.loadingS && (action.specificItem.id == item.id)">
            <q-list>
              <q-item v-for="option in action.label2Options" clickable v-close-popup
                @click="action.methodOptions(option, item)"
                :class="{ 'q-item-selected': item.status.value === option }">
                <q-item-section>
                  <q-item-label>{{ option }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn style="margin-left: 10px;" v-for="action in actions" v-if="action.label22 != null && action.label22"
            @click="action.method(item)" :label="action.label22" :loading="action.loadingS" color="grey-4"
            text-color="purple" glossy unelevated label="Generate QR" />
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>


<script>
export default {
  name: "dynamic-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
    columns: {
      type: Array,
      required: true,
      validator(value) {
        return value.every((col) => "label" in col && "field" in col);
      },
    },
    dataItems: {
      type: Array,
      required: true,
    },
    actions: {
      type: Array,
      default: () => [],
      validator(value) {
        return value.every(
          (action) =>
            "label" in action &&
            "method" in action &&
            "icon" in action &&
            "color" in action
        );
      },
    },
  },
  data() {
    return {
      selectedRow: null, 
      localDataItems: [...this.dataItems],
    };
  },
  watch: {
    dataItems: {
      handler(newDataItems) {
        this.localDataItems = [...newDataItems];
      },
      deep: true,
    },

  },
  methods: {
    selectRow(item) {
      this.selectedRow = item;
    },
    handleImageError(event) {
      event.target.src = 'https://via.placeholder.com/70';
    },
    formatDate(timestamp) {
      if (timestamp == null || timestamp == '') {
        return "Not Setted"
      }
      const date = new Date(timestamp);
      return date.toLocaleString();
    }
  }
};
</script>

<style>
.md-icon-button {
  border-radius: 50%;
  padding: 8px;
  color: white;
}
.selected-row {
  color:white !important;
  background-color: #5335AB; /* Change this color to your preference */
}

.q-item-selected {
  font-weight: bold;
  background-color: #5335AB; /* Change this color to your preference */
}


.q-item-selected {
  background-color: #5335AB;
  /* Change this to your desired highlight color */
  color: #ffffff !important;

  /* Change this to your desired text color */
}
</style>
