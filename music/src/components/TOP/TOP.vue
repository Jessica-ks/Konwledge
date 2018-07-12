<template>
  <div class="TOP">
    <ul>
      <li @click="showDetail">
        <div class="picture"></div>
        <div class="content">
          <div class="left">
            <p>肖申克的救赎</p>
            <span>犯罪剧情(1994)(平均9.6分)</span>
          </div>
          <div class="right"></div>
        </div>
      </li>
      <li @click="showDetail">
        <div class="picture"></div>
        <div class="content">
          <div class="left">
            <p>霸王别姬</p>
            <span>剧情爱情同性(1993)(平均9.5分)</span>
          </div>
          <div class="right"></div>
        </div>
      </li>
      <li @click="showDetail">
        <div class="picture"></div>
        <div class="content">
          <div class="left">
            <p>这个杀手不太冷</p>
            <span>剧情动作犯罪(1994)(平均9.4分)</span>
          </div>
          <div class="right"></div>
        </div>
      </li>
      <li @click="showDetail">
        <div class="picture"></div>
        <div class="content">
          <div class="left">
            <p>阿甘正传</p>
            <span>剧情爱情(1994)(平均9.4分)</span>
          </div>
          <div class="right"></div>
        </div>
      </li>
      <li @click="showDetail">
        <div class="picture"></div>
        <div class="content">
          <div class="left">
            <p>美丽人生</p>
            <span>剧情喜剧爱情(1997)(平均9.6分)</span>
          </div>
          <div class="right"></div>
        </div>
      </li>
    </ul>
    <div class="movieDetail" v-show="detailShow">
      <div class="header">
        <span @click="closeDetail" class="image"> < </span>
        <span class="image">肖申克的救赎</span>
      </div>
      <div class="main">
        <div class="images"></div>
        <div class="contents">
          <h2>肖申克的救赎</h2>
          <p class="texts">美国/犯罪剧情</p>
          <p class="texts">年份：1994</p>
          <p class="info">20世纪40年代末，小有成就的青年银行家安迪（蒂姆·罗宾斯 Tim Robbins 饰）因涉嫌杀害妻子及她的情人而锒铛入狱。在这座名为肖申克的监狱内，希望似乎虚无缥缈，终身监禁的惩罚无疑注定了安迪接下来灰暗绝望的人生。未过多久，安迪尝试接近囚犯中颇有声望的瑞德（摩根·弗里曼 Morgan Freeman 饰），请求对方帮自己搞来小锤子。以此为契机，二人逐渐熟稔，安迪也仿佛在鱼龙混杂、罪恶横生、黑白混淆的牢狱中找到属于自己的求生之道。他利用自身的专业知识，帮助监狱管理层逃税、洗黑钱，同时凭借与瑞德的交往在犯人中间也渐渐受到礼遇。表面看来，他已如瑞德那样对那堵高墙从憎恨转变为处之泰然，但是对自由的渴望仍促使他朝着心中的希望和目标前进。而关于其罪行的真相，似乎更使这一切朝前推进了一步…… 本片根据著名作家斯蒂芬·金（Stephen Edwin King）的原著改编。©豆瓣</p>
          <p class="man">导演：弗兰克·德拉邦特</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "TOP",
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
  .TOP{
    width:100%;
    height:100%;
    overflow:auto;
    ul{
      li{
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
    .movieDetail{
      position:fixed;
      z-index:100;
      top:0;
      left:0;
      width: 100%;
      height:100%;
      overflow:auto;
      background:#fff;
      .header{
        position:fixed;
        width:100%;
        height:70px;
        background:#2196f3;
        .image{
          font-size:24px;
          color:#fff;
          margin:30px;
          line-height:70px;
        }
      }
      .main{
        width:320px;
        margin: 80px auto;
        .images{
          width:310px;
          height:450px;
          margin:10px 0 0 10px;
          background:url("image.png") no-repeat;
        }
        .contents{
          width:310px;
          height:340px;
          margin-top:20px;
          h2{
            font-size: 24px;
            letter-spacing: 0;
            line-height: 32px;
            text-align:center;
            font-weight: 400;
          }
          .texts{
            text-align:center;
            font-size: 14px;
            margin-top:-10px;
            color:#708090;
          }
          .info{
            padding: 16px;
            font-size: 14px;
            line-height: 22px;
            text-align:center;
            color:#708090;
          }
          .man{
            width:310px;
            height:100px;
            text-align:center;
            padding:10px;
            color:#708090;
            border-top:1px solid #708090;
          }
        }
      }
    }
  }
</style>
