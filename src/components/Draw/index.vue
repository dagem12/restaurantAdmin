<template>
  <div>
    <div style="display: flex; flex-direction: row; justify-content: space-between; width: 1000px; padding: 20px;">
      <div>
        <q-btn-dropdown
          label="Drop Tables"
          color="primary"
          split
          @click="() => {}"
        >
          <q-list style="min-width: 100px">
            <q-item v-for="table in diningTables" :key="table.id" clickable @click="addImage(table)">
              <q-item-section>{{ table.name }}</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn @click="undo">Undo</q-btn>
      </div>
      <div>
        <q-btn @click="saveTable" :loading="loadingSave">Save Table</q-btn>
      </div>
    </div>
    <canvas ref="canvas" class="canvas-container"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
      @mousemove="onMouseMove">
      Your browser does not support the HTML5 canvas tag.
    </canvas>
  </div>
</template>




<script>
import DiningTableService from "../../views/DiningTable/Api/index";

export default {
  data() {
    return {
      images: [], // Array to store multiple images
      shapes: [], // Array to store drawn shapes (lines)
      logs: [], // Array to store log messages
      nextImageId: 1, // ID counter for images
      selectedImageIndex: -1, // Index of the currently selected image
      offsetX: 0,
      offsetY: 0,
      startX: 0,
      startY: 0,
      width: 100,
      height: 100,
      resizeHandleRadius: 5,
      resizeHandleIndex: -1, // Index of the resize handle (-1 for none)
      diningTables: [],
      diningTablesReserve:[],
      diningTableService: new DiningTableService(),
      loadingSave:false
    };
  },
  mounted() {
    this.retrieveAllDiningTables();
    const canvas = this.$refs.canvas;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  },
  methods: {
    retrieveAllDiningTables() {
      this.diningTableService
        .retrieve()
        .then(res => {
          this.diningTables = res.data;
          this.diningTablesReserve = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    saveTable() {


     this.loadingSave = true;
     

  // Loop through each log
  this.logs.forEach(log => {
    const tableId = log.tableId;
// Get the tableId from the log message
    const matchingTable = this.diningTablesReserve.find(table => table.id === tableId); // Find the matching table

    if (matchingTable) {
      console.log("i called",log.x,log.y);
      matchingTable.xCord = log.x;
      matchingTable.yCord = log.y;
          console.log("Match", matchingTable);
      this.diningTableService.update(matchingTable)
        .then(() => {
          console.log(`Table with ID ${tableId} updated successfully.`);
        })
        .catch(err => {
          console.error(`Failed to update table with ID ${tableId}:`, err);
        });
    }
  });

  console.log("Final Table", this.logs);
  this.loadingSave = false; // Reset the loading state after the updates
},
    onMouseDown(event) {
      const canvas = this.$refs.canvas;
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      for (let i = this.images.length - 1; i >= 0; i--) {
        const image = this.images[i];

        if (this.isMouseOnResizeHandle(event, image)) {
          this.selectedImageIndex = i;
          this.resizeHandleIndex = this.getResizeHandleIndex(event, image);
          this.offsetX = mouseX - image.x;
          this.offsetY = mouseY - image.y;
          break;
        } else if (
          mouseX >= image.x &&
          mouseX <= image.x + image.width &&
          mouseY >= image.y &&
          mouseY <= image.y + image.height
        ) {
          this.selectedImageIndex = i;
          this.offsetX = mouseX - image.x;
          this.offsetY = mouseY - image.y;
          break;
        }
      }
    },
    isMouseOnResizeHandle(event, image) {
      const canvas = this.$refs.canvas;
      const rect = canvas.getBoundingClientRect();
      const handleX = image.x + image.width;
      const handleY = image.y + image.height;
      const dx = handleX - (event.clientX - rect.left);
      const dy = handleY - (event.clientY - rect.top);
      return dx * dx + dy * dy <= this.resizeHandleRadius * this.resizeHandleRadius;
    },
    getResizeHandleIndex(event, image) {
      const canvas = this.$refs.canvas;
      const rect = canvas.getBoundingClientRect();
      const handleX = image.x + image.width;
      const handleY = image.y + image.height;
      const dx = handleX - (event.clientX - rect.left);
      const dy = handleY - (event.clientY - rect.top);
      if (dx * dx + dy * dy <= this.resizeHandleRadius * this.resizeHandleRadius) {
        return 1;
      }
      return -1;
    },
    onMouseUp() {
      this.selectedImageIndex = -1;
      this.resizeHandleIndex = -1;
    },
    onMouseMove(event) {
      const canvas = this.$refs.canvas;
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      if (this.selectedImageIndex !== -1) {
        const image = this.images[this.selectedImageIndex];
        if (this.resizeHandleIndex !== -1) {
          if (this.resizeHandleIndex === 1) {
            image.width = Math.max(mouseX - image.x, 10);
            image.height = Math.max(mouseY - image.y, 10);
          }
        } else {
          image.x = mouseX - this.offsetX;
          image.y = mouseY - this.offsetY;
          this.updateCoordinatesInLogs(image);
        }
        this.redrawCanvas();
      }
    },
   updateCoordinatesInLogs(image) {
  const logIndex = this.logs.findIndex(log => log.id === image.id);
  if (logIndex !== -1) {
    this.logs[logIndex] = {
      id: image.id,
      tableId: image.tableId,
      x: image.x,
      y: image.y
    };
  } else {
    this.logs.push({
      id: image.id,
      tableId: image.tableId,
      x: image.x,
      y: image.y
    });
  }
},
    redrawCanvas() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      this.images.forEach((image) => {
        ctx.drawImage(image.img, image.x, image.y, image.width, image.height);
        this.drawResizeHandles(ctx, image);

        // Draw the table name at the bottom of the image
        ctx.fillStyle = 'black';
        ctx.font = '12px Arial';
        ctx.fillText(image.tableName, image.x, image.y + image.height + 12);
      });

      this.shapes.forEach((shape) => {
        ctx.beginPath();
        ctx.moveTo(shape.startX, shape.startY);
        ctx.lineTo(shape.endX, shape.endY);
        ctx.strokeStyle = shape.color;
        ctx.lineWidth = shape.lineWidth;
        ctx.stroke();
        ctx.closePath();
      });
    },
    drawResizeHandles(ctx, image) {
      const handleX = image.x + image.width;
      const handleY = image.y + image.height;

      ctx.beginPath();
      ctx.arc(handleX, handleY, this.resizeHandleRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.closePath();
    },
    addImage(table) {
      console.log('Adding image for table ID:', table.id);
      const canvas = this.$refs.canvas;
      const x = (canvas.width - this.width) / 2;
      const y = (canvas.height - this.height) / 2;
      const defaultImage = new Image();
      defaultImage.src = '/tablee.png';
      defaultImage.onload = () => {
        this.images.push({
          id: this.nextImageId++, 
          img: defaultImage, 
          x, y, 
          width: this.width, 
          height: this.height, 
          tableId: table.id, 
          tableName: table.name
        });
        this.redrawCanvas();
        this.removeTable(table.id);
      };
    },
    removeTable(tableId) {
      this.diningTables = this.diningTables.filter(table => table.id !== tableId);
    },
    undo() {
      if (this.shapes.length > 0) {
        this.shapes.pop();
      } else if (this.images.length > 0) {
        const removedImage = this.images.pop();
        this.diningTables.push({ id: removedImage.tableId, name: removedImage.tableName });
      }
      this.redrawCanvas();
    },
    // logCoordinates(image) {
    //   const logMessage = `tableId: ${image.tableId}, X: ${image.x}, Y: ${image.y}`;
    //   this.logs.push({ id: image.id, message: logMessage, tableId: image.tableId });
    //   console.log("Logs:", this.logs);
    // }
  }
};
</script>


<style>
.canvas-container {
  border: 1px solid #000;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  margin-left: 50px !important;
  margin-top: 50px;
  width: 1000px !important;
  height: 500px !important;
  cursor: pointer; /* Optional: Change cursor to pointer on hover */
}
</style>

