<template>
  <div class="waist">
    <transition name="el-zoom-in-top">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'Waist'
}
</script>
<style lang='scss' scoped>

</style>
