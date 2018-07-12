<template>
  <div class="row">
    <div class="col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
      <div class="box box-primary" v-loading="Loading" element-loading-text="正在加载中...">
        <div class="box-body">
          <div class="row">
            <div class="col-md-6 col-sm-6 col-xs-12">
              <div class="form-group" :class="{'has-error':nowTitleTips}">
                <label for="title">标题</label>
                <input type="text" class="form-control" id="title" v-model.trim="nowTitle">
                <span class="help-block" style="text-align:center" v-show="nowTitleTips">{{nowTitleTips}}</span>
              </div>
            </div>
            <div class="col-md-4 col-md-offset-2 col-sm-4 col-sm-offset-2 col-xs-12">
              <div class="form-group">
                <label>直接发送</label>
                <div class="input-group radio-height">
                  <el-switch v-model="isSave" on-color="#13ce66" off-color="#ff4949" on-text="是"
                  off-text="否"></el-switch>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6  col-sm-6  col-xs-12">
              <div class="form-group" :class="{'has-error':targetTips}">
                <label>选择人员</label>
                <el-cascader :options="perTree" @active-item-change="handleItemChange" filterable @change="selectPerson"
                             style="width:100%;border-radius:0" placeholder="请选择转发人员..."></el-cascader>
              </div>
            </div>
            <div class="col-md-6  col-sm-6  col-xs-12">
              <div class="form-group" :class="{'has-error':targetTips}">
                <label>已选人员</label>
                <el-select v-model="per_label" @change="changePerson" filterable multiple remote
                           placeholder="请在左侧选择人员..."></el-select>
                <span class="help-block" style="text-align:center" v-show="targetTips">{{targetTips}}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6  col-sm-6  col-xs-12">
              <el-upload class="upload-demo" :on-remove="removeThis" ref="imgUpload" :on-success="removeBefore"
                         action="/gxsz_office/index.php?g=document&m=Admindocument&a=uploadfile" :file-list="fileArr">
                <el-button size="small" type="primary">上传附件</el-button>
              </el-upload>
              <div slot="tip" class="el-upload__tip">文件个数限制:1</div>
            </div>
          </div>
          <div class="row rich-textarea">
            <div class="col-md-12  col-sm-12 col-xs-12">
              <VueUEditor v-if="DataObj" @ready="editorReady"></VueUEditor>
            </div>
          </div>
          <div class="button-wrapper">
            <button type="button" class="btn btn-primary submit" @click="formSubmit()">提 交</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VueUEditor from 'vue-ueditor';
  VueUEditor.props.ueditorPath.default="/gxsz_office/tpl_admin/simpleboot/Office/static/ueditor1_4_3_3/"
  export default {
    name: 'addPost',
    data() {
      return {
        Loading: true,
        loading: false,
        perArr: [],
        schArr: [],
        depArr: [],
        perTree: [],
        nowSch: [],
        nowDep: [],
        per_label: [],
        nowPer: [],
        tempPerArr: [],
        nowTitle: '',
        nowContent: '',
        nowTitleTips: '',
        targetTips: '',
        isSave: false,
        fileArr: [],
        fileInfo: '',
        DataObj:''
      };
    },
    methods: {
      handleItemChange(val) {
        //请求人员列表
        var _this = this;
        if (val.length == 2) {
          //选中了某个学校下的部门,获取学校,部门ID,发起请求获取人员列表
          var sch_id = val[0];
          var dept_id = val[1];
          //配置发送请求
          var configForPerson = {
            method: 'post',
            url: '/index.php?g=General&m=Common&a=get_people_list',
            params: {
              "sch_id": sch_id,
              "dept_id": dept_id
            },
            "carrier": "perArr",
            "notAlert": true,
            "notLoading":true
          };
          _this.myHttp(configForPerson, function () {
            //得到了对应的人员列表之后
            _this.perTree.forEach(function (sch) {
              sch.children.forEach(function (dep) {
                if (sch.value == sch_id && dep.value == dept_id) {
                  //找到对应的学校下的部门,插入人员列表
                  dep.children=_this.perArr?_this.perArr:[];
                }
              })
            })
          });
        }
      },
      //选择某个人员时,保存其value,然后把label放到右边input
      selectPerson(val) {
        var _this = this;
        var obj = {};
        //如果这个人已经在nowPer里了
        for(var i=0,len=_this.nowPer.length;i<len;i++){
              if(_this.nowPer[i]==val[2]){
                  return false;
              }
        };
        //把选中人员先用obj存起来再放到tempPerArr中
        _this.nowPer.push(val[2]);
        obj.value = val[2];
        _this.perArr.forEach(function (person) {
          //然后在人员列表中寻找对应val[2]的人员
          if (person.value == val[2]) {
            //向右侧已选人员input添加label
            _this.per_label.push(person.label);
            obj.label = person.label;
          }
        });
        //把前面记录的obj放到人员缓存数组
        _this.tempPerArr.push(obj);
      },
      //右侧已选人员发生变动时
      changePerson(leftPer) {
        //leftPer为剩下的人员
        var _this = this;
        //这个arr用来记录剩下人员的value
        var arr = [];
        if (leftPer.length - _this.tempPerArr.length < 0) {
          //表示此时人员减少
          leftPer.forEach(function (label) {
            _this.tempPerArr.forEach(function (per) {
              //找出剩下的人员
              if (per.label == label) {
                arr.push(per.value);
              }
            })
          });
          //重置nowPer数组
          _this.nowPer = arr;
        }
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
      //提交表单
      formSubmit() {
        var _this = this;
        var checkResult = _this.checkList([
          {
            "name": "nowTitle",
            "reg": ["notnull"]
          }
        ]);
        //保证发布对象不能为空
        _this.targetTips = _this.nowSch.length == 0 && _this.nowDep.length == 0 && _this.nowPer.length == 0 ? '请至少选择一个发布对象!' : null;
        if (checkResult && !_this.targetTips) {
          _this.Loading = true;
          //发送提交表单请求
          var config = {
            method: 'post',
            url: '/index.php?g=document&m=Admindocument&a=redirectPost',
            params: {
              "doc_id":_this.$route.params.id,
              "title": _this.nowTitle,
              "content": _this.nowContent,
              "mem": _this.nowPer,
              "type": _this.isSave ? 1 : 0,
              "file_id": _this.fileInfo?_this.fileInfo.id:''
            }
          };
          _this.myHttp(config);
        }
      },
        editorReady(editorInstance) {
        var _this=this; 
        // var unwatch = _this.$watch('nowContent', function(val){
        //   editorInstance.setContent(val); unwatch();
        // });
        editorInstance.setContent(_this.nowContent); 
        editorInstance.addListener('contentChange',function(){
          _this.nowContent = editorInstance.getContent();
        });
      }
    },
    created() {
      var _this = this;
      var configForSch = {
        "method": 'get',
        "url": '/index.php?g=General&m=Common&a=get_all_school',
        // "params":{
        //   "app_type":"doc"
        // },
        "carrier": "schArr",
        "notAlert": true
      };
      var configForDep = {
        "method": 'get',
        "url": '/index.php?g=General&m=Common&a=get_dept_list',
        // "params":{
        //   "app_type":"doc"
        // },
        "carrier": "depArr",
        "notAlert": true
      };
      //请求接口获取学校列表
      _this.myHttp(configForSch,
        function () {
          //获取到学校列表之后
          _this.schArr.forEach(function (sch) {
            //为每一个学校新增一个children属性
            _this.$set(sch, 'children', []);
            //人员树中第一层(学校)赋值
            _this.perTree.push(sch);
          });
          //请求接口,获取部门列表
          _this.myHttp(configForDep,
            function () {
              //获取到部门列表之后
              _this.schArr.forEach(function (sch) {
                _this.depArr.forEach(function (dep) {
                  //再为每一个部门新增一个children属性
                  _this.$set(dep, 'children', []);
                  //人员树中的第二层(每个学校下的部门)
                  sch.children.push(dep);
                  //等待联级搜索框选中部门再请求人员列表
                });
              });
            });
        });

      var config = {
        "method": "get",
        "url": "/index.php?g=document&m=Admindocument&a=edit",
        "params": {
          "id": _this.$route.params.id
        },
        "carrier": "DataObj",
        "notAlert": true
      };
      _this.myHttp(config,
        function () {
          //初始化数据
          _this.nowTitle = _this.DataObj.title;
          _this.nowContent = _this.DataObj.content;
          _this.isSave = false;
          if(_this.DataObj.file){
           _this.fileArr.push({
             "name":_this.DataObj.file.name,
             "url":_this.DataObj.file.id
           });
           _this.fileInfo={"id":_this.DataObj.file.id,"url":_this.DataObj.file.name};
         } 
        });
    },
    components: {VueUEditor}
  }
</script>
<style scoped>
  .button-wrapper {
    margin-top: 15px;
    text-align: center;
  }

  .rich-textarea {
    margin-top: 30px;
  }

  .el-select {
    display: block;
  }
</style>
