<template>
  <div class="main">
    <div class="cover"></div>
    <CountDown class="panel" :time="timeLong" format="DD天HH小时mm分钟ss秒 SSms"></CountDown>
  </div>
</template>

<script>
import CountDown from './count-down';

export default {
  name: 'HelloWorld',
  components: {
    CountDown
  },
  props: {
    msg: String
  },
  data() {
    return {
      timeLong: 1613088000000 - Date.now()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .cover {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-image: url('../assets/bg.jpeg');
    background-size: contain;
    filter: blur(5px);
  }
  .panel {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 150px;
    width: 250px;
    height: 100px;
    font-size: 16px;
    color: #fff;
    border-radius: 10px;
    background-color: rgba(0,0,0, 0.4);
    z-index: 9;
  }
</style>
