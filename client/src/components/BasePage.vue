<template>
  <el-container>
    <el-header>
      <div class="logo">{{$store.state.programName}}</div>
      <div class="header-right">
        <!-- 用户头像 -->
        <div class="user-avator"><img src="@/assets/admin.png" alt=""></div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click">
          <span class="el-dropdown-link">
            {{ username }}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item disabled>修改密码</el-dropdown-item>
            <el-dropdown-item @click="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside width="250px">
        <div>
          <el-menu :default-active="$route.path" :collapse='false' class="el-menu-vertical-demo" router
            background-color="#464C5B" text-color="#797979" active-text-color="#ffffff">
            <template v-for="items in routers">
              <el-menu-item :index="items.path" :key="items.index" v-if="!items.children">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{items.name}}</span>
                </template>
              </el-menu-item>
              <el-submenu :key="items.index" :index="items.index" v-if="items.children && items.children.length">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{items.name}}</span>
                </template>
                <template v-for="item in items.children">
                  <el-menu-item :index="item.path" :key="item.index" v-if="item">
                    <span slot="title">{{ item.name }}</span>
                  </el-menu-item>
                </template>
              </el-submenu>
            </template>
          </el-menu>
        </div>
      </el-aside>
      <el-main>
        <slot name="title"></slot>
        <div class="main-box">
          <slot name="content"></slot>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { RouteConfig, PathConfig } from '@/router/config';
export default {
  name: 'BasePage',
  data() {
    return {
      routers: RouteConfig,
      paths: PathConfig,
      username: 'admin',
      title: ''
    }
  },
  created() {

  },
  computed: {
  },
  methods: {
    loginout() {

    },
    toIndex(title, path) {
      console.log(title)
      this.title = title
    }
  },
}
</script>
<style scoped>

/* 导航栏 */
.el-header {
  background-color: #464C5B;
  color: #fff;
  line-height: 60px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
}

.logo {
  width: 30%;
  margin-left: 55px;
}

.header-right {
  width: 10%;
  display: flex;
  justify-content: space-around;
}

/* 用户头像 */
.user-avator img {
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

/* 下拉菜单 */
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}

.el-dropdown-menu__item {
  text-align: center;
}

.el-container {
  height: 100%;
}

/* 左侧导航栏 */
.el-aside {
  background-color: #464C5B;
  text-align: center;
  line-height: 200px;
  overflow-x: hidden;
}

.el-menu {
  width: 250px;
}

.header {
  width: 100%;
  background-color: #F3F3F3;
  height: 50px;
}

.el-main {
  padding: 0px;
}

.main-box {
  width: 1100px;
  margin: 0 auto;
}
</style>
