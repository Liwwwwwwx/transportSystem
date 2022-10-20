<template>
  <!-- 信息展示组件 -->
  <div class="info-details">
    <span>{{title}}</span>
    <el-input :placeholder="infoValue" :disabled="state">
    </el-input>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    infoValue: {
      type: String,
      default: ''
    },
    state:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  computed: {
  },
  methods: {
  },
}
</script>
<style scoped>
.info-details {
  width:300px;
  display: flex;
  justify-content: space-between;
  margin: 15px 5px;
}

.info-details>span {
  width: 120px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size:12px;
  color: #999999;
}

.info-details>.el-input {
  width: 180px;
}
</style>
