<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  mounted() {
    this.ieUpdate()
  },
  methods: {
    ieUpdate() {
      var o = navigator.userAgent.match(/MSIE (\d+)/)
      o = o && o[1]
      if (!!o && o < 10) {
        this.$router.push('/ieupdate')
      }
    }
  }
}
</script>

<style lang="scss">
.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.index .el-carousel__indicator .el-carousel__button{
  width: 50px;
	height: 8px;
	background-color: #0668A2;
	border-radius: 4px;
	opacity: 0.3;
}

.index .el-carousel__indicator.is-active .el-carousel__button{
  width: 50px;
	height: 8px;
	background-color: #64EEFA;
  box-shadow: 0 0 10px #64EEFA;
	border-radius: 4px;
}
</style>
