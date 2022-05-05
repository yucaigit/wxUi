<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <left-aside></left-aside>
    </el-aside>
    <el-container>
      <el-header>
        <header-tab/>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
  import LeftAside from "../components/LeftAside";
  import HeaderTab from "../components/HeaderTab";
  export default {
    name: "Main",
    components:{
      LeftAside,
      HeaderTab
    },
    data() {
      return {
        userInfo: {
        }
      }
    },
    created() {
      console.log("userinfo"+localStorage.getItem("token"))
    },
    methods: {

    }
  }
</script>

<style lang="less" scoped>
</style>
