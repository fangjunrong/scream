<template>
  <div class="editRule">
    <p class="editRule__title">{{ info.title }}</p>
    <p class="editRule__content" v-html="info.content" />
  </div>
</template>
<script>
export default {
  name: 'EditRule',
  props: {
    info: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang='scss' scoped>
.editRule{
  padding: 16px;
  margin-top: 16px;
  background-color: #F2F2F2;
  &__title{
    font-size: 16px;
    color: #666;
    margin-bottom: 16px;
  }
  &__content{
    font-size: 12px;
    color: #333;
    line-height: 20px;
  }
}
</style>
