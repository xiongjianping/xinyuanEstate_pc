<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <div class="detailsContent">
      <h3 class="title">基本信息</h3>
      <i class="hengxian"></i>

      <el-row class="detailsInfo" :gutter="30" style="margin-left: 40px">
        <h3 class="biaoti">楼层名称：{{data.projectName}}</h3>
        <el-col :span="3" :offset="1">
          区域：{{data.areaName}}
        </el-col>
        <el-col :span="3" :offset="1">
          公司：{{data.companyName}}
        </el-col>

        <el-col :span="3" :offset="1">
          项目：{{data.companyName}}
        </el-col><br>

        <el-col :span="3" :offset="1">
          楼栋：{{data.companyName}}
        </el-col>


        <el-col :span="3" :offset="1" style="width: 210px">
        面积/平：{{data.acreage}}
      </el-col>

        <el-col :span="3">
          方位：<span v-if="data.location === 1">楼上</span><span v-if="data.location === 2">楼下</span>
        </el-col><br>

        <el-col :span="3" :offset="1">
          状态：<span v-if="!data.state">停用</span><span v-if="data.state">启用</span>
        </el-col>

        <el-col :span="3" :offset="1">
          修改人：{{data.modifyUserName}}
        </el-col><br>

        <el-col :span="3" :offset="1" style="width: 400px">
          最后一次修改时间：{{data.modifyTime}}
        </el-col>
        <el-col :span="3" :offset="1" style="width: 400px">
          开始时间：{{data.createTime}}
        </el-col>
      </el-row>

      <div class="xxk">
        <el-button type="primary" size="medium" v-on:click="goBack();">返回</el-button>
      </div>
    </div>

  </div>
</template>
<script>

export default {
  data: () => ({
    id:'',
    data: {},
    loading: false,
    size: 10
  }),
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      window.$getFloorDetails(this.$route.params.id).then((res) => {
        this.loading = false
        this.data = res
      }, (err) => {
        this.loading = false
        this.showAlert(err)
      })
    },
    goBack(){
      this.$router.back(-1)
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
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}
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
      top:100px;
      margin-left: 20px;
    }
  }
</style>
