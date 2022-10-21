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
            <div v-for="item in filterInfo" :key="item.filterTitle">
              <Info :title="item.filterTitle" :infoValue="item.filterTitle" v-model="item.filterText"></Info>
            </div>
            <div class="filter-btn">
              <el-button>查询</el-button>
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
    'Info': Info,
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
      filterInfo: [
        {
          filterTitle: '委托单号',
          filterText: ''
        },
        {
          filterTitle: '委托客户',
          filterText: ''
        },
        {
          filterTitle: '状态',
          filterText: ''
        },
      ],
      orderDatas: [],
      currentPage: 1,
    }
  },
  mounted() {
    var orderData = getData('firstOrderData')
    if(orderData.length == 0) {
      this.getOrderData(1, 'firstOrderData')
    }else {
      this.orderDatas = orderData
    }
  },
  methods: {
    handleCurrentChange(val) {
      if (val == 1) {
        var orderData = getData('firstOrderData')
        this.orderDatas = orderData
      } else {
        this.getOrderData(val, 'orderData')
      }
    },
    handleClick(id) {
      this.$router.push({ name: 'OrderDetail', query: { orderId: id } })
    },
    getOrderData(val, name) {
      Order.getOrderDatas(val).then(res => {
        this.orderDatas = res
      })
    },
    goToNew() {
      this.$router.push({ name: 'NewOrder' })
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

.filter-input-box {
  display: flex;
  justify-content: space-between;
}

.filter-input-box>span {
  width: 120px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}

.filter-input-box>.el-input {
  width: 180px;
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
