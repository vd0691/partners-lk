<template>
    <table class="table order-table">
        <thead class="table-thead order-table__header">
            <tr class="order-table__titles">
                <th class="order-table__titles-text" v-for="title in headerTitles" :key="title">
                    {{ title }}
                </th>
                <th class="order-table__titles-text" v-if="order.status === 'NEW'">
                    Редактировать
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item, i in order.orderVts" :key="item.id">
                <td><span class="table-title">№</span>{{ item.nrow }}</td>
                <td><span class="table-title">Номенклатура</span>
                    <div class="order-table__item-name" @click="setChangingProduct(i), openProductsModal(), changeMode('change')">
                        {{ item.name }}
                    </div>
                </td>
                <td><span class="table-title">Количество</span>{{ item.amount }} шт. </td>
                <td><span class="table-title">% cкидки</span>{{ item.discount }} </td>
                <td><span class="table-title">Цена со скидкой</span>{{ item.price }} руб. </td>
                <td><span class="table-title">Сумма со скидкой</span>{{ item.total }} руб. </td>
                <td v-if="order.status === 'NEW'"><span class="table-title">Удалить</span><button
                    @click="removeItem(item.itemId)">Удалить</button>
                </td>
            </tr>
            <span>
                <BaseButton v-if="order.status === 'NEW'" class="order-table__add-more" text="+" title="Добавить товары"  @click="openProductsModal(), changeMode('add')" />
            </span>            
        </tbody>
    </table>
   
    <ModalWindow v-if="isWindowOpen" @close-window="closeProductsModal">
        <ProductsList 
            @product-event="(product, amount) => {addToOrder(product, amount)}"
            mode="order"
        />
        <PagePagination :total-items="totalItems" />
    </ModalWindow>
</template>

<script setup lang="ts">
import { Order, Product } from '@/interfaces/Interfaces';
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import ModalWindow from './ModalWindow.vue';
import ProductsList from './ProductsList.vue';
import PagePagination from './PagePagination.vue';
import { useRoute } from 'vue-router';
import BaseButton from './BaseButton.vue';

const route = useRoute()
const store = useStore()
const headerTitles = ['№', 'Номенклатура', 'Количество', '% Скидки', 'Цена со скидкой', 'Сумма со скидкой']
const order = computed<Order>(() => store.state.orders.order)
const totalItems = computed(() => store.state.products.totalItems)
const currentPage = computed(() => route.query.from)
const isWindowOpen = ref(false)
const params = ref()

const openProductsModal = () => {
    isWindowOpen.value= true
}

const closeProductsModal = () => {
    isWindowOpen.value = false
}

const setChangingProduct = (i: number) => {
    store.dispatch('SET_REPLACEMENT_PRODUCT', i)  
}

const changeMode = (value:string) => {
    params.value = value
}

const addToOrder = (product:Product, amount:number) => {
    params.value === 'add' ? store.dispatch('ADD_TO_ORDER', {product, amount}) : store.dispatch('CHANGE_FROM_ORDER', {product, amount}) 
}

const removeItem = (itemId: string) => {
    store.dispatch('REMOVE_FROM_ORDER', itemId)
}


watch([currentPage], () => {
    store.dispatch('FETCH_PRODUCTS', {
        from: currentPage.value,
    })
}, { immediate: true })


</script>

<style scoped lang="scss">
.order-table {

    &__item-name {
        text-align: left;
    }

    &__add-more {
        margin: 5px;
        padding: 4px 8px;
    }
}
</style>