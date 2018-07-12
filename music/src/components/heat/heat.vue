<template>
  <div class="heat">
    <ul>
      <li>
        <div class="picture"></div>
        <div class="content">
          <div class="left">
            <p>复仇者联盟3：无限战争</p>
            <span>动作科幻奇幻(2018)(平均8.4分)</span>
          </div>
          <div class="right"></div>
        </div>
      </li>
      <li>
        <div class="picture"></div>
        <div class="content">
          <div class="left">
            <p>超时空同居</p>
            <span>喜剧奇幻(2018)(平均7.3分)</span>
          </div>
          <div class="right"></div>
        </div>
      </li>
      <li>
        <div class="picture"></div>
        <div class="content">
          <div class="left">
            <p>寂静之地</p>
            <span>惊悚恐怖(2018)(平均6.6分)</span>
          </div>
          <div class="right"></div>
        </div>
      </li>
      <li>
        <div class="picture"></div>
        <div class="content">
          <div class="left">
            <p>昼颜</p>
            <span>剧情爱情(2017)(平均6.4分)</span>
          </div>
          <div class="right"></div>
        </div>
      </li>
      <li>
        <div class="picture"></div>
        <div class="content">
          <div class="left">
            <p>青年马克思</p>
            <span>剧情传记历史(2017)(平均6.4分)</span>
          </div>
          <div class="right"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "heat"
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .heat{
    width:100%;
    height:100%;
    overflow:auto;
    ul li{
      list-style:none;
      display:flex;
      margin-left:-20px;
      margin-bottom:10px;
      .picture{
        flex: 0 0 50px;
        background:url('nav.png') no-repeat;
        margin: 10px 0 0 0px;
      }
      .content{
        flex:1;
        margin:10px;
        border-bottom:1px solid #d3d3d3;
        .left{
          font-size:14px;
          font-weight:200;
          margin-top:-10px;
          line-height:14px;
          float:left;
          padding-bottom:10px;
        }
        .right{
          background:url('watch.png') no-repeat;
          float:right;
          width:40px;
          height:40px;
          margin-top:22px;
          padding-bottom:10px;
        }
      }
    }
  }



</style>
