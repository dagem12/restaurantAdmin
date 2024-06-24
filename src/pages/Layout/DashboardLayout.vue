<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar :sidebar-item-color="sidebarBackground" :sidebar-background-image="sidebarBackgroundImage">
      <!-- <mobile-menu slot="content"></mobile-menu> -->
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p v-if="isExpanded">Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/organization" v-if="accountService.hasAuthorities(Authority.ADMIN)">
        <md-icon>corporate_fare</md-icon>
        <p v-if="isExpanded">Organization</p>
      </sidebar-link>
      <sidebar-link to="/shop" v-if="accountService.hasAuthorities(Authority.ORGANIZATION_ADMIN)">
        <md-icon>store</md-icon>
        <p v-if="isExpanded">Shop</p>
      </sidebar-link>
      <sidebar-link to="/dining-table"
        v-if="accountService.hasAuthorities(Authority.ORGANIZATION_ADMIN) || accountService.hasAuthorities(Authority.SHOP_ADMIN)">
        <md-icon>dinner_dining</md-icon>
        <p v-if="isExpanded">Dining Table</p>
      </sidebar-link>
      <sidebar-link to="/menu-catalog"
        v-if="accountService.hasAuthorities(Authority.ORGANIZATION_ADMIN) || accountService.hasAuthorities(Authority.SHOP_ADMIN)">
        <md-icon>menu_book</md-icon>
        <p v-if="isExpanded">Menu Catalog</p>
      </sidebar-link>
      <sidebar-link to="/menu-list"
        v-if="accountService.hasAuthorities(Authority.ORGANIZATION_ADMIN) || accountService.hasAuthorities(Authority.SHOP_ADMIN)">
        <md-icon>summarize</md-icon>
        <p v-if="isExpanded">Menu List</p>
      </sidebar-link>
      <sidebar-link to="/order"
        v-if="accountService.hasAuthorities(Authority.ORGANIZATION_ADMIN) || accountService.hasAuthorities(Authority.SHOP_ADMIN)">
        <md-icon>list_alt</md-icon>
        <p v-if="isExpanded">Product Order</p>
      </sidebar-link>
      <sidebar-link to="/feedBack"
        v-if="accountService.hasAuthorities(Authority.SHOP_ADMIN)">
        <md-icon>reviews</md-icon>
        <p v-if="isExpanded">Rating & Feedback</p>
      </sidebar-link>

      <sidebar-link to="/advertisements"
        v-if="accountService.hasAuthorities(Authority.ADMIN) || accountService.hasAuthorities(Authority.ORGANIZATION_ADMIN)">
        <md-icon>book</md-icon>
        <p v-if="isExpanded">Advertisements</p>
      </sidebar-link>
      <sidebar-link to="/waiters-call"
        v-if=" accountService.hasAuthorities(Authority.SHOP_ADMIN)">
        <md-icon>dish</md-icon>
        <p v-if="isExpanded">Waiters Call</p>
      </sidebar-link>
      <sidebar-link to="/users"
        v-if="accountService.hasAuthorities(Authority.ADMIN) || accountService.hasAuthorities(Authority.ORGANIZATION_ADMIN)">
        <md-icon>person</md-icon>
        <p v-if="isExpanded">Users</p>
      </sidebar-link>
      <!-- <sidebar-link to="/upgrade" class="active-pro">
        <md-icon>unarchive</md-icon>
        <p>Upgrade to PRO</p>
      </sidebar-link> -->
    </side-bar>

    <div :class="{ 'main-panel': true, collapsed: !isExpanded }">
      <top-navbar></top-navbar>

      <fixed-plugin :color.sync="sidebarBackground" :image.sync="sidebarBackgroundImage">
      </fixed-plugin>

      <dashboard-content> </dashboard-content>

      <!-- <content-footer v-if="!$route.meta.hideFooter"></content-footer> -->
    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";
import FixedPlugin from "./Extra/FixedPlugin.vue";
import { Authority } from "../../utils/authority";
import AccountService from "../../views/Login/api/account.service";

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
      sidebarBackground: "va",
      sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg"),
      isExpanded: true,
      accountService: new AccountService(),
      Authority: new Authority()
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
  position: relative;
}

@media only screen and (max-width: 768px) {
  .main-panel.collapsed {
    /* Styles when isExpanded is true */
    width: calc(100% - 90px) !important;
  }
}
</style>
