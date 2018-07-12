<template>
  <div class="movie">
    <div class="tab">
      <div class="tab-item">
        <router-link to="/movie/TOP" class="link">TOP250</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/movie/heat" class="link">正在热映</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/movie/upcoming" class="link">即将上映</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: "movie"
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .tab{
    display:flex;
    width:100%;
    height:40px;
    line-height:40px;
    background: #2196f3;
    .tab-item{
      flex:1;
      text-align:center;
      &.active{
        border-bottom:1px solid red;
      }
      .link{
        display:block;
        text-decoration: none;
        font-size:14px;
        color:#fff;
      }
    }
  }



</style>
