<template>
  <div
    class="sidebar"
    :data-color="sidebarItemColor"
    :data-image="sidebarBackgroundImage"
    :style="sidebarStyle"
  >
    <div :class="sidebarClass">
      <div class="logo">
        <div class="imags">
          <a href="#" class="simple-text logo-mini">
            <div class="logo-img">
              <img :src="imgLogo" alt="" />
            </div>
          </a>
        </div>

        <div v-if="isExpanded">
          <a target="_blank" class="simple-text logo-normal">
            {{ title }}
          </a>
        </div>
        <div
          :class="{ 'sidebar-toggle': true, collapsed: !isExpanded }"
          @click="toggleSidebar"
        >
          <md-icon> menu_open </md-icon>
        </div>
      </div>

      <div class="sidebar-wrapper">
        <slot name="content"></slot>
        <md-list class="nav">
          <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
          <slot>
            <sidebar-link
              v-for="(link, index) in sidebarLinks"
              :key="link.name + index"
              :to="link.path"
              :link="link"
            >
            </sidebar-link>
          </slot>
        </md-list>
      </div>
    </div>
  </div>
</template>
<script>
import SidebarLink from "./SidebarLink.vue";

export default {
  components: {
    SidebarLink,
  },
  data() {
    return {
      isExpanded: true,
    };
  },

  props: {
    title: {
      type: String,
      default: "Restaurant",
    },
    sidebarBackgroundImage: {
      type: String,
      default: require("@/assets/img/sidebar-2.jpg"),
    },
    imgLogo: {
      type: String,
      default: require("@/assets/img/vue-logo.png"),
    },
    sidebarItemColor: {
      type: String,
      default: "green",
      validator: (value) => {
        let acceptedValues = ["", "purple", "blue", "green", "orange", "red"];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
    },
    autoClose: {
      type: Boolean,
      default: true,
    },
  },
  provide() {
    return {
      autoClose: this.autoClose,
    };
  },
  computed: {
    sidebarStyle() {
      return {
        backgroundImage: `url(${this.sidebarBackgroundImage})`,
      };
    },
    sidebarClass() {
      return {
        "sidebar-expanded": this.isExpanded,
        "sidebar-collapsed": !this.isExpanded,
      };
    },
  },
  methods: {
    toggleSidebar() {
      this.isExpanded = !this.isExpanded;
      this.$sidebar.expand();
    },
  },
};
</script>
<style scoped>
@media screen and (min-width: 991px) {
  .nav-mobile-menu {
    display: none;
  }
}

@media only screen and (max-width: 768px) {
  .sidebar-wrapper {
    width: auto;
    /* Allow sidebar to adjust based on content */
    transition: width 0.3s ease;
  }
}

.sidebar-wrapper {
  width: 100% !important;
  /* Allow sidebar to adjust based on content */
  transition: width 0.3s ease;
}

.sidebar-expanded {
  width: 250px;
  /* Adjust as needed */
  transition: width 0.3s ease;

  color: black !important;
}

.sidebar-collapsed {
  width: 90px;
  /* Adjust as needed */
  transition: width 0.3s ease;

  color: black !important;
}

.icon-expanded {
  color: white !important;
}

.icon-collapsed {
  color: black !important;
}

.sidebar-content {
  overflow-x: hidden;
}

.sidebar-toggle {
  cursor: pointer;
  padding-top: 8px;
  padding-left: 5px;
}

.imags {
  justify-content: start;
  margin-left: -30px;
}

.sidebar-toggle.collapsed {
  /* Remove all padding */
  color: black !important;
  padding-left: 0px;
  position: absolute;
  right: 0;

  font-size: 20px;
}

.logo {
  display: flex;
  width: 100%;
  position: relative;
  justify-content: space-evenly;
}

/* Add styles for icons and labels as needed */
</style>
