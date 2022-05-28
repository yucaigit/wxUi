<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <el-menu-item v-for="item in noChildren" :index="item.path" :key="item.path" @click="clickMenu(item)">
      <i :class="'el-icon-'+item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>

<!--    <el-submenu index="1" v-for="item in haChildren" :index="item.path" :key="item.path" @click="clickMenu(item)">-->
<!--      <template slot="title">-->
<!--        <i :class="'el-icon-'+item.icon"></i>-->
<!--        <span slot="title">{{item.label}}</span>-->
<!--      </template>-->
<!--&lt;!&ndash;      用户管理、物品管理、物品发布、在线订单、订单管理、统计分析、用户交流&ndash;&gt;-->
<!--      <el-menu-item-group>-->
<!--        <el-menu-item index="1-1">{{item.children.label}}</el-menu-item>-->
<!--      </el-menu-item-group>-->
<!--    </el-submenu>-->
  </el-menu>

</template>

<script>
    export default {
        name: "LeftAside",
      data() {
        return {
          isCollapse: false,
          menu: [
            {
              path:'/',
              name:'home',
              label:'首页',
              icon:'s-home',
              url:'Home/home'
            },
            {
              path:'/user',
              name:'user',
              label:'用户管理',
              icon:'s-check',
              url:'User/user'
            },
            {
              path:'/goods',
              name:'goods',
              label:'商品管理',
              icon:'s-grid',
              url:'Goods/goods'
            },
            {
              path:'/order',
              name:'order',
              label:'订单管理',
              icon:'location',
              url:'Order/order'
            },
            {
              path:'/statistic',
              name:'statistic',
              label:'统计分析',
              icon:'eleme',
              url:'Statistic/statistic'
            },
            {
              path: '/sort',
              name: 'sort',
              label: '商品分类管理',
              icon: 'document-copy',
              url: 'Sort/sort'
            }
            // {
            //   label: '其他',
            //   icon: 'location',
            //   children:[
            //     {
            //       path:'/test',
            //       name:'test',
            //       label:'测试',
            //       icon:'s-home',
            //       url:'Test/test'
            //     }
            //   ]
            // }
          ]
        };
      },
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        clickMenu(item){
          this.$router.push({
            name:item.name
          })
        }
      },
      computed:{
          noChildren(){
            return  this.menu.filter(item=>!item.children)
          },
          haChildren(){
            return this.menu.filter(item=>item.children)
          }
      }
    }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
