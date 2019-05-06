<template>
  <div class="littleTitle">
    <span class="littleTitle-title">{{ title }}</span>
  </div>
</template>
<script>
export default {
  name: 'LittleTitle',
  props: {
    title: {
      type: String,
      default: 'title'
    }
  }
}
</script>
<style lang='scss' scoped>
.littleTitle{
  width: 100%;
  height: 30px;
  &-title{
    display: inline-block;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    margin: 8px 8px 8px 0;
    text-indent: 8px;
    color: #e1e1e1;
    border-left: 2px solid #0df0f9;
  }
}
</style>
