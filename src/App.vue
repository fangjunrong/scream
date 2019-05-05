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
</style>
