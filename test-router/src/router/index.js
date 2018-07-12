import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import News from '@/components/News'
import content from '@/components/content'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/News',
      name: 'News',
      component: News
    },
    {
      path: '/content/:aid',
      name: 'content',
      component: content
    },
    {
      path: '/*',
      redirect: '/Home'
    }
  ]
})
