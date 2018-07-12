<template>
    <div class="upcoming">
      <ul>
        <li>
          <div class="picture"></div>
          <div class="content">
            <div class="left">
              <p>完美陌生人</p>
              <span>剧情喜剧(2016)(平均8.6分)</span>
            </div>
            <div class="right"></div>
          </div>
        </li>
        <li>
          <div class="picture"></div>
          <div class="content">
            <div class="left">
              <p>游侠索罗：星球大战外传</p>
              <span>动作科幻冒险(2018)(平均0分)</span>
            </div>
            <div class="right"></div>
          </div>
        </li>
        <li>
          <div class="picture"></div>
          <div class="content">
            <div class="left">
              <p>西小河的夏天</p>
              <span>剧情家庭(2017)(平均7.1分)</span>
            </div>
            <div class="right"></div>
          </div>
        </li>
        <li>
          <div class="picture"></div>
          <div class="content">
            <div class="left">
              <p>命运速递</p>
              <span>剧情喜剧犯罪(2015)(平均7分)</span>
            </div>
            <div class="right"></div>
          </div>
        </li>
        <li>
          <div class="picture"></div>
          <div class="content">
            <div class="left">
              <p>神偷通天</p>
              <span>喜剧悬疑古装(2018)(平均0分)</span>
            </div>
            <div class="right"></div>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "upcoming"
    }
</script>

<style scoped>
  .upcoming{
    width:100%;
    height:100%;
    overflow:auto;
  }
  ul li{
    list-style:none;
    display:flex;
    margin-left:-20px;
    margin-bottom:10px;
  }
  .picture{
    flex: 0 0 50px;
    background:url('nav.png') no-repeat;
    margin: 10px 0 0 0px;
  }
  .content{
    flex:1;
    margin:10px;
    border-bottom:1px solid #d3d3d3;
  }
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
</style>
