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
          <FilterBox />
          <ProductsList />
          <div class="pagination">
            <PagePagination :total-items="totalItems" :per-page="itemsNumber" />
          </div>
        </div>                      
      </div>
    </div>
  </div>  
</template>

<script setup lang="ts">
import CategoriesMenu from '@/components/CategoriesMenu.vue';
import FilterBox from '@/components/FilterBox.vue';
import PagePagination from '@/components/PagePagination.vue';
import ProductsList from '@/components/ProductsList.vue';
import { computed, watch} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute()
const store = useStore()
const totalItems = computed(() => store.state.products.totalItems)
const currentPage =  computed(() => route.query.from)
const itemsNumber = computed(() => Number(route.query.size) || 20)
const currentCat = computed(() => route.params.subcategory ? route.params.subcategory : route.params.category)

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
  padding: 0 20px;

  &__body {
    display: flex;
  }

  &__main-content {
    width: 100%;
    padding: 0 0 0 18px;
  }

  &__menu {
    max-width: 300px;
    width: 100%;
  }
}

.pagination {
  display: flex;
  margin: 20px 0;
  justify-content: center;
}

</style>
