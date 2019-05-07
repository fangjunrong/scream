<template>
  <div class="arm">
    <transition name="el-zoom-in-top">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'Arm'
}
</script>
<style lang='scss' scoped>

</style>
