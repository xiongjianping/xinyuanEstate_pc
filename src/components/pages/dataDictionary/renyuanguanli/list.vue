<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <h3 id="title">人员管理</h3><br>
      <el-form label-width="100px" :model="searchForm">
        <el-col :span="5">
          <el-form-item label="真实姓名">
            <el-input size="small" v-model="searchForm.name" :maxlength="11" placeholder=""></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="用户名">
            <el-input size="small" v-model="searchForm.userName" :maxlength="11" placeholder=""></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="24" class="text-center">
          <el-form-item label-width="0">
            <el-button type="primary" size="medium" v-on:click="searchList(1);">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <p class="t"></p>
    <div class="biaoti1">人员管理列表</div>
    <div class="listCont">
      <el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">
        <el-table-column align="center" type="index" label="序号"></el-table-column>
        <el-table-column align="center" prop="name" label="姓名"></el-table-column>
        <el-table-column align="center" prop="userName" label="用户名"></el-table-column>
        <el-table-column align="center" prop="phone" label="联系电话"></el-table-column>
        <el-table-column align="center" prop="email" label="邮箱"></el-table-column>
        <el-table-column align="center" prop="stateStr" label="状态" ></el-table-column>
        <el-table-column align="center"  label="操作">
          <template slot-scope="scope">
            <el-button type="text"  @click="alertshujuDialog(scope.row.id)">数据权限分配</el-button>
            <el-button type="text"  @click="alertjueseDialog(scope.row.id)">角色权限分配</el-button>
            <el-button type="text" v-if="scope.row.state" @click="disableDetails(scope.row.id, false)">禁用</el-button>
            <el-button type="text" v-else @click="disableDetails(scope.row.id, true)">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type='flex' justify="center">
        <el-col :span="24">
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
      <el-dialog
        title="数据权限分配"
        :visible.sync="shujuVisible"
        :modal=false
        width="60%">
         <ul>
          <li v-for="shuju in shujuAll" >
            <input type="checkbox" :checked='shuju.checked' @click="clickShuju(shuju)"/> <span>{{ shuju.name }}</span>
          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="shujuVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateshuju">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="角色权限分配"
        :visible="jueseVisible"
        :modal=false
        width="60%">
        <ul>
          <li v-for="juese in jueseAll" >
            <input type="checkbox" :checked='juese.checked' @click="clickJuese(juese)"/> <span>{{ juese.name }}</span>
          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="jueseVisible = false">取 消</el-button>
          <el-button type="primary" @click="updatejuese">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data: () => ({
    data: {},
    loading: false,
    searchForm: {},
    infoData: {},
    size: 10,
    page: 1,
    dialogFormVisible: false,
    dialogVisible: false,
    pictureList: [],
    picIndex: 0,
    shujuVisible: false,
    jueseVisible: false,
    jueseAll:[],
    jueseCurrent:[],
    shujuAll:[],
    shujuCurrent:[],
    currentId: ''
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
      let params = {}
      if (this.searchForm.name && this.searchForm.name.replace(/\s/g, '')){
        params.name = this.searchForm.name.replace(/\s/g, '')
      }
      if (this.searchForm.userName && this.searchForm.userName.replace(/\s/g, '')){
        params.userName = this.searchForm.userName.replace(/\s/g, '')
      }
      if (type === 1) {
        this.page = 1
      }
      // that.$axios.post('/shop/Appraise/queryAll?p=' + page + '&c=' + that.size, params).then((res) => {
      this.$axios.post('/tissue/find/employee/list?p=' + this.page + '&c=' + this.size, params).then((res) => {
        this.loading = false
        res.resultList.forEach(element => {
          if (element.state) {
            element.stateStr = '已启用'
          } else {
            element.stateStr = '已禁用'
          }
        })
        console.log(res)
        this.data = res
      }).catch((eMsg) => {
        this.loading = false
        this.showAlert(eMsg)
      })
    },
    // 查看详情
    showDetails (id) {
      this.$router.push('/dataDicionary/brand/details/' + id)
    },
    disableDetails (id, state) {
      this.$axios.post('/tissue/state/employee',{
        id,
        state
      })
        .then(res => {
          console.log(res)
          if (res === 'OK') {
            if (state) {
              this.$alert('启用成功！')
                .then(res => {
                  this.searchList()
                })
            } else {
              this.$alert('禁用成功！')
              .then(res => {
                  this.searchList()
                })
            }
          } else {
            this.$alert(res)
          }
        })
    },
    alertshujuDialog (id) {
      this.currentId = id
      let p1 = this.$axios.get('/region/find/project/all')
      let p2 = this.$axios.get('/tissue/find/employee/project/data/' + id)

      Promise.all([p1, p2]).then((res) => {
        let shujuAll = this.deepClone(res[0])
        let shujuCurrent = this.deepClone(res[1])
          shujuAll.forEach(ele => {
            try{
              shujuCurrent.forEach(el => {
                if (ele.id == el.id) {
                  ele.checked = true
                  throw new Error('breakException')
                }
              })
            } catch (e) {}
          })
          console.log('geng')
          this.shujuAll = shujuAll
          this.shujuCurrent = shujuCurrent
          console.log('shujuall', shujuAll)
          console.log('shujurole', shujuCurrent)
          this.shujuVisible = true
      })
    },
    alertjueseDialog (id) {
      this.currentId = id
      let p1 = this.$axios.get('/permission/role/all')
      let p2 = this.$axios.get('/permission/employee/role/by' + id)

      Promise.all([p1, p2]).then((res) => {
        let jueseAll = this.deepClone(res[0])
        let jueseCurrent = this.deepClone(res[1])
          jueseAll.forEach(ele => {
            try{
              jueseCurrent.forEach(el => {
                if (ele.id == el.id) {
                  ele.checked = true
                  throw new Error('breakException')
                }
              })
            } catch (e) {}
          })
          console.log('geng')
          this.jueseAll = jueseAll
          this.jueseCurrent = jueseCurrent
          console.log('all', jueseAll)
          console.log('role', jueseCurrent)
          this.jueseVisible = true
      })

    },
    clickJuese (item) {
      item.checked = !item.checked
    },
    clickShuju (item) {
      item.checked = !item.checked
    },
    updatejuese () {
      console.log(this.jueseAll)
      let roleIds = []
      this.jueseAll.forEach(item => {
        if (item.checked) {
          roleIds.push(item.id)
        }
      })
      this.$axios.post('/tissue/conf/employee/role',{
        employeeId: this.currentId,
        roleIds
      })
        .then(res => {
          if (res === 'OK') {
            this.$alert('分配成功！')
              .then(acticon => {
                this.jueseVisible = false
              })
          }
        }).catch(err => {
          this.$alert(err)
          .then(acticon => {
                this.jueseVisible = false
              })
        })
    },
    updateshuju () {
      let projectIds = []
      this.shujuAll.forEach(item => {
        if (item.checked) {
          projectIds.push(item.id)
        }
      })
      this.$axios.post('/tissue/edit/employee/project/data',{
        employeeId: this.currentId,
        projectIds
      })
        .then(res => {
          if (res === 'OK') {
            this.$alert('分配成功！')
            .then(acticon => {
                this.shujuVisible = false
              })
          }
        })
        .catch(err => {
          this.$alert(err)
          .then(acticon => {
                this.shujuVisible = false
              })
        })
    },
    editDetails (id) {
      this.$router.push('/projecManage/edit/' + id)
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
            obj[key] = this.deepClone(data[key])
          }
      }
      return obj
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
    // height: 150%;
    background: #fff;
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
  // max-width: 100%;
  font-size: 14px;
  color: #606266;
  margin: 0 auto;
}
.el-dialog{
  ul{
    li{
      margin: 10px 0 0 30px;
      span{
        &.active{
          color: #E8CA8A;
        }
      }
    }
  }
}
  .block{
    float: right;
    margin-top: 10px;
  }
</style>
