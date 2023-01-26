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
          <PagePagination :total-items="totalItems" :per-page="20" />
        </div>                      
      </div>
    </div>
  </div>  
</template>

<script setup lang="ts">
import CategoriesMenu from '@/components/CategoriesMenu.vue';
import PagePagination from '@/components/PagePagination.vue';
import ProductsList from '@/components/ProductsList.vue';
import { computed, watch} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute()
const store = useStore()
const totalItems = computed(() => 100)
const currentPage =  computed(() => route.query.from)
const itemsNumber = computed(() => route.query.size)
const currentCat = computed(() => route.params.subcategory)



watch([currentCat, currentPage, itemsNumber], () => {
   store.dispatch('FETCH_PRODUCTS', {
    id: currentCat.value, 
    from: currentPage.value, 
    size: itemsNumber.value
  })
}, {immediate: true})
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

.pagination {
  display: flex;
  margin: 20px 0;
  background: #eee;

  &__item-next {
    color: #ff0000;
  }

  &__item-previous {
    color: #000000;
  }
}

</style>
