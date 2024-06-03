<template>
  
  <div
    class="sidebar"
    :data-color="sidebarItemColor"
    :data-image="sidebarBackgroundImage"
    :style="sidebarStyle"
  >
    <div :class="sidebarClass">
      <div class="logo">
      <a href="#" class="simple-text logo-mini">
        <div class="logo-img">
          <img :src="imgLogo" alt="" />
        </div>
      </a>

      <a
        href="https://www.creative-tim.com/product/vue-material-dashboard"
        target="_blank"
        class="simple-text logo-normal"
        v-if="isExpanded"
      >
        {{ title }}
      </a>
       <div class="sidebar-toggle" @click="toggleSidebar">
          <md-icon>menu_open</md-icon>
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
      isExpanded: true
    }
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
        'sidebar-expanded': this.isExpanded,
        'sidebar-collapsed': !this.isExpanded,
      };
    },
  },
  methods: {
    toggleSidebar() {
      this.isExpanded = !this.isExpanded;
      this.$sidebar.expand();
    },
 
  }
};
</script>
<style scoped>
@media screen and (min-width: 991px) {
  .nav-mobile-menu {
    display: none;
  }
}
.sidebar-expanded {
  width: 250px; /* Adjust as needed */
  transition: width 0.3s ease;
}

.sidebar-collapsed {
  width: 80px; /* Adjust as needed */
  transition: width 0.3s ease;
}

.sidebar-content {
  overflow-x: hidden;
}

.sidebar-toggle {
  cursor: pointer;
  text-align: center;
  padding: 10px;
}
.logo{
  display: flex;
  flex-direction: row;
}

/* Add styles for icons and labels as needed */
</style>
