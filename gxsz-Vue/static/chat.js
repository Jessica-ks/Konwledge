 var __root__ = "/gxsz_office/";
layui.use('layim',
function(layim) {
    var ws, myname, myid, myavatar,mysign, toid, toname, user_list = [],
    chatType,
    group_list = [];
    //建立WebSocket通讯
    ws = new WebSocket("ws://202.114.255.79:7272");
    // ws = new WebSocket("ws://"+document.domain+":7272");
    ws.onopen = onopen;
    ws.onmessage = onmessage;
    ws.onclose = function() {
        console.log("连接关闭，定时重连");
    };
    ws.onerror = function() {
        console.log("出现错误");
    };
    // 连接建立时发送登录信息
    function onopen() {
        //获取到当前登录用户的信息
        myid = $('#UserInfoId').val();
        myname = $('#UserLogin').val();
        myavatar = __root__ + $('#UserAvatar').val();
        mysign=$('#UserSign').val();
        // 登录
        var login_data = '{"type":"login","userName":"' + myname + '","userId":' + myid + '}';
        console.log("成功建立连接 登陆信息:" + login_data);
        ws.send(login_data);
    };
    // 服务端发来消息时
    function onmessage(e) {
        console.log('服务器传来了data对象', e.data);
        var data = JSON.parse(e.data);
        switch (data['type']) {
        case 'remind':
              var remind_title = data['title'];
              var remind_content = data['content'];
              var remind_time = data['remind_time'];
              var remind_msg = "您有一条笔记提醒："+remind_title+" 于 "+remind_time;
              var title = "思政网定时提醒";
              var Notification = window.Notification || window.mozNotification || window.webkitNotification;
                if(Notification){
                    Notification.requestPermission(function(status){
                        //status默认值'default'等同于拒绝 'denied' 意味着用户不想要通知 'granted' 意味着用户同意启用通知
                        if("granted" != status){
                            return;
                        }else{
                            var tag = "sds"+Math.random();
                            var notify = new Notification(
                                title,
                                {
                                    dir:'auto',
                                    lang:'zh-CN',
                                    tag:tag,//实例化的notification的id
                                    icon:'',//通知的缩略图,//icon 支持ico、png、jpg、jpeg格式
                                    body:remind_msg,//通知的具体内容
                                    silent:true,
                                    sticky:true
                                }
                            );
                            notify.onclick=function(){
                                //如果通知消息被点击,通知窗口将被激活
                                window.focus();
                            },
                            notify.onerror = function () {
                                console.log("HTML5桌面消息出错！！！");
                            };
                            notify.onshow = function () {
                                setTimeout(function(){
                                    notify.close();
                                },2000)
                            };
                            notify.onclose = function () {
                                console.log("HTML5桌面消息关闭！！！");
                            };
                        }
                    });
                }else{
                    console.log("您的浏览器不支持桌面消息");
                }
          break;
        case 'login':
            // console.log(data['time'] + "登录成功");
            console.log(new Date().toLocaleString() + " 登录成功");
            break;
            // 发言
        case 'say':
            // say(data['fromId'], data['fromName'], data['toId'], data['chatType'], data['content'], data['time']);
            console.log('服务器传来了会话消息', data['fromId'], data['fromName'], data['toId'], data['chatType'], data['content'], data['time']);
            if (data['fromId'] != myid) {
                console.log(data['fromId'], myid);
                layim.getMessage({
                    username: data['fromName'] //消息来源用户名
                    ,
                    avatar: __root__ + "48行用户默认头像.png" //消息来源用户头像
                    ,
                    id: data['fromId'] //消息的来源ID（如果是私聊，则是用户id，如果是群聊，则是群组id）
                    ,
                    type: data['chatType'] === "toSingleUser" ? "friend": "group" //聊天窗口来源类型，从发送消息传递的to里面获取
                    ,
                    content: data['content'] //消息内容
                    // ,cid: 0 //消息id，可不传。除非你要对消息进行一些操作（如撤回）
                    ,
                    mine: false //是否我发送的消息，如果为true，则会显示在右方
                    ,
                    fromid: data['fromId'] //消息的发送者id（比如群组中的某个消息发送者），可用于自动解决浏览器多窗口时的一些问题
                    ,
                    timestamp: new Date().getTime() //服务端动态时间戳
                });
            }

            break;
            //获取人员列表
        case 'addUsersToUserList':
            console.log('人员增加,改变人员列表', data.data[0].item);
            var personList = data.data[0].item;
            for (var i = 0; i < personList.length; i++) {
                if (personList[i].userId != myid) {
                    var person = {};
                    //这里格式必须一致！！！！
                    person.type = "friend";
                    person.avatar = __root__ + personList[i].userAvatar;
                    person.username = personList[i].userName;
                    person.id = personList[i].userId;
                    //将来可以设置好友这块的分组
                    person.groupid = 1;
                    person.sign = personList[i].userSign;
                    layim.addList(person);
                }
            };
            break;
            //获取群组列表
        case 'addGroupsToGroupList':
            var groupList = data.data[0].item;
            console.log('群组增加,改变群组列表');
            for (var i = 0; i < groupList.length; i++) {
                var group = {};
                //这里格式必须一致！！！！
                group.type = "group";
                group.avatar = __root__ + groupList[i].userAvatar || '';
                group.groupname = groupList[i].groupName;
                group.id = groupList[i].groupId;
                layim.addList(group);
            };
            break;
        case 'delUsersToUserList':
            console.log('人员减少,改变人员列表', data.data[0].id);
            layim.removeList({
                type: 'friend' //或者group
                ,
                id: data.data[0].id //好友或者群组ID
            });
            break;
        case 'logout':
            var logout = (data['logout_id']);
            console.log('人员退出 id-', data);
            break;
        };
    }

    //获取所有在线用户
    // case 'addClientUsersToUserList':
    //   var arr = [];
    //   var str = '';
    //   clienUsers_list = (data['userList']);
    //   console.log('服务器传来了 当前在线用户:',clienUsers_list);
    //   break;
    //获取所有不在线用户
    // case 'addAllUsersToUserList':
    //   var strr = '';
    //   alluser_list = (data['userList']);
    //   var arr = [];
    //   var strFace = '';
    //   var states = 1;
    //   console.log('服务器传来了 所有不在线用户:',alluser_list.length);
    //   break;
    // case 'addUsersToUserList':
    //   addnewUsers = (data['userList']);
    //   var arr = [];
    //   var newstr = '';
    //   xxim.getDates(0,addnewUsers);
    //   console.log('服务器传来了 新上线的用户:',addnewUsers);
    //
    //   break;
    //从用户列表中删除用户
    // case 'deleteUsersFromUserList':
    //   user_list = data['userList'];
    //
    //   console.log('服务器传来了 用户下线:',user_list );
    //   break;
    //向群组中添加群
    // case 'addGroupsToGroupList':
    //   str = '';
    //   group_list = data['groupList'];
    //   console.log('服务器传来了 新增的群组:',group_list);
    //   break;
    //获取聊天记录
    // case "chatLog":
    //
    //   console.log('服务器传来了 历史消息记录:', data['chatLogList'], data['page'], data['pageSize'], data['pageNum']);
    //   break;
    //从群组中删除群
    // case 'deleteGroupsFromGroupList':
    //   group_list = data['groupList'];
    //   console.log('服务器传来了 删除群组:',group_list);
    //   break;
    // ????????????
    // case 'msg':
    //   if (data['msgType'] == 'alert') {
    //     console.log('服务器传来了一个 alert',data['code'] + ':' + data['msg']);
    //     return false;
    //   }
    //   break;
    //按姓名搜索人员
    // case 'searchUserName':
    //   var strFace;
    //   var searchUserlist;
    //   searchUserlist = (data['userList']);
    //   console.log('搜索:',searchUserlist);
    //   break;
    // case 'addGroupUsersToGroup':
    //   var groupUser = (data['userList']);
    //   var groupid = data['groupid'];
    //   var arr = [];
    //   console.log('人员添加进群组中:人员-',groupUser,'加入群组-',groupid);
    //   break;
    //
    // case 'addchatlistTo':
    //   var chatlist = (data['chatlist']);
    //   var str3='';
    //   var arr = [];
    //   console.log('添加至聊天列表',chatlist);
    //   break;
    // case 'showInformation':
    //
    //   var information = data['information'];
    //   var infotype = data['infotype'];
    //   var infoid = data['infoid'];
    //   var str = '';
    //   console.log('展示简要信息:',information,' 种类-',infotype,' id-',infoid);
    //   break;

    //演示自动回复
    // var autoReplay = [
    //   '您好，我现在有事不在，一会再和您联系。',
    //   '你没发错吧？face[微笑] ',
    //   '洗澡中，请勿打扰，偷窥请购票，个体四十，团体八折，订票电话：一般人我不告诉他！face[哈哈] ',
    //   '你好，我是主人的美女秘书，有什么事就跟我说吧，等他回来我会转告他的。face[心] face[心] face[心] ',
    //   'face[威武] face[威武] face[威武] face[威武] ',
    //   '<（@￣︶￣@）>',
    //   '你要和我说话？你真的要和我说话？你确定自己想说吗？你一定非说不可吗？那你说吧，这是自动回复。',
    //   'face[黑线]  你慢慢说，别急……',
    //   '(*^__^*) face[嘻嘻] ，是贤心吗？'
    // ];
    layim.config({

        //初始化接口
        // init: {
        //   url: 'json/getList.json'
        //   ,data: {}
        // }
        //或采用以下方式初始化接口
        init: {
            mine: {
                "username": $('#UserLogin').val() //我的昵称
                ,
                "id": $('#UserInfoId').val() //我的ID
                ,
                "status": "online" //在线状态 online：在线、hide：隐身
                ,
                "remark": $('#UserSign').val() //我的签名
                ,
                "avatar": $('#UserAvatar').val() //我的头像
            },
            friend: [{
                "groupname": "在线好友",
                "id": 1,
                "online": 2,
                "list": []
            }],
            group: []
        }

        //查看群员接口
        ,
        members: {
            url: 'json/getMembers.json',
            data: {}
        }

        //上传图片接口
        ,
        uploadImage: {
            url: '/upload/image' //（返回的数据格式见下文）
            ,
            type: '' //默认post
        }

        //上传文件接口
        ,
        uploadFile: {
            url: '/upload/file' //（返回的数据格式见下文）
            ,
            type: '' //默认post
        }

        //扩展工具栏
        // ,tool: [{
        //   alias: 'code'
        //   ,title: '代码'
        //   ,icon: '&#xe64e;'
        // }]
       //,brief: true //是否简约模式（若开启则不显示主面板）
        ,title: '在线会话' //自定义主面板最小化时的标题
        //,right: '100px' //主面板相对浏览器右侧距离
        //,minRight: '90px' //聊天面板最小化时相对浏览器右侧距离
        ,
        initSkin: '2.jpg' //1-5 设置初始背景
        //,skin: ['aaa.jpg'] //新增皮肤
        //,isfriend: false //是否开启好友
        //,isgroup: false //是否开启群组
        ,min: true //是否始终最小化主面板，默认false
        ,
        notice: true //是否开启桌面消息提醒，默认false
        ,
       // voice: false //声音提醒，默认开启，声音文件为：default.wav
        // ,msgbox: layui.cache.dir + 'css/modules/layim/html/msgbox.html' //消息盒子页面地址，若不开启，剔除该项即可
        // ,find: layui.cache.dir + 'css/modules/layim/html/find.html' //发现页面地址，若不开启，剔除该项即可
        // ,chatLog: layui.cache.dir + 'css/modules/layim/html/chatLog.html' //聊天记录页面地址，若不开启，剔除该项即可
    });

    /*
  layim.chat({
    name: '在线客服-小苍'
    ,type: 'kefu'
    ,avatar: 'http://tva3.sinaimg.cn/crop.0.0.180.180.180/7f5f6861jw1e8qgp5bmzyj2050050aa8.jpg'
    ,id: -1
  });
  layim.chat({
    name: '在线客服-心心'
    ,type: 'kefu'
    ,avatar: 'http://tva1.sinaimg.cn/crop.219.144.555.555.180/0068iARejw8esk724mra6j30rs0rstap.jpg'
    ,id: -2
  });
  layim.setChatMin();*/

    //监听在线状态的切换事件
    layim.on('online',
    function(data) {
        console.log(data);
    });

    //监听签名修改
    layim.on('sign',
    function(value) {
        console.log(value);
    });

    //监听自定义工具栏点击，以添加代码为例
    // layim.on('tool(code)', function(insert){
    //   layer.prompt({
    //     title: '插入代码'
    //     ,formType: 2
    //     ,shade: 0
    //   }, function(text, index){
    //     layer.close(index);
    //     insert('[pre class=layui-code]' + text + '[/pre]'); //将内容插入到编辑器
    //   });
    // });
    //监听layim建立就绪
    layim.on('ready',
    function(res) {
        console.log('监听开始...', res);
        //console.log(res.mine);
        // layim.msgbox(5); //模拟消息盒子有新消息，实际使用时，一般是动态获得
        //添加好友（如果检测到该socket）
        // layim.addList({
        //   type: 'group'
        //   ,avatar: "http://tva3.sinaimg.cn/crop.64.106.361.361.50/7181dbb3jw8evfbtem8edj20ci0dpq3a.jpg"
        //   ,groupname: 'Angular开发'
        //   ,id: "12333333"
        //   ,members: 0
        // });
        // layim.addList({
        //   type: 'friend'
        //   ,avatar: "http://tp2.sinaimg.cn/2386568184/180/40050524279/0"
        //   ,username: '冲田杏梨'
        //   ,groupid: 2
        //   ,id: "1233333312121212"
        //   ,remark: "本人冲田杏梨将结束AV女优的工作"
        // });
        // setTimeout(function(){
        //   //接受消息（如果检测到该socket）
        //   layim.getMessage({
        //     username: "Hi"
        //     ,avatar: "http://qzapp.qlogo.cn/qzapp/100280987/56ADC83E78CEC046F8DF2C5D0DD63CDE/100"
        //     ,id: "10000111"
        //     ,type: "friend"
        //     ,content: "临时："+ new Date().getTime()
        //   });
        //   /*layim.getMessage({
        //     username: "贤心"
        //     ,avatar: "http://tp1.sinaimg.cn/1571889140/180/40030060651/1"
        //     ,id: "100001"
        //     ,type: "friend"
        //     ,content: "嗨，你好！欢迎体验LayIM。演示标记："+ new Date().getTime()
        //   });*/
        // }, 3000);
    });

    //监听发送消息
    layim.on('sendMessage',
    function(res) {
        var mine = res.mine; //包含我发送的消息及我的信息
        //mine的结构如下：
        // {
        //   avatar: "avatar.jpg" //我的头像
        //   ,content: "你好吗" //消息内容
        //   ,id: "100000" //我的id
        //   ,mine: true //是否我发送的消息
        //   ,username: "纸飞机" //我的昵称
        // }
        var to = res.to; //对方的信息
      // if(to.type === 'friend'){
      //   layim.setChatStatus('<span style="color:#FF5722;">对方正在输入。。。</span>');
      // };
        //to的结构如下：
        // {
        // 	avatar: "avatar.jpg"
        // 	,id: "100001"
        // 	,name: "贤心"
        // 	,sign: "这些都是测试数据，实际使用请严格按照该格式返回"
        //   ,type: "friend" //聊天类型，一般分friend和group两种，group即群聊
        //   ,username: "贤心"
        // }
        //监听到上述消息后，就可以轻松地发送socket了，如：
        //         ws.send('{"type":"say","toId":"' + to_user + '","chatType":"' + chatType + '","fromId":' + myid + ',"fromName":"' + myname + '","content":"' + messageText.replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r') + '"}');
        var sendData = {
            "type": "say",
            "toId": to.id,
            "chatType": "toSingleUser",
            "fromId": mine.id,
            "fromName": mine.username,
            "content": mine.content
        };
        console.log('我发送了消息:', JSON.stringify(sendData));
        ws.send(JSON.stringify(sendData));
        //   	  var mine = res.mine; //包含我发送的消息及我的信息
        // codelayui.code
        // //mine的结构如下：
        // {
        //   avatar: "avatar.jpg" //我的头像
        //   ,content: "你好吗" //消息内容
        //   ,id: "100000" //我的id
        //   ,mine: true //是否我发送的消息
        //   ,username: "纸飞机" //我的昵称
        // }
        //   var to = res.to; //对方的信息
        // codelayui.code
        // //to的结构如下：
        // {
        //   avatar: "avatar.jpg"
        //   ,id: "100001"
        //   ,name: "贤心"
        //   ,sign: "这些都是测试数据，实际使用请严格按照该格式返回"
        //   ,type: "friend" //聊天类型，一般分friend和group两种，group即群聊
        //   ,username: "贤心"
        // }
        //   //监听到上述消息后，就可以轻松地发送socket了，如：
        //   socket.send({
        //     type: 'chatMessage' //随便定义，用于在服务端区分消息类型
        //     ,data: res
        //   });
        // var To = data.to;
        // //console.log(data);
        // if(To.type === 'friend'){
        //   layim.setChatStatus('<span style="color:#FF5722;">对方正在输入。。。</span>');
        // }
        // //演示自动回复
        // setTimeout(function(){
        //   var obj = {};
        //   if(To.type === 'group'){
        //     obj = {
        //       username: '模拟群员'+(Math.random()*100|0)
        //       ,avatar: layui.cache.dir + 'images/face/'+ (Math.random()*72|0) + '.gif'
        //       ,id: To.id
        //       ,type: To.type
        //       ,content: autoReplay[Math.random()*9|0]
        //     }
        //   } else {
        //     obj = {
        //       username: To.name
        //       ,avatar: To.avatar
        //       ,id: To.id
        //       ,type: To.type
        //       ,content: autoReplay[Math.random()*9|0]
        //     }
        //     layim.setChatStatus('<span style="color:#FF5722;">在线</span>');
        //   }
        //   layim.getMessage(obj);
        // }, 1000);
    });

    //监听查看群员
    layim.on('members',
    function(data) {
        console.log('查询群员:', data);
    });

    //监听聊天窗口的切换
    layim.on('chatChange',
    function(res) {
        var type = res.data.type;
        console.log('聊天窗口切换,', res.data.id)
        // if(type === 'friend'){
        //   //模拟标注好友状态
        //   //layim.setChatStatus('<span style="color:#FF5722;">在线</span>');
        // } else if(type === 'group'){
        //   //模拟系统消息
        //   layim.getMessage({
        //     system: true
        //     ,id: res.data.id
        //     ,type: "group"
        //     ,content: '模拟群员'+(Math.random()*100|0) + '加入群聊'
        //   });
        // }
    });

});
