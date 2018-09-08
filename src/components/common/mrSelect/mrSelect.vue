<template>
  <div class="g_select mt5">
    <div class="select_result" @click="showTabs()">
      {{tabs[selectedTime].name}}
      <span :class="isClicked?'up-corner':'down-corner'"></span>
    </div>
    <ul class="select_list" v-if="isClicked">
      <li v-for="(item, index) in tabs" :key="item.id" @click="tabClick(index,item)">{{item.name}}</li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'mrSelect',
    props: ['tabs','clicked'],
    data() {
      return {
        selectedTime: 0,
        //selectItem: this.tabs[0],
        isClicked:this.clicked
      }
    },
    watch: {
      tabs(val){
        this.tabs=val
      },
      clicked(val) {
        this.isClicked = val;
      },
      selectItem(val) {
        this.selectItem = val;
      }
    },
    methods: {
      showTabs(){
        if(this.isClicked== true) {
          this.isClicked = false;
        }else{
          this.isClicked = true;
        }
        this.$emit("childTab",this.selectedTime,this.isClicked);
      },
      tabClick(index, item) {
        //点击事件
        this.selectItem = item;
        this.selectedTime = index;
        this.showTabs()
        //this.$emit("childTab",index,this.isClicked);
      }
    },
    mounted() {

    }
  }
</script>
<style lang="less" scoped>
  .g_select{width: 100px;height: 30px;line-height: 30px;background:url("../../../assets/images/slect_line.png") no-repeat;background-size: 100% 100%;text-align: center;color: #Fff;position: relative;cursor: default;margin:5 10;font-size: 12px;display: inline-block;
    span{width: 14px;height: 9px;position:absolute;margin:auto;right: 0;top: 0;bottom: 0;margin-right: 10%;}
    .up-corner{background:url("../../../assets/images/icon_arrow2.png") no-repeat;}
    .down-corner{background:url("../../../assets/images/icon_arrow1.png") no-repeat;}
    .select_result{ overflow: hidden!important;
      text-overflow: ellipsis!important;
      white-space: nowrap!important;
      width: 80%!important;}
    .select_list{position: absolute;margin: auto;left: 0;right: 0;top: 0;margin-top: 30px;background-color: rgba(0,0,0,.8);z-index: 99;
      li{cursor: default;}
    }
  }
</style>
