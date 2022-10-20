<template>
  <div class="container">
    <el-form ref="result" :rules="rules" :model="result" porp="result" label-width="80px">
      <div class="selectInfo">
        <el-form-item :label="title" prop="province">
          <el-select @click.native="clearInfo()" clearable v-model="result.province" placeholder="省">
            <el-option v-for="item in address.province" :key="item.name" :index="item.name" :label="item.name"
              :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="province-info" prop="city" label-width="0">
          <el-select @click.native="searchCity()" clearable v-model="result.city" placeholder="市">
            <el-option v-for="item in address.city" :key="item.name" :index="item.name" :label="item.name"
              :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="province-info" prop="county" label-width="0">
          <el-select @click.native="searchCounty()" clearable v-model="result.county" placeholder="县/区">
            <el-option @click.native="getAddressResult()" v-for="item in address.county" :key="item.name"
              :index="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import { getAddress } from '@/http/address';
export default {
  name: 'addressinfo',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      address: {
        province: [],
        city: [],
        county: []
      },
      result: {
        province: '',
        city: '',
        county: ''
      },
      rules: {
        province: [
          { required: true, message: '请选择省份信息', trigger: 'change' },
        ],
        city: [
          { required: true, message: '请选择城市信息', trigger: 'change' },
        ],
        county: [
          { required: true, message: '请选择县区信息', trigger: 'change' },
        ]
      }
    }
  },
  created() {
    // 获取省份信息
    this.getAddressInfo('中国', 1, 'province')
  },
  computed: {
  },
  methods: {
    // 获取位置信息
    getAddressInfo(keyword, sub_main, data) {
      getAddress(keyword, sub_main).then(res => {
        this.address[data] = sub_main == 1 ? res.districts[0].districts : res.districts[0].districts[0].districts
      })
    },
    // 获取城市信息
    searchCity() {
      if(this.result.province) {
        this.getAddressInfo(this.result.province, 1, 'city')
      }
      this.result.county = ''
    },
    // 获取县城信息
    searchCounty() {
      var specialCity = ['天津市', '北京市', '重庆市', '上海市']
      var sub_main = specialCity.indexOf(this.result.city) < 0 ? 1 : 2
      if(this.result.city) {
        this.getAddressInfo(this.result.city, sub_main, 'county')
      }
    },
    // 清空城市、县城信息
    clearInfo() {
      this.result.city = ''
      this.result.county = ''
    },
    getAddressResult() {
      var results = this.result.province + this.result.city + this.result.county
      this.$emit('getAddressResult', results)
    }
  },
}
</script>
<style scoped>
.container {
  padding-left: 15px;
}

.container>>>.el-form {
  border: none !important;
}

.selectInfo {
  display: flex;
  justify-content: space-between;
}

/* .selectInfo>>>.el-select {
  width: 180px;
} */
.selectInfo>>>.el-input__inner {
  width: 260px !important;
}

</style>
