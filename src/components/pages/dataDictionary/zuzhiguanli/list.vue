<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">

    <div class="left">
      <el-tree :data="comTree" :props="comTreeOptions" @node-click="handleNodeClick"></el-tree>
    </div>
    <div class="listCont">

      <el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">

        <el-table-column align="center" type="index" label="排序号" ></el-table-column>
        <el-table-column align="center" prop="name" label="真实姓名" ></el-table-column>
        <el-table-column align="center" prop="userName" label="登录名称" ></el-table-column>
        <el-table-column align="center" prop="email" label="电子邮箱"></el-table-column>
        <el-table-column align="center" prop="phone" label="移动电话"></el-table-column>
        <el-table-column align="center" prop="stateStr" label="状态">
          <!-- <template slot-scope="scope">
            <el-button disabled  size="small" type="success" v-if="scope.row.status === 'ENABLED'">0</el-button>
            <el-button disabled  size="small" type="danger" v-if="scope.row.status === 'DISABLED'">1</el-button>
          </template> -->
        </el-table-column>
      </el-table>
      <el-row type='flex' justify="center" v-if="data.resultList">
        <el-col :span="16">
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
    infoData: {},
    size: 10,
    page:1,
    dialogFormVisible: false,
    dialogVisible: false,
    pictureList: [],
    picIndex: 0,
    comTree: [],
    comTreeOptions: {
      children: 'childTree',
      label: 'name'
    },
    currentCompanyId: ''
  }),
  created () {
    // this.searchList(1)
    this.handleComTree()
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
      if (type === 1) {
        this.page = 1
      }
      // that.$axios.post('/shop/Appraise/queryAll?p=' + page + '&c=' + that.size, params).then((res) => {
      this.$axios.get('tissue/find/employee/by/org/' + this.currentCompanyId + '?p=' + this.page + '&c=' + this.size).then((res) => {
        this.loading = false
        this.data = res
        res.resultList.forEach(element => {
          if (element.state) {
            element.stateStr = '已启用'
          } else {
            element.stateStr = '已禁用'
          }
        })
        console.log(res)
      }).catch(eMsg => {
        this.loading = false
        this.showAlert(eMsg)
      })
    },
    // 查看详情
    showDetails (id) {
      this.$router.push('/dataDicionary/brand/details/' + id)
    },
    editDetails (id) {
      this.$router.push('/projecManage/edit/' + id)
    },

    handleComTree () {
      this.$axios.get('/region/find/org/tree')
        .then(res => {
          this.comTree = res;
          // this.comTree = this.deepClone(res);
          // console.log(this.comTree)
        })
    },
    getType(obj){
       //tostring会返回对应不同的标签的构造函数
       var toString = Object.prototype.toString;
       var map = {
          '[object Boolean]'  : 'boolean',
          '[object Number]'   : 'number',
          '[object String]'   : 'string',
          '[object Function]' : 'function',
          '[object Array]'    : 'array',
          '[object Date]'     : 'date',
          '[object RegExp]'   : 'regExp',
          '[object Undefined]': 'undefined',
          '[object Null]'     : 'null',
          '[object Object]'   : 'object'
      };
      if(obj instanceof Element) {
          return 'element'
      }
      return map[toString.call(obj)]
    },
    deepClone(data){
      let type = this.getType(data)
      let obj
      if(type === 'array'){
          obj = []
      } else if(type === 'object'){
          obj = {}
      } else {
          //不再具有下一层次
          return data
      }
      if(type === 'array'){
          for(let i = 0, len = data.length; i < len; i++){
              obj.push(this.deepClone(data[i]))
          }
      } else if(type === 'object'){
          for(let key in data){
            if (key === 'name') {
              obj['label'] = this.deepClone(data[key])
            } else if (key === 'childTree') {
              obj['children'] = this.deepClone(data[key])
            } else {
              obj[key] = this.deepClone(data[key])
            }
          }
      }
      return obj
    },
    handleNodeClick (data) {
      console.log(data)
      this.currentCompanyId = data.id
      this.searchList(1)
      // this.$axios.get('tissue/find/employee/by/org/' + data.id + '?p=' + '1' + '&c=10')
      //   .then(res => {
      //     console.log(res)
      //   })
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
  .mainContent{
    width: 100%;
    height: 150%;
    background: #fff;
  }
  .left{
    width: 400px;
    height: 600px;
    overflow-x: hidden;
    overflow-y: auto;
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
