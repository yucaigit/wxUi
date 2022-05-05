<template>
 <div class="box1">
   <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
     <el-form-item label="用户名" prop="name">
       <el-input v-model="ruleForm.name"></el-input>
     </el-form-item>
     <el-form-item label="密码" prop="password">
       <el-input v-model="ruleForm.password" type="password" autocomplete="off"></el-input>
     </el-form-item>

<!--     <el-form-item label="验证码" prop="number">-->
<!--       <el-input v-model="ruleForm.number"></el-input>-->
<!--     </el-form-item>-->
<!--     <el-button>获取验证码</el-button>-->
     <el-form-item>
       <el-button type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
       <el-button @click="resetForm('ruleForm')">重置</el-button>
     </el-form-item>

   </el-form>
 </div>
</template>

<script>
    export default {
        name: "Login",
      data() {
        return {
          ruleForm: {
            name: '',
            password:'',
            number:'',
          },
          rules: {
            name: [
              { required: true, message: '请输入用户名', trigger: 'blur' },

            ],
            password: [
              { required: true, message: '请输入密码', trigger: 'blur' },
            ],
          }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid && this.ruleForm.password==123456 && this.ruleForm.name=='admin') {
              //登录请求
                localStorage.setItem("token", "token");
                if (this.$route.query.redirect) {
                  this.$router.push({path: this.$route.query.redirect})
                } else {
                  this.$router.push('/main')
                }


            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    }
</script>

<style scoped>
.box1{
  align-content: center;
}
  .el-form{
    align-content: center;
    margin-top: 200px;
    margin-left: 500px;
  }
  .el-form-item{
    width: 500px;
  }
</style>

