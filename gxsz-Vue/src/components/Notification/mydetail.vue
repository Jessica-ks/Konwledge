<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="box box-primary" v-loading="Loading" element-loading-text="正在加载中...">
        <div class="box-header">
          <h3 class="box-title">公告详情</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <div class="row">
            <div class="col-md-offset-1 col-md-10 col-sm-offset-1 col-sm-8 col-xs-12" style="text-align:center">
              <h1 style="font-weight:bold;letter-spacing:2px;font-size:26px;margin-bottom:10px;">{{DataObj.title}}</h1>
              <div class="desc-wrapper" style="margin-bottom:16px;font-size:14px;">
                <span>发表人:{{DataObj.user_nicename}}</span> <span style="margin-left:14px">发表时间:{{DataObj.publish_time}}</span>
              </div>
              <div v-html="DataObj.content" style="text-align:left;font-size:16px">
              </div>

              <div v-show="DataObj.file" style="margin-top:30px">
               <span>附件 : </span>
               <a @click="loadFile(DataObj.file.id)" :href="load_File" target="_blank" type="button" class="text" >{{DataObj.file?DataObj.file.name:''}}</a>
             </div>

              <div class="footer" style="margin-top:16px">
                <span >点击量:{{DataObj.hits}}</span> 
                <el-select  :placeholder="'总人数'+DataObj.total">
                  <el-option v-for="item in DataObj.totalman" :label="item.label" :value="item.value" :key="item.value"></el-option>
                </el-select>
                <el-select  :placeholder="'已读人数'+DataObj.readnum">
                  <el-option v-for="item in DataObj.readman" :label="item.label" :value="item.value" :key="item.value"></el-option>
                </el-select>
                <el-select  :placeholder="'未读人数'+DataObj.unreadnum">
                  <el-option v-for="item in DataObj.unreadman" :label="item.label" :value="item.value" :key="item.value"></el-option>
                </el-select>
              </div>
            </div>
          </div>
        </div>
        <!-- /.box-body -->
      </div>
    </div>
    <!-- /.col -->
  </div>
</template>

<script>
 export default{
  name:'NotiMyDetail',
  data(){
    return{
      DataObj:{},
      Loading:true,
      load_File:''
    }
  },
  methods:{
      //下载文件
      loadFile(id){
          var id= id;
          var str="/gxsz_office/index.php?g=notification&m=AdminNotification&a=storageDownload";
          str+='&id='+id;
          this.load_File=str;
      },
  },
  created(){
     var _this = this;
     //发起请求数据
     var initConfig = {
       "method": "get",
       "url": "/index.php?g=notification&m=AdminNotification&a=adminDetail",
       "params": {
         "id": _this.$route.params.id
       },
       "carrier": "DataObj",
       "notAlert": true
     };
     _this.myHttp(initConfig);
   }
  }
</script>
<style scoped>
  .input-group{
    width: 350px;
    float: right;
  }
  .input-group input{
    float: right;
    width: 150px;
  }
  .input-group input:nth-child(2){
    margin-right: 8px;
  }
</style>
