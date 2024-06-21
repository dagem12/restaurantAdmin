<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">{{ $route.name }}</h3>
        <template v-if="isMobile">
          <!-- Mobile specific buttons -->
          <q-btn flat round dense icon="dashboard" @click="$router.push('/dashboard')" class="toolbar-btn" />
          <q-btn-dropdown flat round dense class="notification-btn-dropdown toolbar-btn">
            <template v-slot:label>
              <q-icon round :class="{ glow: notifications.length > 0 }" name="notifications" />
              <q-badge color="red" floating transparent class="notification-badge">
                {{ notifications.length }}
              </q-badge>
            </template>
            <q-list style="min-width: 250px">
              <q-item v-for="(notification, index) in notifications" :key="index" clickable>
                <q-item-section>
                  <div class="notification-info">
                    <span>Table {{ notification.tableNumber }} </span>
                    <span :style="{ color: notification.isVip ? 'green' : 'black' }" v-if="notification.isVip"
                      class="vip-tag">
                      (VIP)
                    </span>
                  </div>
                </q-item-section>
                <q-item-section>
                  <div class="notification-info-time">
                    {{ formattedTime(notification.time) }}
                  </div>
                </q-item-section>
                <q-item-section side>
                  <q-btn round push size="10px" color="purple" icon="check"
                    @click="confirmAcknowledgement(notification)" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>

          <q-btn-dropdown flat round dense :label="user.firstName" class="toolbar-btn">
            <q-list>
              <q-item clickable @click="goToProfile">
                <q-item-section avatar>
                  <q-avatar icon="person" color="primary" text-color="white" />
                </q-item-section>
                <q-item-section>Profile</q-item-section>
              </q-item>
              <q-item clickable @click="logout">
                <q-item-section avatar>
                  <q-avatar icon="logout" color="primary" text-color="white" />
                </q-item-section>
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </template>
      </div>
      <div class="md-toolbar-section-end">
        <!-- Buttons for desktop -->
        <md-button class="md-just-icon md-simple md-toolbar-toggle" :class="{ toggled: $sidebar.showSidebar }"
          @click="toggleSidebar">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse toolbar-buttons">
          <q-btn flat round dense @click="toggleFullscreen" class="toolbar-btn">
            <q-icon v-if="isFullscreen" name="crop_free" />
            <q-icon v-else name="zoom_out_map" />
          </q-btn>

          <q-btn flat round dense icon="dashboard" @click="$router.push('/dashboard')" class="toolbar-btn" />

          <q-btn-dropdown flat round dense class="notification-btn-dropdown toolbar-btn">
            <template v-slot:label>
              <q-icon :class="{ glow: notifications.length > 0 }" name="notifications" />
              <q-badge color="red" floating transparent class="notification-badge">
                {{ notifications.length }}
              </q-badge>
            </template>
            <q-list style="min-width: 250px">
              <q-item v-for="(notification, index) in notifications" :key="index" clickable>
                <q-item-section>
                  <div class="notification-info">
                    <span>Table {{ notification.tableNumber }} </span>
                    <span :style="{ color: notification.isVip ? 'green' : 'black' }" v-if="notification.isVip"
                      class="vip-tag">
                      (VIP)
                    </span>
                  </div>
                </q-item-section>
                <q-item-section>
                  <div class="notification-info-time">
                    {{ formattedTime(notification.time) }}
                  </div>
                </q-item-section>
                <q-item-section side>
                  <q-btn round push size="10px" color="purple" icon="check"
                    @click="confirmAcknowledgement(notification)" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>

          <q-btn-dropdown flat round dense :label="user.firstName" class="toolbar-btn">
            <q-list>
              <q-item clickable @click="goToProfile">
                <q-item-section avatar>
                  <q-avatar icon="person" color="primary" text-color="white" />
                </q-item-section>
                <q-item-section>Profile</q-item-section>
              </q-item>
              <q-item clickable @click="logout">
                <q-item-section avatar>
                  <q-avatar icon="logout" color="primary" text-color="white" />
                </q-item-section>
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </div>
    </div>
    <template>
      <q-dialog v-model="dialog">
        <q-card>
          <q-card-section>
            <div class="text-h6">Acknowledge</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Please send a waiter to Table {{ toTable }}
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup @click="acknowledgeNotification()" />
          </q-card-actions>
        </q-card>
      </q-dialog>

    </template>
    <audio ref="notificationSound" src="../Sounds/ring.mp3" preload="auto"></audio>
  </md-toolbar>

</template>

<script>

import WebSocketService from '../Services/webSocketService';
import { Notify } from 'quasar';
export default {

  data() {
    return {
      notifications: [],
      user: {},
      isMobile: window.innerWidth <= 990.9,
      dialog: false,
      currentNotification: null,
      toTable: null,
      isFullscreen: false
    };
  },
  mounted() {
    this.user = this.$store.getters.account;
    window.addEventListener('resize', this.handleResize);
    this.connectWebSocket();

    document.addEventListener('click', this.userInteracted);
    document.addEventListener('keydown', this.userInteracted);
  },
  methods: {
    handleResize() {
      this.isMobile = window.innerWidth < 990.9;
    },
    formattedTime(timeString) {
      const date = new Date(timeString);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    },
    connectWebSocket() {
      const token = localStorage.getItem('jhi-authenticationToken');
      WebSocketService.connect(token);

      WebSocketService.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.addNotification(data.message);
          Notify.create({
            message: "Waiter Called from Table " + data.message.tableNumber,
            timeout: 3000,
            position: 'right',
            actions: [
    {
      label: 'Dismiss',
      color: 'yellow',
      handler: () => {
        // console.log('Dismiss clicked');
      }
    }
  ]
          });
        } catch (error) {
          console.error('Error processing WebSocket message:', error.message);
        }
      };
    },
    addNotification(message) {
      // Validate the message structure
      if (
        message &&
        message.hasOwnProperty('time') &&
        message.hasOwnProperty('tableNumber') &&
        message.hasOwnProperty('isVip')
      ) {
        // message.time = this.formattedTime(message.time);

        this.notifications.push(message);

        this.$refs.notificationSound.play().catch(error => {
          console.error('Audio playback failed:', error);
        });
      } else {
        console.error('Invalid notification message format:', message);
      }
    },
    confirmAcknowledgement(notification) {
      this.currentNotification = notification;
      this.dialog = true;
      this.toTable = notification.tableNumber
    },
    acknowledgeNotification() {
      this.dialog = false;
      this.notifications = this.notifications.filter(
        (notif) => notif !== this.currentNotification
      );
      this.currentNotification = null;
    },
    goToProfile() {
      this.$router.push({ path: '/profile' });
    },
    logout() {
      localStorage.removeItem('jhi-authenticationToken');
      this.$store.commit('logout');
      this.$router.push({ path: '/login' });
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen;
      if (this.isFullscreen) {
        this.enterFullscreen();
      } else {
        this.exitFullscreen();
      }
    },
    enterFullscreen() {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
      document.addEventListener('fullscreenchange', this.onFullscreenChange);
      document.addEventListener('webkitfullscreenchange', this.onFullscreenChange);
      document.addEventListener('msfullscreenchange', this.onFullscreenChange);
    },
    exitFullscreen() {
      if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      ) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
      document.removeEventListener('fullscreenchange', this.onFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', this.onFullscreenChange);
      document.removeEventListener('msfullscreenchange', this.onFullscreenChange);
    },
    onFullscreenChange() {
      this.isFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      );
    },
    userInteracted() {
      // User has interacted with the document, audio can be played
      document.removeEventListener('click', this.userInteracted);
      document.removeEventListener('keydown', this.userInteracted);
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('fullscreenchange', this.onFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', this.onFullscreenChange);
    document.removeEventListener('msfullscreenchange', this.onFullscreenChange);
    WebSocketService.close();

    // Remove event listeners for user interaction
    document.removeEventListener('click', this.userInteracted);
    document.removeEventListener('keydown', this.userInteracted);
  },
};
</script>

<style scoped lang="css">
/* Your component-specific styles */
.toolbar-btn {
  margin-right: 5px !important;
}

.notification-btn-dropdown {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.notification-badge {
  position: absolute;
  right: 16px;
}

.notification-info {
  display: flex;
  align-items: center;
}

.notification-info-time {
  font-size: 14px;
  color: #666;
}

.vip-tag {
  margin-left: 5px;
  color: green;
}

.q-icon {
  cursor: pointer;
  margin-left: 10px;
}

.glow {
  position: relative;
  animation: glow 1.5s infinite;
}

@keyframes glow {
  0% {
    box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
  }

  50% {
    box-shadow: 0 0 20px rgba(255, 0, 0, 1);
  }

  100% {
    box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
  }
}

.q-icon.round {
  border-radius: 50%;
  overflow: hidden;
}
</style>
