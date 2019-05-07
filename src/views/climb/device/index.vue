<template>
  <div class="climbDevice">
    <div class="climbDevice-title">
      <DetailTitle title="设备信息"/>
    </div>
    <div class="climbDevice-filter">
      <el-form :inline="true">
        <el-form-item label="名称">
          <el-input class="sinput"></el-input>
        </el-form-item>
        <input type="button" class="s-button-primary" value="查询" />
        <el-button type="info" class="climbDevice-filter-add">添加</el-button>
      </el-form>
    </div>
    <div class="climbDevice-table">
      <el-table
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
      </el-table>
      <table class="selftable selftable-head">
        <tr>
          <th width="auto">ID</th>
          <th width="10%">名称</th>
          <th width="10%">型号</th>
          <th width="10%">序列号</th>
          <th width="10%">所属厂商</th>
          <th width="10%">客户</th>
          <th width="10%">归属部门</th>
          <th width="10%">联系人</th>
          <th width="10%">创建时间</th>
          <th width="170">操作</th>
        </tr>
        <!-- <tr v-for="item in tableData" :key="item.id">
          <td></td>
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.model }}</td>
          <td>{{ item.sn }}</td>
          <td>{{ item.company }}</td>
          <td>{{ item.customer }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.createTime }}</td>
          <td>
            <el-button type="primary">修改</el-button>
            <el-button type="primary">删除</el-button>
          </td>
        </tr> -->
      </table>
      <table v-for="item in tableData" :key="item.id" class="selftable selftable-body">
        <tr>
          <td width="auto">{{ item.id }}</td>
          <td width="10%">{{ item.name }}</td>
          <td width="10%">{{ item.model }}</td>
          <td width="10%">{{ item.sn }}</td>
          <td width="10%">{{ item.company }}</td>
          <td width="10%">{{ item.customer }}</td>
          <td width="10%">{{ item.id }}</td>
          <td width="10%">{{ item.id }}</td>
          <td width="10%">{{ item.createTime }}</td>
          <td width="170">
            <el-button type="primary">修改</el-button>
            <el-button type="primary">删除</el-button>
          </td>
        </tr>
      </table>
      <ul class="ul-table">
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
            <li class="ul-table-7">{{ item.id }}</li>
            <li class="ul-table-8">{{ item.id }}</li>
            <li class="ul-table-9">{{ item.createTime }}</li>
            <li class="ul-table-10">
              <el-button type="primary" class="ul-table-btn">修改</el-button>
              <el-button type="primary" class="ul-table-btn">删除</el-button>
            </li>
          </ul>
        </li>
      </ul>
      <el-pagination
        :current-page="pagination.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="100"
        :total="400"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'ClimbDevice',
  data() {
    return {
      tableData: [],
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
      'fetchClimbDeviceList'
    ]),
    async init() {
      const result = await this.fetchClimbDeviceList({
        pageNumber: 1,
        pageSize: 5
      })
      console.log(result)
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
    },
    handleSizeChange(val) {
      console.log(val)
    },
    handleCurrentChange(val) {
      console.log(val)
    }
  }
}
</script>
<style lang='scss' scoped>
.climbDevice{
  &-filter{
    padding: 16px;
    &-add{
      float: right;
      margin-right: 20px;
      width: 100px;
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
