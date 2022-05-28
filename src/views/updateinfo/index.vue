<template>

  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="账号">
      <el-input v-model="formInline.name" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formInline.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确认修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    export default {
        name: "index",
      data(){
          return{
            formInline: {
              name: '',
              password: ''
            },
            name:'',
            id:0
          }
      },
      methods:{
         onSubmit(){
          if (this.formInline.name!=='' && this.formInline.password===''){
            if (this.formInline.name===localStorage.getItem('name')){
              alert('账号与之前一致')
            }else {
              this.updateAdminName(this.formInline.name)
            }
          }if (this.formInline.name==='' && this.formInline.password!==''){
            if (this.formInline.password.length>2 && this.formInline.password.length<7){
              this.updateAdminPwd(this.formInline.password)
            }else {
              alert('密码长度必须在2-7')
            }
          }if (this.formInline.name!==''&&this.formInline.password!==''){

            if (this.formInline.name.length>11){
              alert('账户名太长')
            }if (this.formInline.password.length<2 || this.formInline.password.length>7){
               alert('密码长度必须在2-7')
             }else {
              this.updateAdmin(this.formInline.name,this.formInline.password)
             }
           }
        },
        async getAdminId(e){
           let aid = await this.$get('/mesage/selectId?name='+e)
          this.id = aid
        },
      //  only update name
        async updateAdminName(e){
           let result = await this.$get('/mesage/onlyUpdatename?id='+this.id+'&&name='+e)
          if (result){
            alert('账号修改成功')
            localStorage.setItem('name',e)
          }
        },
      //  only update password
        async updateAdminPwd(e){
           let result  = await this.$get('/mesage/onlyUpdatePwd?id='+this.id+'&&pwd='+e)
          if (result){
            alert('密码修改成功')
          }
        },
        async updateAdmin(name,pwd){
           let updateAdmin = {
             id:this.id,
             name:name,
             pwd:pwd
           }
           let result = await this.$post('/mesage/updateAdmin',updateAdmin)
          if (result){
            alert('信息修改成功')
          }
        }
      },
      created() {
        this.getAdminId(localStorage.getItem('name'))
      }
    }
</script>

<style scoped>

</style>
