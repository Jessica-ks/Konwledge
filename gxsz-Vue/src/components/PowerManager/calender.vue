<template>
  <div id='calContainer'></div>
</template>

<script>
  // import SimpleCalendar from '../../../static/simple-calendar/simpleCalendar.js'
  // import '../../../static/simple-calendar/simpleCalendar.css'

  export default {
    name: 'calender',
    data() {
        return {   
        }
      },
    methods: {
    },
    mounted(){
      var options = {
        width: '100%',
        height: '500px'
      }
      var myCalendar = new SimpleCalendar('#calContainer',options);
    }
  }
</script>
<style scoped>
</style>
