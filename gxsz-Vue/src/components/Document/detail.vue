<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="box box-primary" v-loading="Loading" element-loading-text="正在加载中...">
        <div class="box-header">
         <div class="row">
             <h3 class="box-title">公文详情</h3> 
         </div>  
        </div>
        <!-- /.box-header -->
        <div class="box-body">

          <div class="row">
            <div class="col-md-offset-2 col-md-8 col-sm-offset-2 col-sm-8 col-xs-12" style="text-align:center">
              <h2 style="font-weight:bold;letter-spacing:2px;font-size:26px;margin-bottom:10px;">{{DataObj.title}}</h2>
              <div class="desc-wrapper" style="margin-bottom:16px;font-size:14px;">
                <span>发表人:{{DataObj.user_nicename}}</span> <span
                style="margin-left:14px">发表时间:{{DataObj.create_time}}</span>
              </div>
              <div  v-html="DataObj.content" style="text-align:left;font-size:16px">
              </div>
              
              <div v-show="DataObj.file" style="margin-top:30px">
               <span>附件 : </span>
               <a @click="loadFile(DataObj.file.id)" :href="load_File" target="_blank" type="button" class="text" >{{DataObj.file?DataObj.file.name:''}}</a>
             </div>

              <div class="footer" style="margin-top:16px">
                <span>点击量:{{DataObj.hits}}</span> 
                <span style="margin-left:14px">总人数:{{DataObj.total}}</span> 
                <span style="margin-left:14px">已读人数:{{DataObj.read}}</span>
                <span style="margin-left:14px">未读人数:{{DataObj.unread}}</span>
                <span style="margin-left:14px">转发量:{{DataObj.handle}}</span>
                <el-upload class="upload-demo" :on-remove="removeThis" ref="imgUpload" :on-success="removeBefore"
                         action="/gxsz_office/index.php?g=document&m=Admindocument&a=uploadfile" :data="{'doc_id': this.$route.params.id}" :file-list="fileArr">
                反馈：<el-button size="small" type="primary" style="margin-top:16px;">上传文件</el-button>
              </el-upload>
              <div slot="tip" class="el-upload__tip">文件个数限制:1</div>
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
    name: 'NotiDetail',
    data(){
      return {
        DataObj: [],
        Loading: true,
        load_File:'',
        fileArr: [],
        fileInfo: ''
      }
    },
    methods: {
       //下载文件
      loadFile(id){
          var id= id;
          var str="/gxsz_office/index.php?g=document&m=Admindocument&a=storageDownload";
          str+='&id='+id;
          this.load_File=str;
      },
      //成功上传附件时,删除前面的附件
      removeBefore(response, file, fileList){
          var tempFile=[];
        //保存最新上传文件
        tempFile[0] = fileList[fileList.length - 1];
        //调用上传组件自身的清空所有文件
        this.$refs.imgUpload.clearFiles();
        if(response.code==0){
          //重置刚刚保存的文件
          this.fileArr=tempFile;
          //保存上传文件的回调信息
          this.fileInfo =response.data;
        }else{
          this.$message({
            "message": response.msg,
            "type": "error"
          });
        }
      },
      // 删除附件
      removeThis(file, list) {
        var _this = this;
        var config = {
          method: 'get',
          url: '/index.php?g=document&m=Admindocument&a=deletefile',
          params: {
            "file_id": _this.fileInfo.id
          }
        };
        _this.myHttp(config, function () {
          //删除成功之后,重置fileArr,fileInfo
          _this.fileArr = [];
          _this.fileInfo = '';
        });
      },
    },
    created(){
      var _this = this;
      //发起请求数据
      var initConfig = {
        "method": "get",
        "url": "/index.php?g=document&m=Admindocument&a=docReceive",
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
  .input-group {
    width: 350px;
    float: right;
  }

  .input-group input {
    float: right;
    width: 150px;
  }

  .input-group input:nth-child(2) {
    margin-right: 8px;
  }
</style>
