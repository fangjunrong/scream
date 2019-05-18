<template>
  <div class="skeletonWaistPosition">
    <div class="skeletonWaistPosition-title">
      <DetailTitle title="定位信息"/>
    </div>
    <div class="skeletonWaistPosition-filter">
      <el-form :inline="true">
        <el-form-item label="日期">
          <el-date-picker
            v-model="filter.createTime"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            class="sinput"></el-date-picker>
        </el-form-item>
        <input type="button" class="s-button-primary skeletonWaistPosition-filter-search" value="查询" @click="search()"/>
      </el-form>
    </div>
    <div class="skeletonWaistPosition-table">
      <el-tabs tab-position="top" style="height: 200px;">
        <el-tab-pane label="地图">
          <div id="map" style="height:500px" tabindex="0"></div>
        </el-tab-pane>
        <el-tab-pane label="列表">
          <table class="selftable selftable-head">
            <tr>
              <th width="15%">设备ID</th>
              <th width="20%">设备型号</th>
              <th width="20%">设备序列号</th>
              <th width="30%">定位信息(经度, 纬度)</th>
              <th width="20%">更新时间</th>
            </tr>
          </table>
          <table v-for="item in tableData" :key="item.id" class="selftable selftable-body">
            <tr>
              <td width="15%">{{ item.deviceId }}</td>
              <td width="20%">{{ item.deviceModel.model }}</td>
              <td width="20%">{{ item.deviceModel.sn }}</td>
              <td width="30%">{{ item.longitude }}, {{ item.latitude }}</td>
              <td width="20%">{{ item.createTime }}</td>
            </tr>
          </table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="skeletonWaistPosition-pagination">
      <el-pagination
        :current-page="pagination.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import AMap from 'AMap'
import _ from 'lodash'
import coordtransform from 'coordtransform'
export default {
  name: 'SkeletonWaistPosition',
  data() {
    return {
      filter: {
        name: '',
        sn: '',
        customer: '',
        department: ''
      },
      tableData: [],
      info: {
        visible: false,
        typeText: '新增',
        data: {}
      },
      formLabelWidth: '100px',
      pagination: {
        currentPage: 1,
        pageSize: 100,
        total: 100
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions('skeletonWaist', [
      'fetchSkeletonWaistPositionList',
      'changeSkeletonWaistPosition',
      'deleteSkeletonWaistPosition'
    ]),
    async init() {
      const result = await this.fetchSkeletonWaistPositionList({
        pageNumber: 1,
        pageSize: 10
      })
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
      this.pagination.pageSize = result.data.pagination.pageSize
      this.pagination.total = result.data.pagination.totalCount
      this.initMap()
    },
    initMap() {
      const _self = this
      const map = new AMap.Map('map')
      if (_self.tableData.length > 0) {
        // convert wgs84 to cj02
        var cj02 = coordtransform.wgs84togcj02(_self.tableData[0].longitude, _self.tableData[0].latitude)
        var point = new AMap.LngLat(cj02[0], cj02[1])// 中心点
        map.setCenter(point)// 中心点
        map.setZoom(13)// 缩放比例
        // map.addControl(new AMap.Scale({ visible: true })) // 比例尺
        var marker = new AMap.Marker({
          position: point,
          // offset: new AMap.Pixel(-12,-12),
          title: _self.tableData[0].model + ' : ' + _self.tableData[0].id,
          map: map
        })
        marker.on('click', function() { _self.jumpToDetail(_self.tableData[0].id) }, _self.tableData[0].id)
        for (let i = 1; i < _self.tableData.length; i += 1) {
          // convert wgs84 to cj02
          cj02 = coordtransform.wgs84togcj02(_self.tableData[i].longitude, _self.tableData[i].latitude)
          point = new AMap.LngLat(cj02[0], cj02[1])
          marker = new AMap.Marker({
            position: point,
            // offset: new AMap.Pixel(-12,-12),
            title: _self.tableData[i].model + ' : ' + _self.tableData[i].id,
            map: map
          })
          marker.on('click', function() { _self.jumpToDetail(_self.tableData[i].id) }, _self.tableData[i].id)
        }
        map.setFitView()
      } else {
        point = new AMap.LngLat(120.1550674438, 30.2652944930)// 中心点
        map.setCenter(point)// 中心点
        map.setZoom(11)// 缩放比例
        map.addControl(new AMap.Scale({ visible: true })) // 比例尺
      }
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function() {
        map.addControl(new AMap.ToolBar())
        map.addControl(new AMap.Scale())
      })
    },
    jumpToDetail(id) {
      this.$router.push({
        name: 'skeletonWaistPositionDetail',
        params: { sn: id }
      })
    },
    async search() {
      const param = _.assign(this.filter, { pageSize: 10, pageNumber: 1 })
      const result = await this.fetchSkeletonWaistPositionList(param)
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
      this.pagination.pageSize = result.data.pagination.pageSize
      this.pagination.total = result.data.pagination.totalCount
    },
    async getData(param) {
      return await this.fetchSkeletonWaistPositionList(param)
    },
    add() {
      this.info.visible = true
      this.info.typeText = '新增'
      this.info.data = {}
    },
    change(item) {
      this.info.visible = true
      this.info.data = _.cloneDeep(item)
      this.info.typeText = '修改'
    },
    async infoSubmit() {
      const id = this.info.data.id ? this.info.data.id : ''
      const result = await this.changeSkeletonWaistPosition(this.info.data)
      if (result.code !== 200) {
        this.$message.warning(result.message)
        return false
      }
      if (id) {
        this.$message.success('修改成功')
      } else {
        this.$message.success('添加成功')
      }
      this.info.visible = false
      this.search()
    },
    async deleteItem(item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async response => {
        const result = await this.deleteSkeletonWaistPosition({ id: item.id })
        if (result.code !== 200) {
          this.$message.warning(result.message)
          return false
        }
        this.$message.success('删除成功')
        this.search()
      }).catch(() => {
      })
    },
    async handleSizeChange(val) {
      const result = await this.getData({
        pageNumber: 1,
        pageSize: val
      })
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
      this.pagination.pageSize = result.data.pagination.pageSize
      this.pagination.total = result.data.pagination.totalCount
    },
    async handleCurrentChange(val) {
      const result = await this.getData({
        pageNumber: val,
        pageSize: 10
      })
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
      this.pagination.pageSize = result.data.pagination.pageSize
      this.pagination.total = result.data.pagination.totalCount
    }
  }
}
</script>
<style lang='scss' scoped>
.skeletonWaistPosition{
  &-filter{
    padding: 16px;
    background-color: #001432;
    border-radius: 8px;
    .sinput{
      width: 200px;
    }
    .el-form-item{
      margin-bottom: 0;
      margin-right: 30px;
    }
    &-search{
      width: 125px;
    }
    &-add{
      float: right;
      margin-right: 30px;
      width: 125px;
    }
  }
  &-table{
    background-color: #001432;
    border-radius: 8px;
    margin-top: 16px;
    padding: 30px 40px;
    &-content{
      background-color: #001432;
      .el-table__body{
        border-collapse:separate;
        border-spacing:0px 10px;
      }
    }
  }
  &-pagination{
    margin-top: 42px;
    .el-pagination{
      float: right;
    }
  }
}

</style>
<style>
.skeletonWaistPosition .el-form-item__label{
  font-weight: bold;
  font-size: 14px;
  color: #00F0FA;
}
</style>
