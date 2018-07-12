<template>
  <div class="row">
    <div class="col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
      <div class="box box-primary">
        <div class="box-body">
          <el-form :model="form" class="demo-form">
            <el-form-item label="反馈内容">
              <el-input type="textarea" :rows='6' v-model="form.content"></el-input>
            </el-form-item>
          </el-form>
          <div class="button-wrapper">
            <button type="button" class="btn btn-primary submit" @click="formSubmit()">提 交</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'list',
    data() {
        return {
          form: {
            content:''
          }          
        }
      },
    methods: {
      formSubmit() {
        if(this.form.content == ''){
          this.$message({
            message: '请输入反馈内容',
            type: 'warning'
          });
          return false;
        }

        var _this = this;
        var config = {
          "method": 'post',
          "url": '/index.php?g=feedback&m=feedbackadmin&a=post',
          "params": {
            "content": _this.form.content
          }

        }
        _this.myHttp(config,function(response){
          this.$message('反馈成功！');
        })
      }
    }
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
