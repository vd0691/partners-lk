<template>
  <component :is="($route.meta.layout || DefaultLayout)">
    <router-view/>  
  </component>
</template>

<script setup lang="ts">
import { onMounted, onUpdated, computed } from 'vue';
import { useStore } from 'vuex';
import { useInterceptors } from './helpers/AxiosInterceptors';
import DefaultLayout from './layouts/DefaultLayout.vue';

const store = useStore()
const currentUser = computed(() => store.state.auth.user.username)
onMounted(() => {
  useInterceptors()
})

onUpdated(() => {
  if (JSON.parse(localStorage.getItem('user') || '{}').token) {
    store.dispatch('GET_PARTNER', currentUser.value)
    store.dispatch('GET_USER_ID', currentUser.value)
  }
})
</script>

<style lang="scss">
#app {
  font-family: 'Times New Roman', Times, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
