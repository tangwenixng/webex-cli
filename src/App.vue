<template>
  <div id="app">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <div class="menu-right">
            <el-menu-item index="1"><router-link to='/'>首页</router-link></el-menu-item>
            <el-menu-item index="2"><router-link to='/myMeetings'>我的会议</router-link></el-menu-item>
            <el-menu-item index="3"><a href="#">我的账户</a></el-menu-item>
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
