<template>
  <div id="app">
    <v-header class="header"></v-header>
    <router-view></router-view>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/movie/TOP" class="link">电影</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/music" class="link">音乐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/book" class="link">书籍</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/pictures" class="link">图片</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import header from './components/header/header'
  export default {
    name: 'App',
    components: {
      'v-header': header
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .tab {
      position:fixed;
      bottom:0px;
      display:flex;
      width:100%;
      height:60px;
      line-height:60px;
      background: #2196f3;
      .tab-item{
        flex:1;
        text-align:center;
        .link{
          display:block;
          text-decoration: none;
          font-size:16px;
          color:#fff;
        }
      }
    }
</style>
