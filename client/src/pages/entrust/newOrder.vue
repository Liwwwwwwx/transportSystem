<template>
  <Base-Page>
    <template slot="title">
      <Title title="新增订单">
        <template slot="button">
          <el-button @click="saveOrderData()">保存</el-button>
          <el-button @click="submit('orderDetails')">提交</el-button>
        </template>
      </Title>
    </template>
    <template slot="content">
      <div>
        <el-form :model="orderDetails.basicInfo" :rules="rules" ref="orderDetails" label-width="130px">
          <!-- 基本信息 -->
          <div class="basic-info info">
            <Header title="基本信息"></Header>
            <el-form-item label="委托号单" prop="orderId">
              <el-input placeholder="委托号单" v-model="orderDetails.basicInfo.orderId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="当前状态" prop="state">
              <el-input v-model="orderDetails.basicInfo.state" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="委托客户" prop="customer" class="cust">
              <el-input v-model="orderDetails.basicInfo.customer" clearable @click.native="changeCustomerActive()">
              </el-input>
            </el-form-item>
            <el-form-item label="取件日期" prop="takeDate" class="cust">
              <el-date-picker type="date" placeholder="选择日期" v-model="orderDetails.basicInfo.takeDate"></el-date-picker>
            </el-form-item>
            <el-form-item label="订单类型">
              <el-select v-model="orderDetails.basicInfo.type">
                <el-option label="整车" value="整车"></el-option>
                <el-option label="散装" value="散车"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="操作人" prop="operatorPeople">
              <el-input placeholder="操作人姓名" v-model="orderDetails.basicInfo.operatorPeople"></el-input>
            </el-form-item>
            <el-form-item label="操作时间" prop="operaDate">
              <el-date-picker type="date" v-model="orderDetails.basicInfo.operaDate" :disabled='true'></el-date-picker>
            </el-form-item>
          </div>
          <!-- 收发货人信息 -->
          <div class="consign-info info">
            <Header title="收发货人信息"></Header>
            <!-- 发货人信息 -->
            <div class="con-info-box">
              <el-form-item label="发货人姓名" prop="consighnor">
                <el-input placeholder="发货人姓名" v-model="orderDetails.basicInfo.consighnor"></el-input>
              </el-form-item>
              <el-form-item label="发货人联系方式" prop="consighnorPhone">
                <el-input placeholder="发货人联系方式" v-model="orderDetails.basicInfo.consighnorPhone"></el-input>
              </el-form-item>
            </div>
            <!-- 收货人信息 -->
            <div class="con-info-box">
              <el-form-item label="收货人姓名" prop="consignee">
                <el-input placeholder="收货人姓名" v-model="orderDetails.basicInfo.consignee"></el-input>
              </el-form-item>
              <el-form-item label="收货人联系方式" prop="consigneePhone">
                <el-input placeholder="收货人联系方式" v-model="orderDetails.basicInfo.consigneePhone"></el-input>
              </el-form-item>
            </div>
            <!-- 选择发货人地址 -->
            <div class="address-box">
              <el-form-item prop="startAddress" width="1100px" label-width="0">
                <AddressInfo v-model="orderDetails.basicInfo.startAddress" :addressResult="orderDetails.basicInfo.startAddress" title="发货地址"
                  @getAddressResult="startAddressResult"></AddressInfo>
              </el-form-item>
            </div>
            <!-- 选择收货人地址 -->
            <div class="address-box">
              <el-form-item class="address-box" prop="endAddress" label-width="0">
                <AddressInfo v-model="orderDetails.basicInfo.endAddress" :addressResult="orderDetails.basicInfo.endAddress" title="收货地址"
                  @getAddressResult="endAddressResult"></AddressInfo>
              </el-form-item>
            </div>
          </div>
          <!-- 货物明细 -->
          <div class="goods-info info">
            <Header title="货物明细">
              <template slot="button">
                <el-button @click="addNewData('goods')">添加</el-button>
              </template>
            </Header>
            <!-- 货物信息详情 -->
            <div class="goods-info-box">
              <el-table :data="orderDetails.goodsDetails" border style="width: 100%" ref="orderDetails.goodsDetails">
                <el-table-column type="index" width="80" label="序号">
                </el-table-column>
                <el-table-column prop="goodsName" label="货物名称" width="180">
                </el-table-column>
                <el-table-column prop="goodsNumber" label="数量" width="180">
                </el-table-column>
                <el-table-column prop="goodsType" label="计量单位" width="180">
                </el-table-column>
                <el-table-column prop="goodsWeight" label="重量(KG)" width="180">
                </el-table-column>
                <el-table-column prop="goodsVolume" label="体积(m³)" width="180">
                </el-table-column>
                <el-table-column label="操作" width="120">
                  <template slot-scope="scope">
                    <el-button @click="changeDetails(scope.row,'goodsDetails')" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteData(scope.row,'goodsDetails')" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- 费用明细 -->
          <div class="cost-info info">
            <Header title="应收费用">
              <template slot="button">
                <el-button @click="addNewData('cost')">添加</el-button>
              </template>
            </Header>
            <div class="cost-info-box">
              <el-table :data="orderDetails.costDetails" border style="width: 100%" ref="orderDetails.costDetails">
                <el-table-column type="index" width="80" label="序号">
                </el-table-column>
                <el-table-column prop="costName" label="费用名称" width="300">
                </el-table-column>
                <el-table-column prop="rate" label="税率(%)" width="300">
                </el-table-column>
                <el-table-column prop="cost" label="价税合计(元)" width="300">
                </el-table-column>
                <el-table-column label="操作" width="120">
                  <template slot-scope="scope">
                    <el-button @click="changeDetails(scope.row,'costDetails')" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteData(scope.row,'costDetails')" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-form>
      </div>
      <!-- 选择客户信息 -->
      <SearchCustomer @closeBox="changeCustomerActive" @confirm="confirmCustomerInfo" v-show="isCustomerActive">
      </SearchCustomer>
      <!-- 添加货品信息 -->
      <NewData :title="newDataTitle" :handleIndex="handleIndex" :handleData="handleData" @editData="editData"
        @confirmData="confirmData" @changeActive="changeActive" v-if="isNewDataActive"></NewData>
    </template>
  </Base-Page>
</template>
<script>
// 组件
import BasePage from '@/components/BasePage';
import Title from '@/components/basic/title';
import Header from '@/components/basic/header';
import SearchCustomer from '@/components/entrust/searchCustomer';
import AddressInfo from '@/components/basic/address';
import NewData from '@/components/entrust/addNewData';
// 方法工具
import { dateToString } from '@/utils/dateUtils';
import { getUpperCharacter } from '@/utils/getCharacter';
import { randNum } from '@/utils/getRandomNum';
import { saveData, getData, deleteData } from '@/utils/localStorageUtils';
// 规则
import { checkName, checkPhone } from '@/rules/index';
// 接口
import Order from '@/http/order';


export default {
  name: 'newOreder',
  components: {
    'Base-Page': BasePage,
    'Title': Title, // 页面标题组件
    'Header': Header, // 信息标题组件
    'SearchCustomer': SearchCustomer, // 客户选择组件
    'AddressInfo': AddressInfo, // 地址选择组件
    // 'AddGoods': AddGoods, // 添加货物组件
    'NewData': NewData
  },
  data() {
    // 取件日期校验
    var checkTakeDate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('日期不能为空'))
      }
      setTimeout(() => {
        if (value.getTime() <= new Date(this.orderDetails.basicInfo.operaDate).getTime()) {
          callback(new Error('取件日期应大于操作日期'))
        }
      }, 1000)
    }
    return {
      orderDetails: {
        basicInfo: {  // 基本信息和收发货人信息
          orderId: '',
          state: '未保存',
          customer: '',
          takeDate: null,
          type: '整车',
          operatoreople: '',
          operaDate: null,
          consighnor: '',
          consighnorPhone: '',
          startAddress: '',
          consignee: '',
          consigneePhone: '',
          endAddress: ''
        },
        goodsDetails: [], // 货物明细
        costDetails: [] // 应收费用
      },
      key: 'neworder', // 订单详情key
      isCustomerActive: false, // 是否显示选择客户组件
      newDataTitle: '',
      isNewDataActive: false, // 是否显示添加信息组件
      handleData: {}, // 当前选中的货物、费用信息
      handleIndex: -1, // 当前选中货物信息的index
      rules: { // 校验规则
        operatorPeople: [
          { required: true, message: '请输入操作人姓名', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' }
        ],
        takeDate: [
          { required: true, message: '请选择取件日期', trigger: 'change' },
          { validator: checkTakeDate, trigger: 'blur' }
        ],
        consighnor: [
          { required: true, message: '请输入发货人姓名', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' }
        ],
        consignee: [
          { required: true, message: '请输入收货人姓名', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' }
        ],
        consighnorPhone: [
          { required: true, message: '请输入发货人手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        consigneePhone: [
          { required: true, message: '请输入收货人手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        customer: [
          { required: true, message: '请选择客户信息', trigger: 'change' }
        ],
        startAddress: [
          { required: true, message: '请选择发货地址信息', trigger: 'change' },
        ],
        endAddress: [
          { required: true, message: '请选择收货地址信息', trigger: 'change' },
        ]
      }
    }
  },

  created() {
    this.initData() // 初始化信息
  },
  beforeDestroy() {
    deleteData(this.key) // 删除localStorage
  },
  methods: {
    // 初始化订单信息
    initData() {
      var orderdata = getData(this.key)
      if (orderdata instanceof Array) {
        let date = new Date()
        this.orderDetails.basicInfo.operaDate = date
        let orderId = this.getOrderId(date)
        this.orderDetails.basicInfo.orderId = orderId
      } else {
        this.orderDetails = orderdata
        console.log(this.orderDetails);
      }
    },
    // 保存订单信息
    saveOrderData() {
      this.orderDetails.basicInfo.state = '已保存'
      saveData(this.key, this.orderDetails)
    },
    // 提交订单信息
    submit(val) {
      console.log(val);
      // deleteData(this.key)
      this.$refs[val].validate((valid) => {
        console.log(valid);
        if (valid) {
          console.log(this.orderDetails.goodsDetails.length);
          if (!this.orderDetails.goodsDetails.length) {
            this.$message({
              message: '请填写货物信息',
              type: 'warning'
            })
          } else if (!this.orderDetails.costDetails.length) {
            this.$message({
              message: '请填写费用信息',
              type: 'warning'
            })
          } else {
            Order.addNewOrder(this.orderDetails.basicInfo, this.orderDetails.goodsDetails, this.orderDetails.costDetails).then(res => {
              this.$message({
                message: '信息添加成功',
                type: 'success'
              })
              this.$router.go(-1)
            })
          }
        } else {
          this.$message({
            message: '请填写必要信息',
            type: 'warning'
          })
        }
      })
    },
    // 生成委托单号
    getOrderId(date) {
      let orderId = ''
      let dateStr = dateToString(date)
      for (let i = 0; i < 3; i++) {
        orderId += getUpperCharacter()
      }
      orderId += dateStr.split('-').join('') + randNum()
      return orderId
    },
    // 改变委托客户状态
    changeCustomerActive() {
      this.isCustomerActive = !this.isCustomerActive
    },
    // 确认客户信息
    confirmCustomerInfo(data) {
      this.orderDetails.basicInfo.customer = data.customerInfo.customerName
      this.isCustomerActive = false
    },
    // 获取地址信息
    startAddressResult(results) {
      this.orderDetails.basicInfo.startAddress = results
    },
    endAddressResult(results) {
      this.orderDetails.basicInfo.endAddress = results
    },
    // 添加货物信息
    addNewData(title) {
      this.newDataTitle = title == 'goods' ? '添加货物' : '添加费用'
      this.changeActive(-1)
    },

    // 点击编辑事件
    changeDetails(data, title) {
      this.newDataTitle = title == 'goodsDetails' ? '添加货物' : '添加费用'
      var index = this.orderDetails[title].indexOf(data)
      this.handleData = data
      this.changeActive(index)
    },
    // 点击删除货品信息事件
    deleteData(data, title) {
      var index = this.orderDetails[title].indexOf(data)
      this.orderDetails[title].splice(index, 1)
    },

    // 修改货品信息
    editData(data, index, title) {
      console.log(data, index, title);
      var label = title == '添加货物' ? 'goodsDetails' : 'costDetails'
      this.$set(this.orderDetails[label], index, data)
      this.isNewDataActive = !this.isNewDataActive
    },
    // 确认添加货物信息
    confirmData(data, title) {
      var label = title == '添加货物' ? 'goodsDetails' : 'costDetails'
      this.orderDetails[label].push(data)
      this.isNewDataActive = !this.isNewDataActive
    },
    // 修改添加货物页面状态 index -1：添加新货物 1获取第一行货物信息
    changeActive(index) {
      this.isNewDataActive = !this.isNewDataActive
      this.handleIndex = index
    },
  }
}
</script>
<style scoped>
.info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border: #e4e4e4 1px solid;
  width: 100%;
  margin-top: 15px;
}

.info>>>.el-table .el-table__cell {
  text-align: center;
}

/* 基本信息样式 */
.basic-info>>>.el-form-item {
  margin-top: 15px;
  margin-right: 15px;
  width: 345px;
}

.basic-info>>>.el-select {
  display: block;
}

/* 选择客户样式 */
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
  height: 490px;
  border: 1px solid #e4e4e4;
  opacity: 1;
  background-color: #ffffff;
}

.cust>>>.el-input__inner {
  cursor: pointer;
}

/* 表单样式 */
.consign-info {
  flex-direction: column;
}

.consign-info>>>.el-form-item {
  margin: 15px 25px;
  width: 330px;
}

.consign-info>>>.el-select {
  display: block;
}

.con-info-box {
  display: flex;
}

/* 地址样式 */
.address-box {
  width: 100%;
}

.address-box>>>.el-form-item__error {
  left: 120px;
}
</style>