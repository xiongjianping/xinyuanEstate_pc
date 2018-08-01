<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <el-form label-width="100px" :model="searchForm">
        <el-col :span="5">
          <el-form-item label="模板名称">
            <el-select size="small" v-model="searchForm.area" placeholder="请选择">
              <el-option label="请选择" value="null"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="模板编号">
            <el-select size="small" v-model="searchForm.company" placeholder="请选择">
              <el-option label="请选择" value="null"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="模板分类">
            <el-input size="small" v-model="searchForm.projectName" :maxlength="11" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="开始时间">
            <el-date-picker
              size="small"
              v-model="searchForm.startTime"
              type="datetime"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="模板状态">
            <el-input size="small" v-model="searchForm.projectName" :maxlength="11" placeholder="请输入 "></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="text-center">
          <el-form-item label-width="0">
            <el-button type="primary" size="medium" v-on:click="searchList(1);">搜索</el-button>
            <el-button type="primary" size="medium" v-on:click="">新增</el-button>
            <el-button type="primary" size="medium" v-on:click="bianji(0);">编辑</el-button>
            <el-button type="primary" size="medium" v-on:click="xiangqing(0);">详情</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div class="listCont">
      <el-table :data="data.list" border size="medium" :header-cell-style="rowClass">
        <el-table-column align="center" prop="projectName" label="模板名称"></el-table-column>
        <el-table-column align="center" prop="area" label="模板编号"></el-table-column>
        <el-table-column align="center" prop="company" label="模板分类"></el-table-column>
        <el-table-column align="center" prop="startTime" label="开始时间"></el-table-column>
        <el-table-column align="center" prop="startTime" label="修改人"></el-table-column>
        <el-table-column align="center" prop="merchandiseName" label="状态">
          <template slot-scope="scope">
            <el-button disabled  size="small" type="success" v-if="scope.row.status === 'ENABLED'">启用</el-button>
            <el-button disabled  size="small" type="danger" v-if="scope.row.status === 'DISABLED'">禁用</el-button>
          </template>
        </el-table-column>
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
      this.$router.push('/organizationStructure/organization/details/' + id)
    },
    bianji(id){
      this.$router.push('/organizationStructure/organization/bianji/' + id)
    },
    xiangqing(id){
      this.$router.push('/organizationStructure/organization/details/' + id)
    },
    rowClass({ row, rowIndex}) {
      console.log(rowIndex) //表头行标号为0
      return 'height:45px;font-size:15px'
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
  .mainContent{
    width: 100%;
    height: 100%;
    background: #fff;
  }
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}
</style>
