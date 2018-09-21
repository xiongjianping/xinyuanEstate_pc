<template>
<div class="login-wrap" v-loading="loading">
  <div class="ms-login">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
      <div class="loginTit">
        <p>三角理论管理系统</p>
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
    var urlArr = window.location.href.split('&')
    for(var i = 0; i < urlArr.length; i++){
      if(urlArr[i].indexOf('userName') > 0){
        var arr = urlArr[i].split('=')
        var userName = arr[arr.length - 1]
        console.log('userName = ' + userName)
        // this.submitFormDandian(userName)
        this.submitForm(userName)
      }
    }
  },
  methods: {
    // submitFormDandian (formName) {
    //   var params = {
    //     userName: this.ruleForm.username
    //   }
    //   const self = this
    //   // this.params.userName = this.ruleForm.username;
    //   window.$logins(params).then((res) => {
    //     window.localStorage.setItem('xinyuan_accesstoken', res.accessToken)
    //     // window.localStorage.setItem('xinyuan_refreshtoken', res.refreshToken)
    //     this.$router.replace('/index')
    //   }, (err) => {
    //     console.log(err)
    //   })
    // },
    submitForm (formName) {
      var params = {}
      if(this.ruleForm.username == ''){
        params.userName = formName;
      }else{
        params.userName = this.ruleForm.username
      }
      console.log(params);
      const self = this
      // this.params.userName = this.ruleForm.username;
      window.$login(params).then((res) => {
        window.localStorage.setItem('xinyuan_accesstoken', res.accessToken)
        // window.localStorage.setItem('xinyuan_refreshtoken', res.refreshToken)
        this.$router.replace('/index')
      }, (err) => {
        console.log(err)
      })
    },

  }
}
</script>
<style lang="less" scoped>
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
  .demo-ruleForm{
    position: absolute;
    top: 4px;
    text-align: center;
    .loginTit{
      font-size: 20px;
      padding: 10px;
      text-align: center;
      p{
        color: #fff;
      }
    }
    .inputList{
      width: 335px;
    }
    .login-btn{
      .el-button{
        width: 100%;
      }
    }
  }

}
</style>
