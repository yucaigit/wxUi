// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from "axios";
import {get,post} from '../until/request'
import * as echarts from 'echarts'

Vue.config.productionTip = false
Vue.use(Element)
Vue.prototype.$echarts=echarts
Vue.prototype.$axios=axios
Vue.prototype.$get = get
Vue.prototype.$post = post
/* eslint-disable no-new */


router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  if (to.meta.requireLogin){
    if (token){
      next();
    }else {
      next({
        path:'/',
        query:{
          redirect:to.fullPath
        }
      })
    }
  }
  else {
    next();
  }
})


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
