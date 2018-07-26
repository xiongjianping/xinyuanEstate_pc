<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <div class="detailsContent">
      <h3 class="title">基本信息</h3>
      <el-row class="detailsInfo" :gutter="30">
        <el-col :span="7" :offset="1">
          {{data.projectName}}
        </el-col>
        <el-col :span="7" :offset="1">
          区域：{{data.area}}
        </el-col>
        <el-col :span="7" :offset="1">
          公司：{{data.company}}
        </el-col>
        <el-col :span="7" :offset="1">
          状态：<span v-if="data.status === 'DISABLED'">停用</span><span v-if="data.status === 'ENABLED'">启用</span>
        </el-col>
        <el-col :span="7" :offset="1">
          开始时间：{{data.startTime}}
        </el-col>
        <el-col :span="7" :offset="1">
          最后一次修改时间：{{data.lastTime}}
        </el-col>
        <el-col :span="7" :offset="1">
          修改人：{{data.modifierName}}
        </el-col>
        <el-col :span="7" :offset="1">
          负责人：{{data.projectleader}}
        </el-col>
        <el-col :span="7" :offset="1">
          联系方式：{{data.phone}}
        </el-col>
        <el-col :span="7" :offset="1">
          组员：<span v-for="info in data.members" :key="info.id">{{info.name}}</span>
        </el-col>
        <el-col :span="7" :offset="1">
          文件：{{data.projectName}}
        </el-col>
      </el-row>
    </div>
    <div class="detailsContent">
      <h3 class="title">铺位信息</h3>
      <div class="listCont">
        <el-table :data="data.unitList.list" border size="medium">
          <el-table-column align="center" prop="num" label="铺位编号"></el-table-column>
          <el-table-column align="center" prop="building" label="楼栋"></el-table-column>
          <el-table-column align="center" prop="floor" label="楼层"></el-table-column>
          <el-table-column align="center" prop="area" label="面积"></el-table-column>
          <el-table-column align="center" prop="brand" label="品牌名称"></el-table-column>
          <el-table-column align="center" prop="operation" label="经营方式"></el-table-column>
          <el-table-column align="center" prop="formats" label="业态"></el-table-column>
          <el-table-column align="center" prop="merchandiseName" label="状态">
            <template slot-scope="scope">
              <el-button disabled  size="mini" type="success" v-if="scope.row.status === 'ENABLED'">启用</el-button>
              <el-button disabled  size="mini" type="danger" v-if="scope.row.status === 'DISABLED'">停用</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="paginationCont">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="data.unitList.page"
            :page-size="size"
            layout="total, prev, pager, next"
            :total="data.unitList.count">
          </el-pagination>
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
  .mainContent{
    width: 100%;
    height: 100%;
    background: #fff;
  }
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}
</style>
