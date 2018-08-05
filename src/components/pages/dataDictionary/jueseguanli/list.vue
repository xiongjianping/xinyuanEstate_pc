<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <el-form label-width="100px" :model="searchForm">



        <el-col :span="24" class="text-center">
          <el-form-item label-width="0">
            <el-button type="primary" size="medium" v-on:click="createPerson">创建角色</el-button>
            <!-- <el-button type="primary" size="medium" v-on:click="searchList();">删除角色</el-button> -->
            <!--<el-button type="primary" size="medium" v-on:click="resetForm();">新增公司</el-button>-->
            <!--<el-button type="primary" size="medium" v-on:click="editDetails();">新增项目</el-button>-->
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div class="listCont">
      <el-table :data="jueseList" border size="medium" :header-cell-style="rowClass">
        <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>
        <el-table-column align="center" prop="name" label="角色名称" ></el-table-column>
        <!-- <el-table-column align="center" prop="createUser" label="创建人"></el-table-column> -->
        <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
        <!-- <el-table-column align="center" prop="modifyUser" label="修改人"></el-table-column> -->
        <el-table-column align="center" prop="modifyTime" label="修改时间"></el-table-column>
        <el-table-column align="center"  label="操作" width="250">
          <template slot-scope="scope" >
            <el-button type="text" v-on:click="setPermission(scope.row.id)">设置功能权限</el-button>
            <!-- <el-button type="text" v-on:click="editDetails(scope.row.id)">角色分配</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="设置权限"
      :visible="quanxianVisible"
      :modal=false
      width="50%">
      <div class="tree-wrapper">
        <el-tree
          :data="allMenuTree"
          show-checkbox
          node-key="id"
          :default-expanded-keys="hasPermissionIdArray"
          :props="menuTreeOptions"
          ref="permissionTree"
          >
        </el-tree>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="quanxianVisible = false">取 消</el-button>
        <el-button type="primary" @click="finishPermission">确 定</el-button>
      </span>
    </el-dialog>
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
    dialogFormVisible: false,
    dialogVisible: false,
    pictureList: [],
    picIndex: 0,
    jueseList: [],
    allMenuTree: [],
    hasPermissionIdArray: [],
    menuTreeOptions:{
      children: 'childMenus',
      label: 'name',
      id: 'id'
    },
    quanxianVisible: false,
    currentId: ''
  }),
  created () {
    this.searchList()
    this.getAllMenuList()
  },
  methods: {
    searchList () {
      this.loading = true
      // that.$axios.post('/shop/Appraise/queryAll?p=' + page + '&c=' + that.size, params).then((res) => {
      this.$axios.get('/permission/role/all').then(res => {
        this.loading = false
        // console.log(res)
        this.jueseList = res
      }).catch(eMsg => {
        this.loading = false
        this.showAlert(eMsg)
      })
    },
    getAllMenuList () {
      this.$axios.get('/permission/menu/all')
        .then(res => {
          // console.log(res)
          this.allMenuTree = this.deepClone(res)
        })
    },
    setPermission (id) {
      this.currentId = id
      this.$axios.get('/permission/role/menu/' + id)
        .then(res => {
          // console.log(res)
          this.hasPermissionIdArray = []
          this.deepClone(res[0].menuTree)
          // console.log(this.hasPermissionIdArray)
          this.quanxianVisible = true
          this.$nextTick(() => {
            this.$refs.permissionTree.setCheckedKeys(this.hasPermissionIdArray)
          })


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
            if (key === 'id') {
              this.hasPermissionIdArray.push(data[key])
            }
            obj[key] = this.deepClone(data[key])
          }
      }
      return obj
    },
    createPerson () {
      this.$prompt('请输入角色名称', '提示', {
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
            this.$axios.get('/permission/save/role/' + val.value.replace(/\s/g,'')).then(res => {
              console.log(res)
              if (res === 'OK') {
                this.$alert('添加成功','提示',{
                  type:'success'
                }).then(res => {
                  this.searchList()
                })
              }
            }).catch (err => {
              this.$alert(err,'提示',{
                  type:'error'
                })
            })
          }
        })
      //this.$axios.get('/permission/save/role/')
    },
    finishPermission () {
      this.getCheckedKeys();
      let params = {
        roleMenus:[
          {
            roleId: this.currentId,
            menuIds:this.$refs.permissionTree.getCheckedKeys()
          }
        ]
      }
      this.$axios.post('permission/conf/role/menu',params)
        .then(res => {
          console.log(res)
          if (res === 'OK') {
            this.$alert('添加成功','提示',{
              type:'success'
            }).then(res => {
              this.quanxianVisible = false
              this.searchList()
            })
          }
        })
        .catch(err => {
          this.quanxianVisible = false
          this.showAlert(err)
        })
    },
    getCheckedKeys() {
      console.log(this.$refs.permissionTree.getCheckedKeys());
    },
    // 查看详情
    showDetails (id) {
      this.$router.push('/dataDicionary/brand/details/' + id)
    },
    editDetails (id) {
      this.$router.push('/projecManage/edit/' + id)
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
    position: relative;
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 60%;
    max-width: 100%;
    font-size: 14px;
    color: #606266;
    margin: 0 auto;
  }
  .block{
    float: right;
  }
  .tree-wrapper{
    height: 500px;
    overflow: auto;
  }
</style>
