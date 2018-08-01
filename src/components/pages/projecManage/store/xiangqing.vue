<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <div class="detailsContent">
      <h3 class="title">基本信息</h3>
      <i class="hengxian"></i>

      <el-row class="detailsInfo" :gutter="30" style="margin-left: 40px">
        <h3 class="biaoti">铺位名：{{data.projectName}}</h3>

        <el-col :span="6" :offset="1">
          区域：{{data.areaName}}
        </el-col>

        <el-col :span="6" :offset="1">
          公司：{{data.companyName}}
        </el-col>

        <el-col :span="6" :offset="1">
          所属项目：{{data.projectName}}
        </el-col><br>

        <el-col :span="6" :offset="1">
          楼栋：{{data.buildingName}}
        </el-col>

        <el-col :span="3" :offset="1">
          楼层：{{data.floorName}}
        </el-col>

        <el-col :span="6" :offset="1">
          面积/平：{{data.acreage}}
        </el-col><br>


        <el-col :span="6" :offset="1">
          状态：<span v-if="!data.state">禁用</span><span v-if="data.state">启用</span>
        </el-col>


      </el-row>

      <div class="xxk">
        <button type="button" @click="goBack()">返回</button>
      </div>
    </div>

  </div>
</template>
<script>

  export default {
    data: () => ({
      data: {},
      loading: false
    }),
    created () {
      this.getData()
    },
    methods: {
      getData () {
        window.$getStoreDetails(this.$route.params.id).then((res) => {
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
