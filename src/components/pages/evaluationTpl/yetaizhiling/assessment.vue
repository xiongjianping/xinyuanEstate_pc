<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <el-form label-width="100px" :model="searchForm">
        <el-col :span="6">
          <el-form-item label="区域">
            <el-select size="small" v-model="searchForm.area" placeholder="请选择">
              <el-option label="请选择" value="null"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="公司">
            <el-select size="small" v-model="searchForm.company" placeholder="请选择">
              <el-option label="请选择" value="null"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目名称">
            <el-input size="small" v-model="searchForm.projectName" :maxlength="11" placeholder="请输入项目名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目负责人">
            <el-input size="small" v-model="searchForm.projectleader" :maxlength="30" placeholder="请输入项目负责人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="开始时间">
            <el-date-picker
              size="small"
              v-model="searchForm.startTime"
              type="datetime"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="text-center">
          <el-form-item label-width="0">
            <el-button type="primary" size="medium" v-on:click="searchList(1);">搜索</el-button>
            <el-button type="primary" size="medium" v-on:click="resetForm();">区域管理</el-button>
            <el-button type="primary" size="medium" v-on:click="resetForm();">新增公司</el-button>
            <el-button type="primary" size="medium" v-on:click="resetForm();">新增项目</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div class="listCont">
      <el-table :data="data.list" border size="medium">
        <el-table-column align="center" prop="projectName" label="项目名称"></el-table-column>
        <el-table-column align="center" prop="area" label="区域"></el-table-column>
        <el-table-column align="center" prop="company" label="公司"></el-table-column>
        <el-table-column align="center" prop="projectleader" label="项目负责人"></el-table-column>
        <el-table-column align="center" prop="operationleader" label="运营负责人"></el-table-column>
        <el-table-column align="center" prop="phone" label="联系方式"></el-table-column>
        <el-table-column align="center" prop="startTime" label="开始时间"></el-table-column>
        <el-table-column align="center" prop="merchandiseName" label="当前状态">
          <template slot-scope="scope">
            <el-button disabled  size="small" type="success" v-if="scope.row.status === 'ENABLED'">启用</el-button>
            <el-button disabled  size="small" type="danger" v-if="scope.row.status === 'DISABLED'">禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" v-on:click="showDetails(scope.row)">查看</el-button>
            <el-button type="text" v-on:click="showDetails(scope.row)">编辑</el-button>
            <el-button type="text" v-if="scope.row.status == 'DISABLED'" v-on:click="showDetails(scope.row)">启用</el-button>
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
showAlert(cont) {
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
</style>
