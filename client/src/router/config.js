const RouteConfig = [
  // {
  //   path: '',
  //   name: '登录页',
  //   index: '0'
  // },
  {
    path: '/home',
    name: '首页',
    index: '1'
  },
  {
    path: '/entrust/order',
    name: '委托订单',
    index: '2'
  },
  {
    path: '',
    name: '调度派车',
    index: '3',
    children: [
      {
        path: '/dispatch/scheduling',
        name: '调度单',
        index: '3-1'
      },
      {
        path: '/dispatch/fleet',
        name: '车队管理',
        index: '3-2'
      }, {
        path: '/dispatch/transportation',
        name: '运输跟踪',
        index: '3-3'
      }, {
        path: '/dispatch/maintenance',
        name: '维修保养',
        index: '3-4'
      }, {
        path: '/dispatch/abnormal',
        name: '异常记录',
        index: '3-5'
      }, {
        path: '/dispatch/delay',
        name: '延误记录',
        index: '3-6'
      },
    ]
  },
  {
    path:'',
    name:'结算中心',
    index:'4',
    children:[
      {
        path: '/settlement/receivableCost',
        name: '应收费用',
        index:4-1
      },
      {
        path: '/settlement/receivableAccount',
        name: '应收对账单',
        index:4-2
      },
      {
        path: '/settlement/invoicManagement',
        name: '发票管理',
        index:4-3
      }
    ]
  }
]

const PathConfig = {
  //'0': '/',
  '1': '/home',
  '2': '/entrust/order',
  '3-1': '/dispatch/scheduling',
  '3-2': '/dispatch/fleet',
  '3-3': '/dispatch/transportation',
  '3-4': '/dispatch/maintenance',
  '3-5': '/dispatch/abnormal',
  '3-6': '/dispatch/delay'
}

export { RouteConfig, PathConfig }