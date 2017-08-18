<template>
  <div id="app">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <div class="menu-right">
            <el-menu-item index="1"><router-link to='/'>首页</router-link></el-menu-item>
            <el-menu-item index="2">安排会议</el-menu-item>
            <el-menu-item index="5"><router-link to='/partner/32'>参加会议</router-link></el-menu-item>
            <el-submenu index="3">
                <template slot="title">我的会议</template>
                <el-menu-item index="3-1">我的会议</el-menu-item>
                <el-menu-item index="3-2">历史会议</el-menu-item>
            </el-submenu>
            <el-menu-item index="4"><a href="#">我的账户</a></el-menu-item>
        </div>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1'
    }
  },

  methods: {
    handleSelect(key, keyPath) {
        // console.log(key + " and " + keyPath);
        console.log(this.$moment())
    }
  }
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
.menu-right {
    float: right;
}
</style>
