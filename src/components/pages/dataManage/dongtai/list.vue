<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <h3 id="title">动态三角形</h3><br>
      <el-form label-width="100px" :model="searchForm">
        <el-col :span="5">
        <!--  <el-form-item label="对象" :label-width="formLabelWidth">-->
          <el-form-item label="对象" >
            <el-select  size="small" v-model="objType" placeholder="项目" @change="objTypeChange()">
              <el-option v-for="(item, index) in objTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="区域：">
            <el-select  size="small" v-model="searchForm.areaId" placeholder="全部区域" @change="areaChanged()">
              <el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="项目：">
            <el-select   size="small" v-model="searchForm.projectId" placeholder="请选择项目" @change="projectChanged()">
              <el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="楼栋："  style="display: none;">
          <!--  <el-select size="small" v-model="searchForm.buildingId" placeholder="请选择楼栋" @change="buildingChanged()">-->
            <el-select size="small" v-model="searchForm.buildingId" placeholder="请选择楼栋" >
              <el-option v-for="(item, index) in buildingList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="楼层：">
            <el-select  size="small" v-model="searchForm.floorId" placeholder="请选择楼层" >
              <el-option v-for="(item, index) in floorList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="业态：">
            <el-select  size="small" v-model="searchForm.businessFormId" placeholder="餐饮" @change="businessChanged()">
              <el-option v-for="(item, index) in businessList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="品牌：">
            <el-input size="small" v-model="searchForm.brandId" :maxlength="11" placeholder=" "></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="状态：">
            <el-select  size="small" v-model="searchForm.contractType" placeholder="全部状态" @change="contractTypeChange()">
              <el-option v-for="(item, index) in contractTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <!--<el-col :span="5">-->
          <!--<el-form-item label="业务类型">-->
            <!--<el-select  size="small" v-model="businessType" placeholder="请选择业务类型" @change="businessTypeChange()">-->
                <!--<el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->

        <el-col :span="5">
          <el-form-item label="时间：">
            <el-date-picker v-model="effectTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <!--<el-col :span="5">-->
          <!--<el-form-item label="维度" v-if="businessType === 2" >-->
            <!--<el-select  size="small" v-model="searchForm.different" placeholder="请选择维度">-->
              <!--<el-option v-for="(item, index) in dimensionTypeList" :key="index" :label="item.name" :value="item.id"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-dialog title="导出" :visible.sync="dialogFormVisible">-->
          <!--<el-form :model="exportExlsData">-->
            <!--<el-form-item label="区域">-->
              <!--<el-select v-model="exportExlsData.areaId" placeholder="请选择区域" @change="areaChange()">-->
                <!--<el-option v-for="(item,index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="项目">-->
              <!--<el-select v-model="exportExlsData.projectId" placeholder="请选择项目">-->
                <!--<el-option v-for="(item,index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
          <!--</el-form>-->
          <!--<div slot="footer" class="dialog-footer">-->
            <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
            <!--<el-button type="primary" @click="exportExls()">确 定</el-button>-->
          <!--</div>-->
        <!--</el-dialog>-->

        <el-col :span="24" class="text-center">
          <el-form-item label-width="0">
            <el-button type="primary" class="mr10 ml10" size="medium" v-on:click="searchList(1);">搜索</el-button>
            <!--<el-button id="fileUpload_button" class="mr10 ml10" type="primary" size="medium" v-on:click="importFile()">导入</el-button>-->
            <!--<input id="fileUpload_input" class="uploadInput" type="file" @change="fileUpload" />-->
            <!--<el-button type="primary" class="mr10 ml10" size="medium" v-on:click="exportFile();">导出</el-button>-->
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <el-dialog title="溢租率" :visible="dialogFormVisible"  @close='closeDialog'>
      <el-form class="yzl-line-top"></el-form>
      <el-form  label-width="50px" :model="rentForm">
        <el-row>
        <el-col  :span="8">
          <el-form-item label="区域" :label-width="formLabelWidth">
            <el-select  size="small" v-model="rentForm.areaId" placeholder="全部区域" @change="areaChanged()">
              <el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col  :span="8">
          <el-form-item label="项目" :label-width="formLabelWidth">
            <el-select  size="small" v-model="rentForm.projectId" placeholder="项目A" @change="rentProjectChanged()">
              <el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="楼栋："  style="display: none;">
            <!--  <el-select size="small" v-model="searchForm.buildingId" placeholder="请选择楼栋" @change="buildingChanged()">-->
            <el-select size="small" v-model="rentForm.buildingId" placeholder="请选择楼栋" >
              <el-option v-for="(item, index) in buildingList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col  :span="8" >
          <el-form-item label="楼层" :label-width="formLabelWidth">
            <el-select  size="small" v-model="rentForm.floorId" placeholder="F1" @change="businessTypeChange()">
              <el-option v-for="(item, index) in floorList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="业态" :label-width="formLabelWidth">
            <!--  <el-select  size="small" v-model="rentForm.businessType" placeholder="请选择业态" @change="businessTypeChange()">
                <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>-->
              <el-select  size="small" v-model="rentForm.businessFormId" placeholder="请选择业态" @change="businessChanged()">
                <el-option v-for="(item, index) in businessList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业种" :label-width="formLabelWidth">
              <el-select size="small" v-model="rentForm.businessSpeciesId" placeholder="请选择业种" @change="speciesChanged()">
                <el-option v-for="(item, index) in speciesList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品牌" :label-width="formLabelWidth">
             <!-- <el-input size="small" v-model="rentForm.brandId" :maxlength="11" placeholder=" "></el-input>-->
              <el-select size="small" v-model="guestForm.brandId" placeholder="请选择品牌">
                <el-option v-for="(item, index) in brandList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          <!--  <el-select v-model="value9"  multiple filterable="true"  remote="true" reserve-keyword  placeholder="请输入关键词" :remote-method="remoteMethod()" :loading="loading">
              <el-option
                v-for="item in options4"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>-->

          </el-col>
        </el-row>
        <el-row class="yzl-line"></el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="租金" :label-width="formLabelWidth">
              <el-input size="small" v-model="rentFee" :maxlength="11" placeholder=" "></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="物业费" :label-width="formLabelWidth">
              <el-input size="small" v-model="wuyefei" :maxlength="11" placeholder=" "></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="折旧费" :label-width="formLabelWidth">
              <el-input size="small" v-model="zhejiufei" :maxlength="11" placeholder=" "></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="人工费" :label-width="formLabelWidthYZ">
              <el-input size="small" v-model="rengongchengben" :maxlength="11" placeholder=" "></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="代理费" :label-width="formLabelWidthYZ">
              <el-input size="small" v-model="agencyFee" :maxlength="11" placeholder=" "></el-input>
            </el-form-item>
          </el-col>

          <!--<el-col :span="8">-->
            <!--<el-form-item label="生效时间" :label-width="formLabelWidth">-->
              <!--<el-input size="small" v-model="searchForm.standardVerssionName" :maxlength="11" placeholder=" "></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->

          <el-col :span="8">
            <el-form-item label="生效时间" :label-width="formLabelWidthYZ">
              <el-date-picker v-model="effectTime" value-format="yyyy-MM" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createRent()">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="客销度" :visible="dialogFormVisible1" @close='closeDialogKXD'>
      <el-form class="yzl-line-top"></el-form>
      <el-form :model="guestForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="对象" :label-width="formLabelWidth">
            <!--  <el-select  size="small" v-model="businessType" placeholder="项目" @change="businessTypeChange()">
                <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>-->
              <el-select  size="small" v-model="objType" placeholder="项目" @change="objTypeChange()">
                <el-option v-for="(item, index) in objTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="8">
            <el-form-item label="区域" :label-width="formLabelWidth">
              <el-select  size="small" v-model="guestForm.areaId" placeholder="全部区域" @change="areaChanged()">
                <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col  :span="8" >
            <el-form-item label="项目" :label-width="formLabelWidth">
              <el-select  size="small" v-model="guestForm.projectId" placeholder="项目A" @change="guestProjectChanged()">
                <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item label="楼栋："  style="display: none;">
            <!--  <el-select size="small" v-model="searchForm.buildingId" placeholder="请选择楼栋" @change="buildingChanged()">-->
            <el-select size="small" v-model="guestForm.buildingId" placeholder="请选择楼栋" >
              <el-option v-for="(item, index) in buildingList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
          <el-col  :span="8" >
            <el-form-item label="楼层" :label-width="formLabelWidth">
              <el-select  size="small" v-model="guestForm.floorId" placeholder="F1" >
                <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="业态" :label-width="formLabelWidth">
              <el-select  size="small" v-model="guestForm.businessFormId" placeholder="餐饮" @change="businessChanged()">
                <el-option v-for="(item, index) in businessList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业种" :label-width="formLabelWidth">
              <el-select size="small" v-model="guestForm.businessSpeciesId" placeholder="请选择业种" @change="speciesChanged()">
                <el-option v-for="(item, index) in speciesList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="品牌：" :label-width="formLabelWidth">
              <el-select size="small" v-model="guestForm.brandId" placeholder="请选择品牌">
                <el-option v-for="(item, index) in brandList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row class="yzl-line"></el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="客流量" :label-width="formLabelWidth">
              <el-input size="small" v-model="guestForm.persent" :maxlength="11" placeholder=" "></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="销售额" :label-width="formLabelWidth">
              <el-input size="small" v-model="guestForm.sale" :maxlength="11" placeholder=" "></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="时间" :label-width="formLabelWidth">
              <el-date-picker v-model="effectTime2" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogFormVisible1 = false">取 消</el-button>
      <el-button type="primary" @click="createGuest()">保 存</el-button>
    </div>
    </el-dialog>
    <el-dialog title="适配值" :visible="dialogFormVisible2" @close='closeDialogSPZ'>
      <el-form class="yzl-line-top"></el-form>
      <el-form :model="fittedForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="对象" :label-width="formLabelWidth">
              <el-select  size="small" v-model="objType" placeholder="项目" @change="objTypeChange()">
                <el-option v-for="(item, index) in objTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="8">
            <el-form-item label="区域" :label-width="formLabelWidth">
              <el-select  size="small" v-model="fittedForm.areaId" placeholder="全部区域" @change="areaChanged()">
                <el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col  :span="8" >
            <el-form-item label="项目" :label-width="formLabelWidth">
              <el-select  size="small" v-model="fittedForm.projectId" placeholder="项目A" @change="projectChanged()">
                <el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="楼栋："  style="display: none;">
              <!--  <el-select size="small" v-model="searchForm.buildingId" placeholder="请选择楼栋" @change="buildingChanged()">-->
              <el-select size="small" v-model="fittedForm.buildingId" placeholder="请选择楼栋" >
                <el-option v-for="(item, index) in buildingList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col  :span="8" >
            <el-form-item label="楼层" :label-width="formLabelWidth">
              <el-select  size="small" v-model="fittedForm.floorId" placeholder="F1" @change="businessTypeChange()">
                <el-option v-for="(item, index) in floorList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="业态" :label-width="formLabelWidth">
              <el-select  size="small" v-model="fittedForm.businessFormId" placeholder="餐饮" @change="businessChanged()">
                <el-option v-for="(item, index) in businessList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业种" :label-width="formLabelWidth">
              <el-select size="small" v-model="fittedForm.businessSpeciesId" placeholder="请选择业种" @change="speciesChanged()">
                <el-option v-for="(item, index) in speciesList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品牌" :label-width="formLabelWidth">
              <el-input size="small" v-model="fittedForm.brandId" :maxlength="11" placeholder="品牌"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="FitnessValue">
          <h4>适合度</h4>
          <el-row>
            <el-col :span="8">
              <el-form-item label="市场地位" :label-width="formLabelWidthDT">
                <el-input size="small" v-model="shichangdiwei" :maxlength="11" placeholder=" "></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="品牌定位" :label-width="formLabelWidthDT">
                <el-input size="small" v-model="pinpaidiwei" :maxlength="11" placeholder=" "></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="品牌形象" :label-width="formLabelWidthDT">
                <el-input size="small" v-model="pinpaixingxiang" :maxlength="11" placeholder=" "></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-row class="FitnessValue">
          <h4>配合度</h4>
          <el-row>
            <el-col :span="8">
              <el-form-item label="租费收缴率" :label-width="formLabelWidthDT">
                <el-input size="small" v-model="zifeishoujiaolv" :maxlength="11" placeholder=" "></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="连锁跟进度" :label-width="formLabelWidthDT">
                <el-input size="small" v-model="liansuogengjindu" :maxlength="11" placeholder=" "></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客服投诉率" :label-width="formLabelWidthDT">
                <el-input size="small" v-model="kefutousu" :maxlength="11" placeholder=" "></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="企划配合度" :label-width="formLabelWidthDT">
                <el-input size="small" v-model="qihuapeihedu" :maxlength="11" placeholder=" "></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <br>
        <el-row>
          <el-col :span="8">
            <el-form-item label="时间" :label-width="formLabelWidth">
              <el-date-picker
                v-model="fittedForm.effectTime3"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="createFitted()">保 存</el-button>
      </div>
    </el-dialog>

    <p class="t"></p>
    <div class="biaoti1">动态三角形列表</div>
    <el-button class="NewlyAdded" type="primary" align="center" v-on:click="showCreate()">新增</el-button>

    <div class="listCont">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="溢租率" name="first">
          <el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">
            <el-table-column align="center" prop="operationleader" label="项目名称"></el-table-column>
            <el-table-column align="center" prop="phone" label="楼层"></el-table-column>
            <el-table-column align="center" prop="phone" label="铺位号"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="品牌名称"></el-table-column>
            <el-table-column align="center" prop="businessFormName" label="业态名称"></el-table-column>
            <el-table-column align="center" prop="businessSpeciesName" label="业种名称"></el-table-column>
            <el-table-column align="center" prop="status" label="签约状态">
              <template slot-scope="scope">
                <el-button disabled type="text" size="small" v-if="scope.row.status === 1">未审核</el-button>
                <el-button disabled type="text" size="small" v-if="scope.row.status === 2">审核成功</el-button>
                <el-button disabled type="text" size="small" v-if="scope.row.status === 3">审核失败</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="zujjin" label="租金（元/月）"></el-table-column>
            <el-table-column align="center" prop="wuyefei" label="物业费（元/月）"></el-table-column>
            <el-table-column align="center" prop="zhijiufei" label="折旧费（元/月）"></el-table-column>
            <el-table-column align="center" prop="rengongfei" label="人工费（元/月）"></el-table-column>
            <el-table-column align="center" prop="dailifei" label="代理费（元/月）"></el-table-column>
            <el-table-column align="center" prop="effectTime" label="生效时间"></el-table-column>
            <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
            <el-table-column align="center" prop="createUser" label="创建人"></el-table-column>

            <!--<el-table-column align="center" prop="fittedVerssionName" label="版本名称"></el-table-column>-->
            <!--<el-table-column align="center" prop="sumTarget" label="指标总数"></el-table-column>-->
            <!--<el-table-column align="center" prop="targetcount" label="已录入指标数"></el-table-column>-->
            <!--<el-table-column align="center" prop="untargetcount" label="未录入指标数"></el-table-column>-->
            <!--<el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>-->
            <!--<el-table-column align="center" prop="modifyTime" label="修改时间"></el-table-column>-->

            <!--<el-table-column align="center" prop="different" label="类别">-->
              <!--<template slot-scope="scope">-->
                <!--<el-button disabled type="text" size="small" v-if="scope.row.different === 1">项目</el-button>-->
                <!--<el-button disabled type="text" size="small" v-if="scope.row.different === 2">楼层</el-button>-->
                <!--<el-button disabled type="text" size="small" v-if="scope.row.different === 3">品牌</el-button>-->
              <!--</template>-->
            <!--</el-table-column>-->

             <el-table-column align="center"  label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" v-on:click="showDetails(scope.row.id)">查看</el-button>
                <el-button type="text" v-on:click="showDetails(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="客销度" name="second">
          <el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">
            <el-table-column align="center" prop="fittedVerssionName" label="项目名称"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="楼层"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="铺位号"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="品牌名称"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="业态名称"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="业种名称"></el-table-column>
            <el-table-column align="center" prop="status" label="签约状态">
              <template slot-scope="scope">
                <el-button disabled type="text" size="small" v-if="scope.row.status === 1">未审核</el-button>
                <el-button disabled type="text" size="small" v-if="scope.row.status === 2">审核成功</el-button>
                <el-button disabled type="text" size="small" v-if="scope.row.status === 3">审核失败</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="客流量"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="销售额"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="生效时间"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="创建时间"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="创建人"></el-table-column>

            <!--<el-table-column align="center" prop="fittedVerssionName" label="版本名称"></el-table-column>-->
            <!--<el-table-column align="center" prop="sumTarget" label="指标总数"></el-table-column>-->
            <!--<el-table-column align="center" prop="targetcount" label="已录入指标数"></el-table-column>-->
            <!--<el-table-column align="center" prop="untargetcount" label="未录入指标数"></el-table-column>-->
            <!--<el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>-->
            <!--<el-table-column align="center" prop="modifyTime" label="修改时间"></el-table-column>-->

            <!--<el-table-column align="center" prop="different" label="类别">-->
              <!--<template slot-scope="scope">-->
                <!--<el-button disabled type="text" size="small" v-if="scope.row.different === 1">项目</el-button>-->
                <!--<el-button disabled type="text" size="small" v-if="scope.row.different === 2">楼层</el-button>-->
                <!--<el-button disabled type="text" size="small" v-if="scope.row.different === 3">品牌</el-button>-->
              <!--</template>-->
            <!--</el-table-column>-->

           <el-table-column align="center"  label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" v-on:click="showDetails(scope.row.id)">查看</el-button>
                <el-button type="text" v-on:click="showDetails(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="适配值" name="third">
          <el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">
            <el-table-column align="center" prop="fittedVerssionName" label="项目名称"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="楼层"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="铺位号"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="品牌名称"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="业态名称"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="业种名称"></el-table-column>
            <el-table-column align="center" prop="status" label="签约状态">
              <template slot-scope="scope">
                <el-button disabled type="text" size="small" v-if="scope.row.status === 1">未审核</el-button>
                <el-button disabled type="text" size="small" v-if="scope.row.status === 2">审核成功</el-button>
                <el-button disabled type="text" size="small" v-if="scope.row.status === 3">审核失败</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="市场地位"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="品牌定位"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="品牌形象"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="租费收缴率"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="连锁跟进度"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="客服投诉率"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="企划配合度"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="适配值"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="生效时间"></el-table-column>
            <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="创建人"></el-table-column>

            <!--<el-table-column align="center" prop="fittedVerssionName" label="版本名称"></el-table-column>-->
            <!--<el-table-column align="center" prop="sumTarget" label="指标总数"></el-table-column>-->
            <!--<el-table-column align="center" prop="targetcount" label="已录入指标数"></el-table-column>-->
            <!--<el-table-column align="center" prop="untargetcount" label="未录入指标数"></el-table-column>-->
            <!--<el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>-->
            <!--<el-table-column align="center" prop="modifyTime" label="修改时间"></el-table-column>-->

            <!--<el-table-column align="center" prop="different" label="类别">-->
            <!--<template slot-scope="scope">-->
            <!--<el-button disabled type="text" size="small" v-if="scope.row.different === 1">项目</el-button>-->
            <!--<el-button disabled type="text" size="small" v-if="scope.row.different === 2">楼层</el-button>-->
            <!--<el-button disabled type="text" size="small" v-if="scope.row.different === 3">品牌</el-button>-->
            <!--</template>-->
            <!--</el-table-column>-->

            <el-table-column align="center"  label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" v-on:click="showDetails(scope.row.id)">查看</el-button>
                <el-button type="text" v-on:click="showDetails(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div class="paginationCont">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="page"
          layout=" prev, pager, next"
          :total="data.count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  //定义变量
  //区域id
   var myareaId='';
   //业态id
  var mybusinessFormId='';
import moment from 'moment'
export default {
  data: () => ({
    searchForm:{},
    formLabelWidth:"60px",
    formLabelWidthYZ:'70px',
    formLabelWidthDT:'85px',
    contractTypeList:[],//签约状态
    businessTypeList: window.$businessTypeList2,
    dimensionTypeList: window.$dimensionList2,
    businessType: '',
    exportExlsData: {},
    areaList:[],
    projectList:[],
    projectId:'',
    data: {},
    loading: false,
    infoData: {},
    page: 1,
    size: 10,
    dialogFormVisible: false,
    dialogFormVisible1: false,
    dialogFormVisible2: false,
    pictureList: [],
    picIndex: 0,
  //  value6:[],
    activeName2: 'first',
    buildingList:[],
    buildingId:'',
    floorList:[],
    floorId:'',
    businessList:[],
    business:'',
    businessSpeciesId:'',
    speciesList:[],
    species:'',
    brandList:[],
    brandId:'',
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
    rentForm:{},
/*    options4: [],
    value9: [],
    list: [],
    loading: false,
    states: [],*/
    rentFee:0.00,
    wuyefei:0.00,
    zhejiufei:0.00,
    rengongchengben:0.00,
    agencyFee:0.00,
    guestForm:{},
    contractType:'',
    persent:'',//客流量
    sale:'',//销售额
    fittedForm:{},
    shichangdiwei:'',
    pinpaidiwei:'',
    pinpaixingxiang:'',
    zifeishoujiaolv:'',
    liansuogengjindu:'',
    kefutousu:'',
    qihuapeihedu:'',
    effectTime:'',
    effectTime2:'',
    effectTime3:''
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
    createRent(){
      console.log("新增溢租率！");
      this.rentForm.projectId = this.projectId;
      this.rentForm.floorId = this.floorId;
      this.rentForm.brandId = this.brandId;
      this.rentForm.rentFee = this.rentFee;
      this.rentForm.wuyefei = this.wuyefei;
      this.rentForm.zhejiufei = this.zhejiufei;
      this.rentForm.rengongchengben = this.rengongchengben;
      this.rentForm.agencyFee = this.agencyFee;
      this.rentForm.effectTime = this.effectTime;
      console.log(this.rentForm);
      this.closeDialog();
    },
    createGuest(){
      window.$getAreaList().then((res) => {
        this.areaList = res
      }, (err) => {console.log(err)})
      console.log("新增客销度！");
      this.guestForm.projectId = this.projectId;
      this.guestForm.floorId = this.floorId;
      this.guestForm.brandId = this.brandId;
      this.guestForm.businessType = this.businessType;
      this.guestForm.species = this.species;
      console.log("objType:"+this.objType);
      if(this.objType==0){
        alert(this.objType+"---项目接口");
        this.guestForm.persent = this.persent;
        this.guestForm.sale = 0;
      }else if(this.objType==1){
        alert(this.objType+"---楼层接口");
        this.guestForm.persent = this.persent;
        this.guestForm.sale = 0;
      }else  if(this.objType==3){
        alert(this.objType+"---品牌接口");
        this.guestForm.persent = this.persent;
        this.guestForm.sale = this.sale;
      }
      this.guestForm.effectTime2 = this.effectTime2;
      console.log(this.guestForm);
      this.closeDialogKXD();
    },
    createFitted(){
      window.$getAreaList().then((res) => {
        this.areaList = res
      }, (err) => {console.log(err)})
      console.log("新增适配值！");
      console.log("objType:"+this.objType);
      this.fittedForm.projectId = this.projectId;
      this.fittedForm.floorId = this.floorId;
      this.fittedForm.brandId = this.brandId;
      this.fittedForm.businessType = this.businessType;
      //this.fittedForm.species = this.species;
      this.fittedForm.shichangdiwei = this.shichangdiwei;
      this.fittedForm.pinpaidiwei = this.pinpaidiwei;
      this.fittedForm.pinpaixingxiang = this.pinpaixingxiang;
      this.fittedForm.zifeishoujiaolv = this.zifeishoujiaolv;
      this.fittedForm.liansuogengjindu = this.liansuogengjindu;
      this.fittedForm.kefutousu = this.kefutousu;
      this.fittedForm.qihuapeihedu = this.qihuapeihedu;
      console.log(this.fittedForm);
      if(this.objType==1){
        alert(this.objType+"---项目接口");
      }
      if(this.objType==2){
        alert(this.objType+"---楼层接口");
      }
      if(this.objType==0){
        alert(this.objType+"---品牌接口");
      }
      this.closeDialogSPZ();
    },
    closeDialog(){
      this.floorId = '';
      this.brandId = '';
      this.rentFee = '';
      this.wuyefei = '';
      this.zhejiufei = '';
      this.rengongchengben = '';
      this.agencyFee = '';
      this.effectTime = '';
      this.dialogFormVisible = false;//清空数据
    },
    closeDialogKXD(){
      this.floorId = '';
      this.brandId = '';
      this.dialogFormVisible1 = false;//清空数据
    },
    closeDialogSPZ(){
      this.floorId = '';
      this.brandId = '';
      this.dialogFormVisible2 = false;//清空数据
    },
    showCreate() {
      dialogFormVisible: false;
      dialogFormVisible1: false;
      dialogFormVisible2: false;
      if (this.activeName2 == "first") {
        this.dialogFormVisible = true
      }
      if (this.activeName2 == 'second'){
        this.dialogFormVisible1 = true;
      }
      if (this.activeName2 == 'third') {
        this.dialogFormVisible2 = true;
      }
      window.$getformSelect().then((res) => {
        this.businessList = res
      }, (err) => {})
      console.log("created:"+this.businessList);
      window.$getAreaList().then((res) => {
        this.areaList = res
        console.log("createRent---")
        console.log(res)
      }, (err) => {console.log(err)})
    },
    //自己添加
    // 1.区域
    areaChanged(){
      this.searchForm.projectId = '';
      this.searchForm.buildingId = '';
      this.floorId = '';
      myareaId = this.searchForm.areaId;
      if (this.dialogFormVisible) {
        myareaId = this.rentForm.areaId;
        /*this.dialogFormVisible = true*/
      }
      if (this.dialogFormVisible1){
        myareaId = this.guestForm.areaId;
        /* this.dialogFormVisible1 = true;*/
      }
      if (this.dialogFormVisible2) {
        myareaId = this.fittedForm.areaId;
        /* this.dialogFormVisible2 = true;*/
      }
      console.log("areaChanged---"+myareaId);
      window.$getProjectListForArea(myareaId).then((res) => {
        console.log("areachanged");
        console.log(res)
        this.projectList = res
       /* if (this.activeName2 == "first") {
          this.rentForm.projectList = res;
          /!*this.dialogFormVisible = true*!/
        }
        if (this.activeName2 == 'second'){
          this.guestForm.projectList = res;
         /!* this.dialogFormVisible1 = true;*!/
        }
        if (this.activeName2 == 'third') {
          this.fittedForm.projectList = res;
         /!* this.dialogFormVisible2 = true;*!/
        }*/
      }, (err) => {
        this.showAlert(err)
      })
    },
//打印对象值
    objTypeChange(){
      //this.showAlert(this.objType);
    },

    //2.项目
    projectChanged(){
      this.searchForm.buildingId = ''
      this.floorId = ''
      window.$getBuilding(this.searchForm.projectId).then((res) => {
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
    //2.溢租率新增项目
    rentProjectChanged(){
      this.rentForm.buildingId = ''
      this.floorId = ''
      window.$getBuilding(this.rentForm.projectId).then((res) => {
        console.log("溢租率projectChanged");
        console.log(res)
        //调用楼层
        window.$getFloorForBuilding(res[0].id).then((floorRes) => {
          this.floorList = floorRes
          console.log("溢租率楼层----")
          console.log(floorRes);
        }, (err) => {
          this.showAlert(err)
        })
      }, (err) => {
        this.showAlert(err)
      })
    },
    //3.客销度新增项目
    guestProjectChanged(){
      this.guestForm.buildingId = ''
      this.floorId = ''
      window.$getBuilding(this.guestForm.projectId).then((res) => {
        console.log("客销度projectChanged");
        console.log(res)
        //调用楼层
        window.$getFloorForBuilding(res[0].id).then((floorRes) => {
          this.floorList = floorRes
          console.log("客销度楼层----")
          console.log(floorRes);
        }, (err) => {
          this.showAlert(err)
        })
      }, (err) => {
        this.showAlert(err)
      })
    },
    //3.适配值新增项目
    fittedProjectChanged(){
      this.fittedForm.buildingId = ''
      this.floorId = ''
      window.$getBuilding(this.fittedForm.projectId).then((res) => {
        console.log("适配值projectChanged");
        console.log(res)
        //调用楼层
        window.$getFloorForBuilding(res[0].id).then((floorRes) => {
          this.floorList = floorRes
          console.log("适配值楼层----")
          console.log(floorRes);
        }, (err) => {
          this.showAlert(err)
        })
      }, (err) => {
        this.showAlert(err)
      })
    },
    //3.楼栋
    buildingChanged(){
      this.floorId = '';
      window.$getFloorForBuilding(this.searchForm.buildingId).then((res) => {
        this.floorList = res
      }, (err) => {
        this.showAlert(err)
      })
    },

    // 业态
    businessChanged(){
      this.searchForm.businessSpeciesId = ''
      this.brandId = ''
      mybusinessFormId = this.searchForm.businessFormId;
      if (this.dialogFormVisible) {
        mybusinessFormId = this.rentForm.businessFormId;
        /*this.dialogFormVisible = true*/
      }
      if (this.dialogFormVisible1){
        mybusinessFormId = this.guestForm.businessFormId;
        /* this.dialogFormVisible1 = true;*/
      }
      if (this.dialogFormVisible2) {
        mybusinessFormId = this.fittedForm.businessFormId;
        /* this.dialogFormVisible2 = true;*/
      }
      console.log("businessChanged---"+mybusinessFormId);
      window.$getSpeciesSelect(mybusinessFormId).then((res) => {
        console.log("业态change-----")
        console.log(res)
        this.speciesList = res
      }, (err) => {
        this.showAlert(err)
      })

    },
    //业种
    speciesChanged(){
      this.brandId = ''
      window.$getBrandForSpecies(this.searchForm.businessSpeciesId).then((res) => {
        this.brandList = res
        if (this.dialogFormVisible) {
          this.rentForm.brandList = res
        }
        if (this.dialogFormVisible1){
          this.guestForm.brandList = res
        }
        if (this.dialogFormVisible2) {
          this.fittedForm.brandList = res
        }
      }, (err) => {
        this.showAlert(err)
      })
    },
    createCompany() {
      this.dialogFormVisible = false
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    importFile(){
      document.getElementById('fileUpload_input').click()
    },
    areaChange(){
      window.$getProjectListForArea(this.exportExlsData.areaId).then((res) => {
        this.projectList = res
      }, (err) => { this.showAlert(err)})
    },
    exportFile(){
      if(!this.businessType){
        this.showAlert('请选择业务类型');
        return false
      }
      this.dialogFormVisible = true
    },
    exportExls(){
      if(!this.exportExlsData.projectId){
        this.showAlert('请选择项目');
        return false
      }
      let url = this.businessType === 1 ? '/standardexport/excel/dtyzl' : (this.businessType === 2 ? '/standardexport/excel/dtkxd' : '/standardexport/excel/dtspz')
      window.$exportExls(url, this.exportExlsData.projectId).then((res) => {
        console.log(res);
        let link = document.createElement('a');
        link.href = res;
        link.click()
      }, (err) => {
        this.showAlert(err)
      })
    },
    fileUpload(e){
      if(!this.businessType){
        this.showAlert('请选择业务类型')
        return false
      }
      // let url = '/excel/excel/import/sheet'
      let url = this.businessType === 1 ? '/importexcel/excel/rentimport/sheet' : (this.businessType === 2 ? '/importexcel/excel/guestimport/sheet' : '/importexcel/excel/fittedimport/sheet')
      window.$fileUpload(e, url).then((res) => {
        this.showAlert('导入成功')
      }, (err) =>{this.showAlert(err)})
    },
    businessTypeChange(){
      this.page = 1;
      this.size = 10
    },
    handleSizeChange (val) {
      this.size = val;
      this.searchList()
    },
    handleCurrentChange (val) {
      this.page = val;
      this.searchList()
    },
    searchList (type) {
      /*//判断需要展示的筛选列表是：溢租率、客销度、适配值
      if(this.projectId!=null){
        this.searchForm.projectId = this.projectId;
      }
      if(this.floorId!=null){
        this.searchForm.floorId = this.floorId;
      }
      if(this.businessFormId!=null){//业态
        this.searchForm.businessFormId = this.businessFormId;
      }
      if(this.brandId!=null){//品牌
        this.searchForm.brandId = this.brandId;
      }
      if(this.effectTime!=null){//生效时间
        this.searchForm.effectTime = this.effectTime;
      }*/
      if (this.activeName2 == "first") {//溢租率
        console.log("溢租率-----");
        console.log(this.searchForm);
        //调接口
      }
      if (this.activeName2 == 'second'){//客销度
        //调接口
        console.log("客销度-----");
        console.log(this.searchForm);
      }
      if (this.activeName2 == 'third') {//适配值
        //调接口
        console.log("适配值-----");
        console.log(this.searchForm);
      }

      if(type === 1){
        this.page =1
      }
      let url = '';
   /*   if(this.value6){
        this.searchForm.createTimeBegin = this.value6[0]
        this.searchForm.createTimeBegin = this.value6[1]
      }*/
      if(this.businessType === 1){
        url = '/rantverssion/find/rantverssion/list'
      } else if(this.businessType === 2){
        if(!this.searchForm.different){
          this.showAlert('请选择维度');
          return false
        } else {
          url = '/guestverssion/find/guestverssion/list'
        }
      } else if(this.businessType === 3){
        url = '/fittedverssion/find/fittedverssion/list'
      }

      if(type === 1){
        this.page = 1
      }

      if(this.businessType === 1 || this.businessType === 2 || this.businessType === 3 ){
        this.$axios.post(url + '?p=' +this.page + '&c=' + this.size, this.searchForm).then((res) => {
          this.data = res
        }, (err) => {
          this.showAlert(err)
        })
      }
    },
    // 查看详情
    showDetails (id) {
      this.$router.push('/dataManage/dongtai/details/' + id)
    },
    editDetails (id) {
      this.$router.push('/dataManage/dongtai/edit/' + id)
    },
    xiugai (id) {
      this.$router.push('/dataManage/dongtai/xiugai/' + id)
    },
    xiangqing (id) {
      this.$router.push('/dataManage/dongtai/xiangqing/' + id)
    },
    rowClass({ row, rowIndex}) {
      console.log(rowIndex); //表头行标号为0
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
  .yzl-line{
    height: 1px;
    background: #fff;
    border-top: 1px solid #CCC;
    padding-bottom: 16px;
  }
  .yzl-line-top{
    height: 1px;
    background: #FFF;
    border-top: 1px solid #000;
    padding: 10px;
    margin-top:-25px;
  }
  .FitnessValue{
    border: 1px solid #000;
    padding: 15px;
    border-radius: 15px;
    margin-top: 15px;
  }
  h4{
    font-size: 20px;
    font-weight: 800;
  }
  .el-dialog__footer{
    text-align: center;
  }
  .el-dialog .el-select .el-input .el-select__caret{
    width: 26px;
    background: #eaeaea;
    height: 25px;
    line-height: 25px;
    position: absolute;
    left: -23px;
    top: 8px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    color: #c0c4cc;
    font-size: 14px;
    //transform: rotateZ(180deg);
    cursor: pointer;
    border-right:1px solid #4484a1;
  }
  .yzl{
      margin: 0 auto;
  }
  /*.el-dialog{*/
    /*width:50%;*/
  /*}*/
  /*.el-dialog .el-col{*/
    /*width: 300px;*/
    /*background: red;*/
  /*}*/



  /*.el-dialog .el-input{*/
    /*width: 55%;*/
  /*}*/







  .tabs{
    width: 100%;
    height:50px;
    background: #e7cb8a !important;
    margin-bottom: 5px;
    div{
      display: inline-block;
    }
  }

  .mainContent{
    width: 100%;
    // height: 100%;
    background: #fff;
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
