import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
var mock = new MockAdapter(axios)
mock.onGet('/list').reply(200, {
  code: '0',
  data: {
    list: [
      {
        projectName: '项目一',
        area: '华北大区',
        id: 1,
        company: '北京',
        projectleader: '李某某',
        operationleader: '李某某',
        phone: '13122009109',
        startTime: '2016-12-01',
        status: 'DISABLED'
      }, {
        projectName: '项目二',
        area: '华北大区',
        id: 2,
        company: '北京',
        projectleader: '李某某',
        operationleader: '李某某',
        phone: '13122009109',
        startTime: '2016-12-01',
        status: 'DISABLED'
      }, {
        projectName: '项目三',
        area: '华北大区',
        id: 3,
        company: '北京',
        projectleader: '李某某',
        operationleader: '李某某',
        phone: '13122009109',
        startTime: '2016-12-01',
        status: 'ENABLED'
      }
    ],
    page: 1,
    count: 22
  }
})

mock.onGet('/details').reply(200, {
  code: '0',
  data: {
    projectName: '北京项目一',
    area: '华北大区',
    id: 1,
    company: '北京',
    projectleader: '李某某',
    operationleader: '李某某',
    phone: '13122009109',
    startTime: '2016-12-01',
    status: 'DISABLED',
    lastTime: '2016-12-01',
    modifierName: '张某某',
    members: [
      {
        name: '张三',
        id: '1'
      }, {
        name: '李四',
        id: '2'
      }
    ],
    fileList: [
      {
        url: '../../'
      }
    ],
    unitList: {
      page: 1,
      count: 12,
      list: [
        {
          id: 1,
          num: '1011C',
          building: 'A座',
          floor: '一层',
          area: '123',
          brand: '阿迪达斯',
          operation: '代理',
          formats: '服装',
          status: 'DISABLED'
        }, {
          id: 2,
          num: '1012C',
          building: 'A座',
          floor: '一层',
          area: '123',
          brand: '阿迪达斯',
          operation: '代理',
          formats: '服装',
          status: 'DISABLED'
        }
      ]
    }
  }
})
