<template>
  <div :class="{noBg:flag}" class="nopermtcontainer">
    <Header :info="info"/>
    <el-main>
    </el-main>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Header from '../../layout/main/uiComponents/header/index'
export default {
  name: 'NoPermit',
  components: {
    Header
  },
  data() {
    return {
      info: this.userInfo(),
      flag: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapState('user', ['userInfo']),
    init() {
      var param = this.$route.query
      this.flag = param.type
    }
  }
}
</script>
<style>
  html,body,{
    height: 100%;
  }
  .nopermtcontainer{height: calc( 100% - 52px );}
  .nopermtcontainer .el-main{
    background: #fff;
    height: 100%;
    margin: 1px auto;
    background:#fff url('../../../assets/no-prompt.png') no-repeat center;
  }
  .noBg .el-main{
    background-image: none;
  }
</style>

