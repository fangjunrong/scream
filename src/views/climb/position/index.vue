<template>
  <div class="climbPosition">
    <div class="climbPosition-title">
      <DetailTitle title="设备信息"/>
    </div>
    <div class="climbPosition-filter">
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
        <el-form-item label="客户">
          <el-input v-model="filter.customer" class="sinput"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="filter.department" class="sinput"></el-input>
        </el-form-item>
        <input type="button" class="s-button-primary climbPosition-filter-search" value="查询" @click="search()"/>
      </el-form>
    </div>
    <div class="climbPosition-table">
      <el-tabs tab-position="top" style="height: 200px;">
        <el-tab-pane label="地图"></el-tab-pane>
        <el-tab-pane label="列表">
          <table class="selftable selftable-head">
            <tr>
              <th width="50">ID</th>
              <th width="10%">名称</th>
              <th width="15%">型号</th>
              <th width="10%">序列号</th>
              <th width="10%">所属厂商</th>
              <th width="10%">客户</th>
              <th width="8%">归属部门</th>
              <th width="8%">联系人</th>
              <th width="10%">创建时间</th>
              <th width="170">操作</th>
            </tr>
          </table>
          <table v-for="item in tableData" :key="item.id" class="selftable selftable-body">
            <tr>
              <td width="50">{{ item.id }}</td>
              <td width="10%">{{ item.name }}</td>
              <td width="15%">{{ item.model }}</td>
              <td width="10%">{{ item.sn }}</td>
              <td width="10%">{{ item.company }}</td>
              <td width="10%">{{ item.customer }}</td>
              <td width="8%">{{ item.department }}</td>
              <td width="8%">{{ item.contacts }}</td>
              <td width="10%">{{ item.createTime }}</td>
            </tr>
          </table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="climbPosition-pagination">
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
import _ from 'lodash'
export default {
  name: 'ClimbPosition',
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
    ...mapActions('climb', [
      'fetchClimbPositionList',
      'changeClimbPosition',
      'deleteClimbPosition'
    ]),
    async init() {
      const result = await this.fetchClimbPositionList({
        pageNumber: 1,
        pageSize: 10
      })
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
      this.pagination.pageSize = result.data.pagination.pageSize
      this.pagination.total = result.data.pagination.totalCount
    },
    async search() {
      const param = _.assign(this.filter, { pageSize: 10, pageNumber: 1 })
      const result = await this.fetchClimbPositionList(param)
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
      this.pagination.pageSize = result.data.pagination.pageSize
      this.pagination.total = result.data.pagination.totalCount
    },
    async getData(param) {
      return await this.fetchClimbPositionList(param)
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
      const result = await this.changeClimbPosition(this.info.data)
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
        const result = await this.deleteClimbPosition({ id: item.id })
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
.climbPosition{
  &-filter{
    padding: 16px;
    background-color: #001432;
    border-radius: 8px;
    .sinput{
      width: 200px;
    }
    .el-form-item{
      margin-bottom: 0;
    }
    &-search{
      width: 125px;
    }
    &-add{
      float: right;
      margin-right: 20px;
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
.climbPosition .el-form-item__label{
  font-weight: bold;
  font-size: 14px;
  color: #00F0FA;
}
</style>
