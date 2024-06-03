import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import OrderList from "@/views/Order/orderList";
import DiningTableList from "@/views/DiningTable/tableList";
import MenuCatalogList from "@/views/Menu/menuCatalog";
import MenuList from "@/views/Menu/menuList";
import ShopList from "@/views/Shop/shopList";
import OrganizationList from "@/views/Organization/organizationList";


const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile,
      },
      {
        path: "organization",
        name: "Organization List",
        component: OrganizationList,
      },
      {
        path: "shop",
        name: "Shop List",
        component: ShopList,
      },
      {
        path: "order",
        name: "Order List",
        component: OrderList,
      },
      {
        path: "dining-table",
        name: "Dining Table",
        component: DiningTableList,
      },
      {
        path: "menu-catalog",
        name: "Menu Catalog",
        component: MenuCatalogList,
      },
      {
        path: "menu-list",
        name: "Menu List",
        component: MenuList,
      }

    ],
  },
];

export default routes;
