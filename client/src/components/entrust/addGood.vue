<template>
  <!-- 添加货物 -->
  <div class="new-goods">
    <div class="new-goods-info">
      <Header title="添加货物">
        <template slot="button">
          <i @click="close" style="cursor: pointer;" class="el-icon el-icon-close"></i>
        </template>
      </Header>
      <el-form class="new-goods-info-box" label-position="right" :model="newGoodsData" :rules="rules" ref="newGoodsData"
        label-width="100px">
        <el-form-item label="货物名称" prop="goodsName">
          <el-input v-model="newGoodsData.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="goodsNumber">
          <el-input v-model="newGoodsData.goodsNumber"></el-input>
        </el-form-item>
        <el-form-item label="计量单位" prop="goodsType">
          <el-input v-model="newGoodsData.goodsType"></el-input>
        </el-form-item>
        <el-form-item label="重量(KG)" prop="goodsWeight">
          <el-input v-model="newGoodsData.goodsWeight"></el-input>
        </el-form-item>
        <el-form-item label="体积(m³)" prop="goodsVolume">
          <el-input v-model="newGoodsData.goodsVolume"></el-input>
        </el-form-item>
      </el-form>
      <div class="opera">
        <el-button @click="confirm('newGoodsData',handleIndex)" type="primary">确定</el-button>
        <el-button @click="close">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
// 组件引用
import Header from '@/components/header';

export default {
  name: 'addGood',
  components: {
    'Header': Header, // 信息标题组件
  },
  props: {
    goodsInfo: { // 父组件选择的货物信息
      type: Object,
      default: () => { }
    },
    handleIndex:{ // 父组件选择货物信息的index
      type:Number,
      default:-1
    }
  },
  data() {
    return {
      isActive: true,
      newGoodsData: {  // 货物信息
        goodsName: '',
        goodsNumber: '',
        goodsType: '',
        goodsWeight: '',
        goodsVolume: ''
      },
      rules: {
        goodsName: [{ required: true, message: '请输入货物名称', trigger: 'blur' }],
        goodsNumber: [{ required: true, message: '请输入货物数量', trigger: 'blur' }],
        goodsType: [{ required: true, message: '请输入计量单位', trigger: 'blur' }],
        goodsWeight: [{ required: true, message: '请输入货物重量', trigger: 'blur' }],
        goodsVolume: [{ required: true, message: '请输入货物体积', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    if (Object.keys(this.goodsInfo).length !== 0) {
      this.newGoodsData = this.goodsInfo
    }
  },
  methods: {
    // 确认提交
    confirm(val,handleIndex) {
      console.log(handleIndex);
      this.$refs[val].validate((valid) => {
        if (valid) {
          if(handleIndex < 0) {
            this.$emit('confirmGoodsData', this.newGoodsData)
          } else {
            this.$emit('editGoodsData', this.newGoodsData, this.handleIndex)
          }
        }
      })
    },
    // 关闭组件
    close() {
      console.log("关闭");
      this.$emit('changeNewGoodsActive')
    },
  },
}
</script>
<style scoped>
.new-goods {
  background: rgba(47, 79, 79, 0.6);
  width: 100%;
  height: 10000px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}

.new-goods-info {
  position: fixed;
  left: 50%;
  top: 100px;
  transform: translateX(-50%);
  width: 500px;
  height: 450px;
  border: 1px solid #e4e4e4;
  opacity: 1;
  background-color: #ffffff;
}

.new-goods-info-box {
  border-bottom: 1px solid #e4e4e4;
}

.new-goods-info-box>>>.el-form-item {
  width: 80%;
  margin: 20px auto;
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
</style>
