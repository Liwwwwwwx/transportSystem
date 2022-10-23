// 引入 Mock
const Mock = require('mockjs')

const Random = Mock.Random

const length = 100

function dataLeft(str) {
  return Array(5 - String(str).length + 1).join('0') + str;
}

module.exports = () => {
  let data = {
    order: [], // 委托订单
    goods: [], // 货物信息
    orderCost: [], // 应收费用
    customer:[],
    scheduling: [], // 调度单
    transitInfo: [], // 中转信息
    carData: [], //车队管理
    driver: [], // 司机信息
    user: [{
      username: 'admin',
      password: '123456',
    }]
  }

  // 订单信息
  for (let i = 0; i < length; i++) {
    var Date = Random.date('yyyy-MM-dd')
    data.order.push(Mock.mock({
      id: i,
      orderId: Random.string('upper', 3) + Date.split('-').join('') + dataLeft(i),
      customer: '客户' + Random.string('number', 1),
      date: Date,
      "type|1": [
        '整车',
        '散货'
      ],
      "state|1":[
        '已下发',
        '部分运输',
        '运输中',
        '已到货'
      ],
      totalNumber: Random.integer(60, 100),
      totalWeight: Random.integer(2900, 3100),
      consighnor: Random.cname(),
      'consighnorPhone': /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/,
      startAddress: Random.city(true),
      consignee: Random.cname(),
      'consigneePhone': /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/,
      endAddress: Random.city(true),
      operationPeople:Random.cname(),
      takeDate:Date,
      operaDate:Date
    }))
  }
  // 货物明细
  function goodsInfo(i) {
    return Mock.mock({
      id: i,
      "goodsName|1": [
        '可口可乐',
        '百事可乐',
        '雪碧',
        '芬达',
        '橙汁',
        '脉动'
      ],
      orderID: data.order[parseInt(i/5)].orderId,
      goodsNumber: Random.integer(130, 180),
      goodsType: '箱',
      goodsWeight: Random.integer(2950, 3050),
      goodsVolume: Random.integer(20, 30),
    })
  }

  for (let i = 0; i < length*5; i++) {
    data.goods.push(
      goodsInfo(i),
    )
  }
  const costName = ['运费','制单费']
  // 应收费用
  for (let i = 0; i < length*2; i++) {
    data.orderCost.push(
      Mock.mock({
        id: i,
        orderID: data.order[parseInt(i/2)].orderId,
        costName: costName[i%2],
        rate: Random.integer(1, 3),
        cost: Random.integer(4000, 5000),
      })
    )
  }

  // 客户信息
  for (let i = 0; i < length; i++) {
     data.customer.push(Mock.mock({
      customerId:i,
      customerCode:'1655'+ dataLeft(Random.integer(0, 99999)),
      'customerInfo|1':[{
        customerName:'顺丰物流科技有限公司',
        customerCompany:'顺丰快递'
      },{
        customerName:'京东物流科技有限公司',
        customerCompany:'京东快递'
      },{
        customerName:'顺丰物流科技有限公司',
        customerCompany:'顺丰快递'
      },
      {
        customerName:'圆通物流科技有限公司',
        customerCompany:'圆通快递'
      },{
        customerName:'韵达物流科技有限公司',
        customerCompany:'韵达快递'
      },{
        customerName:'中国邮政物流科技有限公司',
        customerCompany:'中国邮政'
      },{
        customerName:'极兔速运物流科技有限公司',
        customerCompany:'极兔速运'
      }]
     }))
  }
  // 车队管理
  for (let i = 0; i < length; i++) {
    data.carData.push(Mock.mock({
      id: i,
      'carNumber': /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9]{1}$/,
      "carriers|1": [
        '顺丰快递',
        '京东快递',
        '圆通快递',
        '韵达快递',
        '中国邮政',
        '极兔速运'
      ],
      carOrigin: '外部车',
      'carType|1': ['厢式车', '半挂车'],
      length: Random.integer(14, 16),
      width: Random.integer(4, 6),
      height: 5,
      'fuelType|1': ['汽油', '柴油'],
      driver: Random.cname(),
      load: Random.integer(45, 55),
      volume: Random.integer(295, 305),
      'state|1': [
        '空闲',
        '任务待领取',
        '待提货',
        '提货中',
        '待发车',
        '运输中',
        '维保中',
        '禁用'
      ],
      location: Random.city(true),

    }))
  }

  // 司机信息
  for (let i = 0; i < length; i++) {
    data.driver.push(Mock.mock({
      id: i,
      driver: data.carData[i].driver,
      'sex|1': ['男', '女'],
      'eID': /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/,
      'phone': /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/
    }))
  }

  // 调度单
  for (let i = 0; i < length; i++) {
    data.scheduling.push(Mock.mock({
      id: i,
      schedulingID: Random.string('upper', 2) + Date.split('-').join('') + dataLeft(i),
      orderID: data.order[i].orderId,
      type: data.order[i].type,
      receivableStatus: '无',
      dealStatus: '无',
      state: data.carData[i].state,
      crriers: data.carData[i].crriers,
      schedulingName: Random.cname(),
      'carNumber': data.carData[i].carNumber,
      'shipDate|1': [
        '2022-09-01 10:00:00',
        '2022-09-02 10:00:00',
        '2022-09-03 10:00:00',
        '2022-09-04 10:00:00',
        '2022-09-05 10:00:00',
        '2022-09-06 10:00:00',
        '2022-09-07 10:00:00',
      ],
      'deliveryTime|1': [
        '2022-09-08 10:00:00',
        '2022-09-09 10:00:00',
        '2022-09-10 10:00:00',
        '2022-09-11 10:00:00',
        '2022-09-12 10:00:00',
        '2022-09-13 10:00:00',
        '2022-09-14 10:00:00',
      ],
      'requireTime|1': [
        '2022-09-21 10:00:00',
        '2022-09-22 10:00:00',
        '2022-09-23 10:00:00',
        '2022-09-24 10:00:00',
        '2022-09-25 10:00:00',
        '2022-09-26 10:00:00',
        '2022-09-27 10:00:00',
      ],
    }))
  }


  return data
}