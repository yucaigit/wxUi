import Vue from 'vue'
import Router from 'vue-router'
import Login from "../views/Login";
import Main from "../views/Main";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'Main',
      component: Main,
      meta:{
        requireLogin:true
      },
      children:[
        {
          path: '/home',
          name: 'home',
          component: ()=>import('../views/home'),
        },
        {
          path: '/user',
          name:'user',
          component:()=>import('../views/user/User')
        },
        {
          path: '/userdetail',
          name: 'userdetail',
          component:()=>import('../views/userdetail/UserDetail')
        },
        {
          path: '/goods',
          name: 'goods',
          component:()=>import('../views/goods/Goods')
        },
        {
          path: '/order',
          name: 'order',
          component:()=>import('../views/order/Order')
        },
        {
          path: '/statistic',
          name: 'statistic',
          component:()=>import('../views/statistic/Statistic')
        }
      ]
    },

    {
      path: '/',
      name: 'Login',
      component: Login
    },
  ]
})
