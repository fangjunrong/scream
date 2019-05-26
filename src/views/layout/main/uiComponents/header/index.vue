<template>
  <div class="header">
    <div class="header__left">
      <Picture
        :src="screamLogo"
        size="200 72"
        class="logo1"
        border="none"></Picture>
      <Picture
        :src="cainiaoLogo"
        size="109 72"
        class="logo2"
        border="none"></Picture>
      <Picture
        :src="sysName"
        size="760 72"
        class="logo3"
        border="none"></Picture>
    </div>
    <div class="header__center">

    </div>
    <div class="header__right">
      <div class="header__right-info">
        <span class="header__right-info-avatar"/>
        <span class="header__right-info-name">{{ name }}</span>
      </div>
      <span class="header__right-info-logout" @click="logout">退出</span>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import screamLogo from '@/assets/scream-logo.png'
import cainiaoLogo from '@/assets/cainiao-logo.png'
import sysName from '@/assets/sys-name.png'
export default {
  name: 'Header',
  data() {
    return {
      name: 'scream',
      screamLogo: screamLogo,
      cainiaoLogo: cainiaoLogo,
      sysName: sysName
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapState('user', [
      'loginInfo'
    ]),
    ...mapMutations('user', [
      'clearToken'
    ]),
    logout() {
      this.clearToken('token')
      this.$router.push('/login')
    },
    init() {
      this.name = this.loginInfo().name
    }
  }
}
</script>
<style lang="scss" scope>
.header{
  height: 72px;
  line-height: 72px;
  background: url('../../../../../assets/bg_header.png');
  background-size: 100% 100%;
  &__left{
    float: left;
    height: 72px;
    min-width: 1200px;
    .logo1{
      margin-left: 1.5% !important;
    }
    .logo2{
      margin-left: 2.7% !important;
    }
    .logo3{
      position: absolute;
      left: 50%;
      margin-left: -380px !important;
      // margin-left: 4.6% !important;
    }
  }
  &__right{
    display: flex;
    float: right;
    width: 200px;
    justify-content: space-between;
    &-info{
      &-avatar{
        float: left;
        margin-right: 8px;
        display: block;
        width: 26px;
        height: 26px;
        border-radius: 13px;
        margin-top: 23px;
        background: url("../../../../../assets/avatar.jpg") center center no-repeat;
        background-size:26px 26px;
      }
      &-name{
        color: #fff;
      }
      &-logout{
        width: 32px;
        line-height: 72px;
        font-size: 16px;
        margin-right: 42px;
        color: #e1e1e1;
        cursor: pointer;
      }
    }
  }
}
</style>
