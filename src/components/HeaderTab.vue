<template>
  <div class="all">
  <div class="userlogo">

    <div class="userinfo">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="height: 50px;width: 50px"></el-avatar>
    </div>
    <div class="exitUser" >
      <el-dropdown  @command="handleCommand">
  <span class="el-dropdown-link">
    个人信息<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
        <el-dropdown-menu slot="dropdown" v-model="chose" >
          <el-dropdown-item command="1">账户修改</el-dropdown-item>
          <el-dropdown-item command="2">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
  </div>
</template>

<script>
    export default {
        name: "HeaderTab",
      data(){
          return{
            chose:''
          }
      },
      created() {

      },
      methods:{
        testfunction(){
          this.$router.push('/test'
          )
        },
        gotoUpdate(){
          this.$router.push('/updateinfo')
        },
        choose(){
          alert("l")
        },
        handleCommand(command){
          if (command==='1'){
            this.gotoUpdate()
          }else {
            localStorage.removeItem('token')
            this.$router.push('/')
          }
        }
      }
    }
</script>

<style scoped>
  .all{
    background-color: darkgray;
  }
.userlogo{
  width: 100%;
  height: 70px;
  display: flex;
  margin-left: 80%;

}
  .userinfo{
    padding: 10px;
  }
  .exitUser{
    padding-top: 20px;
  }
</style>
