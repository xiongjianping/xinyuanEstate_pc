<template>
  <!--编辑-->
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">

    <el-row class="searchBox" :gutter="30">
      <h3 class="title">基本信息</h3>
      <i class="hengxian"></i>
      <el-form label-width="100px" :model="searchForm">

        <!-- <el-col :span="6"> -->
        <el-form-item label="模板名称">
          <el-input size="small" v-model="searchForm.projectName" :maxlength="11" placeholder="请输入项目名称"  style="width:300px"></el-input>
        </el-form-item>
        <!-- </el-col> -->

        <el-form-item label="模板编号">
          <el-input
            placeholder="请输入内容"
            clearable style="width: 200px">
          </el-input>
        </el-form-item>


        <el-col :span="6">
          <el-form-item label="模板分类">
            <el-select size="small" v-model="searchForm.company" placeholder="请选择">
              <el-option label="请选择" value="null"></el-option>
            </el-select>
          </el-form-item>
        </el-col><br><br><br><br><br>

        <el-col :span="4" :offset="1">
          开始时间：{{data.startTime}}
        </el-col>
        <el-col :span="4" :offset="1">
          修改人：李某某
        </el-col>
        <el-col :span="6" style="margin-top: -30px">
          <el-form-item label="状态">
            <el-select size="small" v-model="searchForm.company" placeholder="请选择">
              <el-option label="请选择" value="null"></el-option>
            </el-select>
          </el-form-item>
        </el-col><br><br><br><br><br>

        <el-row>
          <el-button type="primary" style="margin-left: 80px">主要按钮</el-button>
        </el-row>

        <div class="listCont" style="margin-left: 50px">
          <el-table :data="data.list" border size="medium">
            <el-table-column align="center" prop="id" label="序号"></el-table-column>
            <el-table-column align="center" prop="area" label="编号"></el-table-column>
            <el-table-column align="center" prop="company" label="指标名称"></el-table-column>
            <el-table-column align="center" prop="startTime" label="最大值"></el-table-column>
            <el-table-column align="center" prop="startTime" label="分类"></el-table-column>
            <el-table-column align="center"  label="操作" width="200">
              <template slot-scope="scope">
                <el-button type="text" v-on:click="showDetails(scope.row.id)">详情</el-button>
                <el-button type="text" v-on:click="editDetails(scope.row.id)">编辑</el-button>
                <el-button type="text" v-if="scope.row.status == 'ENABLED'" v-on:click="showDetails(scope.row)">禁用</el-button>
                <el-button type="text" v-on:click="showDetails(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="paginationCont">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="data.page"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="data.count">
            </el-pagination>
          </div>
        </div>

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
