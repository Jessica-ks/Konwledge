<template>
    <div id="">
      我是一个详情页面
    </div>
</template>

<script>
    export default {
        name: "content",
        data(){
          return{
            msg:'数据'
          }
        },
      mounted(){
          console.log(this.$route.params);   //获取动态路由传值
      }
    }
</script>

<style scoped>

</style>
