<template>
  <div class="skeletonWaistPosition">
    <div class="skeletonWaistPosition-title">
      <!-- //todo -->
      <DetailTitle title="轨迹路径"/>
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
              <td width="20%">{{ item.id }}</td>
              <td width="20%">{{ item.id }}</td>
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
      },
      sn: ''
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
      this.sn = this.$route.params.sn
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
      console.log('initdetail')
      debugger
      const _self = this
      const _data = { 'company': 'XSTO', 'contacts': '', 'countTotal': 0, 'createTime': 1550545961000, 'currentPage': 0, 'customer': '日日顺-刘女士', 'department': '', 'enablePage': false, 'id': 28, 'isDelete': 0, 'maxRows': 5000, 'model': 'ZW7170ES(1769)/IOT/德聚顺(辽宁)物流有限公司', 'name': '电动载物爬楼机', 'pageSize': 20, 'pages': 0, 'sn': '866289038519734', 'start': 0, 'stepsModels': [{ 'bootNum': 0, 'bootRate': 0.0, 'boots': 0, 'countTotal': 0, 'createDate': 1557504000000, 'createTime': 1557542169000, 'currentPage': 0, 'days': 0, 'enablePage': false, 'latitude': '038.9185826', 'longitude': '121.5899748', 'maxRows': 5000, 'pageSize': 20, 'pages': 0, 'start': 0, 'total': 0, 'usedNum': 0, 'weight': 0.0 }, { 'bootNum': 0, 'bootRate': 0.0, 'boots': 1, 'countTotal': 0, 'createDate': 1557504000000, 'createTime': 1557542260000, 'currentPage': 0, 'days': 0, 'enablePage': false, 'latitude': '038.9194043', 'longitude': '121.5909837', 'maxRows': 5000, 'pageSize': 20, 'pages': 0, 'start': 0, 'total': 0, 'usedNum': 0, 'weight': 0.0 }] }
      //   _self.tableData = tableData
      var map = new AMap.Map('map')
      var point
      var pointsLen = _data.stepsModels.length
      if (pointsLen > 0) {
        var points = []
        var marker
        // convert wgs84 to cj02
        var cj02 = coordtransform.wgs84togcj02(_data.stepsModels[0].longitude, _data.stepsModels[0].latitude)
        point = new AMap.LngLat(cj02[0], cj02[1])
        map.setCenter(point)// 中心点
        // map.setZoom(13)// 缩放比例
        map.addControl(new AMap.Scale({ visible: true })) // 比例尺
        for (var i = 0; i < pointsLen; i++) {
          // convert wgs84 to cj02
          cj02 = coordtransform.wgs84togcj02(_data.stepsModels[i].longitude, _data.stepsModels[i].latitude)
          point = new AMap.LngLat(cj02[0], cj02[1])
          if (i === (pointsLen - 1)) {
            marker = new AMap.Marker({
              position: point,
              // offset: new AMap.Pixel(-12,-12),
              title: '设备序列号：' + _self.sn,
              map: map
            })
            cj02 = coordtransform.wgs84togcj02(_data.stepsModels[0].longitude, _data.stepsModels[0].latitude)
            marker = new AMap.Marker({
              map: map,
              position: [cj02[0], cj02[1]],
              icon: 'https://webapi.amap.com/images/car.png',
              offset: new AMap.Pixel(-26, -13),
              title: '设备序列号：' + _self.sn,
              autoRotation: true,
              angle: -90
            })
          }
          points.push(point)
        }
        // 绘制轨迹
        // var polyline = new AMap.Polyline({
        //   map: map,
        //   path: points,
        //   showDir: true,
        //   strokeColor: '#28F', // 线颜色
        //   strokeWeight: 6 // 线宽
        // })
        var passedPolyline = new AMap.Polyline({
          map: map,
          strokeColor: '#AF5', // 线颜色
          strokeWeight: 6 // 线宽
        })
        marker.on('moving', function(e) {
          passedPolyline.setPath(e.passedPath)
        })
        map.setFitView()
        marker.moveAlong(points, 500) // 500km/h
      } else {
        point = new AMap.LngLat(120.1550674438, 30.2652944930)
        map.setCenter(point)// 中心点
        map.setZoom(11)// 缩放比例
        map.addControl(new AMap.Scale({ visible: true })) // 比例尺
      }
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
