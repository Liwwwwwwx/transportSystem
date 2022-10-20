<template>
  <!-- 客户搜索 -->
  <div class="customer">
    <div class="customer-info">
      <Header :title="title">
        <template slot="button">
          <i @click="close" style="cursor: pointer;" class="el-icon el-icon-close"></i>
        </template>
      </Header>
      <div class="info-container">
        <div class="search">
          <Info title="委托客户编码" infoValue="请输入"></Info>
          <el-button>查询</el-button>
          <el-button>重置</el-button>
        </div>
        <div class="info-detail">
          <el-table :data="customerData" highlight-current-row @current-change="handleCurrentChangeRow"
           border style="width: 100%">
            <el-table-column prop="customerCode" label="委托客户编码" width="180">
            </el-table-column>
            <el-table-column prop="customerInfo.customerName" label="委托客户全称" width="200">
            </el-table-column>
            <el-table-column prop="customerInfo.customerCompany" label="所属公司">
            </el-table-column>
          </el-table>
          <el-pagination @current-change="handleCurrentChangePage" :current-page.sync="currentPage" :page-size="10"
            layout="total, prev, pager, next, jumper" :total="100">
          </el-pagination>
        </div>
      </div>
      <div class="opera">
        <el-button @click="confirm" type="primary">确定</el-button>
        <el-button @click="close">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
// 组件引用
import Header from '@/components/header';
import Info from '@/components/info';
// 请求引用
import Order from '@/http/order';
// 方法引用
import { saveData, getData } from '@/utils/localStorageUtils';
export default {
  name: 'serachCustomer',
  components: {
    'Header': Header,
    'Info': Info
  },
  props: {

  },
  data() {
    return {
      title: '委托客户选框',
      isActive: true,
      customerData: [],
      currentCustData: null,
      currentPage: 1
    }
  },
  created() {
    this.getCustomerInfo(1)
  },
  computed: {
  },
  methods: {
    // 关闭委托客户选框
    close() {
      this.$emit('closeBox')
    },
    // 客户信息选中
    handleCurrentChangeRow(val) {
      this.currentCustData = val;
    },
    // 委托客户信息确认，默认为当前客户信息列表的第一个
    confirm() {
      this.$emit('confirm', this.currentCustData)
    },
    handleCurrentChangePage(val) {
      this.getCustomerInfo(val)
    },
    getCustomerInfo(page) {
      Order.getCostomerInfo(page).then(res => {
        this.customerData = res
      })
    }
  },
}
</script>
<style scoped>
.customer {
  background: rgba(47, 79, 79, 0.6);
  width: 100%;
  height: 10000px;
  position: fixed;
  top: 0;
  left: 0;
}

.customer-info {
  position: fixed;
  left: 50%;
  top: 100px;
  transform: translateX(-50%);
  width: 706px;
  height: 500px;
  border: 1px solid #e4e4e4;
  opacity: 1;
  background-color: #ffffff;
}

/* 客户信息 */
.info-container {
  width: 100%;
  height: 360px;
  border-bottom: 1px solid #e4e4e4;
}

.info-container>>>.el-table .el-table__cell {
  text-align: center;
}

/* 搜索 */
.search {
  display: flex;
}

.search>>>.el-button {

  height: 40px;
  margin: 15px 5px;
}

/* 客户信息 */
.info-detail {
  width: 94%;
  margin: 0 auto;
}

/* 确认、取消 */
.opera {
  display: flex;
  flex-direction: row-reverse;
  justify-items: center;
  margin-top: 20px;
}

.opera>>>.el-button {
  width: 80px;
  margin-right: 15px;
}

.el-pagination {
  margin-top: 10px;
  text-align: right;
}
</style>
