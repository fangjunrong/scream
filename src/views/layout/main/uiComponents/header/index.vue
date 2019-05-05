<template>
  <div class="header">
    <div class="header__left">

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
export default {
  name: 'Header',
  data() {
    return {
      name: 'scream'
    }
  },
  methods: {
    logout() {
      console.log('logout')
    }
  }
}
</script>
<style lang="scss" scope>
.header{
  display: flex;
  justify-content: space-between;
  height: 72px;
  line-height: 72px;
  background: url('../../../../../assets/bg_header.png');
  background-size: 100% 100%;
  &__right{
    display: flex;
    width: 200px;
    justify-content: space-between;
    &-info{
      &-avatar{
        float: left;
        margin-right: 8px;
        display: inline-block;
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
      }
    }
  }
}
</style>
