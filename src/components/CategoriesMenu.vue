<template>
    <div class="catalog-menu">
        <ul class="catalog-menu__list">
            <li class="catalog-category" 
                v-for="category, index in categories" 
                :key="category.id"
                @click="selectItem(index)"
            >
                <router-link 
                    class="link catalog-link catalog-category__link catalog-link--main"
                    :to="`/category/${category.id}`"
                >
                    {{ category.name }}
                </router-link>
                <ul class="catalog-category__list" v-show="currentMenuItem === index || category.id === route.params.category">
                    <li class="catalog-subcat" 
                        v-for="subcat in subCategories(category.id)" 
                        :key="subcat.id"
                        @click="store.dispatch('FETCH_PRODUCTS_BY_CATEGORY', subcat.id)"
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
import { useStore } from 'vuex';
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute()
const store = useStore()
const categories = computed(() => {
    return store.getters.GET_CATEGORIES
})

const subCategories = (id:string) => {
    return store.getters.GET_SUBCATEGORIES.filter((item: {parent_id: string}) => item.parent_id === id)
}

const currentMenuItem = ref()
const selectItem = (i:number) => {
    currentMenuItem.value = i
}

onMounted(() => {
    store.dispatch('FETCH_CATEGORIES')
})
</script>

<style scoped lang="scss">
.catalog-menu {
    height: 70vh;
    overflow-y: auto;

    &__list {
        list-style: none;
        text-align: left;
        padding: 0 15px 0 0;
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

::-webkit-scrollbar-track {
	background-color: #fff;
} 
::-webkit-scrollbar-thumb { 
	border-radius: 5px; 
	background-color: #ccc;
} 
::-webkit-scrollbar { 
	width: 6px;
}
</style>
