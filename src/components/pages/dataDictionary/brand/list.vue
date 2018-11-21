<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <h3 id="title">业态管理</h3><br>
      <el-form label-width="100px" :model="searchForm">
      </el-form>
    </el-row>

    <el-dialog title="修改" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="业态名称">
          <el-input v-model="changedName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editName()">确 定</el-button>
      </div>
    </el-dialog>

    <div class="buttonList">
      <el-button type="primary" class="ml10" size="medium" v-on:click="addDetail">新增</el-button>
    </div>

    <p class="t"></p>
    <div class="biaoti1">业态管理列表</div>
    <div class="listCont">
      <el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">
        <el-table-column type="index" align="center" width="50" label="序号" :index="indexMethod"></el-table-column>
        <el-table-column align="center" prop="name" label="业态"></el-table-column>
        <el-table-column align="center" prop="modifyTime" label="修改时间"></el-table-column>
        <el-table-column align="center"  label="操作">
          <template slot-scope="scope">
            <el-button type="text" v-on:click="editDetails(scope.row.id)">修改</el-button>
            <el-button type="text" v-on:click="deleteDetails(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="paginationCont" v-if="data.countSize">
          <el-pagination
              @current-change="handleCurrentChange"
              :current-page="page"
              :page-size="size"
              layout="prev, pager, next"
              :total="data.countSize">
            </el-pagination>
        </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data: () => ({
    changedId: '',
    changedName: '',
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
    indexMethod(index) {
      return (this.page-1)*10+index + 1;
    },
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
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      this.loading = true
      this.$axios.get('/base/remove/business/form/' + id).then(res => {
        this.loading = false
        if (res === 'OK') {
          this.$alert('删除成功!','提示',{
            type:'success'
          }).then(res => {
            this.searchList(1)
          })
        }
      }).catch(err => {
        this.loading = false
        this.showAlert(err)
      })
      }).catch(() => {

      })
    },
    editDetails (id) {
      this.dialogFormVisible = true
      this.changedId = id
    },
    editName(){
      var params = {
        id: this.changedId,
        name: this.changedName
      }
      this.$axios.post('/base/edit/business/form', params).then((res) => {
        this.dialogFormVisible = false
        this.changedName = ''
        this.showAlert('修改成功')
        this.searchList(1)
      }, (err) => {this.showAlert(err)})
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
    rowClass({ row, rowIndex}) {
      console.log(rowIndex) //表头行标号为0
      return 'height:50px;font-size:15px'
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
  th{
    height: 50px;
  }
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 30%;
}

.el-table{
  width: 100%;
  position: relative;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  // width: 66%;
  max-width: 100%;
  font-size: 14px;
  color: #606266;
  margin: 0 auto;
}
  .block{
    float: right;
  }
</style>
