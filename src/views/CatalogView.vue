<template>
  <div class="catalog-page container">
      <div class="catalog-page__header">
          <h1>Каталог</h1>
      </div>
      <div class="catalog-page__main">
          <div class="catalog-page__menu">
            <CategoriesMenu/>                       
          </div>
          <div class="catalog-page__content">
              <CatalogProducts>
                  <ProductsList/>
              </CatalogProducts>                
          </div>
      </div>          
  </div>
</template>

<script setup lang="ts">
import CatalogProducts from '@/components/CatalogProducts.vue';
import CategoriesMenu from '@/components/CategoriesMenu.vue';
import ProductsList from '@/components/ProductsList.vue';

</script>

<style scoped lang="scss">

.catalog-page {

  &__main {
      display: flex;
      width: 100%;

      @media screen and (max-width: 992px) {
        flex-direction: column;
      }

      @media screen and (max-width: 768px) {
        flex-direction: column;
      }
      
  }

  &__content {
      flex: 1;
  }

  &__menu {
      box-sizing: border-box;
      width: 320px;
      margin: 0 20px 0 0;

      @media screen and (max-width: 992px) {
        width: 100%;
        margin: 0 0 20px 0;
      }
  }
}

</style>