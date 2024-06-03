import Sidebar from "./SideBar.vue";
import SidebarLink from "./SidebarLink.vue";
import DashboardLayout from "../../pages/Layout/DashboardLayout.vue";

const SidebarStore = {
  showSidebar: false,
  isExpanded: true,
  displaySidebar(value) {
    this.showSidebar = value;
  },
  expand() {
    this.isExpanded = !this.isExpanded;
  },
};

const SidebarPlugin = {
  install(Vue) {
    Vue.mixin({
      data() {
        return {
          sidebarStore: SidebarStore,
        };
      },
    });

    Object.defineProperty(Vue.prototype, "$sidebar", {
      get() {
        return this.$root.sidebarStore;
      },
    });
    Vue.component("side-bar", Sidebar);
    Vue.component("sidebar-link", SidebarLink);
    Vue.component("dashboard-layout", DashboardLayout);
  },
};

export default SidebarPlugin;
