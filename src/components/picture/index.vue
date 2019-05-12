<template>
  <div
    :style="style"
    class="picture" />
</template>
<script>
import defaultImg from '@/assets/logo.png'

export default {
  name: 'Picture',
  props: {
    src: {
      type: String,
      default: defaultImg
    },
    backgroundSize: {
      type: String,
      default: '100% 100%'
    },
    backgroundColor: {
      type: String,
      default: '#EAB9C3'
    },
    size: {
      type: String,
      default: '40'
    },
    borderSize: {
      type: Number,
      default: 0
    },
    border: {
      type: String,
      default: '1px solid #fff'
    },
    margin: {
      type: Number,
      default: 0
    }
  },
  computed: {
    style() {
      const width = this.size.split(' ')[0]
      const height = this.size.split(' ').length > 1 ? this.size.split(' ')[1] : width
      const style = {
        width: `${width}px`,
        height: `${height}px`,
        border: this.border,
        margin: `${this.margin}px`,
        borderRadius: `${this.borderSize}px`,
        backgroundImage: `url(${this.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: this.backgroundColor,
        backgroundSize: this.backgroundSize,
        textAlign: 'center'
      }
      return style
    }
  }
}
</script>
<style lang="scss" scoped>
.picture{
  display: inline-block;
}
.picture:hover{
  background-color:#D87E91!important;
}
</style>
