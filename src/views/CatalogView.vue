<template>
  <div class="catalog">
    <div class="catalog__wrapper">
      <div class="catalog__header">
        <div class="title-box">
          <h1 class="title-box__title">Каталог товаров</h1>          
        </div>
      </div>
      <div class="catalog__body">
        <aside class="catalog__menu">
          <CategoriesMenu />
        </aside> 
        <div class="catalog__main-content">
          <ProductsList />
          
        </div>                      
      </div>
    </div>
  </div>  
</template>

<script setup lang="ts">
import CategoriesMenu from '@/components/CategoriesMenu.vue';
import ProductsList from '@/components/ProductsList.vue';

</script>

<style scoped lang="scss">

.catalog {

  &__body {
    display: flex;
  }

  &__main-content {
    width: 100%;
  }

  &__menu {
    max-width: 300px;
    width: 100%;
  }
}

</style>
