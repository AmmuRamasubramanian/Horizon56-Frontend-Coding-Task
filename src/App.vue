<script setup lang="ts">
import MainPage from './Components/MainPage.vue'
</script>

<template>
  <div class="outercontentDiv">
    <MainPage/>
  </div>
</template>

<style scoped lang="scss">  
  .outercontentDiv{
    height:100vh;
    flex:1;
    display:flex;
    padding:0px;
    background-color:var(--primarybgColor);
    justify-content:center;
    position:relative;
  }
</style>
