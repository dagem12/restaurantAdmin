<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <!-- <mobile-menu slot="content"></mobile-menu> -->
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p v-if="isExpanded">Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/organization">
        <md-icon>corporate_fare</md-icon>
        <p v-if="isExpanded">Organization</p>
      </sidebar-link>
      <sidebar-link to="/shop">
        <md-icon>store</md-icon>
        <p v-if="isExpanded">Shop</p>
      </sidebar-link>
      <sidebar-link to="/dining-table">
        <md-icon>dinner_dining</md-icon>
        <p v-if="isExpanded">Dining Table</p>
      </sidebar-link>
      <sidebar-link to="/menu-catalog">
        <md-icon>menu_book</md-icon>
        <p v-if="isExpanded">Menu Catalog</p>
      </sidebar-link>
      <sidebar-link to="/menu-list">
        <md-icon>summarize</md-icon>
        <p v-if="isExpanded">Menu List</p>
      </sidebar-link>
      <sidebar-link to="/order">
        <md-icon>list_alt</md-icon>
        <p v-if="isExpanded">Product Order</p>
      </sidebar-link>
      <!-- <sidebar-link to="/upgrade" class="active-pro">
        <md-icon>unarchive</md-icon>
        <p>Upgrade to PRO</p>
      </sidebar-link> -->
    </side-bar>

    <div :class="{ 'main-panel': true, collapsed: !isExpanded }">
      <top-navbar></top-navbar>

      <fixed-plugin
        :color.sync="sidebarBackground"
        :image.sync="sidebarBackgroundImage"
      >
      </fixed-plugin>

      <dashboard-content> </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";
import FixedPlugin from "./Extra/FixedPlugin.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    // MobileMenu,
    FixedPlugin,
  },
  data() {
    return {
      sidebarBackground: "green",
      sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg"),
      isExpanded: true,
    };
  },
  watch: {
    "$sidebar.isExpanded": function (newVal) {
      this.isExpanded = newVal;
    },
  },

  methods: {},
};
</script>
<style scoped>
.main-panel.collapsed {
  /* Styles when isExpanded is true */
  width: calc(100% - 90px) !important;
}

@media only screen and (max-width: 768px) {
  .main-panel.collapsed {
    /* Styles when isExpanded is true */
    width: calc(100% - 90px) !important;
  }
}
</style>
