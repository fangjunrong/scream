<template>
  <el-breadcrumb class="app-breadcrumb" separator=">">
    <span class="breadCrumb__initPlace">当前位置：</span>
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" v-if="item.name" :key="item.path">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{ pathRule[item.name] }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ pathRule[item.name] }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
import { PathToChinese } from '@/utils/common'

export default {
  name: 'BreadCrumb',
  data() {
    return {
      levelList: null,
      pathRule: PathToChinese
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => {
        if (item.name) {
          return true
        }
      })
      const first = matched[0]
      if (first && first.name !== 'index') {
        matched = [{ path: '/index', name: 'index', meta: { title: 'Index' }}].concat(matched)
      }
      this.levelList = matched
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-breadcrumb{
  line-height: 16px;
  margin-bottom: 10px;
}
.breadCrumb{
  &__initPlace{
    float: left;
    font-size: 12px;
    color: #868686;
  }
}
</style>
