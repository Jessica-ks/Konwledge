// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import movie from './components/movie/movie';
import music from './components/music/music';
import book from './components/book/book';
import pictures from './components/pictures/pictures';
import TOP from './components/TOP/TOP';
import heat from './components/heat/heat';
import upcoming from './components/upcoming/upcoming';
// import VueResource from 'vue-resource';

Vue.use(VueRouter);
// Vue.use(VueResource);

const routes = [
  { path:'/movie',component: movie,
    children: [
      {
        path: 'TOP',
        component: TOP
      },
      {
        path: 'heat',
        component: heat
      },
      {
        path: 'upcoming',
        component: upcoming
      }
    ]
  },
  { path:'/music',component: music },
  { path: '/book',component: book },
  { path: '/pictures',component: pictures }
];

const router = new VueRouter({
  routes
});
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})

router.push('/movie/TOP');
