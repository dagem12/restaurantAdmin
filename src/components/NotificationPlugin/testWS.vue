<!-- Notification.vue -->
<template>
    <div>
        <button @click="showNotifications">Notifications ({{ notificationCount }})</button>
        <div v-if="show" class="notifications">
            <div v-for="(notification, index) in notifications" :key="index" class="notification">
                <p>Restaurant ID: {{ notification.restaurantId }}</p>
                <p>Table Number: {{ notification.tableNumber }}</p>
                <p>Time: {{ notification.time }}</p>
                <p>Customer Name: {{ notification.customerName }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            notificationCount: 0,
            notifications: []
        };
    },
    mounted() {
        this.connectWebSocket();
    },
    methods: {
        connectWebSocket() {
            const socket = new SockJS('http://localhost:8080/ws');
            this.stomp = new RxStomp();
            this.stomp.configure({
                webSocketFactory: () => socket,
                // debug: (msg) => console.log(new Date(), msg)
            });
            this.stomp.activate();
            this.stomp.watch('/topic/waiterNotification').subscribe((message) => {
                this.handleNotification(JSON.parse(message.body));
            });
        },
        handleNotification(notification) {
            this.notificationCount++;
            this.notifications.push(notification);
        },
        showNotifications() {
            this.show = !this.show;
        }
    }
}
</script>

<style scoped>
/* Component styles */
</style>
