<template>
  <div class="skeleton">
    <transition name="el-zoom-in-top">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'Skeleton'
}
</script>
<style lang='scss' scoped>

</style>
