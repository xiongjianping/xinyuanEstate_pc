<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <h3 id="title">区间设置</h3><br>
      <el-form label-width="100px" :model="searchForm">
        <el-row>
        <el-col :span="5">
          <el-form-item label="对象" :label-width="formLabelWidth">
            <el-select  size="small" v-model="objType" placeholder="项目">
              <el-option v-for="(item, index) in objTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="区域" :label-width="formLabelWidth">
            <el-select  size="small" v-model="searchForm.areaId" placeholder="请选择区域" @change="areaChanged()">
              <el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="项目" :label-width="formLabelWidth">
            <el-select  size="small" v-model="searchForm.projectId" placeholder="请选择项目" @change="projectChanged()">
              <el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <!--<el-form-item label="楼栋" v-if="different === 2">-->
          <el-form-item label="楼栋" style="display: none;">
            <!--<el-select v-model="searchForm.buildingId" placeholder="请选择楼栋" @change="buildingChanged()">-->
            <el-select v-model="searchForm.buildingId" placeholder="请选择楼栋" @change="buildingChanged()">
              <el-option v-for="(item, index) in buildingList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="楼层" :label-width="formLabelWidth">
            <!--<el-select  size="small" v-model="searchForm.searchFloorId"  placeholder="请选择楼层"  @change="floorChange()">-->
              <el-select  size="small" v-model="floorId"  placeholder="请选择楼层"  @change="floorChange()">
              <el-option v-for="(item1, index) in floorList" :key="index" :label="item1.name" :value="item1.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="业态" :label-width="formLabelWidth">
            <el-select  size="small" v-model="searchForm.businessFormId" placeholder="请选择业态" @change="businessChanged()">
              <el-option v-for="(item, index) in businessList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="业种" :label-width="formLabelWidth">
            <el-select size="small" v-model="businessSpeciesId" placeholder="请选择业种" @change="speciesChanged()">
              <el-option v-for="(item, index) in speciesList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      </el-form>
    </el-row>

    <div class="buttonList">
      <el-button type="primary" class="mr10 ml10" size="medium" v-on:click="searchList(1);">搜索</el-button>
      <el-button type="primary" class="ml10" size="medium" v-on:click="showCreateSection()">新增</el-button>
    </div>

    <el-dialog class="RentingRate" title="客销度区间设置" :visible="dialogFormVisible" @close='closeDialog'>
      <el-form class="yzl-line-top"></el-form>
      <el-form :model="guestForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="对象" :label-width="formLabelWidth">
              <el-select  size="small" v-model="objType" placeholder="请选择对象维度">
                <el-option v-for="(item, index) in objTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col  :span="8">
            <el-form-item label="区域" :label-width="formLabelWidth">
              <el-select  size="small" v-model="guestForm.areaId" placeholder="全部区域" @change="areaChanged()">
                <el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col  :span="8" >
            <el-form-item label="项目" :label-width="formLabelWidth">
              <el-select  size="small" v-model="guestForm.projectId" placeholder="请选择项目" @change="projectChanged()">
                <el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="楼栋" v-if="different === 2">
              <el-select v-model="guestForm.buildingId" placeholder="请选择楼栋" @change="buildingChanged()">
                <el-option v-for="(item, index) in buildingList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="8" >
            <el-form-item label="楼层" :label-width="formLabelWidth">
              <el-select  size="small"  v-model="guestForm.floorId"  placeholder="请选择楼层" >
                <el-option v-for="(item, index) in floorList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业态" :label-width="formLabelWidth">
              <el-select  size="small" v-model="guestForm.businessFormId" placeholder="请选择业态" @change="businessChanged()">
                <el-option v-for="(item, index) in businessList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业种" :label-width="formLabelWidth">
              <!--<el-select  size="small" v-model="guestForm.businessSpeciesId" placeholder="请选择业种" @change="speciesChanged()">-->
              <el-select  size="small" v-model="guestForm.seachBusinessSpeciesId" placeholder="请选择业种" >
                <el-option v-for="(item, index) in speciesList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="合理百分比" :label-width="formLabelWidthQJ">
              <el-input size="small" v-model="guestForm.reasonablePgeVal" :maxlength="11" placeholder=" "></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="提升百分比" :label-width="formLabelWidthQJ">
              <el-input size="small" v-model="guestForm.promotePgeVal" :maxlength="11" placeholder=" "></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="良好百分比" :label-width="formLabelWidthQJ">
              <el-input size="small" v-model="guestForm.goodPgeVal" :maxlength="11" placeholder=" "></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="优秀百分比" :label-width="formLabelWidthQJ">
              <el-input size="small" v-model="guestForm.excellentPgeVal" :maxlength="11" placeholder=" "></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createGuestSection()">保 存</el-button>
      </div>
    </el-dialog>
    <p class="t"></p>
    <div class="biaoti1">区间设置列表</div>

    <div class="listCont">
        <el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">
        <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>
        <el-table-column align="center" prop="projectName" label="项目名称"></el-table-column>
        <el-table-column align="center" prop="floorName" label="楼层"></el-table-column>
       <!-- <el-table-column align="center" prop="projectName" label="品牌名称"></el-table-column>-->
        <el-table-column align="center" prop="formName" label="业态名称"></el-table-column>
        <el-table-column align="center" prop="speciesName" label="业种名称"></el-table-column>
        <el-table-column align="center" prop="excellentPgeVal" label="优秀"></el-table-column>
        <el-table-column align="center" prop="goodPgeVal" label="良好"></el-table-column>
        <el-table-column align="center" prop="promotePgeVal" label="提升"></el-table-column>
        <el-table-column align="center" prop="reasonablePgeVal" label="合格"></el-table-column>
        <!--<el-table-column align="center" prop="ks" label="亏损"></el-table-column>-->
        <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
        <el-table-column align="center" prop="createUser" label="创建人"></el-table-column>
        <el-table-column align="center"  label="操作" width="100">
          <template slot-scope="scope">
          <!--  <el-button type="text" v-on:click="showDetails(scope.row.id)">查看</el-button>-->
            <el-button type="text" v-on:click="deleteTrigonometricGuest(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="paginationCont">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="page"
          layout="prev, pager, next"
          :total="data.count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  //区域id用于区域方法
  var myareaId = '';
  //业态
  var mybusinessFormId = ''
  //业种
  var mybusinessSpeciesId = ''
  //项目
  var myProjectId = ''
import moment from 'moment'
export default {
  data: () => ({
    searchForm: {},
    formLabelWidth: '50px',
    formLabelWidthQJ:'90px',
    different:'',
    dimensionList: window.$dimensionList,
    businessId:'',
    businessList:{},
    speciesList:{},
    areaId:'',
    areaList:{},
    projectList:{},
    buildingList:{},
    buildingId:'',
    floorList:{},
    floorId:'',
    searchFloorId:'',
    bList:{},
    sList:{},
    data: {},
    //品牌签约集合
    brandList:{},
    businessSpeciesId:'',
    seachBusinessSpeciesId:'',
    guestForm:{},//客销度新增数据对象
    //对象
    objTypeList:[
      {
        id: '0',
        name: '项目'
      },
      {
        id: '1',
        name: '楼层'
      },{
        id: '2',
        name: '业态'
      },
      {
        id: '3',
        name: '品牌'
      }],
    objType:'0',
    //品牌级客销度区间设置
    sectionBrand:{
      projectId:'', //项目ID
      buildingId:'', //楼栋ID
      floorId:'', //楼层ID
      formId:'',//业态
      speciesId:'',//业种
      contractId:'',//签约ID
      excellentPgeVal:'',//优秀百分比
      goodPgeVal:'',//良好百分比
      promotePgeVal:'',//提升百分比
      reasonablePgeVal:''//合理百分比
    },
    loading: false,

    infoData: {},
    page: 1,
    size: 10,
    conditionId:'',
    projectId:'',
    dialogFormVisible:false
  }),
  created () {
    window.$getformSelect().then((res) => {
      this.businessList = res
    }, (err) => {})

    console.log("created:"+this.businessList);
    window.$getAreaList().then((res) => {
      this.areaList = res
    }, (err) => {console.log(err)})
    this.searchList(1)

  },
  methods: {
    deleteTrigonometricGuest(id){
      if(this.objType==0){
        this.loading = true
        window.$deleteTrigonometricProjectGuest(id).then((res) => {
          for (var i = this.data.resultList.length - 1; i >= 0; i--) {
            if (this.data.resultList[i].id === id) {
              this.data.resultList.splice(i, 1)
              this.loading = false
              return false
            }
          }
        }, (err) => {
          this.loading = false
          this.showAlert(err)
        })
        this.showAlert('删除区间设置客销度---'+id)
      }else if(this.objType==1){
        this.loading = true
        window.$deleteTrigonometricFloorGuest(id).then((res) => {
          for (var i = this.data.resultList.length - 1; i >= 0; i--) {
            if (this.data.resultList[i].id === id) {
              this.data.resultList.splice(i, 1)
              this.loading = false
              return false
            }
          }
        }, (err) => {
          this.loading = false
          this.showAlert(err)
        })
        this.showAlert('删除区间设置楼层客销度---'+id)
      }
      else if(this.objType==2){
        this.loading = true
        window.$deleteTrigonometricFormGuest(id).then((res) => {
          for (var i = this.data.resultList.length - 1; i >= 0; i--) {
            if (this.data.resultList[i].id === id) {
              this.data.resultList.splice(i, 1)
              this.loading = false
              return false
            }
          }
        }, (err) => {
          this.loading = false
          this.showAlert(err)
        })
        this.showAlert('删除区间设置业态客销度---'+id)
      }else if(this.objType==3){
        this.loading = true
        window.$deleteTrigonometricMajorGuest(id).then((res) => {
          for (var i = this.data.resultList.length - 1; i >= 0; i--) {
            if (this.data.resultList[i].id === id) {
              this.data.resultList.splice(i, 1)
              this.loading = false
              return false
            }
          }
        }, (err) => {
          this.loading = false
          this.showAlert(err)
        })
        this.showAlert('删除区间设置业种客销度---'+id)
      } else if(this.objType==4){
        this.showAlert("无品牌溢租率、无需删除");
      }
    },

    // 业态
    businessChanged(){
      if (this.dialogFormVisible) {
        this.businessSpeciesId = ''
        mybusinessFormId = this.guestForm.businessFormId;
      }else{
        this.searchForm.businessSpeciesId = ''
      //  this.guestForm.speciesList = [];
        this.speciesList = [];
        /* this.brandId = ''*/
        mybusinessFormId = this.searchForm.businessFormId;
      }
      //console.log("businessChanged---"+mybusinessFormId);
      window.$getSpeciesSelect(mybusinessFormId).then((res) => {
        console.log("业态change-----")
        console.log(res)
        this.speciesList = res
      }, (err) => {
        this.showAlert(err)
      })
    },
    //业种
    speciesChanged(){/*
      this.brandList = [];
      this.brandId = '';
      mybusinessSpeciesId = this.searchForm.businessSpeciesId;
      if (this.dialogFormVisible) {
        this.guestForm.brandList = ''
        mybusinessSpeciesId = this.guestForm.businessSpeciesId;
      }
      //获取品牌
      //window.$getBrandForSpecies(mybusinessSpeciesId).then((res) => {
      window.$getcontractIdForSpecies(mybusinessSpeciesId).then((res) => {
        console.log("品牌list")
        console.log(res)
        this.brandList = res
        if (this.dialogFormVisible) {
          //  for()res
          this.guestForm.brandList = res
        }

      }, (err) => {
        this.showAlert(err)
      })*/
    },
    //新增客销度
    createGuestSection(){
      this.sectionBrand.projectId = this.guestForm.projectId //项目ID
      this.sectionBrand.buildingId =this.guestForm.buildingId; //楼栋ID
      this.sectionBrand.excellentPgeVal = this.guestForm.excellentPgeVal //优秀百分比
      this.sectionBrand.goodPgeVal = this.guestForm.goodPgeVal     //良好百分比
      this.sectionBrand.promotePgeVal = this.guestForm.promotePgeVal   //提升百分比
      this.sectionBrand.reasonablePgeVal = this.guestForm.reasonablePgeVal //合理百分比
      console.log("新增客销度----")
      console.log(this.guestForm);
      if(this.objType==0){
      //项目
        window.$createSectionProjectGuestObj(this.sectionBrand).then((res) => {
            console.log(res)
            this.showAlert("新增区间项目客销度成功！")
            this.closeDialog();
          }, (err) => {
            console.log(err)
            this.showAlert(err)
          })
      }else if(this.objType==1){
        this.sectionBrand.floorId = this.guestForm.floorId //楼层ID
        window.$createSectionFloorGuestObj(this.sectionBrand).then((res) => {
          console.log(res)
          this.showAlert("新增区间楼层客销度成功！")
          this.closeDialog();
        }, (err) => {
          console.log(err)
          this.showAlert(err)
        })
      }else if(this.objType==2){
        this.sectionBrand.floorId = this.guestForm.floorId //楼层ID
        this.sectionBrand.formId = this.guestForm.businessFormId//业态
        window.$createSectionFormIdGuestObj(this.sectionBrand).then((res) => {
          console.log(res)
          this.showAlert("新增区间业态客销度成功！")
          this.closeDialog();
        }, (err) => {
          console.log(err)
          this.showAlert(err)
        })
      }else if(this.objType==3){
        this.sectionBrand.floorId = this.guestForm.floorId //楼层ID
        this.sectionBrand.formId = this.guestForm.businessFormId//业态
        this.sectionBrand.speciesId = this.guestForm.businessSpeciesId//业种
      /*  this.sectionBrand.contractId = this.guestForm.brandId //签约ID*/
        //品牌
        window.$createSectionSpeciesGuestObj(this.sectionBrand).then((res) => {
          console.log(res)
          this.showAlert("新增区间业种客销度成功！")
          this.closeDialog();
        }, (err) => {
          console.log(err)
          this.showAlert(err)
        })
      }
    },
    closeDialog(){
      this.dialogFormVisible = false;//清空数据
    },
    showCreateSection() {
        this.dialogFormVisible = true
    },
    importFile(){
      document.getElementById('fileUpload_input').click()
    },
    areaChanged(){
     /* this.projectList = {};
      this.projectId = ''*/
    /*  if(this.different ===3 ){
        this.conditionId = ''
      }*/
      this.searchForm.projectId = '';
      this.searchForm.buildingId = '';
     /* this.searchForm.floorId = '';*/
      this.floorId = '',
    /*  this.searchForm.searchFloorId = '';*/
    /*  this.floorList = {};
      this.floorId = '';*/
      myareaId = this.searchForm.areaId;
      if (this.dialogFormVisible) {
        myareaId = this.guestForm.areaId;
      }
   /*   window.$getProjectListForArea(this.areaId).then((res) => {
        this.projectList = res
      }, (err) => {this.showAlert(err)})*/

      window.$getProjectListForArea(myareaId).then((res) => {
        console.log("区间客销度areachanged");
        console.log(res)
        this.projectList = res
      }, (err) => {
        this.showAlert(err)
      })
    },
    projectChanged(){
    /*  if(this.different === 2){
        window.$getBuilding(this.projectId).then((res) => {
          this.buildingList = res
        }, (err) => {
          this.showAlert(err)
        })
      } else if(this.different === 3){
        window.$getBusinessListForProject(this.projectId).then((res) => {
          this.bList = res
        }, (err) => {this.showAlert(err)})
      }*/
/*      this.searchForm.floorId = ''*/
     /* this.searchForm.searchFloorId=''*/
      this.floorId = '',
      this.searchForm.buildingId = ''
      this.buildingList= {};
      this.floorList = [];
      myProjectId = this.searchForm.projectId;
      if (this.dialogFormVisible) {
        myProjectId = this.guestForm.projectId;
      }
      window.$getBuilding(myProjectId).then((res) => {
        console.log("projectChanged");
        console.log(res)
        //调用楼层
        window.$getFloorForBuilding(res[0].id).then((floorRes) => {
          this.floorList = floorRes
          console.log("楼层----")
          console.log(floorRes);
        }, (err) => {
          this.showAlert(err)
        })
      }, (err) => {
        this.showAlert(err)
      })
    },
    buildingChanged(){
      window.$getFloorForBuilding(this.buildingId).then(res =>{
        this.floorList = res
      }, err => {
        this.showAlert(err)
      })
    },
    floorChange(){
      /*this.showAlert(this.floorList)*/
    },
    fileUpload(e){
      // if(!this.businessId){
      //   this.showAlert('请选择业务类型')
      //   return false
      // }

      let url = this.businessId === 1 ? '' : (this.businessId === 2 ? '/intervalimportexcel/excel/intervalguestimport/sheet' : '')
      window.$fileUpload(e, url).then((res) => {
        this.showAlert('导入成功')
        this.page = 1
        this.size = 10
        this.searchList()
      }, (err) =>{this.showAlert(err)})
    },
    exportExl(){
      // if(!this.businessId){
      //   this.showAlert('请选择业务类型')
      //   return false
      // }
      if(!this.projectId){
        this.showAlert('请选择项目')
        return false
      }
      let url = this.businessId === 1 ? '' : (this.businessId === 2 ? '/standardexport/excel/qjszkxd' : '')
      window.$exportExls(url, this.projectId).then((res) => {
        console.log(res)
        let link = document.createElement('a')
        link.href = res
        link.click()
      }, (err) => {
        this.showAlert(err)
      })
    },
    handleSizeChange (val) {
      this.size = val
      this.searchList()
    },
    handleCurrentChange (val) {
      this.page = val
      this.searchList()
    },
    searchList(type){
      if(type === 1){
        this.page =1
      }
      /*this.searchForm.projectId = this.projectId*/
      /*if(this.different === 3) {
        this.searchForm.conditionId = this.conditionId
      }*/

    /*  this.$axios.post('/conditionguestinterval/find/conditionguestinterval/list?p=' + this.page + '&c=' + this.size, this.searchForm).then((res) => {
        this.data = res
      }).catch(function (eMsg) {
        this.showAlert(eMsg)
      })*/

      console.log("区间设置条件---")
      this.searchForm.floorId = this.floorId;
      this.searchForm.businessSpeciesId = this.businessSpeciesId;
      console.log(this.searchForm);
      // this.searchForm.floorId = this.searchForm.searchFloorId;
      if(this.objType==0){
        //调接口
        window.$getSectionGuestProjectList(this.page, this.size, this.searchForm)
          .then((res) => {
            console.log(res)
            this.data = res
            console.log("项目客销度列表")
            console.log(res)
            /*this.projectList = this.data.resultList*/
          }, (err) => {
            console.log(err)
          })
        this.closeDialog();
      }else if(this.objType==1){
        //调接口
        window.$getSectionGuestFloorList(this.page, this.size, this.searchForm)
          .then((res) => {
            console.log(res)
            this.data = res
            console.log("楼层客销度列表")
            console.log(res)
            /*this.projectList = this.data.resultList*/
          }, (err) => {
            console.log(err)
          })
        this.closeDialog();
        this.guestForm.sale = 0;
      }else  if(this.objType==2) {
        //业态接口
        this.searchForm.formId = this.searchForm.businessFormId; //赋值业态
        window.$getSectionGuestFormIdList(this.page, this.size, this.searchForm)
          .then((res) => {
            console.log(res)
            this.data = res
            console.log("品牌客销度列表")
            console.log(res)
            /*this.projectList = this.data.resultList*/
          }, (err) => {
            console.log(err)
          })
      }else  if(this.objType==3) {
        //品牌接口
        this.searchForm.formId = this.searchForm.businessFormId; //赋值业态
        this.searchForm.speciesId = this.businessSpeciesId; //赋值业种
        window.$getSectionGuestBrandList(this.page, this.size, this.searchForm)
          .then((res) => {
            console.log(res)
            this.data = res
            console.log("品牌客销度列表")
            console.log(res)
            /*this.projectList = this.data.resultList*/
          }, (err) => {
            console.log(err)
          })
      }
    },
    // 查看详情
    showDetails (id) {
      this.$router.push('/dataManage/trigonometric/details/' + id)
    },
    editDetails (id) {
      this.$router.push('/dataManage/trigonometric/edit/' + id)
    },
    kxxz (id) {
      this.$router.push('/dataManage/trigonometric/kx-xinzeng/' + id)
    },
    yzl (id) {
      this.$router.push('/dataManage/trigonometric/yz-xinzeng/' + id)
    },
    rowClass({ row, rowIndex}) {
    /*  console.log(rowIndex) //表头行标号为0*/
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
  .yzl-line-top{
    height: 1px;
    background: #FFF;
    border-top: 1px solid #000;
    padding: 10px;
    margin-top:-25px;
  }
  .dialog-footer{
    text-align: center;
  }

  .tabs{
    width: 100%;
    height:50px;
    background: #e7cb8a !important;
    margin-bottom: 5px;
    div{
      display: inline-block;
    }
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100%;
  }
  .uploadInput{
    top:0px;
    width: 0;
    height: 100%;
    visibility: hidden;
  }

</style>
