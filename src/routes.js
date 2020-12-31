import Login from "./views/Login.vue";

import Home from "./views/Home.vue";
import Test from "./views/test.vue";











let routes = [
  {
    path: "/login",
    component: Login,
    name: "",
    hidden: true
  },

  {
    path: "/",
    component: Home,
    name: "用户管理",
    iconCls: "fa fa-clone", //图标样式class
    children: [
      {
        path: "/test",
        component: Test,
        name: "哈哈哈",
        hidden: false
      },
     
    
    ]
  },
 
   {
     path: "*",
   redirect: "/login",
    hidden: true
 }
];

export default routes;
