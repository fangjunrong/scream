<template>
  <div class="waistDevice">
    <div class="waistDevice-title">
      <DetailTitle title="物件破损信息"/>
    </div>
    <div class="waistDevice-filter">
      <el-form :inline="true">
        <el-form-item label="日期">
          <el-date-picker
            v-model="filter.searchDate"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            class="sinput"></el-date-picker>
        </el-form-item>
        <input type="button" class="s-button-primary waistDevice-filter-search" value="查询" @click="search()"/>
        <el-button type="info" class="waistDevice-filter-add" @click="add()">添加</el-button>
      </el-form>
    </div>
    <div class="waistDevice-table">
      <table class="selftable selftable-head">
        <tr>
          <th width="80">ID</th>
          <th width="12%">物件总数</th>
          <th width="12%">破损件数</th>
          <th width="12%">破损率</th>
          <th width="12%">归属部门</th>
          <th width="12%">联系人</th>
          <th width="15%">更新时间</th>
          <th width="200">操作</th>
        </tr>
      </table>
      <table v-for="item in tableData" :key="item.id" class="selftable selftable-body">
        <tr>
          <td width="80">{{ item.id }}</td>
          <td width="12%">{{ item.objects }}</td>
          <td width="12%">{{ item.damages }}</td>
          <td width="12%">{{ item.damageRate }}</td>
          <td width="12%">{{ item.department }}</td>
          <td width="12%">{{ item.contacts }}</td>
          <td width="15%">{{ item.updateTime }}</td>
          <td width="200">
            <el-button type="primary" class="selftable-btn" @click="change(item)">修改</el-button>
            <el-button type="primary" class="selftable-btn selftable-btn-delete" @click="deleteItem(item)">删除</el-button>
          </td>
        </tr>
      </table>
    </div>
    <div class="waistDevice-pagination">
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
    <el-dialog :visible.sync="info.visible" :title="info.typeText">
      <el-form :model="info.data">
        <el-form-item :label-width="formLabelWidth" label="物件总数">
          <el-input v-model="info.data.objects"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="破损件数">
          <el-input v-model="info.data.damages"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="部门">
          <el-input v-model="info.data.department"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="联系人">
          <el-input v-model="info.data.contacts"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.visible = false">取 消</el-button>
        <el-button type="primary" @click="infoSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import _ from 'lodash'
export default {
  name: 'WaistDevice',
  data() {
    return {
      filter: {
        searchDate: '',
        objects: '',
        damages: '',
        customer: '',
        department: ''
      },
      tableData: [],
      info: {
        visible: false,
        typeText: '新增',
        data: {}
      },
      bind: {
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
      personList: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions('skeletonWaist', [
      'fetchSkeletonWaistDamageList',
      'changeSkeletonWaistDamage',
      'deleteSkeletonWaistDamage',
      'fetchSkeletonWaistPersonList'
    ]),
    async init() {
      const result = await this.fetchSkeletonWaistDamageList({
        pageNumber: 1,
        pageSize: 10
      })
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
      this.pagination.pageSize = result.data.pagination.pageSize
      this.pagination.total = result.data.pagination.totalCount
      const personList = await this.fetchSkeletonWaistPersonList({
        pageNumber: 1,
        pageSize: 100000
      })
      if (personList.code !== 200) {
        this.$message.warning(result.message)
      }
      this.personList = personList.data.result
    },
    async search() {
      const param = _.assign(this.filter, { pageSize: 10, pageNumber: 1 })
      const result = await this.fetchSkeletonWaistDamageList(param)
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
      this.pagination.pageSize = result.data.pagination.pageSize
      this.pagination.total = result.data.pagination.totalCount
    },
    async getData(param) {
      return await this.fetchSkeletonWaistDamageList(param)
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
      const result = await this.changeSkeletonWaistDamage(this.info.data)
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
        const result = await this.deleteSkeletonWaistDamage({ id: item.id })
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
      const param = _.assign(this.filter, { pageSize: val, pageNumber: 1 })
      const result = await this.getData(param)
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
      this.pagination.pageSize = result.data.pagination.pageSize
      this.pagination.total = result.data.pagination.totalCount
    },
    async handleCurrentChange(val) {
      const param = _.assign(this.filter, { pageSize: 10, pageNumber: val })
      const result = await this.getData(param)
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
.waistDevice{
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
.waistDevice .el-form-item__label{
  font-weight: bold;
  font-size: 14px;
  color: #00F0FA;
}
</style>
