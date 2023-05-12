<template>
    <div class="catalog-products">
        <div class="catalog-products__list">
            <FilterBox />
            <slot/>
            <PagePagination :total-items="totalItems" :per-page="itemsNumber" />
        </div>
    </div>
</template>

<script setup lang="ts">
import FilterBox from './FilterBox.vue';
import PagePagination from './PagePagination.vue';
import { computed, watch } from 'vue';
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