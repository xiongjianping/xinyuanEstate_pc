<template>
<div class="login-wrap" v-loading="loading">
  <div class="ms-login">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
      <div class="loginTit">
        <p>商家后台管理系统</p>
      </div>
      <div class="inputList">
        <el-form-item prop="username">
          <el-input class="lineInput user" :maxlength="50" v-model="ruleForm.username" placeholder="请输入您的账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input class="lineInput pwd" :maxlength="20" type="password" placeholder="请输入您的密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
      </div>
    </el-form>
  </div>
</div>
</template>

<script>
export default {
  data: function () {
    return {
      ruleForm: {
        username: '',
        password: '',
        code: ''
      },
      loading: false,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      session: {
        data: {
          code: ''
        }
      }
    }
  },
  created () {
    // this.$axios.get('/shop/userauth/Session').then((res) => {
    //   this.session = res
    // }).catch(function (eMsg) {
    //   this.showAlert(eMsg)
    // })

    console.log(window.location.href)
    var urlArr = window.location.href.split('=')
    var userName = urlArr[urlArr.length - 1]
    console.log(urlArr)
    console.log(userName)
    this.submitForm(userName)
  },
  methods: {
    submitForm (formName) {
      const self = this
      window.$login(formName).then((res) => {
        window.localStorage.setItem('xinyuan_accesstoken', res.accessToken)
        // window.localStorage.setItem('xinyuan_refreshtoken', res.refreshToken)
        this.$router.replace('/index')
      }, (err) => {
        console.log(err)
      })
    },
    showAlert: function (cont) {
      this.$alert(cont, '温馨提示', {
        confirmButtonText: '确定'
      })
    }
  }
}
</script>
<style scoped lang="less">
.login-wrap{
  position: relative;
  width:100%;
  height:100%;
}
.ms-login{
  width: 400px;
  height: 250px;
  position: absolute;
  left: 50%;
  top: 300px;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 10px;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  .loginTit{
    font-size: 20px;
    padding: 10px;
    text-align: center;
    margin-bottom: 20px;
  }
  .login-btn{
    .el-button{
      width: 100%;
    }
  }
}
</style>
