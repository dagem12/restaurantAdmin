<template>
  <div>
    <md-table v-model="localDataItems" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }" :class="{ 'selected-row': selectedRow === item }" @click="selectRow(item)">
        <md-table-cell v-for="column in columns" :key="column.label" :md-label="column.label">
       
          <template v-if="column.isImage">
            <img :src="`/api/images/${item[column.field]}`" style="height: 50px; width: 50px;"
              alt="Image" @error="handleImageError" />
          </template>
          <template v-else-if="column.isCreateTime">
            {{ formatDate(item[column.field]) }}
           
          </template>
            <template v-else>
       <span v-if="column.isColor" :style="column.isColor ? { backgroundColor: getBackgroundColor(item[column.field]?.value) } : {}">|||</span>
      {{
        column.truncated 
          ? truncateText(item[column.field], 20)
          : (
            column.isRelation 
              ? (item[column.field]?.name 
                  ? item[column.field]?.name 
                  : item[column.field]?.value) 
              : (column.isRelationPO 
                  ? item[column.field]?.amount 
                  : (column.isRelationPOP
                      ? item[column.field]?.status?.value 
                      : item[column.field]))
          )
      }}
    </template>
        </md-table-cell>
        <md-table-cell md-label="Actions">
          <q-btn v-for="action in actions" :key="action.label" :color="action.color" :icon="action.icon"
            v-if="action.label2 == null && action.label22 == null && action.labelV == null" :label="action.label2" @click="action.method(item)"
            :dense="true" flat="true" style="margin: 2px" round />

            <q-btn-dropdown
                style="margin-left: 10px;"
                v-for="action in actions"
                :key="item.id"
                v-if="action.label2 != null"
                color="primary"
                :label="action.label2"
                :loading="action.loadingS && (action.specificItem.id == item.id)"
              >
                <q-list>
                  <q-item
                    v-for="(option, index) in action.label2Options"
                    :key="option"
                    :disable="shouldDisable(item, index)"
                    v-close-popup
                    @click="!shouldDisable(item, index) && action.methodOptions(option, item)"
                    :class="{ 'q-item-selected': item.status.value === option }"
                    clickable
                  >
                    <q-item-section>
                      <q-item-label>{{ option }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>


               <q-btn-dropdown
                style="margin-left: 10px;"
                v-for="action in actions"
                :key="item.id"
                v-if="action.labelV != null"
                color="primary"
                :label="action.labelV"
                :loading="action.loadingS && (action.specificItem.id == item.id)"
              >
                <q-list>
                  <q-item
                    v-for="(option, index) in action.labelVOptions"
                    :key="option"
                    v-close-popup
                    @click="action.methodOptions(option, item)"
                    clickable
                  >
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
      baseUrl:process.env.VUE_APP_SERVER_URL
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
    getBackgroundColor(status) {
      console.log("status",status)
      switch (status) {
        case 'Open':
          return  'green';
        case 'Preparing':
          return 'blue' ;
        case 'Delivered':
          return 'yellow' ;
        case 'Paid':
          return 'orange' ;
        case 'Cancelled':
          return 'red' ;
        default:
          return {};
      }
    },
 truncateText(text, length) {
    if (typeof text === 'string' && text.length > length) {
      let truncated = '';
      let charCount = 0;

      for (const char of text) {
        if (charCount >= length) break;
        truncated += char;
        charCount++;
      }

      return truncated + '...';
    }
    return text;
  },
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
    },
    shouldDisable(item, index) {
      const statusToIndex = {
        7001: 0,
        7002: 1,
        7003: 2,
        7004: 3,
        7005: 4
      };
      
      const currentIndex = statusToIndex[item.status.id];
      return index !== currentIndex + 1;
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
  color:rgb(12, 11, 11) !important;
  background-color: #93b4a9 !important; /* Change this color to your preference */
}

.q-item-selected {
  font-weight: bold;
  background-color: #5335AB; /* Change this color to your preference */
}
.q-item-disabled {
  pointer-events: none;
  opacity: 0.6;
}


.q-item-selected {
  background-color: #5335AB;
  /* Change this to your desired highlight color */
  color: #ffffff !important;

  /* Change this to your desired text color */
}
</style>
