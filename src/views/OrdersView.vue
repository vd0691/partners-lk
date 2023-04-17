<template>
    <div class="orders">
        <div class="orders-wrapper">
            <ProductsCart />   
            <div class="orders-header">
                <h1>Заказы</h1>
            </div>

            <div class="orders-body">
                <OrdersList />
                <div class="pagination">
                    <PagePagination :total-items="100" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ProductsCart from '@/components/ProductsCart.vue';
import OrdersList from '@/components/OrdersList.vue';
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import PagePagination from '@/components/PagePagination.vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const store = useStore()
const currentPage =  computed(() => route.query.from)
const itemsNumber = ref(20)

watch([ currentPage, itemsNumber], () => {
  
    store.dispatch('FETCH_ORDERS', {
        from:currentPage.value, 
        size:itemsNumber.value
    })
  
}, {immediate: true})

</script>