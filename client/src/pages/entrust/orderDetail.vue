<template>
  <Base-Page>
    <template slot="title">
      <Title :title="titles.title">
        <template slot="button" class="btn">
          <el-button @click="goBack()" icon="el-icon-arrow-left">返回</el-button>
        </template>
      </Title>
    </template>
    <template slot="content">
      <div class="info">
        <Header :title="titles.basicTitle"></Header>
        <div class="info-box">
          <Info :title="basicTitle.orderId" :state="true" :infoValue="orderDetails.basicInfo.orderId"></Info>
          <Info :title="basicTitle.state" :state="true" :infoValue="orderDetails.basicInfo.state"></Info>
          <Info :title="basicTitle.customer" :state="true" :infoValue="orderDetails.basicInfo.customer"></Info>
          <Info :title="basicTitle.takeDate" :state="true" :infoValue="orderDetails.basicInfo.takeDate"></Info>
          <Info :title="basicTitle.type" :state="true" :infoValue="orderDetails.basicInfo.type"></Info>
          <Info :title="basicTitle.operationPeople" :state="true" :infoValue="orderDetails.basicInfo.operationPeople">
          </Info>
          <Info :title="basicTitle.operaDate" :state="true" :infoValue="orderDetails.basicInfo.operaDate"></Info>
        </div>
      </div>
      <div class="info">
        <Header :title="titles.consignTitle"></Header>
        <div class="info-box">
          <Info :title="basicTitle.consighnor" :state="true" :infoValue="orderDetails.basicInfo.consighnor"></Info>
          <Info :title="basicTitle.consighnorPhone" :state="true" :infoValue="orderDetails.basicInfo.consighnorPhone">
          </Info>
          <Info :title="basicTitle.startAddress" :state="true" :infoValue="orderDetails.basicInfo.startAddress"></Info>
          <Info :title="basicTitle.consignee" :state="true" :infoValue="orderDetails.basicInfo.consignee"></Info>
          <Info :title="basicTitle.consigneePhone" :state="true" :infoValue="orderDetails.basicInfo.consigneePhone">
          </Info>
          <Info :title="basicTitle.endAddress" :state="true" :infoValue="orderDetails.basicInfo.endAddress"></Info>
        </div>
      </div>
      <div class="info">
        <Header :title="titles.goodsTitle"></Header>
        <div class="info-table">
          <el-table :data="orderDetails.goodsDetails" border style="width: 100%">
            <el-table-column type="index" label="序号" width="180">
            </el-table-column>
            <el-table-column prop="goodsName" label="货物名称" width="199">
            </el-table-column>
            <el-table-column prop="goodsNumber" label="数量" width="180">
            </el-table-column>
            <el-table-column prop="goodsType" label="计量单位" width="180">
            </el-table-column>
            <el-table-column prop="goodsWeight" label="重量(KG)" width="180">
            </el-table-column>
            <el-table-column prop="goodsVolume" label="体积(m³)" width="180">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="info">
        <Header :title="titles.costTitle"></Header>
        <div class="info-table">
          <el-table :data="orderDetails.orderCost" border style="width: 100%">
            <el-table-column type="index" label="序号" width="275">
            </el-table-column>
            <el-table-column prop="costName" label="货物名称" width="275">
            </el-table-column>
            <el-table-column prop="rate" label="税率(%)" width="275">
            </el-table-column>
            <el-table-column prop="cost" label="价税合计(元)" width="274">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </template>
  </Base-Page>
</template>
<script>
import BasePage from '@/components/BasePage';
import Title from '@/components/basic/title';
import Header from '@/components/basic/header';
import Info from '@/components/basic/info';
import Order from '@/http/order';
import { saveData, getData } from '@/utils/localStorageUtils';
export default {
  name: 'oreder',
  components: {
    'Base-Page': BasePage,
    'Title': Title,
    'Header': Header,
    'Info': Info
  },
  data() {
    return {
      titles: {
        title: '订单详情',
        basicTitle: '基本信息',
        consignTitle: '收发货人信息',
        goodsTitle: '货物明细',
        costTitle: '应收费用'
      },
      basicTitle: {
        orderId: '委托订单',
        state: '当前状态',
        customer: '客户',
        takeDate: '取件日期',
        operaDate: '操作日期',
        type: '订单类型',
        operationPeople: '操作人',
        consighnor: '发货人姓名',
        consighnorPhone: '发货人联系方式',
        startAddress: '发货地址',
        consignee: '收货人姓名',
        consigneePhone: '收货人联系方式',
        endAddress: '收货地址'
      },
      orderDetails: {
        basicInfo: {}, // 委托订单详情
        goodsDetails: [], // 货物明细
        orderCost: [], // 应收费用
      },
      isShow: false // 是否显示
    }
  },
  mounted() {
    var orderId = this.$route.query.orderId
    var orderDetail = getData('orderDetails')
    if(orderId === orderDetail.basicInfo.orderId) {
      this.orderDetails = orderDetail
    }else {
      this.getOrderDetails(orderId)
    }
  },
  computed: {
  },
  methods: {
    async getOrderDetails(orderId) {
      await Order.getOrderIdData(orderId).then(res => {
        var data = res[0]
        for (let key in this.basicTitle) {
          this.orderDetails.basicInfo[key] = data[key]
        }
      })
      await Order.getGoodsDetails(orderId).then(res => {
        this.orderDetails.goodsDetails = res
      })
      await Order.getOrderIdCost(orderId).then(res => {
        this.orderDetails.orderCost = res
      })
      saveData('orderDetails',this.orderDetails)
      this.isShow = true
    },
    goBack() {
      this.$router.go(-1)
    }
  },
}
</script>
<style scoped>
.info {
  margin-top: 15px;
}

.info-box {
  border: #e4e4e4 1px solid;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.info-table>>>.el-table .el-table__cell{
  text-align: center;
  overflow: hidden;
}

.el-button:hover,
.el-button:focus {
  color: #ffffff;
  background-color: #0079FE;
}
</style>