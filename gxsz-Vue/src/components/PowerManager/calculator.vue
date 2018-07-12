<template>
  <div id="calculator" 
    @keyup.enter="operator('result')" 
    @keyup.46="operator('backspace')"
    @keyup.96="typetoinput('0')"
    @keyup.97="typetoinput('1')"
    @keyup.98="typetoinput('2')"
    @keyup.99="typetoinput('3')"
    @keyup.100="typetoinput('4')"
    @keyup.101="typetoinput('5')"
    @keyup.102="typetoinput('6')"
    @keyup.103="typetoinput('7')"
    @keyup.104="typetoinput('8')"
    @keyup.105="typetoinput('9')"
    @keyup.107="operator('plus')"
    @keyup.106="operator('multiply')"
    @keyup.109="operator('minus')"
    @keyup.110="typetoinput('.')"
    @keyup.111="operator('divide')"
    tabindex="0" v-focus>
    <!--显示框-->
    <input-box v-bind:input-show="inputShow">
    </input-box>
    <btn-list>
      <div v-on:click="operator('clear')"  class=" btn-30 btn-radius color-red clear-marginleft">C</div>
      <div v-on:click="operator('opposite')" class=" btn-30 btn-radius color-blue">+/-</div>
      <div v-on:click="operator('percent')" class=" btn-30 btn-radius color-blue">%</div>
      <div v-on:click="operator('backspace')" class=" btn-70 btn-radius color-red font-14">←</div>
      <div v-on:click="typetoinput('7')" class=" btn-30 btn-radius clear-marginleft">7</div>
      <div v-on:click="typetoinput('8')" class=" btn-30 btn-radius">8</div>
      <div v-on:click="typetoinput('9')" class=" btn-30 btn-radius">9</div>
      <div v-on:click="operator('plus')" class=" btn-30 btn-radius color-blue font-14">+</div>
      <div v-on:click="operator('minus')" class=" btn-30 btn-radius color-blue font-14">-</div>
      <div v-on:click="typetoinput('4')" class=" btn-30 btn-radius clear-marginleft">4</div>
      <div v-on:click="typetoinput('5')" class=" btn-30 btn-radius">5</div>
      <div v-on:click="typetoinput('6')" class=" btn-30 btn-radius">6</div>
      <div v-on:click="operator('multiply')" class=" btn-30 btn-radius color-blue font-14">×</div>
      <div v-on:click="operator('divide')" class=" btn-30 btn-radius color-blue font-12">÷</div>
      <div v-on:click="typetoinput('1')" class=" btn-30 btn-radius clear-marginleft">1</div>
      <div v-on:click="typetoinput('2')" class=" btn-30 btn-radius">2</div>
      <div v-on:click="typetoinput('3')" class=" btn-30 btn-radius">3</div>
      <div v-on:click="operator('pow')" class=" btn-30 btn-radius color-blue font-14">×²</div>
      <div v-on:click="operator('sqrt')" class=" btn-30 btn-radius color-blue font-12">√</div>
      <div v-on:click="typetoinput('0')" class=" btn-70 btn-radius clear-marginleft">0</div>
      <div v-on:click="typetoinput('.')" class=" btn-30 btn-radius">.</div>
      <div v-on:click="operator('result')" class=" btn-70 btn-radius color-red font-14">=</div>
    </btn-list>
  </div>
</template>

<script>
  export default {
    name: 'calculator',
    data() {
      return {
        inputShow: {
          value: '0',
          name: ''
        },
        string: [],
        type: '',
        input:{
          value: '0',
          name: ''
        },
      }
    },
    components:{
        'input-box':{
            props:['inputShow'],
            computed: {
                value:function () {
                    return this.inputShow.value
                }
            },
            template:'<input id="input-box" type="text" size="21" maxlength="21" v-model="value" readonly="readonly">'
        },
        'btn-list':{
            template:'<div id="btn-list"><slot></slot></div>'
        }
    },
    methods:{
        result:function(value){
            var result=new Array;
            if(value.length%2==0)
            {
                result.push((value[value.length-2]));
                result.push((value[value.length-1]));
                return (result);
            }
            else
            {
                result.push((value[value.length-1]))
                result.push((value[value.length-2]))

                return (result);
            }
        },
        typetoinput:function(num){
            
            this.input=this.inputShow;
            if(this.input.name=="type")
            {
                this.input.value=" ";
                this.input.name=" ";
            }
            if(num!="."&&this.input.value[0]==0&&this.input.value[1]!=".")
            {
                this.input.value=num; //Reset input num
            }
            else if(num=="."&&this.input.value.indexOf(".")>-1)
            {
                this.input.value=input.value; //Only one point allow input
            }
            else if(this.input.value=="Infinity"||this.input.value=="NaN")
            {
                this.input.value="";
                this.input.value+=num; //Splicing string
            }
            else
            {
                this.input.value+=num;
            }
        },
        operator:function(type){
            switch (type)
            {
                case "clear":
                    this.inputShow.value="0";
                    this.string.length=0;

                    break;
                case "backspace":
                    if(this.checknum(this.inputShow.value)!=0)
                    {
                        this.inputShow.value=this.inputShow.value.replace(/.$/,'');
                        if(this.inputShow.value=="")
                        {
                            this.inputShow.value="0";
                        }
                    }
                    break;
                case "opposite":
                    if(this.checknum(this.inputShow.value)!=0)
                    {
                        this.inputShow.value=-this.inputShow.value;
                    }
                    break;
                case "percent":
                    if(this.checknum(this.inputShow.value)!=0)
                    {
                        this.inputShow.value=this.inputShow.value/100;
                    }
                    break;
                case "pow":
                    if(this.checknum(this.inputShow.value)!=0)
                    {
                        this.inputShow.value=Math.pow(this.inputShow.value,2);
                    }
                    break;
                case "sqrt":
                    if(this.checknum(this.inputShow.value)!=0)
                    {
                        this.inputShow.value=Math.sqrt(this.inputShow.value);
                    }
                    break;
                case "plus":
                    if(this.checknum(this.inputShow.value)!=0)
                    {
                        this.string.push(this.inputShow.value);
                        this.type="plus"
                        this.inputShow.value="+";
                        this.inputShow.name="type";
                    }
                    break;
                case "minus":
                    if(this.checknum(this.inputShow.value)!=0)
                    {
                        this.string.push(this.inputShow.value);
                        this.type="minus"
                        this.inputShow.value="-";
                        this.inputShow.name="type";
                    }
                    break;
                case "multiply":
                    if(this.checknum(this.inputShow.value)!=0)
                    {
                        this.string.push(this.inputShow.value);
                        this.type="multiply"
                        this.inputShow.value="×";
                        this.inputShow.name="type";
                    }
                    break;
                case "divide":
                    if(this.checknum(this.inputShow.value)!=0)
                    {
                        this.string.push(this.inputShow.value);
                        this.type="divide"
                        this.inputShow.value="÷";
                        this.inputShow.name="type";
                    }
                    break;
                case "result":
                    if(this.checknum(this.inputShow.value)!=0)
                    {
                        this.string.push(this.inputShow.value);
                        if(parseInt(this.string.length)%2!=0)
                        {
                            this.string.push(this.string[this.string.length-2])
                        }
                        if(this.type=="plus")
                        {
                            this.inputShow.value=parseFloat(this.result(this.string)[0])+parseFloat(this.result(this.string)[1]);
                            this.inputShow.name="type"
                        }
                        else if(this.type=="minus")
                        {
                            this.inputShow.value=parseFloat(this.result(this.string)[0])-parseFloat(this.result(this.string)[1]);
                            this.inputShow.name="type"
                        }
                        else if(this.type=="multiply")
                        {
                            this.inputShow.value=parseFloat(this.result(this.string)[0])*parseFloat(this.result(this.string)[1]);
                            this.inputShow.name="type"
                        }
                        else if(this.type=="divide")
                        {
                            this.inputShow.value=parseFloat(this.result(this.string)[0])/parseFloat(this.result(this.string)[1]);
                            this.inputShow.name="type"
                        }
                        break;
                    }
            }
        },
        checknum:function(inputvalue){
            if(inputvalue=="+"||inputvalue=="-"||inputvalue=="×"||inputvalue=="÷"||this.input.value=="0")
            {
                return 0;
            }
        }

    },
    directives: {
  focus: {
    // 指令的定义---
    inserted:function(el){
      el.focus();
      // console.log(el);
    }
  }
},
    created(){
      document.oncontextmenu=new Function("event.returnValue=false;");
      document.onselectstart=new Function("event.returnValue=false;");
      var _string=new Array();
      var _type;
    }
  }
</script>

<style scoped>
a:hover{color:#D40000;text-decoration:none}
.clear{height:0;overflow:hidden;clear:both}
/* calculator */
#calculator{border:1px solid #00B4FF; width:400px;height:490px;padding:10px;background:#f8f8f8;-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;box-shadow:0px 0px 10px #f2f2f2;-moz-box-shadow:0px 0px 10px #f2f2f2;-webkit-box-shadow:0px 0px 10px #f2f2f2;margin:40px auto 0 auto;}
#calculator #input-box{margin:0;width:380px;padding:9px 5px;height:35px;border:1px solid #e5e5e5;border-radius:3px;-webkit-border-radius:3px;-moz-border-radius:3px;background:#FFF;text-align:right;line-height:14px;font-size:24px;font-family:Verdana, Geneva, sans-serif;color:#666;outline:none; text-transform:uppercase;}
#calculator #btn-list{width:380px;overflow:hidden;padding: 15px;}
#calculator #btn-list .btn-radius{border-radius:2px;-webkit-border-radius:2px;-moz-border-radius:2px;border:1px solid #e5e5e5;background:-webkit-gradient(linear, 0 0, 0 100%, from(#f7f7f7), to(#ebebeb));background:-moz-linear-gradient(top, #f7f7f7,#ebebeb);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#f7f7f7,endColorstr=#ebebeb,grandientType=1);line-height:29px;text-align:center;text-shadow:0px 1px 1px #FFF;font-weight:bold;font-family:Verdana, Geneva, sans-serif;color:#666;float:left;margin-left:11px;margin-top:11px;font-size:12px;cursor:pointer;}
#calculator #btn-list .btn-radius:active{background:#ffffff;}
#calculator #btn-list .clear-marginleft{margin-left:0;}
#calculator #btn-list .font-14{font-size:28px;}
#calculator #btn-list .color-red{color:#ff5050}
#calculator #btn-list .color-blue{color:#00b4ff}
#calculator #btn-list .btn-30{width:60px;height:59px;}
#calculator #btn-list .btn-70{width:130px;height:59px;}
</style>