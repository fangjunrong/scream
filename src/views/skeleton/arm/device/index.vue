<template>
  <div class="armDevice">
    <div class="armDevice-title">
      <DetailTitle title="设备信息"/>
    </div>
    <div class="armDevice-filter">
      <el-form :inline="true">
        <el-form-item label="名称">
          <el-input v-model="filter.name" class="sinput"></el-input>
        </el-form-item>
        <input type="button" class="s-button-primary armDevice-filter-search" value="查询" @click="search()"/>
        <el-button type="info" class="armDevice-filter-add" @click="add()">添加</el-button>
      </el-form>
    </div>
    <div class="armDevice-table">
      <table class="selftable selftable-head">
        <tr>
          <th width="80">ID</th>
          <th width="9%">名称</th>
          <th width="11%">型号</th>
          <th width="15%">序列号</th>
          <th width="7%">所属厂商</th>
          <th width="7%">客户</th>
          <th width="7%">归属部门</th>
          <th width="7%">联系人</th>
          <th width="7%">穿戴人员</th>
          <th width="6%">状态</th>
          <!--<th width="15%">更新时间</th>-->
          <th width="200">操作</th>
        </tr>
      </table>
      <table v-for="item in tableData" :key="item.id" class="selftable selftable-body">
        <tr>
          <td width="60">{{ item.id }}</td>
          <td width="9%">{{ item.name }}</td>
          <td width="11%">{{ item.model }}</td>
          <td width="15%">{{ item.sn }}</td>
          <td width="7%">{{ item.company }}</td>
          <td width="7%">{{ item.customer }}</td>
          <td width="7%">{{ item.department }}</td>
          <td width="7%">{{ item.contacts }}</td>
          <td width="7%">{{ item.personModel ? item.personModel.name : '' }}</td>
          <td width="6%">{{ item.status === 1 ? "已绑定" : "未绑定" }}</td>
          <!--<td width="15%">{{ item.createTime }}</td>-->
          <td width="200">
            <el-button type="primary" class="selftable-btn" @click="change(item)">修改</el-button>
            <el-button type="primary" class="selftable-btn selftable-btn-delete" @click="deleteItem(item)">删除</el-button>
            <el-button v-if="!item.status" type="primary" class="selftable-btn" @click="bindItem(item)">绑定</el-button>
            <el-button v-if="item.status" type="primary" class="selftable-btn" @click="unbindItem(item)">解绑</el-button>
          </td>
        </tr>
      </table>
    </div>
    <div class="armDevice-pagination">
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
        <el-form-item :label-width="formLabelWidth" label="名称">
          <el-input v-model="info.data.name"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="型号">
          <el-input v-model="info.data.model"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="序列号">
          <el-input v-model="info.data.sn"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="所属厂商">
          <el-input v-model="info.data.company"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="客户">
          <el-input v-model="info.data.customer"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="归属部门">
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
    <el-dialog :visible.sync="bind.visible" :title="bind.typeText">
      <el-form :model="bind.data">
        <el-form-item :label-width="formLabelWidth" label="选择人员">
          <el-select v-model="bind.data.personId" placeholder="请选择">
            <el-option
              v-for="item in personList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="bind.visible = false">取 消</el-button>
        <el-button type="primary" @click="bindSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import _ from 'lodash'
export default {
  name: 'ArmDevice',
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
    ...mapActions('skeletonArm', [
      'fetchSkeletonArmDeviceList',
      'changeSkeletonArmDevice',
      'deleteSkeletonArmDevice',
      'fetchSkeletonArmPersonList'
    ]),
    async init() {
      const result = await this.fetchSkeletonArmDeviceList({
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
      const param = _.assign(this.filter, { pageSize: 10, pageNumber: 1 })
      const result = await this.fetchSkeletonArmDeviceList(param)
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
      this.pagination.pageSize = result.data.pagination.pageSize
      this.pagination.total = result.data.pagination.totalCount
    },
    async getData(param) {
      return await this.fetchSkeletonArmDeviceList(param)
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
      const result = await this.changeSkeletonArmDevice(this.info.data)
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
        const result = await this.deleteSkeletonArmDevice({ id: item.id })
        if (result.code !== 200) {
          this.$message.warning(result.message)
          return false
        }
        this.$message.success('删除成功')
        this.search()
      }).catch(() => {
      })
    },
    bindItem(item) {
      this.bind.visible = true
      this.bind.data = _.cloneDeep(item)
      this.bind.typeText = `序列号：${item.sn}`
    },
    async bindSubmit() {
      if (!this.bind.data.personId) {
        this.$message('请选择人员')
        return false
      }
      this.bind.data.status = 1
      const result = await this.changeSkeletonArmDevice(this.bind.data)
      if (result.code !== 200) {
        this.$message.warning(result.message)
        return false
      }
      this.$message.success('绑定成功')
      this.bind.visible = false
      this.search()
    },
    unbindItem(item) {
      this.bind.data = _.cloneDeep(item)
      this.$confirm('确认解除绑定？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async response => {
        if (!this.bind.data.personId) {
          this.$message('未有绑定人员')
          return false
        }
        this.bind.data.personId = ''
        this.bind.data.status = 0
        const result = await this.changeSkeletonArmDevice(this.bind.data)
        if (result.code !== 200) {
          this.$message.warning(result.message)
          return false
        }
        this.$message.success('取消绑定成功')
        this.search()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消解除绑定'
        })
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
.armDevice{
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
.armDevice .el-form-item__label{
  font-weight: bold;
  font-size: 14px;
  color: #00F0FA;
}
</style>
