<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <el-form label-width="20px" :model="searchForm">
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" size="medium" v-on:click="resetForm();">新增</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div class="listCont">
      <el-table :data="data.list" border size="medium">
        <el-table-column align="center" type="index" label="序号" width=50></el-table-column>
        <el-table-column align="center" prop="projectName" label="维度"></el-table-column>
        <el-table-column align="center" prop="area" label="分类"></el-table-column>
        <el-table-column align="center" prop="company" label="业态"></el-table-column>
        <el-table-column align="center" prop="projectleader" label="业种"></el-table-column>
        <el-table-column align="center" prop="operationleader" label="优秀"></el-table-column>
        <el-table-column align="center" prop="phone" label="良好"></el-table-column>
        <el-table-column align="center" prop="projectleader" label="提升"></el-table-column>
        <el-table-column align="center" prop="operationleader" label="合格"></el-table-column>
        <el-table-column align="center" prop="phone" label="亏损"></el-table-column>
        <el-table-column align="center" prop="startTime" label="修改时间"></el-table-column>
        <el-table-column align="center"  label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" v-on:click="editDetails(scope.row.id)">编辑</el-button>
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
        that.loading = false
        that.data = res
      }).catch(function (eMsg) {
        that.loading = false
        that.showAlert(eMsg)
      })
    },
    // 查看详情
    showDetails (id) {
      this.$router.push('/projecManage/details/' + id)
    },
    editDetails (id) {
      this.$router.push('/projecManage/edit/' + id)
    },

  }
}
</script>
<style scoped  lang="less">
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}
</style>
