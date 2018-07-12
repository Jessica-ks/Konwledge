<template>
  <div class="header">
    <div class="header-wrapper">
      <div class="menu" @click="showDetail"></div>
      <h2 class="text">movie</h2>
      <div class="exit"></div>
      <div class="detail" v-show="detailShow">
        <div class="left-wrapper">
          <div class="title">Vuejs2.0-demo</div>
          <div class="content">
            <h2 class="code">SoueceCode:</h2>
            <a class="demo" href="https://github.com/alex1504/vue2.0-demo">https://github.com/alex1504/vue2.0-demo</a>
          </div>
        </div>
        <div class="right-wrapper" @click="closeDetail"></div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "v-header",
      data() {
        return {
          detailShow:false
        }
      },
      methods:{
        showDetail(){
          this.detailShow = true;
        },
        closeDetail(){
          this.detailShow = false;
        }
      }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

.header-wrapper{
  width:100%;
  height:80px;
  display:flex;
  background-color: #2196f3;
  .menu{
    background: url("menu.png") no-repeat;
    flex: 0 0 40px;
    margin:24px;
  }
  .text{
    flex: 1;
    font-size:20px;
    font-weight:400;
    line-height: 26px;
    height:26px;
    text-align:center;
    color:rgba(255, 255, 255, .87);
  }
  .exit{
    flex: 0 0 40px;
    margin:17px;
    background: url("exit.png") no-repeat;
  }
  .detail{
    position:fixed;
    z-index:100;
    top:0;
    left:0;
    width: 100%;
    height:100%;
    overflow:auto;
    display:flex;
    .left-wrapper{
      flex: 1;
      background:#fff;
      .title{
        height: 128px;
        background:#009688;
        font-size:20px;
        font-weight:400;
        color:#fff;
        padding:20px 0 0 20px;
      }
      .content{
        background:#fff;
        .code{
          color: #009688;
          font-size: 16px;
          padding: 20px 90px;
        }
        .demo{
          color: #c62828;
          font-size:12px;
          text-decoration: underline;
          padding-left:30px;
        }
      }
    }
    .right-wrapper{
      flex: 0 0 70px;
      background:rgba(7,17,27,0.5);
    }
  }
}
</style>
