<template>
  <base-page>
    <template slot="title">
      <Title :title="titleInfo.title"></Title>
    </template>
    <template slot="content">
      <div class="container">
        <div class="systemInfo">
          <div class="box">
            <i class="iconfont icon-huoche"></i>
            <div class="box-info">
              {{vehicleInfo.title}}<br />
              {{vehicleInfo.data}}
            </div>
          </div>
          <div class="box">
            <i class="iconfont icon-huochedong"></i>
            <div class="box-info">
              {{transitInfo.title}}<br />
              {{transitInfo.data}}
            </div>
          </div>
          <div class="box">
            <i class="iconfont icon-renwujincheng"></i>
            <div class="box-info">
              {{finishToday.title}}<br />
              {{finishToday.data}}
            </div>
          </div>
          <div class="box">
            <i class="iconfont icon-w_bili"></i>
            <div class="box-info">
              {{teamLoad.title}}<br />
              {{teamLoad.data}}
            </div>
          </div>
        </div>
        <div class="common">
          <headers :title="titleInfo.commonTitle"></headers>
          <div class="common-card">
            <div class="common-box" @click="toIndex(routers[1].path)">
              <i class="el-icon-menu"></i>
              <p>{{routers[1].name}}</p>
            </div>
            <div class="common-box" @click="toIndex(item.path)" v-for="item in routers[2].children" :key="item.index"
              :index="item.path">
              <i class="el-icon-menu"></i>
              <p>{{item.name}}</p>
            </div>
            <div class="common-box" @click="toIndex(routers[3].children[0].path)">
              <i class="el-icon-menu"></i>
              <p>{{routers[3].children[0].name}}</p>
            </div>
          </div>
        </div>
        <div class="vehicleInfo">
          <div class="vehicle-box">
            <headers :title="titleInfo.vehicleState"></headers>
            <div class="vehicle-box-info" v-for="item in dynamicData" :key="item.id" :index="item.id">
              <span>{{item.vehicleNumber}} {{item.state}}</span>
              <span style="color:#A1A1A1;">{{item.date}}</span>
            </div>
          </div>
          <div class="vehicle-box">
            <headers :title="titleInfo.abnormalTitle"></headers>
            <div class="vehicle-box-info" v-for="item in abnormalData" :key="item.id" :index="item.id">
              <span>{{item.vehicleNumber}} {{item.abnormalInfo}}</span>
              <span style="color:#A1A1A1;">{{item.date}}</span>
            </div>
          </div>
        </div>
        <div class="realTime">
          <headers :title="titleInfo.realTimeTitle"></headers>
        </div>
      </div>
    </template>
  </base-page>
</template>
<script>
import BasePage from '@/components/BasePage';
import Header from '@/components/basic/header';
import Title from '@/components/basic/title';
import { RouteConfig } from '@/router/config';
export default {
  name: 'home',
  components: {
    'base-page': BasePage,
    'headers': Header,
    'Title': Title
  },
  data() {
    return {
      titleInfo: {
        title: '??????',
        commonTitle: '????????????',
        vehicleState: '????????????',
        abnormalTitle: '????????????',
        realTimeTitle: '???????????????'
      },
      vehicleInfo: {
        title: '??????????????????',
        data: 4957
      },
      transitInfo: {
        title: '??????????????????',
        data: 8355
      },
      finishToday: {
        title: '??????????????????',
        data: 8300.00
      },
      teamLoad: {
        title: '????????????',
        data: '89.34%'
      },
      routers: RouteConfig,
      dynamicData: [{
        id: 1,
        vehicleNumber: '???A99999',
        state: '???????????????',
        date: '2020-05-01 10:00:00'
      }, {
        id: 2,
        vehicleNumber: '???A99999',
        state: '???????????????',
        date: '2020-05-01 10:00:00'
      }, {
        id: 3,
        vehicleNumber: '???A99999',
        state: '???????????????',
        date: '2020-05-01 10:00:00'
      }],
      abnormalData: [{
        id: 1,
        vehicleNumber: '???A99999',
        abnormalInfo: '??????????????????',
        date: '2020-05-01 10:00:00'
      }, {
        id: 2,
        vehicleNumber: '???A99999',
        abnormalInfo: '????????????',
        date: '2020-05-01 10:00:00'
      }, {
        id: 3,
        vehicleNumber: '???A99999',
        abnormalInfo: '????????????',
        date: '2020-05-01 10:00:00'
      }]
    }
  },
  created() {
  },
  computed: {
  },
  methods: {
    toIndex(path) {
      this.$router.push(path)
    }
  },
}
</script>
<style scoped>
/* ???????????? */
.container {
  display: flex;
  flex-direction: column;
  justify-items: center;
}

/* ???????????????????????? */
.systemInfo {
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.box {
  width: 250px;
  height: 100px;
  cursor: pointer;
  border: 1px solid #E4E4E4;
  display: flex;
  justify-content: space-around;
  justify-items: center;
}

.box>>>.iconfont {
  font-size: 48px;
  padding-top: 25px;
}

.box-info {
  height: 50px;
  padding-top: 25px;
  font-size: 18px;
}

/* ???????????? */
.common {
  margin-top: 20px;
}

.common-card {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.common-box {
  width: 112px;
  height: 115px;
  border: #E4E4E4 1px solid;
  color: #E4E4E4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  cursor: pointer;
}

.common-box:hover {
  color: black;
}

.common-box>i {
  font-size: 48px;
}

/* ??????????????????????????? */
.vehicleInfo {
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.vehicle-box {
  width: 45%;
  height: 200px;
  border: #E4E4E4 1px solid;
}

.vehicle-box-info {
  display: flex;
  justify-content: space-between;
  width: 481px;
  height: 40px;
  line-height: 40px;
  border-bottom: #E4E4E4 1px solid;
  margin: 5px auto;
  font-size: 13px;
}

/* ??????????????? */
.realTime {
  margin-top: 20px;
}
</style>
