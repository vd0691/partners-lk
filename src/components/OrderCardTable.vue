<template>
    <table class="table orders-table">
        <thead class="table-thead order-table__header">
            <tr class="orders-table__titles">
                <th class="orders-table__titles-text" v-for="title in headerTitles" :key="title">
                    {{ title }}
                </th>
                <th class="orders-table__titles-text" v-if="order.status === 'NEW'">
                    Редактировать
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item, i in order.orderVts" :key="item.id">
                <td><span class="table-title">№</span>{{ item.nrow }}</td>
                <td><span class="table-title">Номенклатура</span>
                    <div class="table__item-name" @click="changeProduct(i)">
                        {{ item.name }}
                    </div>
                </td>
                <td><span class="table-title">Количество</span>{{ item.amount }} шт. </td>
                <td><span class="table-title">% cкидки</span>{{ item.discount }} </td>
                <td><span class="table-title">Цена со скидкой</span>{{ item.price }} руб. </td>
                <td><span class="table-title">Сумма со скидкой</span>{{ item.total }} руб. </td>
                <td v-if="order.status === 'NEW'"><span class="table-title">Удалить</span><button
                        @click="removeItem(item.itemId)">Удалить</button></td>
            </tr>
        </tbody>
    </table>
    <ModalWindow v-if="isWindowOpen" @close-window="closeWindow">
        <ProductsList class="cart__products-box" mode="order"/>
        <PagePagination :total-items="totalItems" />
    </ModalWindow>
</template>

<script setup lang="ts">
import { Order } from '@/interfaces/Interfaces';
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import ModalWindow from './ModalWindow.vue';
import ProductsList from './ProductsList.vue';
import PagePagination from './PagePagination.vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const store = useStore()
const order = computed<Order>(() => store.state.orders.order)
const headerTitles = ['№', 'Номенклатура', 'Количество', '% Скидки', 'Цена со скидкой', 'Сумма со скидкой']
const isWindowOpen = ref(false)
const totalItems = computed(() => store.state.products.totalItems)
const currentPage = computed(() => route.query.from)


const changeProduct = (i:number) => {
    isWindowOpen.value = true
    store.dispatch('SET_REPLACEMENT_PRODUCT', i)
}
const removeItem = (itemId: string) => {
    store.dispatch('REMOVE_FROM_ORDER', itemId)
}

const closeWindow = () => {
    isWindowOpen.value = false
}

watch([currentPage], () => {
    store.dispatch('FETCH_PRODUCTS', {
        from: currentPage.value,
    }) 
}, { immediate: true })


</script>

<style lang="scss"></style>