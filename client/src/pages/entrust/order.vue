<template>
  <Base-Page>
    <template slot="title">
      <Title :title="title"></Title>
    </template>
    <template slot="content">
      <div class="filter">
        <Header title="筛选查询">
          <template slot="button">
            <div>
              <el-button>{{serachBtnInfo.issued}}</el-button>
              <el-button>{{serachBtnInfo.partTrans}}</el-button>
              <el-button>{{serachBtnInfo.inTrans}}</el-button>
              <el-button>{{serachBtnInfo.arrived}}</el-button>
            </div>
          </template>
        </Header>
        <div class="filter-container">
          <div class="filter-input">
            <el-form :model="fiflterInfo" label-width="130px">
              <el-form-item label="委托单号" prop="fiflterOrderId">
                <el-input placeholder="委托单号" v-model="fiflterInfo.fiflterOrderId"></el-input>
              </el-form-item>
              <el-form-item label="委托客户" prop="fiflterCustomer">
                <el-input placeholder="委托客户" v-model="fiflterInfo.fiflterCustomer"></el-input>
              </el-form-item>
              <el-form-item label="订单状态" prop="fiflterState">
                <el-input placeholder="订单状态" v-model="fiflterInfo.fiflterState"></el-input>
              </el-form-item>
            </el-form>
            <div class="filter-btn">
              <el-button @click="search()">查询</el-button>
              <el-button>重置</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="order">
        <Header title="数据列表">
          <template slot="button">
            <el-button @click="goToNew()">新增</el-button>
          </template>
        </Header>
        <div class="order-data">
          <template>
            <el-table :data="orderDatas" border style="width: 100%">
              <el-table-column prop="id" label="序号" width="50">
              </el-table-column>
              <el-table-column prop="orderId" label="委托单号" width="160">
              </el-table-column>
              <el-table-column prop="customer" label="委托客户" width="78">
              </el-table-column>
              <el-table-column prop="totalNumber" label="总数量" width="70">
              </el-table-column>
              <el-table-column prop="totalWeight" label="总重量(KG)" width="100">
              </el-table-column>
              <el-table-column prop="consighnor" label="发货人" width="78">
              </el-table-column>
              <el-table-column prop="consighnorPhone" label="发货人电话" width="110">
              </el-table-column>
              <el-table-column prop="startAddress" label="起点" width="108">
              </el-table-column>
              <el-table-column prop="consignee" label="收货人" width="78">
              </el-table-column>
              <el-table-column prop="consigneePhone" label="收货人电话" width="110">
              </el-table-column>
              <el-table-column prop="endAddress" label="终点" width="107">
              </el-table-column>
              <el-table-column label="操作" width="50">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row.orderId)" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10"
              layout="total, prev, pager, next, jumper" :total="100">
            </el-pagination>
          </template>
        </div>
      </div>
    </template>
  </Base-Page>
</template>
<script lang="js">
import BasePage from '@/components/BasePage';
import Title from '@/components/basic/title';
import Header from '@/components/basic/header';
import Order from '@/http/order';
import { saveData, getData } from '@/utils/localStorageUtils';
export default {
  name: 'oreder',
  components: {
    'Base-Page': BasePage,
    'Title': Title,
    'Header': Header,
  },
  data() {
    return {
      title: '委托订单',
      serachBtnInfo: {
        issued: '已下发',
        partTrans: '部分运输',
        inTrans: '运输中',
        arrived: '已到货'
      },
      fiflterInfo:{
        fiflterOrderId:null,
        fiflterCustomer:null,
        fiflterState:null,
      },
      orderDatas: [],
      currentPage: 1,
    }
  },
  created() {
    var orderData = getData('firstOrderData')
    if(orderData.length == 0 && this.fiflterInfo.fiflterCustomer !== '') {
      this.getOrderData(1, 'firstOrderData')
    }else {
      this.orderDatas = orderData
    }
  },
  methods: {
    // 页面切换
    handleCurrentChange(val) {
      if (val == 1 && this.fiflterInfo.fiflterCustomer !== '') {
        console.log(123);
        var orderData = getData('firstOrderData')
        this.orderDatas = orderData
        console.log(this.orderDatas);
      } else {
        console.log(234);
        let info = this.fiflterInfo
        info.fiflterCustomer == '' ? this.getOrderData(val, 'orderData') : this.getSerachOrder(info.fiflterCustomer, info.fiflterState, val)
      }
    },
    // 点击查看操作
    handleClick(id) {
      this.$router.push({ name: 'OrderDetail', query: { orderId: id } })
    },
    // 跳转新增订单页面
    goToNew() {
      this.$router.push({ name: 'NewOrder' })
    },
    // 查询点击事件 ps:目前不支持单条件查询
    search() {
      let info = this.fiflterInfo
      this.getSerachOrder(info.fiflterCustomer, info.fiflterState, 1)
    },
    // 获取order信息
    getOrderData(val) {
      Order.getOrderDatas(val).then(res => {
        this.orderDatas = res
      })
    },
    // 获取查询条件信息
    getSerachOrder(fiflterCustomer, fiflterState, page) {
      Order.serachOrder(fiflterCustomer, fiflterState, page).then(res => {
        this.orderDatas = res
        console.log(res);
        if(page == 1) {
          saveData('firstOrderData',res)
        }
      })
    }
  },
}
</script>
<style scoped>
/* 筛选查询 */
.filter {
  margin-top: 15px;
}

.filter>>>.el-button {
  margin: 0;
  padding: 0;
  width: 80px;
  height: 29px;
  font-size: 12px;
}
/* 筛选条件 */
.filter-container {
  width: 1098px;
  height: 130px;
  background-color: #ffffff;
  border: #e4e4e4 1px solid;
}

.filter-input {
  height: 35px;
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
}
.filter-input>>>.el-form {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
}

.filter-btn {
  width: 200px;
  height: 40px;
  display: flex;
  justify-content: space-around;
  justify-items: center;
  margin-top: 15px;
}

.filter-btn>>>.el-button {
  height: 40px;
}

/* 数据列表 */
.order {
  margin-top: 15px;
}

.order-data>>>.el-table th.el-table__cell,
.order-data>>>.el-table .el-table__cell {
  text-align: center;
}

/* 分页 */
.el-pagination {
  text-align: right;
}
</style>
