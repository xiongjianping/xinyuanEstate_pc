<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <el-form label-width="100px" :model="searchForm">
        <el-col :span="6">
          <el-form-item label="区域">
            <el-input size="small" v-model="searchForm.projectName" :maxlength="11" placeholder="请输入区域名称"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="项目">
            <el-input size="small" v-model="searchForm.projectName1" :maxlength="11" placeholder="请输入项目名称"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="楼层">
            <el-input size="small" v-model="searchForm.projectleader" :maxlength="30" placeholder="请输入楼层"></el-input>
          </el-form-item>
        </el-col><br><br><br>

        <el-col :span="6">
          <el-form-item label="业态">
            <el-select size="small" v-model="searchForm.area" placeholder="请选择">
              <el-option label="请选择" value="null"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="业种">
            <el-select size="small" v-model="searchForm.company" placeholder="请选择">
              <el-option label="请选择" value="null"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="24" class="text-center">
          <el-form-item label-width="0">
            <el-button type="primary" size="medium" v-on:click="searchList(1);">搜索</el-button>
            <el-button type="primary" size="medium" v-on:click="kxxz(1);">客销度新增</el-button>
            <el-button type="primary" size="medium" v-on:click="yzl(1);">溢租率新增</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-radio-group v-model="tabPosition" style="margin-top: 50px;margin-bottom:-25px;margin-left: 30px">
      <el-radio-button label="top">溢租率</el-radio-button>
      <el-radio-button label="right">客销度</el-radio-button>
      <el-radio-button label="bottom">适配值</el-radio-button>
    </el-radio-group>

    <div class="listCont">
      <el-table :data="data.list" border size="medium">
        <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>
        <el-table-column align="center" prop="projectName" label="维度"></el-table-column>
        <el-table-column align="center" prop="area" label="对象"></el-table-column>
        <el-table-column align="center" prop="company" label="项目名称"></el-table-column>
        <el-table-column align="center" prop="startTime" label="业态"></el-table-column>
        <el-table-column align="center" prop="operationleader" label="业种"></el-table-column>
        <el-table-column align="center" prop="phone" label="优秀"></el-table-column>
        <el-table-column align="center" prop="phone" label="良好"></el-table-column>
        <el-table-column align="center" prop="phone" label="提升"></el-table-column>
        <el-table-column align="center" prop="phone" label="合格"></el-table-column>
        <el-table-column align="center" prop="phone" label="亏损"></el-table-column>
        <el-table-column align="center" prop="startTime" label="修改时间"></el-table-column>
        <el-table-column align="center"  label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" v-on:click="showDetails(scope.row.id)">查看</el-button>
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
      this.$router.push('/dataManage/trigonometric/details/' + id)
    },
    editDetails (id) {
      this.$router.push('/dataManage/trigonometric/edit/' + id)
    },
    kxxz (id) {
      this.$router.push('/dataManage/trigonometric/kx-xinzeng/' + id)
    },
    yzl (id) {
      this.$router.push('/dataManage/trigonometric/yz-xinzeng/' + id)
    },

  }
}
</script>
<style scoped  lang="less">
  .tabs{
    width: 100%;
    height:50px;
    background: #e7cb8a !important;
    margin-bottom: 5px;
    div{
      display: inline-block;
    }
  }
  .mainContent{
    width: 100%;
    height: 100%;
    background: #fff;
  }
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}


</style>
