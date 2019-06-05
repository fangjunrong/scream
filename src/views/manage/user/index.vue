<template>
  <div class="user">
    <div class="user-title">
      <DetailTitle title="设备信息"/>
    </div>
    <div class="user-filter">
      <el-form :inline="true">
        <el-form-item label="用户名">
          <el-input v-model="filter.name" class="sinput"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="filter.nick" class="sinput"></el-input>
        </el-form-item>
        <input type="button" class="s-button-primary user-filter-search" value="查询" @click="search()"/>
        <el-button type="info" class="user-filter-add" @click="add()">添加</el-button>
      </el-form>
    </div>
    <div class="user-table">
      <table class="selftable selftable-head">
        <tr>
          <th width="20%">人员姓名</th>
          <th width="20%">昵称</th>
          <th width="20%">是否管理员</th>
          <th width="20%">最后更新时间</th>
          <th width="20%">操作</th>
        </tr>
      </table>
      <table v-for="item in tableData" :key="item.id" class="selftable selftable-body">
        <tr>
          <td width="20%">{{ item.name }}</td>
          <td width="20%">{{ item.nick }}</td>
          <td width="20%">{{ item.isManage ? "是" : "否" }}</td>
          <td width="20%">{{ item.createTime }}</td>
          <td width="20%">
            <el-button type="primary" class="selftable-btn" @click="change(item)">修改</el-button>
            <el-button type="primary" class="selftable-btn selftable-btn-delete" @click="deleteItem(item)">删除</el-button>
          </td>
        </tr>
      </table>
    </div>
    <div class="user-pagination">
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
        <el-form-item :label-width="formLabelWidth" label="用户名">
          <el-input v-model="info.data.name"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="昵称">
          <el-input v-model="info.data.nick"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="是否管理员">
          <el-select v-model="info.data.isManage" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="密码">
          <el-input v-model="info.data.password" type="password" autocomplete="off"></el-input>
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
  name: 'User',
  data() {
    return {
      filter: {
        name: '',
        deviceId: '',
        customer: '',
        department: ''
      },
      tableData: [],
      info: {
        visible: false,
        typeText: '新增',
        data: {}
      },
      options: [{
        value: '1',
        label: '是'
      }, {
        value: '0',
        label: '否'
      }],
      formLabelWidth: '120px',
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
    ...mapActions('user', [
      'fetchUserList',
      'changeUser',
      'deleteUser'
    ]),
    async init() {
      const result = await this.fetchUserList({
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
      const result = await this.fetchUserList(param)
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
      this.pagination.pageSize = result.data.pagination.pageSize
      this.pagination.total = result.data.pagination.totalCount
    },
    async getData(param) {
      return await this.fetchUserList(param)
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
      const result = await this.changeUser(this.info.data)
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
        const result = await this.deleteUser({ id: item.id })
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
.user{
  &-filter{
    padding: 16px;
    .sinput{
      width: 150px;
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
.user .el-form-item__label{
  font-weight: bold;
  font-size: 14px;
  color: #00F0FA;
}
</style>
