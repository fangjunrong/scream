<template>
  <div class="climbDevice">
    <div class="climbDevice-title">
      <DetailTitle title="设备信息"/>
    </div>
    <div class="climbDevice-filter">
      <el-form :inline="true">
        <el-form-item label="名称">
          <el-input v-model="filter.name" class="sinput"></el-input>
        </el-form-item>
        <el-form-item label="序列号">
          <el-input v-model="filter.sn" class="sinput"></el-input>
        </el-form-item>
        <el-form-item label="客户">
          <el-input v-model="filter.customer" class="sinput"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="filter.department" class="sinput"></el-input>
        </el-form-item>
        <input type="button" class="s-button-primary climbDevice-filter-search" value="查询" @click="search()"/>
        <el-button type="info" class="climbDevice-filter-add" @click="add()">添加</el-button>
      </el-form>
    </div>
    <div class="climbDevice-table">
      <!-- <el-table
        :data="tableData"
        class="climbDevice-table-content">
        <el-table-column
          label="ID"
          prop="id">

        </el-table-column>
        <el-table-column
          label="名称"
          prop="name">

        </el-table-column>
        <el-table-column
          label="型号"
          prop="model">

        </el-table-column>
        <el-table-column
          label="序列号"
          prop="sn">

        </el-table-column>
        <el-table-column
          label="所属厂商"
          prop="company">

        </el-table-column>
        <el-table-column
          label="客户"
          prop="customer">

        </el-table-column>
        <el-table-column
          label="归属部门"
          prop="model">

        </el-table-column>
        <el-table-column
          label="联系人"
          prop="model">

        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="createTime">

        </el-table-column>
        <el-table-column
          label="操作"
          width="200">
          <template slot-scope="scope">
            <div>
              <el-button type="primary">修改</el-button>
              <el-button type="primary" @click="deleteRow(scope)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table> -->
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
          <td width="170">
            <el-button type="primary" class="selftable-btn" @click="change(item)">修改</el-button>
            <el-button type="primary" class="selftable-btn" @click="deleteItem(item)">删除</el-button>
          </td>
        </tr>
      </table>
      <!-- <ul class="ul-table">
        <li>
          <ul>
            <li class="ul-table-1">设备ID</li>
            <li class="ul-table-2">名称</li>
            <li class="ul-table-3">型号</li>
            <li class="ul-table-4">序列号</li>
            <li class="ul-table-5">所属厂商</li>
            <li class="ul-table-6">客户</li>
            <li class="ul-table-7">归属部门</li>
            <li class="ul-table-8">联系人</li>
            <li class="ul-table-9">创建时间</li>
            <li class="ul-table-10">操作</li>
          </ul>
        </li>
        <li v-for="item in tableData" :key="item.id">
          <ul>
            <li class="ul-table-1">{{ item.id }}</li>
            <li class="ul-table-2">{{ item.name }}</li>
            <li class="ul-table-3">{{ item.model }}</li>
            <li class="ul-table-4">{{ item.sn }}</li>
            <li class="ul-table-5">{{ item.company }}</li>
            <li class="ul-table-6">{{ item.customer }}</li>
            <li class="ul-table-7">{{ item.department }}</li>
            <li class="ul-table-8">{{ item.contacts }}</li>
            <li class="ul-table-9">{{ item.createTime }}</li>
            <li class="ul-table-10">
              <el-button type="primary" class="ul-table-btn">修改</el-button>
              <el-button type="primary" class="ul-table-btn">删除</el-button>
            </li>
          </ul>
        </li>
      </ul> -->
    </div>
    <div class="climbDevice-pagination">
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
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import _ from 'lodash'
export default {
  name: 'ClimbDevice',
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
      'fetchClimbDeviceList',
      'changeClimbDevice',
      'deleteClimbDevice'
    ]),
    async init() {
      const result = await this.fetchClimbDeviceList({
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
      const result = await this.fetchClimbDeviceList(param)
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
      this.pagination.pageSize = result.data.pagination.pageSize
      this.pagination.total = result.data.pagination.totalCount
    },
    async getData(param) {
      return await this.fetchClimbDeviceList(param)
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
      const result = await this.changeClimbDevice(this.info.data)
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
        const result = await this.deleteClimbDevice({ id: item.id })
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
        pageNumber: val,
        pageSize: 10
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
.climbDevice{
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
      margin-right: 20px;
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
.selftable{
  width: 100%;
  text-align: left;
  word-break: break-word;
  background-color: #001432;
  border: 1px solid #5EEEFA;
  border-radius: 8px;
  margin-top: 4px;
  &-head{
    height: 40px;
    line-height: 40px;
  }
  &-btn{
    padding: 6px 20px;
  }
}
.selftable-head{
  th{
    padding: 0 8px;
  }
}
.selftable-body{
  td{
    padding: 0 8px;
  }
}

.ul-table-1{
  width: auto;
}
.ul-table-2{
  width: 10%;
}
.ul-table-3{
  width: 15%;
}
.ul-table-4{
  width: 10%;
}
.ul-table-5{
  width: 10%;
}
.ul-table-6{
  width: 5%;
}
.ul-table-7{
  width: 10%;
}
.ul-table-8{
  width: 10%;
}
.ul-table-9{
  width: 10%;
}
.ul-table-10{
  width: 168px;
}
.ul-table > li{
  margin-bottom: 4px;
  border: solid 1px #64eefa;
  border-radius: 8px;
}
.ul-table > li > ul{
  overflow: hidden;
}
.ul-table > li > ul > li{
  float: left;
  padding: 6px;
  word-break: break-word;
}
.ul-table-btn{
  padding: 6px 20px;
}
</style>
<style>
.climbDevice .el-form-item__label{
  font-weight: bold;
  font-size: 14px;
  color: #00F0FA;
}
</style>
