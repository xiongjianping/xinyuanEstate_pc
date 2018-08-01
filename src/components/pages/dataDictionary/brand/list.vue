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
        <el-table-column align="center" type="index"  label="序号" width="50"></el-table-column>
        <el-table-column align="center" prop="num" label="业态编号" width="300"></el-table-column>
        <el-table-column align="center" prop="name" label="业态"  width="200"></el-table-column>
        <el-table-column align="center" prop="modifyTime" label="修改时间"  width="200"></el-table-column>
        <el-table-column align="center"  label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" v-on:click="editDetails(scope.row.id)">修改</el-button>
            <el-button type="text" v-on:click="deleteDetails(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type='flex' justify="center">
        <el-col :span="12">
          <div class="block">
            <span class="demonstration"></span>
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="page"
              :page-size="size"
              layout="prev, pager, next"
              :total="data.countSize">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
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
    size: 10,
    page: 1,
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
      this.page = val
      this.searchList()
    },
    searchList (type) {
      this.loading = true
      var that = this
      if (type === 1) {
        this.page = 1
      }
      // that.$axios.post('/shop/Appraise/queryAll?p=' + page + '&c=' + that.size, params).then((res) => {
      that.$axios.get('/base/find/business/form?p=' + this.page + '&c=' + this.size).then(res => {
        that.loading = false
        that.data = res
      }).catch(function (eMsg) {
        that.loading = false
        that.showAlert(eMsg)
      })
    },
    // 查看详情
    deleteDetails (id) {
      // this.$router.push('/dataDicionary/brand/details/' + id)
      this.$axios.get('/base/remove/business/form/' + id).then(res => {
        if (res === 'OK') {
          this.$alert('删除成功!','提示',{
            type:'success'
          }).then(res => {
            this.searchList(1)
          })
        }
      }).catch(err => {
        console.log(err)
        this.showAlert(err)
      })
    },
    editDetails (id) {
      // this.$router.push('/projecManage/edit/' + id)

    },
    addDetail(){
      this.$prompt('请输入业态名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^.{0,20}$/,
          inputErrorMessage: '名称长度不得超过20个字'
        }).then(val => {
          if (val.value === null  || val.value.replace(/\s/g,'') === '') {
            this.$alert('请不要输入空字符','提示',{
              type:'error'
            })
          } else {
            this.$axios.get('/base/save/business/form/' + val.value.replace(/\s/g,'')).then(res => {
              console.log(res)
              if (res === 'OK') {
                this.$alert('添加成功','提示',{
                  type:'success'
                }).then(res => {
                  this.searchList(1)
                })
              }
            }).catch (err => {
              this.$alert(err,'提示',{
                  type:'error'
                })
            })
          }
        })
    },

  }
}
</script>
<style scoped  lang="less">
  .mainContent{
    width: 100%;
    height: 150%;
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
    width: 66%;
    max-width: 100%;
    font-size: 14px;
    color: #606266;
    margin: 0 auto;
  }
  .block{
    float: right;
  }
</style>
