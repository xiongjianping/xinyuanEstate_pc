<template>
  <!--新增项目-->
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <h3 id="title">基本信息</h3><br>
      <el-form label-width="100px" :model="searchForm">
        <el-col :span="6">
          <el-form-item label="区域">
            <el-select size="small" v-model="searchForm.areaId" placeholder="请选择区域">
              <el-option v-for="(item,index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <!--<el-col :span="6">-->

          <!--<el-form-item label="公司">-->
            <!--<el-button size="medium" class="company"  @click="handleComTree()">{{companyName}}</el-button>-->

            <!--&lt;!&ndash;<el-input size="small" type="button" class="company" @focus="handleComTree()" v-model="companyName">&ndash;&gt;-->
            <!--&lt;!&ndash;</el-input>&ndash;&gt;-->
          <!--</el-form-item>-->
          <!--<el-dialog title="公司列表" :visible.sync="dialogTreeVisible">-->
            <!--<el-tree :data="comTree" :props="comTreeOptions" @node-click="handleNodeClick" v-model="searchForm.companyId" ></el-tree>-->

          <!--</el-dialog>-->
        <!--</el-col>-->

        <el-col :span="6">
          <el-form-item label="公司">
            <el-select size="small" v-model="searchForm.companyId" placeholder="请选择公司" @change="getDepartment()">
              <el-option v-for="(item,index) in companyList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6" >
          <el-form-item label="部门">
            <el-select size="small" v-model="departmentId" placeholder="请选择部门" @change="getPerson()">
              <el-option v-for="(item,index) in departmentList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="状态">
            <el-select size="small" v-model="searchForm.state" placeholder="请选择状态">
              <el-option label="启用" value="true"></el-option>
              <el-option label="禁用" value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <!--<el-col :span="6">-->
          <!--<el-form-item label="运营负责人">-->
            <!--<el-select size="small" v-model="projectHeadId" placeholder="请选择负责人">-->
              <!--<el-option v-for="(item,index) in projectHeadList" :key="index" :label="item.name" :value="item.id"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->

        <el-col :span="6">
          <el-form-item label="项目">
            <el-input size="small" v-model="searchForm.name" :maxlength="11" placeholder="请输入项目名称"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="面积/平">
            <el-input type="number" size="small" v-model="searchForm.acreage" :maxlength="11" placeholder="请输入面积"></el-input>
          </el-form-item>
        </el-col>

      <!--<el-col class="uploadFiles mt40">-->
        <!--<el-upload :action="getUploadUrl()"-->
                  <!--list-type="picture-card"-->
                  <!--:limit=6-->
                  <!--:on-preview="handlePictureCardPreview"-->
                  <!--:on-success="handleSuccess"-->
                  <!--:on-remove="handleRemove">-->
                  <!--<i class="el-icon-plus"></i>-->
        <!--</el-upload>-->
        <!--<el-dialog :visible.sync="dialogVisible">-->
          <!--<img width="100%" :src="dialogImageUrl" alt="">-->
        <!--</el-dialog>-->
      <!--</el-col>-->
      </el-form>
    </el-row>

    <div class="buttonlist mt100">
      <el-button type="primary" size="medium" class="mr10" @click="goBack()">取消</el-button>
      <el-button type="primary" size="medium" @click="create()">确定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    loading: false,
    searchForm: {
      // projectImages: []
    },
    dialogImageUrl: '',
    dialogVisible: false,
    dialogTreeVisible:false,
    areaList: [],
    companyList: [],
    departmentList: [],
    projectHeadList: [],
    pictureList: [],
    departmentId:'',
    projectHeadId:'',
    uploadFileUrl: window.$baseUrl,
    comTree: [],
    comTreeOptions: {
        children: 'childTree',
        label: 'name'
    },
    currentCompanyId: '',
    companyName: '请选择公司'
  }),
  created () {
    window.$getAreaList().then((res) => {
      this.areaList = res
    }, (err) => {
      this.showAlert(res)
    })

    window.$getCompanyAll().then((res) => {
      this.companyList = res
    }, (err) => {
      this.showAlert(res)
    })
  },
  methods: {
    // getUploadUrl(){
    //   return window.$baseUrl + '/file/upload/localhost'
    // },
    // handleSuccess(file){
    //   this.searchForm.projectImages.push(file.data)
    // },
    // handlePictureCardPreview(file){
    //   this.dialogImageUrl = file.url
    //   this.dialogVisible = true
    // },
    // handleRemove(file, fileList) {
    //   for(var i = this.searchForm.projectImages.length - 1; i >= 0; i--){
    //     if(this.searchForm.projectImages[i] === file.response.data){
    //       console.log(i)
    //       this.searchForm.projectImages.splice(i, 1)
    //     }
    //   }
    // },
    // getType(obj){
    //   //tostring会返回对应不同的标签的构造函数
    //   var toString = Object.prototype.toString;
    //   var map = {
    //     '[object Boolean]'  : 'boolean',
    //     '[object Number]'   : 'number',
    //     '[object String]'   : 'string',
    //     '[object Function]' : 'function',
    //     '[object Array]'    : 'array',
    //     '[object Date]'     : 'date',
    //     '[object RegExp]'   : 'regExp',
    //     '[object Undefined]': 'undefined',
    //     '[object Null]'     : 'null',
    //     '[object Object]'   : 'object'
    //   };
    //   if(obj instanceof Element) {
    //     return 'element'
    //   }
    //   return map[toString.call(obj)]
    // },
    // deepClone(data){
    //   let type = this.getType(data)
    //   let obj
    //   if(type === 'array'){
    //     obj = []
    //   } else if(type === 'object'){
    //     obj = {}
    //   } else {
    //     //不再具有下一层次
    //     return data
    //   }
    //   if(type === 'array'){
    //     for(let i = 0, len = data.length; i < len; i++){
    //       obj.push(this.deepClone(data[i]))
    //     }
    //   } else if(type === 'object'){
    //     for(let key in data){
    //       if (key === 'name') {
    //         obj['label'] = this.deepClone(data[key])
    //       } else if (key === 'childTree') {
    //         obj['children'] = this.deepClone(data[key])
    //       } else {
    //         obj[key] = this.deepClone(data[key])
    //       }
    //     }
    //   }
    //   return obj
    // },
    // handleComTree(){
    //   // this.dialogVisible = true
    //   this.$axios.get('/region/find/org/tree')
    //     .then(res => {
    //       this.dialogTreeVisible = true;
    //       this.comTree = res;
    //       // this.comTree = this.deepClone(res);
    //       // console.log(this.comTree)
    //     })
    // },
    // handleNodeClick (data) {
    //   // alert(1)
    //   this.searchForm.companyId =  data.id;
    //   this.companyName =  data.name;
    //   this.dialogTreeVisible = false;
    // },
    getDepartment(){
      this.departmentId = ''
      // this.projectHeadId = ''
      window.$getDepartments(this.searchForm.companyId).then((res) => {
        this.departmentList = res
        console.log(res)
      }, (err) => {
        this.showAlert(err)
      })
    },
    getPerson(){
      // this.projectHeadId = ''
      window.$getPersion(this.companyId).then((res) => {
        this.projectHeadList = res
        console.log(res)
      }, (err) => {
        this.showAlert(err)
      })
    },
    // deleteImg(){
    //   for(var i = this.searchForm.projectImages.length - 1; i >= 0; i--){
    //     this.searchForm.projectImages.slice(i, 1)
    //   }
    // },
    create(){
      this.loading = true
      // this.searchForm.projectHeadId = this.projectHeadId
      window.$createProject(this.searchForm).then((res) => {
        this.loading = false
        this.searchForm = {}
        this.showAlert('创建成功')
        this.goBack()
      }, (err) => {
        this.loading = false
        this.showAlert(err)
      })
    },
    goBack(){
      this.$router.back(-1)
    },
    showAlert(cont) {
      this.$alert(cont, '温馨提示', {
        confirmButtonText: '确定'
      })
    }
  }
}
</script>
<style scoped  lang="less">
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}
  .el-col-10 {
    width: 41.66667%;
    margin-top: 45px;
  }
  .el-form-item{
    margin-bottom: 10px;
    margin-top: 10px;
    margin-left: 52px;
    .company{
      width: 132px;
      border-radius: 10px;
      color: #bbb;
      &:hover,&:focus{
        background: #fff;
      }
    }
  }
  .el-form-item__label {
    text-align: right;
    float: left;
    font-size: 17px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  el-button{
    background: rgb(22,155,213);
  }

  .xxk{
    width: 100%;
    height: 100px;
    button{
      width: 100px;
      height: 50px;
      display: inline-block;
      border-radius: 10px;
      background: rgb(22,155, 213);
      outline:medium;
      outline: none;
      position: relative;
      left:500px;
      top: 50px;
      margin-left: 20px;
    }
  }
  .uploadFiles{
    width: 100%
  }

  .img{
    width: 100px;
    height: 100px;
  }

  .buttonlist{
    width:200px;
    margin: 100px auto 0 auto;
  }

</style>
