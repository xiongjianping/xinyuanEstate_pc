<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <h3 id="title">业种管理</h3><br>
      <el-form label-width="100px" :model="searchForm">
      </el-form>
    </el-row>

    <div class="buttonList">
      <el-button type="primary" class="ml10" size="medium" v-on:click="addDetail">新增</el-button>
    </div>

    <p class="t"></p>
    <div class="biaoti1">业种管理列表</div>
    <div class="listCont">
      <el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">
        <el-table-column align="center" type="index" prop="id" label="序号"></el-table-column>
        <el-table-column align="center" prop="businessFormName" label="业态"></el-table-column>
        <el-table-column align="center" prop="name" label="业种"></el-table-column>
        <el-table-column align="center" prop="modifyTime" label="修改时间"></el-table-column>
        <el-table-column align="center"  label="操作">
          <template slot-scope="scope">
            <el-button type="text" v-on:click="editDetails(scope.row.id)">修改</el-button>
            <el-button type="text" v-on:click="deleteDetails(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="paginationCont">
          <el-pagination
              @current-change="handleCurrentChange"
              :current-page="data.page"
              :page-size="size"
              layout="prev, pager, next"
              :total="data.countSize">
            </el-pagination>
        </div>
    </div>

    <el-dialog
      title="新增业种"
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

      <div class="content-input">
        <el-input v-model="addContent" maxlength='20' placeholder="请输入内容"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="yetaiVisible = false">取 消</el-button>
        <el-button type="primary" @click="addYezhong">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改"
      :visible="dialogFormVisible"
      width="40%"
      :modal=false
      :show-close=false>
      <el-select
        v-model="newCompany.businessFormId"
        placeholder="请选择业态">
        <el-option
          v-for="item in yetaiList"
          :key="item.value"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>

      <div class="content-input">
        <el-input v-model="newCompany.name" maxlength='20' placeholder="请输入名称"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editYezhong">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data: () => ({
    newCompany:{},
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
      }
    ],
    addContent: ''
  }),
  created () {
    this.searchList(1)
    this.$axios.get('/base/find/business/form/select').then(res => {
      this.yetaiList = res;
    })
  },
  methods: {
    addYezhong () {
      if (this.yetaiSelect === '') {
        this.$alert('请选择业态名称')
      } else if (this.addContent.replace(/\s/g,'') === '') {
        this.$alert('请输入业种名称')
      } else {
        this.$axios.post('base/save/business/species',{
          businessFormId: this.yetaiSelect,
          name: this.addContent.replace(/\s/g,'')
        }).then(res => {
          if (res === 'OK') {
            this.$alert('添加成功').then(action => {
              this.searchList(1)
            })
          } else {
            this.$alert(res)
          }
          this.yetaiVisible = false;
        }).catch(err => {
          this.$alert(err)
        })
      }
    },
    editYezhong(){
      this.$axios.post('/base/edit/business/species', this.newCompany).then((res) => {
        this.newCompany = {}
        this.dialogFormVisible = false
        this.showAlert('修改成功')
        this.searchList(1)
      }, (err) => {this.showAlert(err)})
    },
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
    deleteDetails (id) {
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      this.loading = true
      this.$axios.get('/base/remove/business/species/' + id).then(res => {
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
    // 查看详情
    showDetails (id) {
      this.dialogFormVisible = true
    },
    editDetails (id) {
      this.newCompany.id = id
      this.dialogFormVisible = true
    },
    addDetail () {
      this.yetaiVisible = true;
      this.yetaiSelect = ''
      this.addContent = ''

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
<style  lang="less">
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
    // width: 50%;
    max-width: 100%;
    font-size: 14px;
    color: #606266;
    margin: 0 auto;
  }
  .block{
    float: right;
  }
  .el-dialog .content-input{
    width: 60%;
    display: inline-block;
  }
</style>
