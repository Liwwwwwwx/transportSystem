import {request} from './request';

class Order {
  // 获取分页数据
  getOrderDatas(page) {
    return request({
      url:`/order?_page=${page}&_limit=10`,
    })
  }
  // 获取详情订单数据
  getOrderIdData(orderId) {
    return request({
      url:`/order?orderId=${orderId}`,
    })
  }
  // 新增订单基本数据
  addOrder(data) {
    return request({
      url:'/order',
      method:'POST',
      data
    })
  }
  // 新增货物数据
  addGoods(data) {
    return request({
      url:'/goods',
      method:'POST',
      data
    })
  }
  // 新增费用数据
  addCost(data) {
    return request({
      url:'/orderCost',
      method:'POST',
      data
    })
  }
  // 新增订单数据
  async addNewOrder(basicInfo, goodsInfo, costInfo) {
    await this.addOrder(basicInfo)
    for (let i = 0; i < goodsInfo.length; i++) {
      await this.addGoods(goodsInfo[i])
    }
    for (let i = 0; i < costInfo.length; i++) {
      await this.addCost(costInfo[i])
    }
  }
  // 获取详情货物数据
  getGoodsDetails(orderId) {
    return request({
      url:`/goods?orderID=${orderId}`,
    })
  }
  // 获取详情费用数据
  getOrderIdCost(orderId) {
    return request({
      url:`/orderCost?orderID=${orderId}`,
    })
  }
  // 获取客户数据
  getCostomerInfo(page) {
    return request({
      url:`/customer?_page=${page}&_limit=4`,
    })
  }
}

export default new Order