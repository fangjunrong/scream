<template>
  <div :style="style" class="detailTitle">
    <span class="detailTitle-title">{{ title }}</span>
    <span class="detailTitle-subTitle">{{ subTitle }}</span>
  </div>
</template>
<script>
import img from '@/assets/content-header.png'
export default {
  name: 'DetailTitle',
  props: {
    title: {
      type: String,
      default: 'title'
    },
    subTitle: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: img
    }
  },
  computed: {
    style() {
      const style = {
        backgroundImage: `url(${this.src})`,
        backgroundSize: '100% 100%'
      }
      return style
    }
  }
}
</script>
<style lang='scss' scoped>
.detailTitle{
  height: 60px;
  &-title{
    display: inline-block;
    height: 24px;
    line-height: 24px;
    font-size: 28px;
    margin: 16px 8px 8px 16px;
    text-indent: 8px;
    color: #0df0f9;
    border-left: 2px solid #0df0f9;
  }
  &-subTitle{
    display: inline-block;
    height: 24px;
    line-height: 24px;
    text-indent: 8px;
    color: #0df0f9;
  }
}
</style>
