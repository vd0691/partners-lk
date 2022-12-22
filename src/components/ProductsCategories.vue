<template>
    <div class="products-list">
        <div class="products-list__grid">
        <CategoryCard v-for="category in categories"
                      :key="category.id"
                      :name="category.name"
                      :id="category.id"     
        />                             
        </div>
    </div>

</template>

<script setup lang="ts">
import CategoryCard from './CategoryCard.vue';
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';


import { useStore } from 'vuex';

const store = useStore()

const categories = computed(() => {
    return store.getters.getCategories
})


onMounted(() => {
    store.dispatch('fetchProducts')
})

</script>

<style scoped lang="scss">
.products-list {

    &__grid {
        @include flex-wrap
    }
}
</style>