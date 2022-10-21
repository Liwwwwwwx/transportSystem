<template>
  <!-- 表单标题组件 -->
  <div class="header">
    <span>{{title}}</span>
    <div class="btn">
      <slot name="button"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
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
.header {
  width: 100%;
  background-color: #F3F3F3;
  height: 50px;
  font-size: 18px;
  line-height: 50px;
  color: #464C5B;
  text-align: left;
  display: flex;
  justify-content: space-between;
}
.header>span{
  padding-left: 15px;
  font-size: 12px;
}

.btn {
  padding-right: 10px;
}

</style>
