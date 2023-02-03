<template>
  <component :is="($route.meta.layout || DefaultLayout)">
    <router-view/>  
  </component>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useInterceptors } from './helpers/AxiosInterceptors';
import DefaultLayout from './layouts/DefaultLayout.vue';

onMounted(() => {
  useInterceptors()
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
