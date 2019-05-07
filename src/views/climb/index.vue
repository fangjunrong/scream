<template>
  <div class="climb">
    <transition name="el-zoom-in-top">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'Climb'
}
</script>
<style lang='scss' scoped>
.climb{
  background-color: #001432;
}
</style>
