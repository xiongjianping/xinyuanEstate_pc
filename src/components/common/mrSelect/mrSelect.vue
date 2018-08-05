<template>
  <div class="g_select">
    <div class="select_result" @click="showTabs()">
      {{selectItem.tab_name}}
      <span :class="isClicked?'up-corner':'down-corner'"></span>
    </div>
    <ul class="select_list" v-if="isClicked">
      <li v-for="(item, index) in tabs" :key="index" @click="tabClick(index,item)">{{item.tab_name}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'mrSelect',
  props: ['tabs','clicked'],
  data() {
    return {
      selectedTime: 1,
      selectItem: this.tabs[0],
      isClicked:this.clicked
    }
  },
  watch: {
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
      this.$emit("childTab",this.selectItem,this.isClicked);
    },
    tabClick(index, item) {
      //点击事件
      this.selectItem = item;
      this.selectedTime = item.tab_id;
      this.showTabs()
      this.$emit("childTab",item.tab_id,this.isClicked);
    }
  },
  mounted() {

  }
}
</script>
<style lang="less" scoped>
.g_select{width: 100px;height: 30px;line-height: 30px;background:url("../../../assets/images/slect_line.png") no-repeat;background-size: 100% 100%;text-align: center;color: #Fff;position: relative;cursor: default;margin:0 5%;font-size: 12px;display: inline-block;
  span{width: 14px;height: 9px;position:absolute;margin:auto;right: 0;top: 0;bottom: 0;margin-right: 10%;}
  .up-corner{background:url("../../../assets/images/icon_arrow2.png") no-repeat;}
  .down-corner{background:url("../../../assets/images/icon_arrow1.png") no-repeat;}
  .select_result{}
  .select_list{position: absolute;margin: auto;left: 0;right: 0;top: 0;margin-top: 30px;background-color: rgba(0,0,0,.8);z-index: 99;
    li{cursor: default;}
  }
}
</style>
