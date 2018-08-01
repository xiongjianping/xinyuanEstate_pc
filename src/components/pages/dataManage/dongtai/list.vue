<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <el-form label-width="100px" :model="searchForm">
        <el-col :span="6">
          <el-form-item label="版本名称">
            <el-input size="small" v-model="searchForm.projectName" :maxlength="11" placeholder=" "></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="数据涵盖起止时间" label-width="150px">
            <el-date-picker
              size="small"
              v-model="searchForm.startTime"
              type="datetime"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="至" label-width="50px">
            <el-date-picker
              size="small"
              v-model="searchForm.endTime"
              type="datetime"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="text-center">
          <el-form-item label-width="0">
            <el-button type="primary" size="medium" v-on:click="searchList(1);">搜索</el-button>
            <el-button type="primary" size="medium" v-on:click="searchList(1);">导入</el-button>
            <el-button type="primary" size="medium" v-on:click="searchList(1);">导出</el-button>
            <el-button type="primary" size="medium" v-on:click="xiugai(1);">修改</el-button>
            <el-button type="primary" size="medium" v-on:click="xiangqing(1);">详情</el-button>
            <el-button type="primary" size="medium" v-on:click="xiangqing(1);">固定成本</el-button>
            <el-button type="primary" size="medium" v-on:click="xiangqing(1);">详情</el-button>
            <el-button type="primary" size="medium" v-on:click="xiangqing(1);">详情</el-button>
            <el-button type="primary" size="medium" v-on:click="xiangqing(1);">详情</el-button>
            <el-button type="primary" size="medium" v-on:click="xiangqing(1);">详情</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <div>
      <el-radio-group v-model="radio3">
        <el-radio-button label="固定成本" style="margin-top: 50px;margin-bottom:-35px;margin-left: 30px;user-select: none;"></el-radio-button>
        <el-radio-button label="客销度"></el-radio-button>
        <el-radio-button label="适配值"></el-radio-button>
      </el-radio-group>
    </div>


    <div class="listCont">
      <el-table :data="data.list" border size="medium">
        <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>
        <el-table-column align="center" prop="projectName" label="纬度"></el-table-column>
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
      this.$router.push('/dataManage/dongtai/details/' + id)
    },
    editDetails (id) {
      this.$router.push('/dataManage/dongtai/edit/' + id)
    },
    xiugai (id) {
      this.$router.push('/dataManage/dongtai/xiugai/' + id)
    },
    xiangqing (id) {
      this.$router.push('/dataManage/dongtai/xiangqing/' + id)
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
