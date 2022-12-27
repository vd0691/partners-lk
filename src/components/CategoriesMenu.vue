<template>
    <div class="catalog-menu">
        <ul class="catalog-menu__list">
            <li class="catalog-category" 
                v-for="category in categories" 
                :key="category.id"
            >
                <router-link 
                    class="link catalog-link catalog-category__link catalog-link--main"
                    :to="`/category/${category.id}`">
                    {{ category.name }}
                </router-link>
                <ul class="catalog-category__list">
                    <li class="catalog-subcat" 
                        v-for="subcat in subCategories(category.id)" 
                        :key="subcat.id"
                    >
                        <router-link 
                            :to="`/category/${category.id}/${subcat.id}`"
                            class="catalog-category__link catalog-link link link--gray "                                   
                        >
                            {{ subcat.name }}
                        </router-link>  
                    </li>                   
                </ul>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const categories = computed(() => {
    return store.getters.getCategories.filter((item:{[key:string]:number}) => item.level === 1)
})

const subCategories = (id:string) => {
    return store.getters.getCategories.filter((item:{[key:string]:string}) => item.parent_id === id)
}

onMounted(() => {
    store.dispatch('fetchProducts')
})

</script>

<style scoped lang="scss">
.catalog-menu {

    &__list {
        list-style: none;
        text-align: left;
    }

}

.catalog-category {

    &__list {
        list-style: none;
        padding: 0;
        margin: 0 0 0 16px;
    }

    &__link {
        margin: 15px 0 0;
    }

    &__link--gray {
        color: #919191;
    }
}
</style>
