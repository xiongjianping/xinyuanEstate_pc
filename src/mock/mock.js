const Mock = require('mockjs')
//使用mockjs模拟数据

Mock.mock('/api/china_list', (req, res) => {
  return {
    code: 0,
    msg: '',
    data: {
      id: 0,
      name: 'china',
      datamap: [
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
    }
  }
})
