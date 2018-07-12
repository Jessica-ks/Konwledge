<template>
  <div id="app" class="wrapper">
      <main-header></main-header>
      <main-sidebar></main-sidebar>
          <div class="content-wrapper">
            <section class="content">
              <router-view></router-view>
            </section>
          </div>
      <main-footer></main-footer>
  </div>
</template>
<script>
import header from './components/base/header.vue';
import aside from './components/base/aside.vue';
import footer from './components/base/footer.vue';
  export default {
    name: 'app',
    components:{
     'main-header':header,
     'main-sidebar':aside,
     'main-footer':footer
   }
 }
</script>

<style>

</style>
