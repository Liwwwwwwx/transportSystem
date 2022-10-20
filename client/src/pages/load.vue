<template>
  <div class="container">
    <div class="box"></div>
    <div class="load">
      <div class="logo"></div>
      <div class="name">
        {{$store.state.programName}}
      </div>
      <div class="loadInfo">
        <el-input class="info" placeholder="请输入用户名称" clearable v-model="username">
          <i slot="prefix" class="iconfont icon-yonghuming"></i>
        </el-input>
        <el-input class="info" placeholder="请输入登录密码" show-password clearable v-model="password">
          <i slot="prefix" class="iconfont icon-tianchongxing-"></i>
        </el-input>
        <el-button @click="load" id="btn" type="primary">登录</el-button>
      </div>
    </div>
    <div class="box"></div>
  </div>
</template>
<script>
import User from '@/http/user.js';
export default {
  name: "Home",
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    load() {
      // User.getOne(this.username).then(res => {
      //   if (res[0].password == this.password) {
      //     console.log(123)
      //   }
      // })
      this.$router.push({name:'Home'})
    }
  }
};
</script>
<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%)
}

.box {
  width: 33%;
  height: 220px;
  background-color: #0079FE;
}

.load {
  width: 34%;
  height: 420px;
  background-color: #ffffff;
  border-top: 10px solid #0079FE;
  box-shadow: 0 0 5px #000;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  width: 72px;
  height: 72px;
  border: 1px solid black;
  border-radius: 50%;
  margin-top: 26px;
}

.name {
  font-size: 24px;
  font-weight: 600;
  color: #0079FE;
  text-align: center;
}

.loadInfo {
  width: 300px
}

.info {
  margin-top: 20px;
}

.info>>>.el-input__inner {
  width: 100%;
  height: 50px;
  line-height: 50px;
}

#btn {
  width: 100%;
  height: 50px;
  margin-top: 20px;
}

.info>>>.el-input__prefix {
  line-height: 50px;
}
</style>