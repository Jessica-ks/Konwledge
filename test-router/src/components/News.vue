<template>
  <div class="news">
    我是一个新闻组件
    <hr>
    <br/>
    <ul>
      <li v-for="(item,key) in list">
        <router-link :to="'/content/'+key">{{key}}-----{{item}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "News",
        data(){
          return{
            list:['11111','22222','33333']
          }
        }
    }
</script>

<style scoped>

</style>
