<template>
  <!-- 添加货物 -->
  <div class="new">
    <div class="new-info">
      <Header :title="title">
        <template slot="button">
          <i @click="close" style="cursor: pointer;" class="el-icon el-icon-close"></i>
        </template>
      </Header>
      <el-form class="new-info-content" :rules="rules" label-position="right" :model="newData"
        ref="newData" label-width="110px">
        <div v-if="title=='添加货物'">
          <el-form-item label="货物名称" prop="goodsName">
            <el-input v-model="newData.goodsName"></el-input>
          </el-form-item>
          <el-form-item label="数量" prop="goodsNumber">
            <el-input v-model="newData.goodsNumber"></el-input>
          </el-form-item>
          <el-form-item label="计量单位" prop="goodsType">
            <el-input v-model="newData.goodsType"></el-input>
          </el-form-item>
          <el-form-item label="重量(KG)" prop="goodsWeight">
            <el-input v-model="newData.goodsWeight"></el-input>
          </el-form-item>
          <el-form-item label="体积(m³)" prop="goodsVolume">
            <el-input v-model="newData.goodsVolume"></el-input>
          </el-form-item>
        </div>
        <div v-else>
          <el-form-item label="费用名称" prop="costName">
            <el-input v-model="newData.costName"></el-input>
          </el-form-item>
          <el-form-item label="税率(%)" prop="rate">
            <el-input v-model="newData.rate"></el-input>
          </el-form-item>
          <el-form-item label="价税合计(元)" prop="cost">
            <el-input v-model="newData.cost"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div class="opera">
        <el-button @click="confirm('newData',handleIndex)" type="primary">确定</el-button>
        <el-button @click="close">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
// 组件引用
import Header from '@/components/basic/header';

export default {
  name: 'newData',
  components: {
    'Header': Header, // 信息标题组件
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    handleIndex:{
      type:Number,
      default:-1
    },
    handleData:{
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      newData: {},
      newTitle:'',
      rules: {
        // 货物信息校验
        goodsName: [{ required: true, message: '请输入货物名称', trigger: 'blur' }],
        goodsNumber: [{ required: true, message: '请输入货物数量', trigger: 'blur' }],
        goodsType: [{ required: true, message: '请输入计量单位', trigger: 'blur' }],
        goodsWeight: [{ required: true, message: '请输入货物重量', trigger: 'blur' }],
        goodsVolume: [{ required: true, message: '请输入货物体积', trigger: 'blur' }],
        // 费用信息校验
        costName: [{ required: true, message: '请输入费用信息', trigger: 'blur' }],
        rate: [{ required: true, message: '请输入税率', trigger: 'blur' }],
        cost: [{ required: true, message: '请输入加税合计', trigger: 'blur' }],
      },
    }
  },
  mounted() {
    if (Object.keys(this.handleData).length !== 0) {
      this.newData = Object.assign({},this.handleData)
    }else{
      this.newData = this.title == '添加货物' ? {  // 货物信息
      goodsName: '',
      goodsNumber: '',
      goodsType: '',
      goodsWeight: '',
      goodsVolume: ''
    } : { // 费用信息
      costName: '',
      rate: null,
      cost: null
    }
    }
  },
  methods: {
    // 确认提交
    confirm(val,handleIndex) {
      this.$refs[val].validate((valid) => {
        if (valid) {
          if(handleIndex < 0) {
            this.$emit('confirmData',this.newData,this.title)
          }else{
            this.$emit('editData', this.newData, this.handleIndex,this.title)
          }
        } else {
          console.log('添加失败');
        }
      })
    },
    // 关闭组件
    close() {
      console.log("关闭");
      this.$emit('changeActive')
    },
  },
}
</script>
<style scoped>
.new {
  background: rgba(47, 79, 79, 0.6);
  width: 100%;
  height: 10000px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}

.new-info {
  position: fixed;
  left: 50%;
  top: 100px;
  transform: translateX(-50%);
  width: 500px;
  border: 1px solid #e4e4e4;
  opacity: 1;
  background-color: #ffffff;
}

.new-info-content>>>.el-form-item {
  width: 80%;
  margin: 20px auto;
}

/* 确认、取消 */
.opera {
  display: flex;
  flex-direction: row-reverse;
  justify-items: center;
  margin: 20px 0;
  padding-top: 20px;
  border-top: #e4e4e4 1px solid;
}

.opera>>>.el-button {
  width: 80px;
  margin-right: 15px;
}
</style>
