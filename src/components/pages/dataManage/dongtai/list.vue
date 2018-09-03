<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <h3 id="title">动态三角形</h3><br>
      <el-form label-width="100px" :model="searchForm">
        <el-col :span="5">
          <el-form-item label="对象" :label-width="formLabelWidth" >
            <el-select  size="small" v-model="objType" placeholder="请选择对象" v-if="type == 1">
              <el-option v-for="(item, index) in objTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>

            <el-select  size="small" v-model="objType" placeholder="请选择对象" v-if="type != 1">
              <el-option v-for="(item, index) in objTypeList1" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        
        <el-col :span="5">
          <el-form-item label="区域" :label-width="formLabelWidth">
            <el-select  size="small" v-model="searchForm.areaId" placeholder="全部区域" @change="areaChanged()">
              <el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="项目" :label-width="formLabelWidth">
            <el-select   size="small" v-model="searchForm.projectId" placeholder="请选择项目" @change="projectChanged()">
              <el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <!-- <el-col :span="5" v-if="objType == 1">
          <el-form-item label="楼栋"  :label-width="formLabelWidth">
            <el-select size="small" v-model="searchForm.buildingId" placeholder="请选择楼栋" @change="buildingChanged()">
              <el-option v-for="(item, index) in buildingList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col> -->

        <el-col :span="5" v-if="objType == 1">
          <el-form-item label="楼层" :label-width="formLabelWidth">
            <el-select  size="small" v-model="searchForm.floorId" placeholder="请选择楼层" >
              <el-option v-for="(item, index) in floorList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5" v-if="objType == 2">
          <el-form-item label="业态" :label-width="formLabelWidth">
            <el-select  size="small" v-model="searchForm.businessFormId" placeholder="请选择业态" @change="businessChanged()">
              <el-option v-for="(item, index) in businessList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5" v-if="objType == 2">
          <el-form-item label="业种" :label-width="formLabelWidth">
            <el-select size="small" v-model="searchForm.businessSpeciesId" placeholder="请选择业种" @change="speciesChanged()">
              <el-option v-for="(item, index) in speciesList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5" v-if="objType == 2">
          <el-form-item label="品牌" :label-width="formLabelWidth">
            <el-select size="small" v-model="searchForm.brandId" placeholder="请选择品牌" @change="brandIdChanged()">
              <!--<el-option v-for="(item, index) in brandList" :key="index" :label="item.name" :value="item.id"></el-option>-->
              <el-option v-for="(item, index) in brandList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5" v-if="type == 0">
          <el-form-item label="时间" :label-width="formLabelWidth">
            <el-date-picker v-model="effectTime" value-format="yyyy-MM" type="month" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="5" v-if="type != 0">
          <el-form-item label="时间" :label-width="formLabelWidth">
            <el-date-picker v-model="effectTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>

      </el-form>
    </el-row>

    <div class="buttonList">
      <el-button type="primary" class="mr10 ml10" size="medium" v-on:click="searchList(1);">搜索</el-button>
      <el-button type="primary" class="ml10" size="medium" v-on:click="showCreate()">新增</el-button>
    </div>

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
            <el-select  size="small" v-model="rentForm.projectId" placeholder="请选择项目" @change="rentProjectChanged()">
              <el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
          <el-form-item label="楼栋："  style="display: none;">
            <el-select size="small" v-model="rentForm.buildingId" placeholder="请选择楼栋" >
              <el-option v-for="(item, index) in buildingList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
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
              <el-select size="small" v-model="rentForm.brandId" placeholder="请选择品牌" @change="brandIdChanged()">
                <el-option v-for="(item, index) in brandList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="FitnessValue">
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
              <el-form-item label="人工费" :label-width="formLabelWidth">
                <el-input size="small" v-model="rengongchengben" :maxlength="11" placeholder=" "></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="代理费" :label-width="formLabelWidth">
                <el-input size="small" v-model="agencyFee" :maxlength="11" placeholder=" "></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="时间" :label-width="formLabelWidth">
                <el-date-picker v-model="effectTime" value-format="yyyy-MM" type="month" placeholder="选择日期" :label-width="formLabelWidth"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
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
              <el-select  size="small" v-model="objType" placeholder="请选择对象维度">
                <el-option v-for="(item, index) in objTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="8">
            <el-form-item label="区域" :label-width="formLabelWidth">
              <el-select  size="small" v-model="guestForm.areaId" placeholder="全部区域" @change="areaChanged()">
                <el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col  :span="8" >
            <el-form-item label="项目" :label-width="formLabelWidth">
              <el-select  size="small" v-model="guestForm.projectId" placeholder="请选择项目" @change="guestProjectChanged()">
                <el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
          <el-form-item label="楼栋"  style="display: none;">
            <el-select size="small" v-model="guestForm.buildingId" placeholder="请选择楼栋" @change="buildingChanged()">
              <el-option v-for="(item, index) in buildingList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
          <el-col  :span="8" >
            <el-form-item label="楼层" :label-width="formLabelWidth">
              <el-select  size="small" v-model="guestForm.floorId" placeholder="请选择楼层" >
                <el-option v-for="(item, index) in floorList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="业态" :label-width="formLabelWidth">
              <el-select  size="small" v-model="guestForm.businessFormId" placeholder="请选择业态" @change="businessChanged()">
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
            <el-form-item label="品牌" :label-width="formLabelWidth">
              <el-select size="small" v-model="guestForm.brandId" placeholder="请选择品牌">
                <el-option v-for="(item, index) in brandList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row class="FitnessValue">
          <el-row>
            <el-col :span="8">
              <el-form-item label="客流量" :label-width="formLabelWidth">
                <el-input size="small" v-model="guestForm.persent" :maxlength="11" placeholder="请输入客流量 "></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="销售额" :label-width="formLabelWidth">
                <el-input size="small" v-model="guestForm.sale" :maxlength="11" placeholder="请选择销售额"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="时间" :label-width="formLabelWidth">
                <el-date-picker v-model="effectTime2" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
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
          <el-col  :span="8">
            <el-form-item label="区域" :label-width="formLabelWidth">
              <el-select  size="small" v-model="fittedForm.areaId" placeholder="全部区域" @change="areaChanged()">
                <el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col  :span="8" >
            <el-form-item label="项目" :label-width="formLabelWidth">
              <el-select  size="small" v-model="fittedForm.projectId" placeholder="项目A" @change="fittedProjectChanged()">
                <el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="楼栋："  style="display: none;">
              <el-select size="small" v-model="fittedForm.buildingId" placeholder="请选择楼栋" @change="buildingChanged()">
                <el-option v-for="(item, index) in buildingList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col  :span="8" >
            <el-form-item label="楼层" :label-width="formLabelWidth">
              <el-select  size="small" v-model="fittedForm.floorId" placeholder="请选择楼层" @change="businessTypeChange()">
                <el-option v-for="(item, index) in floorList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="业态" :label-width="formLabelWidth">
              <el-select  size="small" v-model="fittedForm.businessFormId" placeholder="请选择业态" @change="businessChanged()">
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
               <!-- <el-input size="small" v-model="fittedForm.brandId" :maxlength="11" placeholder="品牌"></el-input>-->
                <el-select size="small" v-model="fittedForm.brandId" placeholder="请选择品牌" @change="brandIdChanged()">
                  <el-option v-for="(item, index) in brandList" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row class="FitnessValue">
          <h4>适合度</h4>
          <el-row>
            <el-col :span="8">
              <el-form-item label="市场地位" :label-width="formLabelWidthDT">
                <el-input type="number" size="small" v-model="shichangdiwei" :maxlength="11" placeholder=" "></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="品牌定位" :label-width="formLabelWidthDT">
                <el-input type="number" size="small" v-model="pinpaidiwei" :maxlength="11" placeholder=" "></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="品牌形象" :label-width="formLabelWidthDT">
                <el-input type="number" size="small" v-model="pinpaixingxiang" :maxlength="11" placeholder=" "></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-row class="FitnessValue">
          <h4>配合度</h4>
          <el-row>
            <el-col :span="8">
              <el-form-item label="租费收缴率" :label-width="formLabelWidthDT">
                <el-input type="number" size="small" v-model="zifeishoujiaolv" :maxlength="11" placeholder=" "></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="连锁跟进度" :label-width="formLabelWidthDT">
                <el-input type="number" size="small" v-model="liansuogengjindu" :maxlength="11" placeholder=" "></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客服投诉率" :label-width="formLabelWidthDT">
                <el-input type="number" size="small" v-model="kefutousu" :maxlength="11" placeholder=" "></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="企划配合度" :label-width="formLabelWidthDT">
                <el-input type="number" size="small" v-model="qihuapeihedu" :maxlength="11" placeholder=" "></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <br>
        <el-row>
          <el-col :span="7">
            <el-form-item label="时间" :label-width="formLabelWidth">
              <el-date-picker v-model="effectTime3" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
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

    <div class="listCont">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="溢租率" name="first">
          <el-table :data="data.resultList" border size="medium">
            <el-table-column align="center" prop="projectName" label="项目名称"></el-table-column>
            <!--<el-table-column align="center" prop="phone" label="楼层"></el-table-column>-->
            <el-table-column align="center" prop="roomName" label="铺位号"></el-table-column>
            <el-table-column align="center" prop="brandName" label="品牌名称"></el-table-column>
            <el-table-column align="center" prop="fromName" label="业态名称"></el-table-column>
            <el-table-column align="center" prop="speciesName" label="业种名称"></el-table-column>
            <el-table-column align="center" prop="rent" label="租金（元/月）"></el-table-column>
            <el-table-column align="center" prop="propertyfee" label="物业费（元/月）"></el-table-column>
            <el-table-column align="center" prop="depreciation" label="折旧费（元/月）"></el-table-column>
            <el-table-column align="center" prop="laborCost" label="人工费（元/月）"></el-table-column>
            <el-table-column align="center" prop="agencyFee" label="代理费（元/月）"></el-table-column>
            <el-table-column align="center" prop="effectTime" label="生效时间"></el-table-column>
            <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
            <el-table-column align="center" prop="createUser" label="创建人"></el-table-column>
             <el-table-column align="center"  label="操作" width="100">
              <template slot-scope="scope">
               <!-- <el-button type="text" v-on:click="showDetails(scope.row.id)">查看</el-button>-->
                <el-button type="text" v-on:click="deleteRent(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="客销度" name="second">
          <el-table :data="data.resultList" border size="medium">
            <el-table-column align="center" prop="projectName" label="项目名称"></el-table-column>
            <el-table-column align="center" prop="floorName" label="楼层"></el-table-column>
            <el-table-column align="center" prop="brandName" label="品牌名称"></el-table-column>
            <el-table-column align="center" prop="formName" label="业态名称"></el-table-column>
            <el-table-column align="center" prop="speciesName" label="业种名称"></el-table-column>
            <el-table-column align="center" prop="passengerFlow" label="客流量"></el-table-column>
            <el-table-column align="center" prop="salesVolume" label="销售额"></el-table-column>
            <el-table-column align="center" prop="effectTime" label="生效时间"></el-table-column>
            <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
            <el-table-column align="center" prop="createUser" label="创建人"></el-table-column>
           <el-table-column align="center"  label="操作" width="100">
              <template slot-scope="scope">
               <!-- <el-button type="text" v-on:click="showDetails(scope.row.id)">查看</el-button>-->
                <el-button type="text" v-on:click="deleteGuest(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="适配值" name="third">
          <el-table :data="data.resultList" border size="medium">
            <el-table-column align="center" prop="projectName" label="项目名称"></el-table-column>
            <el-table-column align="center" prop="floorName" label="楼层"></el-table-column>
           <!-- <el-table-column align="center" prop="fittedVerssionName" label="铺位号"></el-table-column>-->
            <el-table-column align="center" prop="brandName" label="品牌名称"></el-table-column>
            <el-table-column align="center" prop="formName" label="业态名称"></el-table-column>
            <el-table-column align="center" prop="speciesName" label="业种名称"></el-table-column>
            <el-table-column align="center" prop="marketVal" label="市场地位"></el-table-column>
            <el-table-column align="center" prop="brandPositioningVal" label="品牌定位"></el-table-column>
            <el-table-column align="center" prop="brandImgVal" label="品牌形象"></el-table-column>
            <el-table-column align="center" prop="rentVal" label="租费收缴率"></el-table-column>
            <el-table-column align="center" prop="chainVal" label="连锁跟进度"></el-table-column>
            <el-table-column align="center" prop="customerVal" label="客服投诉率"></el-table-column>
            <el-table-column align="center" prop="enterpriseVal" label="企划配合度"></el-table-column>
            <el-table-column align="center" prop="quarterVal" label="适配值"></el-table-column>
            <el-table-column align="center" prop="effectTime" label="生效时间"></el-table-column>
            <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
            <el-table-column align="center" prop="createUser" label="创建人"></el-table-column>
            <el-table-column align="center"  label="操作" width="100">
              <template slot-scope="scope">
               <!-- <el-button type="text" v-on:click="showDetails(scope.row.id)">查看</el-button>-->
                <el-button type="text" v-on:click="deleteFitted(scope.row.id)">删除</el-button>
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
import moment from 'moment'
export default {
  data: () => ({
    isSearchList: false,
    //区域id
    myareaId:'',
   //业态id
    mybusinessFormId:'',
  //业种id
    mybusinessSpeciesId:'',
    type: 0,
    searchForm:{},
    formLabelWidth:"60px",
    formLabelWidthYZ:'70px',
    formLabelWidthDT:'85px',
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
    brandId:"",
    objTypeList:[
      {
        id: 0,
        name: '项目'
      },
      {
        id: 1,
        name: '楼层'
      },
      {
        id: 2,
        name: '品牌'
      }],
      objTypeList1:[
      {
        id: 2,
        name: '品牌'
      }],
    objType: 2,
    //搜索条件
    searchRequest : {
      projectId : "",//项目ID
      buildingId : "",//楼栋
      floorId : "",//楼层
      businessFormId : "", //业态
      brandName : "", //品牌
      effectTime : '',//生效时间
      contractId : '' //签约id
    },

    rentForm:{},
    rentCreateDate:{
      id:'',
      rent:'', //租金
      propertyfee:'', //物业费
      depreciation:'',//装修折旧费
      agencyFee:'',//代理费\
      laborCost:'',//人工成本
      contractId:'',//签约ID
      effectTime:'' //生效时间
    },
    fittedCreateDate :{
      projectId:'',
      buildingId:'',
      floorId:'', //楼层ID
      formId:'',//业态
      speciesId:'',//业种
      contractId:'',//签约ID
      marketVal:'',//市场地位
      brandPositioningVal:'',//品牌定位
      brandImgVal:'',//品牌形象
      rentVal:'',//租费收缴率
      chainVal:'',//连锁跟进度
      customerVal:'',//客服投诉率
      enterpriseVal:'',//企划配合度
      effectTime:'' //生效时间
    },
    guestProjectCreateDate:{
      projectId:'', //项目ID
      passengerFlow:'',//客流量
      alesVolume:'',//销售额
      effectTime:'' //生效时间
    },
    guestFloorCreateDate:{
      projectId:'', //项目ID
      buildingId:'', //楼栋ID
      floorId:'', //楼层ID
      passengerFlow:'',//客流量
      alesVolume:'',//销售额
      effectTime:'' //生效时间
    },
    guestBrandCreateDate:{
      projectId:'', //项目ID
      buildingId:'', //楼栋ID
      floorId:'', //楼层ID
      formId:'',//业态
      speciesId:'',//业种
      contractId:'',//签约ID
      passengerFlow:'',//客流量
      alesVolume:'',//销售额
      effectTime:'' //生效时间
    },

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
      this.rentCreateDate.rent = this.rentFee; //租金
      this.rentCreateDate.propertyfee = this.wuyefei; //物业费
      this.rentCreateDate.depreciation = this.zhejiufei;//装修折旧费
      this.rentCreateDate.agencyFee = this.agencyFee;//代理费
      this.rentCreateDate.laborCost = this.rengongchengben;//人工成本
      this.rentCreateDate.contractId = this.rentForm.brandId;//签约ID
      this.rentCreateDate.effectTime = this.effectTime; //生效时间
      console.log(this.rentForm);
      console.log(this.rentCreateDate);
      window.$createRentObj(this.rentCreateDate).then((res) => {
        this.isSearchList = true
        this.closeDialog();
        this.showAlert('添加成功')
      }, (err) => {
        console.log(err)
        this.showAlert(err)
      })
      this.closeDialog()
    },
    createGuest(){
      console.log(this.objType)
      this.guestForm.effectTime2 = this.effectTime2;
      if(this.objType==0){
        /*this.guestForm.persent = this.persent;*/
        this.guestForm.sale = 0;
        this.guestProjectCreateDate.projectId = this.guestForm.projectId; //项目ID
        this.guestProjectCreateDate.buildingId = this.guestForm.buildingId;  //楼栋ID
        this.guestProjectCreateDate.passengerFlow = this.guestForm.persent;//客流量
        this.guestProjectCreateDate.alesVolume = this.guestForm.sale;//销售额
        this.guestProjectCreateDate.effectTime = this.guestForm.effectTime2; //生效时间
        console.log("新增项目客销度！");
        console.log(this.guestProjectCreateDate)
        //调接口
        window.$createGuestProjectObj(this.guestProjectCreateDate).then((res) => {
          console.log(res)
          this.showAlert("新增项目客销度成功！")
          this.closeDialogKXD();
        }, (err) => {
          console.log(err)
          this.showAlert(err)
        })
        this.closeDialogKXD();
      }else if(this.objType==1){
        /*this.guestForm.persent = this.persent;*/
        this.guestFloorCreateDate.projectId = this.guestForm.projectId; //项目ID
        this.guestFloorCreateDate.buildingId = this.guestForm.buildingId;  //楼栋ID
        this.guestFloorCreateDate.floorId = this.guestForm.floorId; //楼层ID
        this.guestFloorCreateDate.passengerFlow = this.guestForm.persent;//客流量
        this.guestFloorCreateDate.alesVolume = this.guestForm.sale;//销售额
        this.guestFloorCreateDate.effectTime = this.guestForm.effectTime2; //生效时间
        console.log("新增楼层客销度！");
        console.log(this.guestFloorCreateDate)
        //调接口
        window.$createGuestFloorObj(this.guestFloorCreateDate).then((res) => {
          console.log(res)
          this.showAlert("新增楼层客销度成功！")
          this.closeDialogKXD();
        }, (err) => {
          console.log(err)
          this.showAlert(err)
        })
        this.closeDialogKXD();
        this.guestForm.sale = 0;
      }else  if(this.objType==2){
        /*this.guestForm.persent = this.persent;*/
        /*this.guestForm.sale = this.sale;*/
          this.guestBrandCreateDate.projectId = this.guestForm.projectId; //项目ID
          this.guestBrandCreateDate.buildingId = this.guestForm.buildingId;  //楼栋ID
          this.guestBrandCreateDate.floorId = this.guestForm.floorId; //楼层ID
          this.guestBrandCreateDate.formId = this.guestForm.businessFormId; //业态
          this.guestBrandCreateDate.speciesId = this.guestForm.businessSpeciesId; //业种
          this.guestBrandCreateDate.contractId = this.guestForm.brandId;//签约ID
          this.guestBrandCreateDate.passengerFlow = this.guestForm.persent;//客流量
          this.guestBrandCreateDate.alesVolume = this.guestForm.sale;//销售额
          this.guestBrandCreateDate.effectTime = this.guestForm.effectTime2; //生效时间
        console.log("新增品牌客销度！");
        console.log(this.guestBrandCreateDate)
        //调接口
        window.$createGuestBrandObj(this.guestBrandCreateDate).then((res) => {
          this.isSearchList = true
          this.showAlert("新增品牌客销度成功！")
          this.closeDialogKXD();
        }, (err) => {
          console.log(err)
          this.showAlert(err)
        })
        this.closeDialogKXD();
      }
      console.log("客销度新增---")
      console.log(this.guestForm);
      this.closeDialogKXD();
    },
    createFitted(){
      console.log("新增适配值！");
      console.log("objType:"+this.objType);
      /*this.fittedForm.businessType = this.businessType;*/
      this.fittedForm.shichangdiwei = this.shichangdiwei;
      this.fittedForm.pinpaidiwei = this.pinpaidiwei;
      this.fittedForm.pinpaixingxiang = this.pinpaixingxiang;
      this.fittedForm.zifeishoujiaolv = this.zifeishoujiaolv;
      this.fittedForm.liansuogengjindu = this.liansuogengjindu;
      this.fittedForm.kefutousu = this.kefutousu;
      this.fittedForm.qihuapeihedu = this.qihuapeihedu;
      this.fittedCreateDate.projectId = this.fittedForm.projectId; //项目ID
      this.fittedCreateDate.buildingId = this.fittedForm.buildingId; //楼栋ID
      this.fittedCreateDate.floorId = this.fittedForm.floorId; //楼层ID
      this.fittedCreateDate.formId  = this.fittedForm.businessFormId;//业态
      this.fittedCreateDate.speciesId = this.fittedForm.businessSpeciesId;//业种
      this.fittedCreateDate.contractId = this.fittedForm.brandId;//签约ID

      this.fittedCreateDate.marketVal  = this.shichangdiwei;//市场地位
      this.fittedCreateDate.brandPositioningVal = this.pinpaidiwei;//品牌定位
      this.fittedCreateDate.brandImgVal = this.pinpaixingxiang; //品牌形象
      this.fittedCreateDate.rentVal = this.zifeishoujiaolv;//租费收缴率
      this.fittedCreateDate.chainVal = this.liansuogengjindu; //连锁跟进度
      this.fittedCreateDate.customerVal  = this.kefutousu;//客服投诉率
      this.fittedCreateDate.enterpriseVal = this.qihuapeihedu; //企划配合度
      /*fittedDate.quarterVal; //适配值*/
      this.fittedCreateDate.effectTime = this.effectTime3; //生效时间

     //调接口
      window.$createFittedObj(this.fittedCreateDate).then((res) => {
        this.isSearchList = true
        this.showAlert("新增成功！")
        this.closeDialogSPZ();
      }, (err) => {
        this.showAlert(err)
      })
      this.closeDialogSPZ()
    },
    closeDialog(){
      this.floorId = ''
      this.brandId = ''
      this.rentFee = ''
      this.wuyefei = ''
      this.zhejiufei = ''
      this.rengongchengben = ''
      this.agencyFee = ''
      this.effectTime = ''
      this.dialogFormVisible = false;//清空数据
    },
    closeDialogKXD(){
      this.floorId = ''
      this.brandId = ''
      this.dialogFormVisible1 = false;//清空数据
    },
    closeDialogSPZ(){
      this.floorId = ''
      this.brandId = ''
      this.dialogFormVisible2 = false;//清空数据
    },
    showCreate() {
      dialogFormVisible: false
      dialogFormVisible1: false
      dialogFormVisible2: false
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
      window.$getAreaList().then((res) => {
        this.areaList = res
      }, (err) => {console.log(err)})
    },
    //自己添加
    // 1.区域
    areaChanged(){
      this.searchForm.projectId = ''
      this.searchForm.buildingId = ''
      this.floorId = ''
      this.myareaId = this.searchForm.areaId
      if (this.dialogFormVisible) {
        this.myareaId = this.rentForm.areaId
        /*this.dialogFormVisible = true*/
      }
      if (this.dialogFormVisible1){
        this.myareaId = this.guestForm.areaId
        /* this.dialogFormVisible1 = true;*/
      }
      if (this.dialogFormVisible2) {
        this.myareaId = this.fittedForm.areaId
        /* this.dialogFormVisible2 = true;*/
      }
      window.$getProjectListForArea(this.myareaId).then((res) => {
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
    //2.项目
    projectChanged(){
      this.searchForm.buildingId = ''
      this.floorId = ''
      window.$getBuilding(this.searchForm.projectId).then((res) => {
        this.buildingList = res
        //调用楼层
        window.$getFloorForBuilding(res[0].id).then((floorRes) => {
          this.floorList = floorRes
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
      this.speciesList = [];
      this.brandId = ''
      this.mybusinessFormId = this.searchForm.businessFormId;
      if (this.dialogFormVisible) {
        this.rentForm.businessSpeciesId = ''
        this.mybusinessFormId = this.rentForm.businessFormId;
      }
      if (this.dialogFormVisible1){
        this.guestForm.businessSpeciesId = ''
        this.mybusinessFormId = this.guestForm.businessFormId;
      }
      if (this.dialogFormVisible2) {
        this.fittedForm.businessSpeciesId = ''
        this.mybusinessFormId = this.fittedForm.businessFormId;
      }
      window.$getSpeciesSelect(this.mybusinessFormId).then((res) => {
        this.speciesList = res
      }, (err) => {
        this.showAlert(err)
      })

    },
    //业种
    speciesChanged(){
      this.brandList = ''
      this.mybusinessSpeciesId = this.searchForm.businessSpeciesId;
      if (this.dialogFormVisible) {
        this.rentForm.brandList = ''
        this.mybusinessSpeciesId = this.rentForm.businessSpeciesId;
      }
      if (this.dialogFormVisible1){
        this.guestForm.brandList = ''
        this.mybusinessSpeciesId = this.guestForm.businessSpeciesId;
      }
      if (this.dialogFormVisible2) {
        this.fittedForm.brandList = ''
        this.mybusinessSpeciesId = this.fittedForm.businessSpeciesId;
      }
      //获取品牌
      window.$getcontractIdForSpecies(this.mybusinessSpeciesId).then((res) => {
        console.log("品牌list")
        console.log(res)
        this.brandList = res
        if (this.dialogFormVisible) {
        //  for()res
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
    //品牌
    brandIdChanged(){
     // this.showAlert(this.rentForm.brandId);
    },
    createCompany() {
      this.dialogFormVisible = false
    },
    handleClick(tab, event) {
      this.type = tab.index
      console.log(this.type)
      if(this.type != 1) {
        this.objType = 2
      }

      this.searchList(1)
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
      if(type === 1){
        this.page =1
      }

      console.log(this.type)

      if (this.type == 0) {//溢租率
        console.log("溢租率-----");
        this.searchRequest.projectId = this.searchForm.projectId; //项目ID
        this.searchRequest.buildingId = this.searchForm.buildingId; //楼栋
        this.searchRequest.floorId = this.searchForm.floorId; //楼层
        this.searchRequest.businessFormId = this.searchForm.businessFormId; //业态
       /* this.searchRequest.contractId =  this.searchForm.brandId//品牌*/
        /*this.searchRequest.brandName = this.searchForm.projectId.brandName //品牌*/
        this.searchRequest.effectTime = this.effectTime;//生效时间
        this.searchRequest.contractId =this.searchForm.brandId;
        console.log("溢租率列表---sadf--"+this.searchRequest)
        this.data="";//清空数据
        window.$getRentList(this.page, this.size, this.searchRequest)
          .then((res) => {
            console.log(res)
            this.data = res
            console.log("溢租率列表")
            console.log(res)
            /*this.projectList = this.data.resultList*/
          }, (err) => {
            console.log(err)
          })
      } else if (this.type == 1){//客销度
      console.log(this.objType)
        //调接口
        this.searchRequest.projectId = this.searchForm.projectId; //项目ID
        this.searchRequest.buildingId = this.searchForm.buildingId; //楼栋
        this.searchRequest.floorId = this.searchForm.floorId; //楼层
        this.searchRequest.businessFormId = this.searchForm.businessFormId; //业态
        this.searchRequest.brandName = this.searchForm.brandName //品牌
        this.searchRequest.effectTime = this.effectTime;//生效时间
        this.searchRequest.contractId =this.searchForm.brandId;
        console.log("客销度列表条件---sadf--"+this.searchRequest)
        this.data="";//清空数据
        if(this.objType==0){
          //调接口
          window.$getGuestProjectList(this.page, this.size, this.searchRequest)
            .then((res) => {
              console.log(res)
              this.data = res
              console.log("项目客销度列表")
              console.log(res)
              /*this.projectList = this.data.resultList*/
            }, (err) => {
              console.log(err)
            })
          this.closeDialogKXD();
        }else if(this.objType==1){
          //调接口
          window.$getGuestFloorList(this.page, this.size, this.searchRequest)
            .then((res) => {
              console.log(res)
              this.data = res
              console.log("楼层客销度列表")
              console.log(res)
              /*this.projectList = this.data.resultList*/
            }, (err) => {
              console.log(err)
            })
          this.closeDialogKXD();
          this.guestForm.sale = 0;
        }else  if(this.objType==2) {
          //品牌接口
          window.$getGuestBrandList(this.page, this.size, this.searchRequest)
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
      } else if (this.type == 2) {//适配值
      console.log(this.objType)
        //调接口
        window.$getFittedList(this.page, this.size, this.searchRequest)
          .then((res) => {
            console.log(res)
            this.data = res
            console.log("适配值列表")
            console.log(res)
            /*this.projectList = this.data.resultList*/
          }, (err) => {
            console.log(err)
          })
      }


     /* if(this.businessType === 1){

      } else if(this.businessType === 2){
        if(!this.searchForm.different){
          this.showAlert('请选择维度');
        } else {
          url = '/guestverssion/find/guestverssion/list'
        }
      } else if(this.businessType === 3){

      }*/
    },
    deleteRent(id){
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      this.loading = true
        window.$deleteRent(id).then((res) => {
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
      }).catch(() => {
                  
      })
    },
    deleteGuest(){
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(this.objType==0){
          this.loading = true
          window.$deleteProjectGuest(id).then((res) => {
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
        }else if(this.objType==1){
          this.loading = true
          window.$deleteFloorGuest(id).then((res) => {
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
        }else if(this.objType==3){
          this.loading = true
          window.$deleteBrandGuest(id).then((res) => {
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
        }
      }).catch(() => {
                  
      })
    },
    deleteFitted(id){
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      this.loading = true
      window.$deleteFitted(id).then((res) => {
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
      }).catch(() => {
                  
      })
    },
    // 查看详情
    showDetails (id) {
      this.showAlert(id);
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
    showAlert: function (cont) {
      this.$alert(cont, '温馨提示', {
        confirmButtonText: '确定',
        callback: action =>{
          if(this.isSearchList){
            this.isSearchList = false
            this.searchList(1)
          }
        }
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
  h4{
    font-size: 20px;
    font-weight: 800;
  }
  .el-dialog__footer{
    text-align: center;
  }
  .yzl{
      margin: 0 auto;
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
  .el-tabs__content {
    overflow: inherit;
  }
</style>
