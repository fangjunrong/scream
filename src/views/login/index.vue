
<template>
  <div class="index">
    <div class="index__form">
      <p class="index__form-title lighted-text">尖叫智慧（物流）ET大脑</p>
      <el-form ref="loginInfo" :model="loginInfo" :rules="loginInfoRule" autocomplete="off">
        <div class="index__form-container">
          <el-form-item prop="name" style="margin-top: 70px;">
            <input
              v-model="loginInfo.name"
              autocomplete="off"
              class="index__form-container-input username"
              placeholder="请输入用户名"/>
          </el-form-item>
          <el-form-item prop="password">
            <input
              v-model="loginInfo.password"
              autocomplete="off"
              type="password"
              class="index__form-container-input password"
              placeholder="请输入密码"
              @keyup.enter="login('loginInfo')"/>
          </el-form-item>
          <el-button type="primary" class="index__form-container-submit" @click="login('loginInfo')">立即登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { setToken } from '@/utils/common'
import { mapActions } from 'vuex'
// import axios from 'axios'

export default {
  name: '',
  data() {
    return {
      loginInfo: {
        name: 'admin',
        password: '123456'
      },
      loginInfoRule: {
        name: [{
          required: true, message: '请输入用户名', trigger: 'blur'
        }],
        password: [{
          required: true, message: '请输入密码', trigger: 'blur'
        }]
      }
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions('user', [
      'fetchLogin'
    ]),
    async fakelogin() {
      if (this.loginParms.yst === '' || this.loginParms.yst === undefined) {
        alert('请输入SapId')
        return
      }
      setToken('UserToken', '12313123312113213')
      this.$router.push('/index')
    },
    async login(loginInfo) {
      this.$refs[loginInfo].validate(async valid => {
        if (valid) {
          const result = await this.fetchLogin({
            name: this.loginInfo.name,
            password: this.loginInfo.password
          })
          if (result.code !== 200) {
            this.$message.warning(result.message)
          }
          setToken('token', result.data.token)
          this.$router.push('/index')
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.index{
  height: 100%;
  width: 100%;
  background: url('../../assets/login-bg.jpg');
  background-size: 100% 100%;
  &__form{
    position: fixed;
    left: 0;
    right: 0;
    top: 50%;
    margin: -371px auto 0 auto;
    height: 742px;
    width: 742px;
    &-title{
      height: 36px;
      font-size: 36px;
      line-height: 36px;
      text-align: center;
      letter-spacing: 2.9px;
      margin-top: 64px;
      margin-bottom: 68px;
    }
    &-container{
      float: right;
      margin-right: 56px;
      &-input{
        font-size: 16px;
        color:#64eefa;
        background: #001F30;
        border: 1px solid #5EEFF9;
        border-radius: 8px;
        height: 58px;
        line-height: 58px;
        width: 330px;
        text-indent: 76px;
        outline: none;
      }
      &-submit{
        border-radius: 30px;
        width: 330px;
        height: 58px;
      }
      .username{
        background: url('../../assets/login-user.png') 28px center no-repeat;
        background-size: 28px 28px;
      }
      .password{
        background: url('../../assets/login-password.png') 28px center no-repeat;
        background-size: 28px 28px;
      }
    }
  }
}
input::-webkit-input-placeholder{
    color:#64eefa;
}
</style>
<style>
.index .el-input__inner{
  background: #001F30;
  border: 1px solid #5EEFF9;
}

.index .el-form{
  width: 742px;
  height: 410px;
  background: url('../../assets/login-box.png');
  background-size: 100% 100%;
}

.index .el-form-item{
  margin-bottom: 26px;
}
</style>
