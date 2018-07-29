<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">

      <el-form label-width="100px" :model="searchForm">
        <el-col :span="24" class="text-center">
          <el-form-item label-width="0">
            <el-button type="primary" size="medium" v-on:click="addDetail">新增</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div class="listCont">
      <el-table :data="data.resultList" border size="medium">
        <el-table-column align="center" type="index" prop="id" label="序号" width="50"></el-table-column>
        <el-table-column align="center" prop="businessFormName" label="业态"></el-table-column>
        <el-table-column align="center" prop="name" label="业种"></el-table-column>
        <el-table-column align="center" prop="modifyTime" label="修改时间"></el-table-column>
        <el-table-column align="center"  label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" v-on:click="editDetails(scope.row.id)">修改</el-button>
            <el-button type="text" v-on:click="showDetails(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type='flex' justify="center">
        <el-col :span="12">
          <div class="block">
            <span class="demonstration"></span>
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="data.page"
              :page-size="size"
              layout="prev, pager, next"
              :total="data.countSize">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="提示"
      :visible="yetaiVisible"
      width="40%"
      :modal=false
      :show-close=false>
      <el-select
        v-model="yetaiSelect"
        placeholder="请选择">
        <el-option
          v-for="item in yetaiList"
          :key="item.value"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="yetaiVisible = false">取 消</el-button>
        <el-button type="primary" @click="yetaiVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  components:{
    addSelect
  },
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
    picIndex: 0,
    yetaiVisible: false,
    yetaiSelect: '',
    yetaiList: [
      {
        id:'123',
        name:'123'
      },
      {
        id:'456',
        name:'456'
      }
    ]
  }),
  created () {
    this.searchList(1)
    this.$axios.get('/base/find/business/form/select').then(res => {
      console.log(res)
      this.yetaiList = res;
    })
  },
  methods: {
    handleCurrentChange (val) {
      this.data.page = val
      this.searchList()
    },
    searchList (type) {
      this.loading = true
      var that = this
      var page
      if (type === 1) {
        page = 1
        this.data.page = page
      } else {
        page = this.data.page
      }
      // that.$axios.post('/shop/Appraise/queryAll?p=' + page + '&c=' + that.size, params).then((res) => {
      that.$axios.get('/base/find/business/species?p=' + page + '&c=' + this.size).then(res => {
        console.log(res)
        that.loading = false
        that.data = res
      }).catch(function (eMsg) {
        that.loading = false
        that.showAlert(eMsg)
      })
    },
    // 查看详情
    showDetails (id) {
      // this.$router.push('/projecManage/details/' + id)
    },
    editDetails (id) {
      // this.$router.push('/projecManage/edit/' + id)
    },
    addDetail () {
      this.yetaiVisible = true;

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
  width: 30%;
}
  .el-table{
    position: relative;
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 50%;
    max-width: 100%;
    font-size: 14px;
    color: #606266;
    margin: 0 auto;
  }
  .block{
    float: right;
  }
</style>
