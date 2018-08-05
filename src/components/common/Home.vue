<template>
  <div class="wrapper">
    <v-head></v-head>
    <div class="content">
      <transition name="move" mode="out-in"><router-view></router-view></transition>
    </div>
  </div>
</template>
<script>
import vHead from './Header.vue'
export default {
  components: {
    vHead
  },
  data: function () {
    return {
    }
  },
  created () {
    this.userInfo = window.localStorage.getItem('userInfo') ? JSON.parse(window.localStorage.getItem('userInfo')) : {}

  },
  destroyed () {
    clearInterval(this.intervalFn)
  },
  computed: {
  },
  methods: {
  }
}
</script>
<style>
/*.content{*/
  /*top: 80px;*/
  /*!*background: none repeat scroll 0 0 #fff;*!*/
  /*position: absolute;*/
  /*left: 0;*/
  /*right: 0;*/
  /*bottom: 0;*/
  /*width: auto;*/
  /*padding: 10px 0;*/
  /*box-sizing: border-box;*/
  /*overflow-y: scroll;*/
  /*min-width: 1000px;*/
  /*overflow-x: hidden;*/
/*}*/
  .content{
    position: relative;
    box-sizing: border-box;
    padding-top: 100px;
    height: 100%;
  }
</style>
