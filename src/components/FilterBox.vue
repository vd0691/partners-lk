<template>
    <div class="filter-box">
        <div class="filter-box__wrapper">
            <div class="items-quantity">
            <ItemsQuantityController :page-from="currentPage"/>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import ItemsQuantityController from './ItemsQuantityController.vue';
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';

const route = useRoute()
const currentPage =  computed(() => route.query.from)
</script>

<style scoped lang="scss">
.filter-box {
  margin-bottom: 15px;

  &__wrapper {
    display: flex; 
    justify-content: flex-end;   
  }
}
</style>