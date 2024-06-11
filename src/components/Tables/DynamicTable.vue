<template>
  <div>
    <md-table v-model="localDataItems" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell v-for="column in columns" :key="column.label" :md-label="column.label">
          <template v-if="column.isImage">
            <img :src="`https://localhost:8080/api/images/${item[column.field]}`" style="height: 50px; width: 50px;"
              alt="Image" />
          </template>
          <template v-else>
            {{ column.isRelation ? (item[column.field]?.name ? item[column.field]?.name : item[column.field]?.value) :
              item[column.field] }}

          </template>
        </md-table-cell>
        <md-table-cell md-label="Actions">
          <q-btn v-for="action in actions" :key="action.label" :color="action.color" :icon="action.icon"
            v-if="action.label2 == null" :label="action.label2" @click="action.method(item)" :dense="true" flat="true"
            style="margin: 2px" round />

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
};
</script>

<style>
.md-icon-button {
  border-radius: 50%;
  padding: 8px;
  color: white;
}

.q-item-selected {
  background-color: #5335AB;
  /* Change this to your desired highlight color */
  color: #ffffff !important;

  /* Change this to your desired text color */
}
</style>
