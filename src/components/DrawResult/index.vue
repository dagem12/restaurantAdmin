<template>
  <div style="width: 100%;">
    <canvas ref="canvas" class="canvas-container" width="1300" height="500"></canvas>
    <div style="padding: 5px; display: flex;justify-content: space-evenly;">
      <div><span style="background-color: orange;padding: 5px;"><md-icon>notifications_active</md-icon></span>     Waiter Call </div>
       <div><span style="background-color: lightblue;padding: 5px;"><md-icon>move_to_inbox</md-icon></span>     Order Created </div>
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
      userAuth: null,// Track the highlighted table ID
      accountService: new AccountService(),
              authority: new Authority(),
    };
  },
  mounted() {
        this.user = this.$store.getters.account;
     this.userAuth = this.accountService.hasAuthorities(this.authority.SHOP_ADMIN)
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
              this.highlightTable(incomingTableId);
            } else if (data.message.type == "order") {
              const incomingTableId = data.message.tableNumber;
              this.highlightTableOrder(incomingTableId);
            } else if (data.message.type == "addMore") { 
                  const incomingTableId = data.message.tableNumber;
              this.highlightTableMore(incomingTableId);

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
       //   console.log("DATAA", this.diningTables);
          this.drawTablesOnCanvas(); // Call the drawing function here
        })
        .catch(err => {
          console.log(err);
        });
    },
    highlightTable(tableId) {
      // Update the highlightedTableId with the incoming table ID
      this.highlightedTableId = tableId;
      this.drawTablesOnCanvas(); // Redraw the tables with the updated highlight
    },
      highlightTableOrder(tableId) {
      // Update the highlightedTableId with the incoming table ID
        this.highlightedTableIdOrder = tableId;
     // console.log("amCAled 1",tableId)
      this.drawTablesOnCanvasOrder(); // Redraw the tables with the updated highlight
    },
       highlightTableMore(tableId) {
      // Update the highlightedTableId with the incoming table ID
        this.highlightedTableIdMore = tableId;
      this.drawTablesOnCanvasMore(); // Redraw the tables with the updated highlight
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
  },

  drawTablesOnCanvas() {
    const canvas = this.$refs.canvas;
    const ctx = canvas.getContext('2d');

    canvas.width = 1300; 
    canvas.height = 500; 

    // Clear the canvas before redrawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.diningTables.forEach((table) => {
      const img = new Image();

      img.onload = () => {
        const padding = 0;
        const borderRadius = 15;

        // Define the desired width and height for the image
        const desiredWidth = 100;
        const desiredHeight = 100;

        // Draw the image at the specified coordinates with the desired dimensions
        ctx.drawImage(img, table.xCord, table.yCord, desiredWidth, desiredHeight);

        // Add table name below the image
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(table.name, table.xCord, table.yCord + desiredHeight + 20);

        // Check if the current table should be highlighted
        if (table.id === this.highlightedTableId) {
          // Set up glowing effect
          ctx.shadowColor = 'orange';
          ctx.shadowBlur = 20;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;

          // Draw glowing border with padding and border radius
          ctx.strokeStyle = 'orange';
          ctx.lineWidth = 5;

          const x = table.xCord - padding;
          const y = table.yCord - padding;
          const width = desiredWidth + padding * 2;
          const height = desiredHeight + padding * 2;

          this.drawRoundedRect(ctx, x, y, width, height, borderRadius);
          ctx.stroke();

          // Reset shadow settings for next drawings
          ctx.shadowBlur = 0;
        }
      };
      img.src = "/tablee.png";
      img.onerror = (error) => {
        console.error('Error loading image:', error);
      };
    });
    },
    drawTablesOnCanvasOrder() {
           
    const canvas = this.$refs.canvas;
    const ctx = canvas.getContext('2d');

    canvas.width = 1300; 
    canvas.height = 500; 

    // Clear the canvas before redrawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.diningTables.forEach((table) => {
      const img = new Image();

      img.onload = () => {
        const padding = 0;
        const borderRadius = 15;

        // Define the desired width and height for the image
        const desiredWidth = 100;
        const desiredHeight = 100;

        // Draw the image at the specified coordinates with the desired dimensions
        ctx.drawImage(img, table.xCord, table.yCord, desiredWidth, desiredHeight);

        // Add table name below the image
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(table.name, table.xCord, table.yCord + desiredHeight + 20);
  
        // Check if the current table should be highlighted
        if (table.id == this.highlightedTableIdOrder) {
          // Set up glowing effect
      
          ctx.shadowColor = 'lightblue';
          ctx.shadowBlur = 20;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;

          // Draw glowing border with padding and border radius
          ctx.strokeStyle = 'lightblue';
          ctx.lineWidth = 5;

          const x = table.xCord - padding;
          const y = table.yCord - padding;
          const width = desiredWidth + padding * 2;
          const height = desiredHeight + padding * 2;

          this.drawRoundedRect(ctx, x, y, width, height, borderRadius);
          ctx.stroke();

          // Reset shadow settings for next drawings
          ctx.shadowBlur = 0;
        }
      };
      img.src = "/tablee.png";
      img.onerror = (error) => {
        console.error('Error loading image:', error);
      };
    });
    },
    drawTablesOnCanvasMore() {
           
    const canvas = this.$refs.canvas;
    const ctx = canvas.getContext('2d');

    canvas.width = 1300; 
    canvas.height = 500; 

    // Clear the canvas before redrawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.diningTables.forEach((table) => {
      const img = new Image();

      img.onload = () => {
        const padding = 0;
        const borderRadius = 15;

        // Define the desired width and height for the image
        const desiredWidth = 100;
        const desiredHeight = 100;

        // Draw the image at the specified coordinates with the desired dimensions
        ctx.drawImage(img, table.xCord, table.yCord, desiredWidth, desiredHeight);

        // Add table name below the image
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(table.name, table.xCord, table.yCord + desiredHeight + 20);
  
        // Check if the current table should be highlighted
        if (table.id == this.highlightedTableIdMore) {
          // Set up glowing effect
      
          ctx.shadowColor = 'yellow';
          ctx.shadowBlur = 20;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;

          // Draw glowing border with padding and border radius
          ctx.strokeStyle = 'yellow';
          ctx.lineWidth = 5;

          const x = table.xCord - padding;
          const y = table.yCord - padding;
          const width = desiredWidth + padding * 2;
          const height = desiredHeight + padding * 2;

          this.drawRoundedRect(ctx, x, y, width, height, borderRadius);
          ctx.stroke();

          // Reset shadow settings for next drawings
          ctx.shadowBlur = 0;
        }
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
  border: 1px solid black; 
  width:1300px !important;
}
</style>
