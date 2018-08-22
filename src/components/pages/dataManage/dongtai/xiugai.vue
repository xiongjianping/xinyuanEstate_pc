<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <div class="detailsContent">
      <h3 class="title">版本信息</h3>
      <i class="hengxian"></i>
      <el-row class="detailsInfo" :gutter="30">

        <el-col :span="5" :offset="1">
          版本名称：{{data.area}}
        </el-col>
        <el-col :span="5">
          编号：{{data.company}}
        </el-col>

        <el-col :span="4">
          开始时间：{{data.lastTime}}
        </el-col>
        <el-col :span="4" :offset="1">
          指标总数：{{data.lastTime}}
        </el-col>
        <el-col :span="4" :offset="1">
          已录入个数：{{data.lastTime}}
        </el-col>
        <el-col :span="4" :offset="1">
          未录入个数：{{data.lastTime}}
        </el-col>

        <el-col :span="4" :offset="1">
          状态：<span v-if="data.status === 'DISABLED'">停用</span><span v-if="data.status === 'ENABLED'">启用</span>
        </el-col>


      </el-row><br>

    </div>

    <div class="detailsContent">

      <div class="listCont">

        <el-table :data="data.unitList.list" border size="medium" :header-cell-style="rowClass" style="margin-top: 10px">

          <el-table-column align="center" prop="id" label="序号"></el-table-column>
          <el-table-column align="center" prop="building" label="编号"></el-table-column>
          <el-table-column align="center" prop="floor" label="品牌名称"></el-table-column>
          <el-table-column align="center" prop="area" label="楼层"></el-table-column>
          <el-table-column align="center" prop="brand" label="铺位号"></el-table-column>
          <el-table-column align="center" prop="brand" label="业态"></el-table-column>
          <el-table-column align="center" prop="brand" label="业种"></el-table-column>
          <el-table-column align="center" prop="brand" label="租金"></el-table-column>
          <el-table-column align="center" prop="brand" label="物业费"></el-table-column>
          <el-table-column align="center" prop="brand" label="装修折旧"></el-table-column>
          <el-table-column align="center" prop="brand" label="净利润"></el-table-column>
          <el-table-column align="center"  label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="text" v-on:click="showDetails(scope.row.id)">修改</el-button>
              <el-button type="text" v-on:click="showDetails(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="xxk">
          <button>返回</button>
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
    rowClass({ row, rowIndex}) {
      //console.log(rowIndex) //表头行标号为0
      return 'height:50px;font-size:15px;'
    },
    showAlert: function (cont) {
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
    // height: 100%;
    background: #fff;
  }
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}

</style>
