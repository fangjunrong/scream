<template>
  <div class="armPerson">
    <div class="armPerson-title">
      <DetailTitle title="人员信息"/>
    </div>
    <div class="armPerson-filter">
      <el-form :inline="true">
        <el-form-item label="名称">
          <el-input v-model="filter.name" class="sinput"></el-input>
        </el-form-item>
        <input type="button" class="s-button-primary armPerson-filter-search" value="查询" @click="search()"/>
        <el-button type="info" class="armPerson-filter-add" @click="add()">添加</el-button>
      </el-form>
    </div>
    <div class="armPerson-table">
      <table class="selftable selftable-head">
        <tr>
          <th width="80">ID</th>
          <th width="10%">姓名</th>
          <th width="10%">性别</th>
          <th width="8%">年龄</th>
          <th width="10%">身高</th>
          <th width="10%">体重</th>
          <th width="8%">文化水平</th>
          <th width="8%">穿戴设备</th>
          <th width="15%">更新时间</th>
          <th width="200">操作</th>
        </tr>
      </table>
      <table v-for="item in tableData" :key="item.id" class="selftable selftable-body">
        <tr>
          <td width="80">{{ item.id }}</td>
          <td width="10%">{{ item.name }}</td>
          <td width="10%">{{ item.sex === 1 ? "男" : "女" }}</td>
          <td width="8%">{{ item.age }}</td>
          <td width="10%">{{ item.height }}</td>
          <td width="10%">{{ item.weight }}</td>
          <td width="8%">{{ item.education }}</td>
          <td width="8%">{{ item.deviceModel ? item.deviceModel.model : '' }}</td>
          <td width="15%">{{ item.createTime }}</td>
          <td width="200">
            <el-button type="primary" class="selftable-btn" @click="change(item)">修改</el-button>
            <el-button type="primary" class="selftable-btn selftable-btn-delete" @click="deleteItem(item)">删除</el-button>
          </td>
        </tr>
      </table>
    </div>
    <div class="armPerson-pagination">
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
        <el-form-item :label-width="formLabelWidth" label="姓名">
          <el-input v-model="info.data.name"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="性别">
          <el-select v-model="info.data.sex" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="年龄">
          <el-input v-model="info.data.age"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="学历">
          <el-input v-model="info.data.education"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="身高">
          <el-input v-model="info.data.height"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="体重">
          <el-input v-model="info.data.weight"></el-input>
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
  name: 'ArmPerson',
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
        label: '男'
      }, {
        value: '0',
        label: '女'
      }],
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
    ...mapActions('skeletonArm', [
      'fetchSkeletonArmPersonList',
      'changeSkeletonArmPerson',
      'deleteSkeletonArmPerson'
    ]),
    async init() {
      const result = await this.fetchSkeletonArmPersonList({
        pageNumber: 1,
        pageSize: 10
      })
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
      this.pagination.pageSize = result.data.pagination.pageSize
      this.pagination.total = result.data.pagination.totalCount
      const personList = await this.fetchSkeletonArmPersonList({
        pageNumber: 1,
        pageSize: 100000
      })
      if (personList.code !== 200) {
        this.$message.warning(result.message)
      }
      this.personList = personList.data.result
    },
    async search() {
      debugger
      const param = _.assign(this.filter, { pageSize: 10, pageNumber: 1 })
      const result = await this.fetchSkeletonArmPersonList(param)
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
      this.pagination.pageSize = result.data.pagination.pageSize
      this.pagination.total = result.data.pagination.totalCount
    },
    async getData(param) {
      return await this.fetchSkeletonArmPersonList(param)
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
      const result = await this.changeSkeletonArmPerson(this.info.data)
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
        const result = await this.deleteSkeletonArmPerson({ id: item.id })
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
.armPerson{
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
.armPerson .el-form-item__label{
  font-weight: bold;
  font-size: 14px;
  color: #00F0FA;
}
</style>
