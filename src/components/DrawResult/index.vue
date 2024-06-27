<template>
    <div>
        <canvas ref="canvas" class="canvas-container" width="1000" height="500"></canvas>
    </div>
</template>

<script>
export default {
    mounted() {
        const tableData = [
            { tableId: 1, x: 66, y: 24 },
            { tableId: 2, x: 428, y: 207 },
        ];

        const canvas = this.$refs.canvas;
        const ctx = canvas.getContext('2d');

        canvas.width = 800; // Set the canvas width
        canvas.height = 600; // Set the canvas height

        tableData.forEach((item) => {
            const img = new Image();
            img.onload = () => {
                // Define the desired width and height for the image
                const desiredWidth = 70; // Set the width you want
                const desiredHeight = 150; // Set the height you want
                
                // Draw the image at the specified coordinates with the desired dimensions
                ctx.drawImage(img, item.x, item.y, desiredWidth, desiredHeight);
            };
            img.src = "/tablee.png"; 
            img.onerror = (error) => {
                console.error('Error loading image:', error);
            };
        });
    },
};
</script>

<style>
.canvas-container {
    border: 1px solid black; /* Optional: Adds a border to the canvas */
}
</style>
