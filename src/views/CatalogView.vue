<template>
  <div class="catalog">
    <div class="catalog__wrapper">
      <div class="catalog__header">
        <div class="title-box">
          <h1 class="title-box__title">Каталог товаров</h1>          
        </div>
      </div>
      <div class="catalog__content">
        <ProductsCategories />                
      </div>
    </div>
  </div>  
</template>

<script setup lang="ts">
import ProductsCategories from '@/components/ProductsCategories.vue';


</script>

<style scoped lang="scss">

</style>
