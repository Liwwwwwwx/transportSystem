import {request} from './request';

class Order {
  getOrderDatas(page) {
    return request({
      url:`/order?_page=${page}&_limit=10`,
    })
  }
  getOrderIdData(orderId) {
    return request({
      url:`/order?orderId=${orderId}`,
    })
  }
  getGoodsDetails(orderId) {
    return request({
      url:`/goods?orderID=${orderId}`,
    })
  }
  getOrderIdCost(orderId) {
    return request({
      url:`/orderCost?orderID=${orderId}`,
    })
  }
  getCostomerInfo(page) {
    return request({
      url:`/customer?_page=${page}&_limit=4`,
    })
  }
}

export default new Order