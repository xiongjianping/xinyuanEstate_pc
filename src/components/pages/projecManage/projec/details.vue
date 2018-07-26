<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <div class="detailsContent">
      <h3 class="title">基本信息</h3>
      <i></i>
      <el-row class="detailsInfo" :gutter="30">
        <el-col :span="7" :offset="1">
          {{data.projectName}}
        </el-col><br>
        <el-col :span="3" :offset="1">
          区域：{{data.area}}
        </el-col>
        <el-col :span="3" :offset="1">
          公司：{{data.company}}
        </el-col>
        <el-col :span="3" :offset="1">
          面积/平：{{data.company}}
        </el-col>
        <el-col :span="7" :offset="1">
          状态：<span v-if="data.status === 'DISABLED'">停用</span><span v-if="data.status === 'ENABLED'">启用</span>
        </el-col>
        <el-col :span="4" :offset="1">
          文件：{{data.projectName}}
        </el-col><br><br>

        <el-col :span="7" :offset="1">
          开始时间：{{data.startTime}}
        </el-col>
        <el-col :span="7" :offset="1">
          最后一次修改时间：{{data.lastTime}}
        </el-col>
        <el-col :span="7" :offset="1">
          负责人：{{data.projectleader}}
        </el-col>

      </el-row>
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
      console.log(123);
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
