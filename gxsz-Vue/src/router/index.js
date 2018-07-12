import Vue from 'vue'
import Router from 'vue-router'
import homepage from '../components/base/index.vue'
//----Users----
import userInfo from '../components/Users/userInfo.vue'
import noteList from '../components/Users/noteList.vue'
import privateList from '../components/Users/privateList.vue'
import publicList from '../components/Users/publicList.vue'
import myGroup from '../components/Users/myGroup.vue'
import usersDetail from '../components/Users/usersDetail.vue'
// ----Notification-----
import nfList from '../components/Notification/list.vue'
import nfDetail from '../components/Notification/detail.vue'
import nfmyDetail from '../components/Notification/mydetail.vue'
import unreadList from '../components/Notification/unreadList.vue'
import addList from '../components/Notification/addList/addList.vue'
import edit from '../components/Notification/addList/edit.vue'
import nfAdd from '../components/Notification/add.vue'
// ----News-----
import auditList from '../components/News/list.vue'
import auditEdit from '../components/News/auditEdit.vue'
import newsPost from '../components/News/newsPost.vue'
import myNewsList from '../components/News/myNews/myNewsList.vue'
import myNewsEdit from '../components/News/myNews/myNewsEdit.vue'
import adminSzModels from '../components/News/SzModels/adminSzModels.vue'
import adminSzModelsEdit from '../components/News/SzModels/adminSzModelsEdit.vue'
import adminSzModelsAdd from '../components/News/SzModels/adminSzModelsAdd.vue'
// ----message----
import allMsg from '../components/message/allMsg.vue'
import unreadMsg from '../components/message/unreadMsg.vue'
//----UsersManager----
import UsersManagerList from '../components/UsersManager/list.vue'
import UsersManagerAdd from '../components/UsersManager/add.vue'
import UsersManagerEdit from '../components/UsersManager/edit.vue'
import UsersManagerDetail from '../components/UsersManager/detail.vue'
import UsersManagerAdmin from '../components/UsersManager/admin.vue'
import SchoolStructure from '../components/UsersManager/structure.vue'
import usersAdmin from '../components/UsersManager/usersAdmin.vue'
//----Menu----
import MenuList from '../components/Menu/menulist.vue'
import AddMenu from '../components/Menu/addmenu.vue'
//----Log----
import NewsLog from '../components/Log/NewsLog.vue'
// import PostsLog from '../components/Log/PostsLog.vue'
// import getPostsPVByTerm from '../components/Log/getPostsPVByTerm.vue'
// import KeywordRanking from '../components/Log/KeyWord.vue'

//---Document---
import documentList from '../components/Document/list.vue'
import documentAdd from '../components/Document/add.vue'
import documentDetail from '../components/Document/detail.vue'
import documentMyDetail from '../components/Document/myDetail.vue'
import documentEdit from '../components/Document/edit.vue'
import documentRecieve from '../components/Document/recieve.vue'
import documentRedirect from '../components/Document/redirect.vue'
import documentFeedBack from '../components/Document/feedback.vue'
//---Files---
import personFile from '../components/Files/personFile.vue'
import sysFile from '../components/Files/sysFile.vue'
//----PowerManager----
import newsEdit from '../components/PowerManager/newsEdit.vue'
import menuDistribute from '../components/PowerManager/menuDistribute.vue'
import calculator from '../components/PowerManager/calculator.vue'
import calender from '../components/PowerManager/calender.vue'
//----FeedBack----
import addFB from '../components/FeedBack/addFB.vue'
import FBlist from '../components/FeedBack/list.vue'

Vue.use(Router);
//定义一个过渡的空组件container
const container = {template: '<router-view></router-view>'};
// const homepage = {
//   template: `<div>
//   <pre>发起团队
//   湖北高校思政网
//   主办：湖北省教育厅思想政治教育与社会科学研究处（中共湖北省委高等学校工作委员会宣传处）
//   承建单位：湖北省高校思想政治教育信息中心（武汉科技大学）
//   协助单位：湖北省教育信息化发展中心</pre>
//   </div>`
// };
//配置路由,调用相应组件
export default new Router({
  routes: [
  {
    path: '/Users/:type/', name: 'User', component: container,
    children: [
    {path: 'main', name: 'index', component: homepage},
    {path: 'userinfo', name: 'userinfo', component: userInfo},
    {path: 'myNoteLists/:num', name: 'noteList', component: noteList},
    {path: 'lists/:num', name: 'privateList', component: privateList},
    {path: 'publicUsersList/:num', name: 'publicList', component: publicList},
    {path: 'myGroup/:num', name: 'myGroup', component: myGroup},
    {path: 'usersDetail', name: 'usersDetail', component: usersDetail}
    ]
  },
  {
    path: '/Notification/:type/', name: 'Notification', component: container,
    children: [
    {path: 'lists/:num', name: 'NotiLists', component: nfList},
    {path: 'unReadList/:num', name: 'NotiUnreadList', component: unreadList},
    {path: 'myAddList/:num', name: 'NotiAddList', component: addList},
    {path: 'add', name: 'add', component: nfAdd},
    {path: 'edit/:id', name: 'edit', component: edit},
    {path: 'detail/:id', name: 'NotiDetail', component: nfDetail},
    {path: 'mydetail/:id', name: 'NotimyDetail', component: nfmyDetail}
    ]
  },  
  {
    path: '/Document/:type/', name: 'Document', component: container,
    children: [
    {path: 'mylists/:num', name: 'documentList', component:documentList},
    {path: 'recieve/:num', name: 'documentRecieve', component:documentRecieve},
    {path: 'add', name: 'documentAdd', component: documentAdd},
    {path: 'edit/:id', name: 'documentEdit', component: documentEdit},
    {path: 'detail/:id', name: 'documentDetail', component:documentDetail},
    {path: 'myDetail/:id', name: 'documentMyDetail', component:documentMyDetail},
    {path: 'redirect/:id', name: 'documentMyRedirect', component:documentRedirect},
    {path: 'feedback/:id/:num', name: 'documentMyFeedback', component:documentFeedBack}
    ]
  },
  {
    path: '/CloudStorage/:type/', name: 'Files', component: container,
    children: [
    {path: 'myCloudStorage/id/1/:num', name: 'personFile', component:personFile},
    {path: 'myCloudStorage/id/2/:num', name: 'sysFile', component:sysFile}
    ]
  },
  {
    path: '/News/:type/', name: 'News', component: container,
    children: [
    {path: 'auditList/:num', name: 'auditList', component: auditList},
    {path: 'auditEdit/:id', name: 'auditEdit', component: auditEdit},
    {path: 'add', name: 'newsPost', component: newsPost},
    {path: 'myNewslist/:num', name: 'myNewslist', component: myNewsList},
    {path: 'newsEdit/:id', name: 'newsEdit', component: myNewsEdit},
    {path: 'Modellists/:num', name: 'adminSzModels', component: adminSzModels},
    {path: 'edit/:id', name: 'adminSzModelsEdit', component: adminSzModelsEdit},
    {path: 'Modeladd', name: 'adminSzModelsAdd', component: adminSzModelsAdd},
    ]
  },
  {
    path: '/Message/:type/', name: 'Message', component: container,
    children: [
    {path: 'lists/:num', name: 'allMsg', component: allMsg},
    {path: 'unReadList/:num', name: 'unreadMsg', component: unreadMsg}
    ]
  },
  {
    path: '/UsersManager/:type/', name: 'UsersManager', component: container,
    children: [
    {path: 'lists/:num', name: 'UsersManagerList', component: UsersManagerList},
    {path: 'add', name: 'UsersManagerAdd', component: UsersManagerAdd},
    {path: 'schoolStructure', name: 'schoolStructure', component: SchoolStructure},
    {path: 'usersEdit/:id', name: 'UsersManagerEdit', component: UsersManagerEdit},
    {path: 'usersDetail/:id', name: 'UsersManagerDetail', component: UsersManagerDetail},
    {path: 'usersAdmin/:num', name: 'usersAdmin', component: usersAdmin},
    {path: 'userAdminManage/:num', name: 'userAdminManage', component: UsersManagerAdmin}
     ]
  },
  {
    path: '/Menu/:type/', name : 'Menu', component: container,
    children: [
    {path: 'menuList', name: 'menuList', component: MenuList},
    {path: 'addMenu', name: 'addMenu', component: AddMenu}
    ]
  },
  {
   path: '/Log/:type/', name: 'Log', component: container,
   children: [
   {path: 'getNewsInfoByTime', name: 'NewsLog', component: NewsLog},
   // {path: 'getPostsPVByTerm', name: 'getPostsPVByTerm', component: getPostsPVByTerm},
   // {path: 'KeywordRanking', name: 'KeywordRanking', component: KeywordRanking}
   ]
 },
  {
   path: '/Privilege/:type/', name: 'Privilege', component: container,
   children: [
   {path: 'getAuditList/:num', name: 'getAuditList', component: newsEdit},
   {path: 'getRoleList', name: 'menuDistribute', component: menuDistribute},
   {path: 'calculator', name: 'calculator', component: calculator},
   {path: 'calender', name: 'calender', component: calender}
   ]
 },
  {
   path: '/FeedBack/:type/', name: 'FeedBack', component: container,
   children: [
   {path: 'add', name: 'addFB', component: addFB},
   {path: 'list', redirect: 'list/1'},
   {path: 'list/:num', name: 'FBlist', component: FBlist}
   ]
 },
 {
  path: '/',
  redirect: '/Users/AdminIndex/main'
}
]
})