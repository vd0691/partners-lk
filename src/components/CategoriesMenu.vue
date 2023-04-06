<template>
    <div class="catalog-menu">
        <ul class="catalog-menu__list">
            <li class="menu-category">
                <router-link 
                    class="menu-link menu-category__link menu-link--main"
                    :to="'/'"
                    @click="currentMenuItem = undefined"
                >
                    Все товары
                </router-link>
            </li>
            <li class="menu-category" 
                v-for="category in categories" 
                :key="category.id"
            >
                <router-link 
                    class="menu-link menu-category__link menu-link--main"          
                    @click="selectItem(category.id)"
                    :to="`/category/${category.id}`"
                >
                    {{ category.name }}
                </router-link>
                <ul class="menu-category__list" v-show="category.id === currentMenuItem">
                    <li class="menu-subcategory" 
                        v-for="subcat in subCategories(category.id)" 
                        :key="subcat.id"
                    >
                        <router-link 
                            :to="`/category/${category.id}/${subcat.id}`"
                            class="menu-link menu-subcategory__link"                     
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
const currentMenuItem = ref()
const categories = computed(() => {
    return store.getters.GET_CATEGORIES
})

const subCategories = (id:string) => {
    return store.getters.GET_SUBCATEGORIES.filter((item: {groupId: string}) => item.groupId === id)
}
const selectItem = (id:string) => {
    currentMenuItem.value = id
}

onMounted(() => {
    store.dispatch('FETCH_CATEGORIES')
    currentMenuItem.value = route.params.category
})
</script>

<style scoped lang="scss">

.catalog-menu {
  
    &__list {
        list-style: none;
        text-align: left;
        padding: 0 15px 0 0;

        @media screen and (max-width: 1024px) {
            display: flex;   
            flex-wrap: wrap;
            padding: 0;
        }
    }

}
.menu-category {
    margin-top: 10px;

    @media screen and (max-width: 1024px) {
        width: 50%;
    }

    &__list {
        list-style: none;
        padding: 0;
        margin: 0 0 0 16px;
    }

    &__link {
        color: #141414;
    }

}

.menu-subcategory {
    margin-top: 10px;

    &__link {
        color: #767676;
        padding: 5px 10px;
    }

    &__link.router-link-active {
        color: #000000;
        font-weight: bold;
        padding: 5px 10px;
        border-bottom: 3px solid #9dd9bf;
    } 
}

</style>
