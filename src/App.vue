<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>

export default {
    data(){
        return{}
    }
}
</script>

<style>
    html,body,#app{
        height: 100%;
        width: 100%;
        background-image: url("./assets/home2.jpg");
    }
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;

    }
    body{

    }
/*#app {*/
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/
</style>
