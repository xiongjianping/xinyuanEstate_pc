<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <div class="detailsContent">
      <h3 class="title">基本信息</h3>
      <i class="hengxian"></i>
      <el-row class="detailsInfo" :gutter="30">
        <el-col :span="7" :offset="1">
          {{data.projectName}}
        </el-col>
        <el-col :span="7" :offset="1">
          模板名称：{{data.area}}
        </el-col><br><br>
        <el-col :span="7" :offset="1">
          模板编号：{{data.company}}
        </el-col><br><br>

        <el-col :span="7" :offset="1">
          模板分类：{{data.startTime}}
        </el-col><br><br>
        <el-col :span="4" :offset="1">
          开始时间：{{data.lastTime}}
        </el-col>
        <el-col :span="4" :offset="1">
          修改人：{{data.modifierName}}
        </el-col>
        <el-col :span="4" :offset="1">
          状态：<span v-if="data.status === 'DISABLED'">停用</span><span v-if="data.status === 'ENABLED'">启用</span>
        </el-col>


      </el-row><br>

    </div>

    <div class="detailsContent">

      <div class="listCont">
        <div class="hx"></div>
        <el-row>
          <el-button type="primary" style="margin-top: -15px">新增指标</el-button>
        </el-row>
        <el-table :data="data.unitList.list" border size="medium" style="margin-top: 10px">

          <el-table-column align="center" prop="id" label="序号"></el-table-column>
          <el-table-column align="center" prop="building" label="编号"></el-table-column>
          <el-table-column align="center" prop="floor" label="指标名称"></el-table-column>
          <el-table-column align="center" prop="area" label="最大值"></el-table-column>
          <el-table-column align="center" prop="brand" label="分类"></el-table-column>
          <el-table-column align="center"  label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="text" v-on:click="showDetails(scope.row.id)">详情</el-button>
              <el-button type="text" v-on:click="editDetails(scope.row.id)">编辑</el-button>
              <!--<el-button type="text" v-if="scope.row.status == 'DISABLED'" v-on:click="showDetails(scope.row)">启用</el-button>-->
              <el-button type="text" v-if="scope.row.status == 'ENABLED'" v-on:click="showDetails(scope.row)">禁用</el-button>
              <el-button type="text" v-on:click="showDetails(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="xxk">
          <button>取消</button>
          <button>确定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    data: {
      unitList: []
    },
    loading: false,
    size: 10
  }),
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('/details').then((res) => {
        this.loading = false
        this.data = res
      }).catch((eMsg) => {
        this.loading = false
        this.showAlert(eMsg)
      })
    },
    handleCurrentChange (val) {
      this.data.unitList.page = val
      this.searchList()
    },
    searchList (type) {
      this.loading = true
      // this.$axios.post('/shop/Appraise/queryAll?p=' + page + '&c=' + this.size, params).then((res) => {
      this.$axios.get('/list').then((res) => {
        this.loading = false
        this.data = res
      }).catch((eMsg) => {
        this.loading = false
        this.showAlert(eMsg)
      })
    },
    showAlert (cont) {
      this.$alert(cont, '温馨提示', {
        confirmButtonText: '确定'
      })
    }
  }
}

</script>
<style scoped  lang="less">
  .xxk{
    width: 100%;
    height: 100px;
    button{
      width: 100px;
      height: 50px;
      display: inline-block;
      border-radius: 10px;
      background: rgb(22,155, 213);
      outline:medium;
      outline: none;
      position: relative;
      left:500px;
      top: 50px;
      margin-left: 20px;
    }
  }
  .mainContent{
    width: 100%;
    height: 100%;
    background: #fff;
  }
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}

</style>
