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
import { computed, watch, onMounted} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute()
const store = useStore()
const totalItems = computed(() => store.state.products.totalItems)
const currentPage =  computed(() => route.query.from)
const itemsNumber = computed(() => store.state.dataSort.perPage)
const currentCategory = computed(() => route.params.category)
const currentSubcategory = computed(() => route.params.subcategory)
const partnerId = computed(() => store.state.partner.partner?.id)

watch([currentCategory, currentSubcategory, currentPage, itemsNumber, partnerId], () => {
  if (partnerId.value) {
      store.dispatch('FETCH_PRODUCTS', {
      level: currentCategory.value && !currentSubcategory.value ? 1 : undefined,
      id: currentCategory.value && !currentSubcategory.value ? currentCategory.value : currentSubcategory.value ? currentSubcategory.value : undefined, 
      from: currentPage.value, 
      size: itemsNumber.value
    })
  }
  
}, {immediate: true})
</script>

<style scoped lang="scss">

.catalog {
  padding: 0 20px;

  &__body {
    display: flex;

    @media (max-width: 1024px) {
      flex-direction: column;
    }
  }

  &__main-content {
    width: 100%;
    padding: 0 0 0 18px;

    @media (max-width: 1200px) {
      padding: 0;
    }
  }

  &__menu {
    max-width: 400px;
    width: 100%;

    @media screen and (max-width: 1024px) {
        max-width: 100%;     
    }
  }
}

.pagination {
  display: flex;
  margin: 20px 0;
  justify-content: center;
}

</style>
