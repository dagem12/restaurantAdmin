<template>
  <div style="width: 100%;">
    <canvas ref="canvas" class="canvas-container" width="1300" height="500"></canvas>
    <div style="padding: 5px; display: flex;justify-content: space-evenly;">
      <div><span style="background-color: orange;padding: 5px;"><md-icon>notifications_active</md-icon></span>Waiter Call </div>
      <div><span style="background-color: lightblue;padding: 5px;"><md-icon>move_to_inbox</md-icon></span>Order Created </div>
      <div><span style="background-color: yellow;padding: 5px;"><md-icon>more_time</md-icon></span> More Item Added</div>
    </div>
  </div>
</template>

<script>
import DiningTableService from "../../views/DiningTable/Api/index";
import WebSocketService from '../../pages/Services/webSocketService';
import AccountService from '@/views/Login/api/account.service';
import { Authority } from "../../utils/authority";

export default {
  data() {
    return {
      diningTables: [],
      diningTableService: new DiningTableService(),
      highlightedTableId: null,
      highlightedTableIdOrder: null,
      highlightedTableIdMore: null,
      userAuth: null, // Track the highlighted table ID
      accountService: new AccountService(),
      authority: new Authority(),
      tableImages: {} // Store loaded table images
    };
  },
  mounted() {
    this.user = this.$store.getters.account;
    this.userAuth = this.accountService.hasAuthorities(this.authority.SHOP_ADMIN);
    this.retrieveAllDiningTables();
    this.connectWebSocket();
  },
  methods: {
    connectWebSocket() {
      const token = localStorage.getItem('jhi-authenticationToken');

      if (this.userAuth) {
        WebSocketService.connect(token, this.user.shopId);

        WebSocketService.socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);

            if (data.message.type == "call") {
              const incomingTableId = data.message.tableNumber;
              this.highlightTable(incomingTableId, 'orange');
            } else if (data.message.type == "order") {
              console.log("am innn",data.message.type)
              const incomingTableId = data.message.tableNumber;
              this.highlightTable(incomingTableId, 'lightblue');
            } else if (data.message.type == "addMore") {
              const incomingTableId = data.message.tableNumber;
              this.highlightTable(incomingTableId, 'yellow');
            }

          } catch (error) {
            console.error('Error processing WebSocket message:', error.message);
          }
        };
      }
    },
    retrieveAllDiningTables() {
      this.diningTableService
        .retrieve()
        .then(res => {
          this.diningTables = res.data;
          this.drawTablesOnCanvas(); // Call the drawing function here
        })
        .catch(err => {
          console.log(err);
        });
    },
    highlightTable(tableId, color) {
         const tableIdInt = Number(tableId);
      this.clearPreviousHighlight(tableIdInt); // Clear the previous highlight
      
      this.highlightedTableId = tableIdInt;
      this.highlightColor = color;
      this.updateTableBorderColor(tableIdInt, color);
    },
    clearPreviousHighlight(tableId) {
      if (tableId) {
        this.updateTableBorderColor(tableId, '');
      }
    },
    updateTableBorderColor(tableId, color) {
   const tableIdInt = Number(tableId);
  const table = this.diningTables.find(t => t.id == tableIdInt);
  if (table) {
    const canvas = this.$refs.canvas;
    const ctx = canvas.getContext('2d');

    const desiredWidth = 100;
    const desiredHeight = 100;
    const padding = 0;
    const borderRadius = 15;

    const x = table.xCord - padding;
    const y = table.yCord - padding;
    const width = desiredWidth + padding * 2;
    const height = desiredHeight + padding * 2;

    if (color) {
      // First clear the previous border
      ctx.clearRect(x - 5, y - 5, width + 10, height + 10);
      // Redraw the table image
      this.drawTableImage(table);

      // Set up the new shadow and border color
      ctx.shadowColor = color;
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      ctx.strokeStyle = color;
      ctx.lineWidth = 5;

      // Draw the new border
      this.drawRoundedRect(ctx, x, y, width, height, borderRadius);
      ctx.stroke();
    } else {
      // Clear the previous highlight
      ctx.clearRect(x - 5, y - 5, width + 10, height + 10);
      // Redraw the table image without the highlight
      this.drawTableImage(table);
    }
  }
}
,
    drawTableImage(table) {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');

      const img = new Image();
      img.onload = () => {
        const desiredWidth = 100;
        const desiredHeight = 100;

        ctx.drawImage(img, table.xCord, table.yCord, desiredWidth, desiredHeight);

        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(table.name, table.xCord, table.yCord + desiredHeight + 20);
      };
      img.src = "/tablee.png";
      img.onerror = (error) => {
        console.error('Error loading image:', error);
      };
    },
    drawTablesOnCanvas() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');

      canvas.width = 1300;
      canvas.height = 500;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      this.diningTables.forEach((table) => {
        this.drawTableImage(table);
      });
    },
    drawRoundedRect(ctx, x, y, width, height, radius) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    }
  }
};
</script>

<style>
.canvas-container {
  border: 1px solid black; 
  width: 1300px !important;
}
</style>
