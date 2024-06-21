import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import OrderList from "@/views/Order/orderList";
import FeedbackList from "@/views/Feedback/feedbackList";
import DiningTableList from "@/views/DiningTable/tableList";
import MenuCatalogList from "@/views/Menu/menuCatalog";
import MenuList from "@/views/Menu/menuList";
import ShopList from "@/views/Shop/shopList";
import OrganizationList from "@/views/Organization/organizationList";
import UsersList from "@/views/User/usersList";
import Login from "@/views/Login";
import ForgotPassword from "@/views/ForgetPassword";
import OrderDetail from "@/views/Order/orderDetail";
import Advertisements from "@/views/advert/advertList"
import WaitersCall from "@/views/call-waiter/CallWaiterList"

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/forgotPassword",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: { requiresAuth: false },
  },
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    meta: { requiresAuth: true },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { requiresAuth: true },
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile,
        meta: { requiresAuth: true },
      },
      {
        path: "organization",
        name: "Organization List",
        component: OrganizationList,
        meta: { requiresAuth: true },
      },
      {
        path: "shop",
        name: "Shop List",
        component: ShopList,
        meta: { requiresAuth: true },
      },
      {
        path: "order",
        name: "Order List",
        component: OrderList,
        meta: { requiresAuth: true },
      },
      {
        path: "feedBack",
        name: "Feedback List",
        component: FeedbackList,
        meta: { requiresAuth: true },
      },
      {
        path: "advertisements",
        name: "Advertisements",
        component: Advertisements,
        meta: { requiresAuth: true },
      },

      {
        path: "waiters-call",
        name: "WaitersCall",
        component: WaitersCall,
        meta: { requiresAuth: true },
      },
      {
        path: "order-detail/:orderId",
        name: "Order Detail",
        component: OrderDetail,
        meta: { requiresAuth: true },
      },
      {
        path: "dining-table",
        name: "Dining Table",
        component: DiningTableList,
        meta: { requiresAuth: true },
      },
      {
        path: "menu-catalog",
        name: "Menu Catalog",
        component: MenuCatalogList,
        meta: { requiresAuth: true },
      },
      {
        path: "menu-list",
        name: "Menu List",
        component: MenuList,
        meta: { requiresAuth: true },
      },
      {
        path: "users",
        name: "Users List",
        component: UsersList,
        meta: { requiresAuth: true },
      },
    ],
  },
];

export default routes;
