/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import SearchPage from "./Pages/SearchPage";
// core components/views for Admin layout
// import DashboardPage from "views/Dashboard/Dashboard.js";
// import UserProfile from "views/UserProfile/UserProfile.js";
// import TableList from "views/TableList/TableList.js";
// import Typography from "views/Typography/Typography.js";
// import Icons from "views/Icons/Icons.js";
// import Maps from "views/Maps/Maps.js";
// import NotificationsPage from "views/Notifications/Notifications.js";
// import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout

import InstructorPage from "./Pages/DashboardPages/Instructor/InstructorPage";
import StudentPage from "./Pages/DashboardPages/Student/StudentPage";
import InstructorRoutes from "./Pages/DashboardPages/Instructor/InstructorRoutes";
import GraderPage from "./Pages/DashboardPages/Grader/GraderPage";
import DashboardSearch from "./Pages/DashboardPages/DashboardSearch";
import studentRoutes from "./Pages/DashboardPages/Student/studentRoutes";
import AdminPage from "./Pages/DashboardPages/Admin/AdminRoutes";
const dashboardRoutes = [
  {
    path: "/grader",
    name: "Grader Page",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: GraderPage,
    layout: "/dashboard"
  },

  {
    path: "/student",
    name: "Student Page",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: studentRoutes,
    layout: "/dashboard"
  },
  {
    path: "/instructor",
    name: "Instructor Page",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component:InstructorRoutes ,
    layout: "/dashboard"
  },
  {
    path: "/admin",
    name: "Admin Page",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: AdminPage,
    layout: "/dashboard"
  },
  // {
  //   path: "/search/:type/:query",
  //   name: "Search",
  //   rtlName: "لوحة القيادة",
  //   icon: Dashboard,
  //   component: DashboardSearch,
  //   layout: "/dashboard"
  // },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: Person,
  //   component: UserProfile,
  //   layout: "/dashboard"
  // },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   rtlName: "قائمة الجدول",
  //   icon: "content_paste",
  //   component: TableList,
  //   layout: "/dashboard"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "الرموز",
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   rtlName: "خرائط",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin"
  // },
  // {
  //   path: "/rtl-page",
  //   name: "RTL Support",
  //   rtlName: "پشتیبانی از راست به چپ",
  //   icon: Language,
  //   component: RTLPage,
  //   layout: "/rtl"
  // },
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //   rtlName: "التطور للاحترافية",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
