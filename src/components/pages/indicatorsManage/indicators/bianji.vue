<template>
  <!--新增项目-->
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">

    <el-row class="searchBox" :gutter="30">
      <h3 class="title">基本信息</h3>
      <i class="hengxian"></i>
      <el-form label-width="100px" :model="searchForm">


        <!-- <el-col :span="6"> -->
        <el-form-item label="品牌名称">
          <el-input size="small" v-model="searchForm.projectName" :maxlength="11" placeholder="请输入品牌名称"></el-input>
        </el-form-item>
        <!-- </el-col> -->

        <el-col :span="7" :offset="1">
        开始时间：{{data.startTime}}
        </el-col>
        <el-col :span="8" :offset="1">
        修改时间：{{data.lastTime}}
        </el-col><br>


        <el-col :span="6">
          <el-form-item label="业态：">
            <el-select size="small" v-model="searchForm.area" placeholder=" ">
              <el-option label="  " value="null"></el-option>
              <el-option label=" " value="null"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="业种：">
            <el-select size="small" v-model="searchForm.area" placeholder=" ">
              <el-option label="  " value="null"></el-option>
              <el-option label=" " value="null"></el-option>
            </el-select>
          </el-form-item>
        </el-col><br><br><br><br><br>

        <el-col :span="6">
          <el-form-item label="经营方式：">
            <el-select size="small" v-model="searchForm.area" placeholder=" ">
              <el-option label="  " value="null"></el-option>
              <el-option label=" " value="null"></el-option>
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
    handleSizeChange (val) {
      this.size = val
      this.searchList()
    },
    handleCurrentChange (val) {
      this.data.page = val
      this.searchList()
    },
    searchList (type) {
      this.loading = true
      var that = this
      var page
      var params = {
        publishedName: that.searchForm.publishedName ? that.searchForm.publishedName : null,
        merchandise: that.searchForm.merchandise ? that.searchForm.merchandise : null,
        startTime: that.searchForm.startTime ? moment(new Date(that.searchForm.startTime).getTime()).format('YYYY-MM-DD HH:mm:ss') : null
      }
      if (type === 1) {
        page = 1
      } else {
        page = this.data.page
      }
      console.log(params, page)
      that.loading = true
      // that.$axios.post('/shop/Appraise/queryAll?p=' + page + '&c=' + that.size, params).then((res) => {
      that.$axios.get('/list').then((res) => {
        console.log(res)
        that.loading = false
        that.data = res
      }).catch(function (eMsg) {
        that.loading = false
        that.showAlert(eMsg)
      })

    },
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
