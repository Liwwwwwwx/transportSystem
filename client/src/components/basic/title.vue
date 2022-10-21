<template>
  <!-- 页面标题组件 -->
  <div class="title">
    <div class="header">
      <span>{{title}}</span>
      <div class="btn">
        <slot name="button"></slot>
      </div>
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
.title {
  width: 100%;
  background-color: #F3F3F3;
  height: 50px;
}

.header {
  width: 1100px;
  background-color: #F3F3F3;
  height: 50px;
  font-size: 18px;
  line-height: 50px;
  color: #464C5B;
  text-align: left;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.header>span {
  padding-left: 15px;
}

</style>
