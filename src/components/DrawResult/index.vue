<template>
  <div>
    <canvas ref="canvas" class="canvas-container" width="1000" height="500"></canvas>
  </div>
</template>

<script>
import DiningTableService from "../../views/DiningTable/Api/index";

export default {
  data() {
    return {
      diningTables: [],
      diningTableService: new DiningTableService()
    };
  },
  mounted() {
    this.retrieveAllDiningTables();
  },
  methods: {
    retrieveAllDiningTables() {
      this.diningTableService
        .retrieve()
        .then(res => {
          this.diningTables = res.data;
          console.log("DATAA", this.diningTables);
          this.drawTablesOnCanvas(); // Call the drawing function here
        })
        .catch(err => {
          console.log(err);
        });
    },
    drawTablesOnCanvas() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');

      canvas.width = 1000; // Set the canvas width
      canvas.height = 500; // Set the canvas height

      this.diningTables.forEach((table) => {
        const img = new Image();
        img.onload = () => {
          // Define the desired width and height for the image
          const desiredWidth = 70; // Set the width you want
          const desiredHeight = 100; // Set the height you want

          // Draw the image at the specified coordinates with the desired dimensions
          ctx.drawImage(img, table.xCord, table.yCord, desiredWidth, desiredHeight);

          // Add table name below the image
          ctx.font = "16px Arial";
          ctx.fillStyle = "black";
          ctx.fillText(table.name, table.xCord, table.yCord + desiredHeight + 20);
        };
        img.src = "/tablee.png";
        img.onerror = (error) => {
          console.error('Error loading image:', error);
        };
      });
    }
  }
};
</script>

<style>
.canvas-container {
  border: 1px solid black; /* Optional: Adds a border to the canvas */
}
</style>
