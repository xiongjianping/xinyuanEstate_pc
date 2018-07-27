<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">

    <div class="left">
      <h2>总部</h2>
      <p>北京城市公司一</p>
      <h3>销售部</h3>
      <p>北京城市公司二</p>
      <h3>客服部</h3>
    </div>
    <div class="listCont">

      <el-table :data="data.list" border size="medium">

        <el-table-column align="center" type="id" prop="id" label="排序号" ></el-table-column>
        <el-table-column align="center" prop="area" label="真实姓名" ></el-table-column>
        <el-table-column align="center" prop="company" label="登录名称" ></el-table-column>
        <el-table-column align="center" prop="startTime" label="电子邮箱"></el-table-column>
        <el-table-column align="center" prop="startTime" label="移动电话"></el-table-column>
        <el-table-column align="center" prop="merchandiseName" label="状态">
          <template slot-scope="scope">
            <el-button disabled  size="small" type="success" v-if="scope.row.status === 'ENABLED'">0</el-button>
            <el-button disabled  size="small" type="danger" v-if="scope.row.status === 'DISABLED'">1</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          layout="prev, pager, next"
          :total="30">
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
      this.$router.push('/dataDicionary/brand/details/' + id)
    },
    editDetails (id) {
      this.$router.push('/projecManage/edit/' + id)
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
  .left{
    width: 200px;
    height: 100%;
    background: rgb(242,242,242);
    float: left;
    margin-left: 50px;
    margin-top: 30px;
    p{
     margin-left: 50px;
      font-weight: bold;
    }
    h2{
      margin-left: 20px;
      margin-top: 10px;
      font-weight: 500;
    }
    h3{
      margin-left: 70px;
      font-size: 18px;
      font-weight: bold;
    }
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
