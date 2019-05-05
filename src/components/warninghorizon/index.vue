<template>
  <div :style="styleInit" :class="{ green: color === '#090' }" class="warning">
    <i class="el-icon-warning"/>{{ itemContent }}
    <span
      v-if="href.length"
      class="warning__link"
      @click="handleClick">点击这里</span>
  </div>
</template>
<script>
export default {
  name: 'WarningHorizon',
  props: {
    itemContent: {
      type: String,
      default: '2018年5月申报周期已开放，如需申报或调整请'
    },
    href: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: '#FEF0F0'
    },
    color: {
      type: String,
      default: '#666'
    },
    border: {
      type: String,
      default: '1px solid #f7b6b6'
    }
  },
  computed: {
    styleInit() {
      const style = {
        border: this.border,
        color: this.color,
        backgroundColor: this.bgColor
      }
      return style
    }
  },
  methods: {
    handleClick() {
      this.$router.push(this.href)
    }
  }
}
</script>
<style lang="scss" scoped>
.warning{
  width: 100%;
  color: #666;
  height: 34px;
  line-height: 34px;
  font-size: 12px;
  margin-top: 16px;
  &__link{
    color:#F5749D;
    cursor: pointer;
  }
}
.el-icon-warning{
  padding: 0 10px;
}
.el-icon-warning:before{
    color: #F5749D;
}
.green .el-icon-warning:before{
    color: #090;
}
</style>
