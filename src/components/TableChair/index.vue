<template>
    <div>
      <div class="workspace" ref="workspace">
        <vue-drag-resize
          v-for="(item, index) in items"
          :key="index"
          v-model="item.position"
          :w="item.size.width"
          :h="item.size.height"
          :x="item.position.x"
          :y="item.position.y"
          :minw="50"
          :minh="50"
          @resizing="updateItemPosition(index, $event)"
          @dragging="updateItemPosition(index, $event)"
          class="draggable-item"
        >
          <div :class="item.type">{{ item.type }}</div>
        </vue-drag-resize>
      </div>
      <button @click="saveLayout">Save Layout</button>
    </div>
  </template>
  
  <script>
  import VueDragResize from 'vue-drag-resize';
  
  export default {
    name:"TableChair",
    components: {
      VueDragResize,
    },
    data() {
      return {
        items: [
          {
            type: 'table',
            position: { x: 100, y: 100 },
            size: { width: 100, height: 100 },
          },
          {
            type: 'chair',
            position: { x: 200, y: 200 },
            size: { width: 50, height: 50 },
          },
        ],
      };
    },
    methods: {
      updateItemPosition(index, event) {
        this.items[index].position = { x: event.x, y: event.y };
        this.items[index].size = { width: event.width, height: event.height };
      },
      saveLayout() {
        // Save the layout to local storage or send it to a server
        localStorage.setItem('layout', JSON.stringify(this.items));
        alert('Layout saved!');
      },
    },
    mounted() {
      // Load saved layout if available
      const savedLayout = localStorage.getItem('layout');
      if (savedLayout) {
        this.items = JSON.parse(savedLayout);
      }
    },
  };
  </script>
  
  <style>
  .workspace {
    width: 800px;
    height: 600px;
    border: 1px solid #ccc;
    position: relative;
  }
  
  .draggable-item {
    border: 1px solid #000;
    background-color: #fff;
  }
  
  /* .table {
    background-color: lightblue;
  } */
  
  .chair {
    background-color: lightgreen;
  }
  </style>