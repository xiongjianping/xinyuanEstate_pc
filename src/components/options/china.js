import _ from 'lodash'

var datamap=[
        { name: '北京', value: [0, 0, 0, 0, 0], id: 1 },
        { name: '天津', value: [0, 0, 0, 0, 0], id: 2 },
        { name: '上海', value: [0, 0, 0, 0, 0], id: 3 },
        { name: '重庆', value: [0, 0, 0, 0, 0], id: 4 },
        { name: '河北', value: [0, 0, 0, 0, 0], id: 5 },
        { name: '河南', value: [0, 0, 0, 0, 0], id: 6 },
        { name: '云南', value: [0, 0, 0, 0, 0], id: 7 },
        { name: '辽宁', value: [0, 0, 0, 0, 0], id: 8 },
        { name: '黑龙江', value: [0, 0, 0, 0, 0], id: 9 },
        { name: '湖南', value: [0, 0, 0, 0, 0], id: 10 },
        { name: '安徽', value: [0, 0, 0, 0, 0], id: 11 },
        { name: '山东', value: [0, 0, 0, 0, 0], id: 12 },
        { name: '新疆', value: [0, 0, 0, 0, 0], id: 13 },
        { name: '江苏', value: [0, 0, 0, 0, 0], id: 14 },
        { name: '浙江', value: [0, 0, 0, 0, 0], id: 15 },
        { name: '江西', value: [0, 0, 0, 0, 0], id: 16 },
        { name: '湖北', value: [0, 0, 0, 0, 0], id: 17 },
        { name: '广西', value: [0, 0, 0, 0, 0], id: 18 },
        { name: '甘肃', value: [0, 0, 0, 0, 0], id: 19 },
        { name: '山西', value: [0, 0, 0, 0, 0], id: 20 },
        { name: '内蒙古', value: [0, 0, 0, 0, 0], id: 21 },
        { name: '陕西', value: [0, 0, 0, 0, 0], id: 22 },
        { name: '吉林', value: [0, 0, 0, 0, 0], id: 23 },
        { name: '福建', value: [0, 0, 0, 0, 0], id: 24 },
        { name: '贵州', value: [0, 0, 0, 0, 0], id: 25 },
        { name: '广东', value: [0, 0, 20000, 6000, 40], id: 26 },
        { name: '青海', value: [0, 0, 0, 0, 0], id: 27 },
        { name: '西藏', value: [0, 0, 0, 0, 0], id: 28 },
        { name: '四川', value: [0, 0, 0, 0, 0], id: 29 },
        { name: '宁夏', value: [0, 0, 0, 0, 0], id: 30 },
        { name: '海南', value: [0, 0, 0, 0, 0], id: 31 },
        { name: '台湾', value: [0, 0, 0, 0, 0], id: 32 },
        { name: '香港', value: [0, 0, 0, 0, 0], id: 33 },
        { name: '澳门', value: [0, 0, 0, 0, 0], id: 34 },
        { name: '贵州', value: [0, 0, 0, 0, 0], id: 35 }
      ]

//去除Chian中海南诸岛的显示并且设置无数据省区域点击后颜色同地图本身颜色相同
var convertData = function(data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i].value[2] == 0 && data[i].value[3] == 0 && data[i].value[4] == 0) {
      res.push({
        name: data[i].name,
        itemStyle: {
          normal: {
            borderColor: '#14d1fe'
          },
          emphasis: {
            areaColor: '#0c2634'
          }
        }
      });
    }
  }
  // res.push({
  //   name: '南海诸岛',
  //   itemStyle: {
  //     normal: {
  //       opacity: 0
  //     },
  //   }
  // })
  console.log(res)
  return res;
};

var chinamap = function(myChart) {
  myChart.clear()
  myChart.off('click')
  myChart.setOption({
    visualMap: {
      show: false,
      min: 0,
      max: 100000,
      left: 'left',
      top: 'bottom',
      text: ['High', 'Low'],
      seriesIndex: [0],
      dimension: 2,
      inRange: {
        color: ['#0c2634', '#5F99FF', '#2F5FFE', '#982F7F', '#FE0001']
      },
      calculable: true
    },
    geo: {
      map: "chian",
      // left: 20,
      // right: 90,
      top: 20,
      bottom: 10,
      label: {
        emphasis: {
          show: false
        }
      },
      scaleLimit: {
        min: 1,
        max: 400,
      },
      roam: true, //缩放和平移漫游
      itemStyle: {
        normal: {
          borderColor: '#fff'
        },
        emphasis: {
          color: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [{
              offset: 0,
              color: '#15fcd4' // 0% 处的颜色
            }, {
              offset: 1,
              color: '#28c6f4' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          },
        },
      },
      // silent: true,//坐标轴是否是静态无法交互
      regions: convertData(datamap)
    },
    series: [{
      name: 'categoryA',
      type: 'map',
      geoIndex: 0,
      data: datamap,
    }],
  })
}
export default chinamap;
