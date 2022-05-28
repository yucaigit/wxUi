<!--<template>-->
<!-- <div class="box1">-->
<!--   <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">-->
<!--     <el-form-item label="用户名" prop="name">-->
<!--       <el-input v-model="ruleForm.name"></el-input>-->
<!--     </el-form-item>-->
<!--     <el-form-item label="密码" prop="password">-->
<!--       <el-input v-model="ruleForm.password" type="password" autocomplete="off"></el-input>-->
<!--     </el-form-item>-->

<!--&lt;!&ndash;     <el-form-item label="验证码" prop="number">&ndash;&gt;-->
<!--&lt;!&ndash;       <el-input v-model="ruleForm.number"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;     </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;     <el-button>获取验证码</el-button>&ndash;&gt;-->
<!--     <el-form-item>-->
<!--       <el-button type="primary" @click="submitForm('ruleForm')">立即登录</el-button>-->
<!--       <el-button @click="resetForm('ruleForm')">重置</el-button>-->
<!--     </el-form-item>-->

<!--   </el-form>-->
<!-- </div>-->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        name: "Login",-->
<!--      data() {-->
<!--        return {-->
<!--          ruleForm: {-->
<!--            name: '',-->
<!--            password:'',-->
<!--            number:'',-->
<!--          },-->
<!--          rules: {-->
<!--            name: [-->
<!--              { required: true, message: '请输入用户名', trigger: 'blur' },-->

<!--            ],-->
<!--            password: [-->
<!--              { required: true, message: '请输入密码', trigger: 'blur' },-->
<!--            ],-->
<!--          }-->
<!--        };-->
<!--      },-->
<!--      methods: {-->
<!--        submitForm(formName) {-->
<!--          this.$refs[formName].validate((valid) => {-->
<!--            if (valid && this.ruleForm.password==123456 && this.ruleForm.name=='admin') {-->
<!--              //登录请求-->
<!--                localStorage.setItem("token", "token");-->
<!--                if (this.$route.query.redirect) {-->
<!--                  this.$router.push({path: this.$route.query.redirect})-->
<!--                } else {-->
<!--                  this.$router.push('/main')-->
<!--                }-->


<!--            } else {-->
<!--              console.log('error submit!!');-->
<!--              return false;-->
<!--            }-->
<!--          });-->
<!--        },-->
<!--        resetForm(formName) {-->
<!--          this.$refs[formName].resetFields();-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->
<!--.box1{-->
<!--  align-content: center;-->
<!--}-->
<!--  .el-form{-->
<!--    align-content: center;-->
<!--    margin-top: 200px;-->
<!--    margin-left: 500px;-->
<!--  }-->
<!--  .el-form-item{-->
<!--    width: 500px;-->
<!--  }-->
<!--</style>-->

<template>
  <div>
    <div class="login-box">
      <h2>登录系统</h2>
      <form>
        <div class="user-box">
          <input type="text" name="" required="" v-model="username">
          <label>账号</label>
        </div>
        <div class="user-box">
          <input type="password" name="" required="" v-model="password">
          <label>密码</label>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a @click="handleSubmit">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          登录
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<!--        <a @click="signUp_asd">注册 </a>-->
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        loginState:false,
        username: '',
        password: '',
        msg: ''
      }
    },
    methods: {
      signUp_asd(){
        this.$router.replace({path: '/signUp'});
      },
      open1(msg) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'warning'
        });
      },
      open2() {
        this.$message({
          showClose: true,
          message: this.msg,
          type: 'success'
        });
      },
      open3() {
        this.$message({
          showClose: true,
          message: this.msg,
          type: 'error'
        });
      },
      async adminLogin(){
        let result = await this.$get('/adminLogin?name='+this.username+"&&password="+this.password)
        return result
      },

      handleSubmit() {
        let _this = this

        if(this.username===""||this.password===""){
          this.msg = "请输入账号密码"
          this.open3()
        }
        this.adminLogin().then((res)=>{
          _this.loginState = res
          if (!_this.loginState){
            this.open1('错误的账户密码')
          }
        })

        if(this.loginState){
          localStorage.setItem("token", _this.username);
          localStorage.setItem('name',_this.username)
          if(this.$route.query.redirect){
            this.$router.push({path: this.$route.query.redirect})
          }else {
            this.$router.push('/main')
          }
        }
      },
    },
  }
  ;
</script>

<style>
  body {

    background-repeat: no-repeat;
    background-size: 100%;
    background-position: 0px -50px;
  }

  .login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    padding: 40px;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, .5);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
    border-radius: 10px;
  }

  .login-box h2 {
    margin: 0 0 30px;
    padding: 0;
    color: #fff;
    text-align: center;
  }

  .login-box .user-box {
    position: relative;
  }

  .login-box .user-box input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: transparent;
  }

  .login-box .user-box label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    pointer-events: none;
    transition: .5s;
  }

  .login-box .user-box input:focus ~ label,
  .login-box .user-box input:valid ~ label {
    top: -20px;
    left: 0;
    color: #03e9f4;
    font-size: 12px;
  }

  .login-box form a {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    color: #03e9f4;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .5s;
    margin-top: 40px;
    letter-spacing: 4px
  }

  .login-box a:hover {
    background: #03e9f4;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #03e9f4,
    0 0 25px #03e9f4,
    0 0 50px #03e9f4,
    0 0 100px #03e9f4;
  }

  .login-box a span {
    position: absolute;
    display: block;
  }

  .login-box a span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #03e9f4);
    animation: btn-anim1 1s linear infinite;
  }

  @keyframes btn-anim1 {
    0% {
      left: -100%;
    }
    50%, 100% {
      left: 100%;
    }
  }

  .login-box a span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #03e9f4);
    animation: btn-anim2 1s linear infinite;
    animation-delay: .25s
  }

  @keyframes btn-anim2 {
    0% {
      top: -100%;
    }
    50%, 100% {
      top: 100%;
    }
  }

  .login-box a span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #03e9f4);
    animation: btn-anim3 1s linear infinite;
    animation-delay: .5s
  }

  @keyframes btn-anim3 {
    0% {
      right: -100%;
    }
    50%, 100% {
      right: 100%;
    }
  }

  .login-box a span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #03e9f4);
    animation: btn-anim4 1s linear infinite;
    animation-delay: .75s
  }

  @keyframes btn-anim4 {
    0% {
      bottom: -100%;
    }
    50%, 100% {
      bottom: 100%;
    }
  }
</style>
