<template>
  <div class="userlogo">
    <div class="userinfo">

        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>

    </div>
    <div class="exitUser">退</div>
  </div>

</template>

<script>
    export default {
        name: "HeaderTab",
      data(){
          return{

          }
      },
      methods:{
      }
    }
</script>

<style scoped>
.userlogo{
  width: 100%;
  height: 70px;
  background-color: rebeccapurple;
  display: flex;
}
  .userinfo{
    padding: 20px;
  }
</style>
