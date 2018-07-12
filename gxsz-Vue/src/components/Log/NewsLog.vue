<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="box box-primary" v-loading="Loading" element-loading-text="正在加载中...">
<!--         <div class="box-header">
          <h3 class="box-title">新闻数据统计</h3>
        </div> -->
		<div class="box-body">
			<div id="WebSite_Log" style="width: 100%;height:400px;box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);margin-bottom:20px"></div>
			<div id="News_Log" style="width: 100%;height:400px;box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);margin-bottom:20px"></div>
			<div class="row">
			<div class="col-md-4 col-sm-12 col-xs-12" style="padding:0">
				<div id="Keyword_Log" style="width:100%;height:400px;box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);padding-top:3px;padding-left:4px;padding-right:4px">
						<h4 style="margin-top:2px;font-weight:bold; font-family: '微软雅黑';margin-bottom:3px">关键词搜索排行</h4><small style="font-size:8px;color:gray">近段时间用户搜索过的关键词</small>
						<el-table :data="keywordData" style="width: 100%">
						<el-table-column prop="keyword" label="关键词" ></el-table-column>
						<el-table-column prop="num" label="搜索次数"> </el-table-column>
						</el-table>
				</div>
			</div>
				<div class="col-md-8 col-sm-12 col-xs-12" style="padding-right:0">
				<div id="Terms_Log" style="width:100%;height:400px;box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);"></div>
				</div>
			</div>
			
			
			<div class="row">
			<div class="col-md-12 col-sm-12 col-xs-12" style="padding:0;margin-top:20px">
				<div id="Keyword_Log" style="width:100%;height:400px;box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);padding-top:3px;padding-left:4px;padding-right:4px">
						<h4 style="margin-top:2px;font-weight:bold; font-family: '微软雅黑';margin-bottom:3px">热门新闻排行 </h4><small style="font-size:8px;color:gray">近段时间点击量较多的新闻</small>
						<el-table :data="newsData" style="width: 100%">
						<el-table-column prop="title" label="标题" ></el-table-column>
						<el-table-column prop="username" label="投稿人"> </el-table-column>
						<el-table-column prop="date" label="时间"> </el-table-column>
						<el-table-column prop="hits" label="搜索次数"> </el-table-column>
						</el-table>
				</div>
				</div>
			</div>
		</div>
   </div>
 </div>
 <!-- /.col -->
</div>
</template>

<script>
import echarts from 'echarts'
// 引入柱状图
// import ('echarts/lib/chart/bar');
// // 引入提示框和标题组件
// import ('echarts/lib/component/tooltip');
// import ('echarts/lib/component/title');
  // const initConfig = {
  //   "method": "get",
  //   "url": "/index.php?g=Log&m=AdminLogPosts&a=getPostsPV",
  //   "carrier": "DataArr",
  //   "notAlert": true
  // };
 export default{
    name:'NewsLog',
    data(){
      return{
        Loading: false,
        WebSiteArr:[],
        NewsPostArr:[],
        TermPostArr:[],
        keywordData:[],
        newsData:[]
        // keywordData: [{
        //     title: '开题报告',
        //     hits: '111'
        //   }, {
        //     title: '深度学习',
        //     hits: '89'
        //   }, {
        //     title: '知识图谱',
        //     hits: '77'
        //   }, {
        //     title: '情感识别',
        //     hits: '60'
        //   }, {
        //     title: '语义分析',
        //     hits: '55'
        //   }
        //   , {
        //     title: '情感识别',
        //     hits: '45'
        //   }
        //   , {
        //     title: '软件工程',
        //     hits: '35'
        //   }],
          // newsData:[{
          // 	title:'基于深度学习的图像识别进展百度的若干实践',
          // 	postman:'hbszadmin',
          // 	time:'2017-04-04',
          // 	hits:323
          // },{
          // 	title:'基于BP神经网络的数字识别系统设计',
          // 	postman:'ddp',
          // 	time:'2017-04-03',
          // 	hits:221
          // },
          // {
          // 	title:'基于RBF神经网络的短期负荷预测研究',
          // 	postman:'xf',
          // 	time:'2017-04-01',
          // 	hits:220
          // },
          // {
          // 	title:'基于bp人工神经网络的城市人口预测',
          // 	postman:'cyl',
          // 	time:'2017-04-01',
          // 	hits:211
          // },
          // {
          // 	title:'基于神经网络的车牌识别系统',
          // 	postman:'zfq',
          // 	time:'2017-04-01',
          // 	hits:133
          // }
          // ]
        
      }
    },
    methods:{
     


    },
    created(){
     var _this = this;
     var configForKeyword={
      "method": "get",
      "url": "/index.php?g=Office&m=Indexadmin&a=getKeyWordsList",
      "carrier": "keywordData",
      "notAlert": true
    };
    _this.myHttp(configForKeyword);

    var configForNews={
      "method": "get",
      "url": "/index.php?g=Office&m=Indexadmin&a=getTopNews",
      "carrier": "newsData",
      "notAlert": true
    };
    _this.myHttp(configForNews);
  },
        //    mounted (){
        //     var myChart = echarts.init(document.getElementById('News_Log'));
        //     myChart.setOption({
        //         title: { text: 'ECharts 入门示例' },
        //         tooltip: {},
        //         xAxis: {
        //             data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        //         },
        //         yAxis: {},
        //         series: [{
        //             name: '销量',
        //             type: 'bar',
        //             data: [5, 20, 36, 10, 10, 20]
        //         }]
        //     });
        // }
   mounted(){
   	// myChart.showLoading();
   	// myChart.hideLoading();
   	var _this=this;
   	var configForWebSite={
   		"method": "get",
   		"url": "/index.php?g=Office&m=Indexadmin&a=latestVisitNum",
   		"carrier": "WebSiteArr",
   		"notAlert": true
   	};
	var WebSiteChart= echarts.init(document.getElementById('WebSite_Log'));
   	_this.myHttp(configForWebSite,function(){
   		var yArr=[];
   		var xArr=[];
   		var len=_this.WebSiteArr.length;
   		_this.WebSiteArr.forEach(function(item){
   			xArr.push(item.time);
   			yArr.push(item.num);
   		});
   	WebSiteChart.showLoading();
   	WebSiteChart.setOption({
    title:{
        text: '网站访问量',
        subtext: '近两周的每日网站点击量'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    toolbox: {
        show: true,
        feature: {
            saveAsImage: {}
        }
    },
    xAxis:  {
        type: 'category',
        boundaryGap: false,
        data: xArr
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value}'
        },
        axisPointer: {
            snap: true
        },
        scale:true
    },
    visualMap: {
        show: false,
        dimension: 0,
        pieces: [{
            lte: len%2-1,
            color: 'green'
        },{
            gt: len%2,
            lte: len,
            color: 'green'
        }]
    },
    series: [
        {
            name:'总点击量',
            type:'line',
            smooth: true,
            data: yArr
            // markArea: {
            //     data: [ [{
            //         name: '最高峰',
            //         xAxis: '03-07'
            //     }, {
            //         xAxis: '03-09'
            //     }], [{
            //         name: '最低峰',
            //         xAxis: '03-03'
            //     }, {
            //         xAxis: '03-04'
            //     }] ]
            // }
        }
    ]
});
   	   	WebSiteChart.hideLoading();
   	});

      var configForNewsPost = {
        "method": 'get',
        "url": '/index.php?g=Office&m=Indexadmin&a=newsNum',
        "carrier":"NewsPostArr",
        "notAlert":true
      };   
      	var NewsChart= echarts.init(document.getElementById('News_Log'));
      	  	NewsChart.showLoading();
      _this.myHttp(configForNewsPost,function(){
   		var yArr1=[];
   		var xArr1=[];
   		var len1=_this.NewsPostArr.length;
   		_this.NewsPostArr.forEach(function(item){
   			xArr1.push(item.time);
   			yArr1.push(item.num);
   		});
NewsChart.hideLoading();
   	NewsChart.setOption({
    title:{
        text: '新闻投稿量',
        subtext: '近两周的每日新闻投稿量'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    toolbox: {
        show: true,
        feature: {
            saveAsImage: {}
        }
    },
    xAxis:  {
        type: 'category',
        boundaryGap: false,
        data: xArr1
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value}'
        },
        axisPointer: {
            snap: true
        },
        scale:true
    },
    visualMap: {
        show: false,
        dimension: 0,
        pieces: [{
            lte: len1%2-1,
            color: 'green'
        },{
            gt: len1%2-1,
            lte: len1,
            color: 'green'
        }]
    },
    series: [
        {
            name:'总点击量',
            type:'line',
            smooth: true,
            data:yArr1
            // markArea: {
            //     data: [ [{
            //         name: '最高峰',
            //         xAxis: '03-07'
            //     }, {
            //         xAxis: '03-09'
            //     }], [{
            //         name: '最低峰',
            //         xAxis: '03-03'
            //     }, {
            //         xAxis: '03-04'
            //     }] ]
            // }
        }
    ]
});
   	     	  	
      });
 
    var configForTermPost = {
        "method": 'get',
        "url": '/index.php?g=Office&m=Indexadmin&a=getTermVisitNum',
        "carrier":"TermPostArr",
        "notAlert":true
    };
   	var TermsChart= echarts.init(document.getElementById('Terms_Log'));
   	TermsChart.showLoading();
      _this.myHttp(configForTermPost,function(){
      	var termArr=[];
      	_this.TermPostArr.forEach(function(item){
      		termArr.push(item.name);
      	});

   	TermsChart.setOption({
   		title:{
   			text: '栏目点击量',
   			subtext: '近两周的各类栏目点击量'
   		},
   		tooltip : {
   			trigger: 'item',
   			formatter: "{a} <br/>{b} : {c} ({d}%)"
   		},
   		toolbox: {
   			show: true,
   			feature: {
   				saveAsImage: {}
   			}
   		},
   		legend: {
   			orient: 'vertical',
   			left: 'right',
   			data: termArr,
   			top:'40'
   		},
   		series : [
   		{
   			name: '板块名称',
   			type: 'pie',
   			radius : '55%',
   			center: ['50%', '60%'],
   			data:_this.TermPostArr,
   			itemStyle: {
   				emphasis: {
   					shadowBlur: 10,
   					shadowOffsetX: 0,
   					shadowColor: 'rgba(0, 0, 0, 0.5)'
   				}
   			}
   		}
   		]
   	});
   		TermsChart.hideLoading();
      });


   }
   // components:{
   // 	echarts
   // }
  }
</script>
<style scoped>

</style>
