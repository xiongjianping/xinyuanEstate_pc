<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">

    <el-row class="searchBox" :gutter="30">
      <h3 class="title">基本信息</h3>
      <i class="hengxian"></i>
      <el-form label-width="100px" :model="searchForm">

        <!-- <el-col :span="6"> -->
        <el-form-item label="楼层名称">
          <el-input size="small" v-model="searchForm.projectName" :maxlength="11" placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <!-- </el-col> -->

        <!-- <el-col :span="7" :offset="1">
          开始时间：{{data.startTime}}
        </el-col>
        <el-col :span="8" :offset="1">
          修改时间：{{data.lastTime}}
        </el-col><br> -->

        <el-form-item label="时间">
          <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>

        <el-col :span="6">
          <el-form-item label="区域：">
            <el-select size="small" v-model="searchForm.area" placeholder="请选择区域">
              <el-option label="  " value="null"></el-option>
              <el-option label=" " value="null"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="公司：">
            <el-select size="small" v-model="searchForm.area" placeholder="">
              <el-option label="  " value="null"></el-option>
              <el-option label=" " value="null"></el-option>
            </el-select>
          </el-form-item>
        </el-col><br><br><br><br><br>

        <el-col :span="6">
          <el-form-item label="项目：">
            <el-select size="small" v-model="searchForm.area" placeholder=" ">
              <el-option label="  " value="null"></el-option>
              <el-option label=" " value="null"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="楼栋：">
            <el-select size="small" v-model="searchForm.area" placeholder="A座">
              <el-option label="A座" value="null"></el-option>
              <el-option label="B座" value="null"></el-option>
            </el-select>
          </el-form-item>
        </el-col><br><br><br><br><br>

        <el-col :span="6">
          <el-form-item label="面积/平：">
            <el-input size="small" v-model="searchForm.projectName" :maxlength="11" placeholder=" "></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="位置：">
            <el-select size="small" v-model="searchForm.area" placeholder=" ">
              <el-option label="  " value="null"></el-option>
              <el-option label=" " value="null"></el-option>
            </el-select>
          </el-form-item>
        </el-col><br><br><br><br><br>

        <el-col :span="6">
          <el-form-item label="状态">
            <el-select size="small" v-model="searchForm.area" placeholder="启用">
              <el-option label="启用" value="null"></el-option>
              <el-option label="禁用" value="null"></el-option>
            </el-select>
          </el-form-item>
        </el-col><br><br><br><br><br>

        <div class="xxk">
          <button>取消</button>
          <button>确定</button>
        </div>

      </el-form>
    </el-row>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    data: () => ({
      data: {},
      loading: false,
      searchForm: {
        area: '',
        company: '',
        startTime: null
      },
      infoData: {},
      size: 10,
      dialogFormVisible: false,
      dialogVisible: false,
      pictureList: [],
      picIndex: 0
    }),
    created () {
      this.searchList(1)
    },
    methods: {
      showMessage (cont) {
        this.$message({
          type: 'success',
          message: cont
        })
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
  .mainContent{
    width: 100%;
    height: 100%;
    background: #fff;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100%;
  }
  .el-col-10 {
    width: 41.66667%;
    margin-top: 45px;
  }
  .el-form-item{
    margin-bottom: 30px;
    margin-top: 20px;
    margin-left: 52px;
  }
  .el-form-item__label {
    text-align: right;
    float: left;
    font-size: 17px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  el-button{
    background: rgb(22,155,213);
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
      top: 50px;
      margin-left: 20px;
    }
  }


</style>
