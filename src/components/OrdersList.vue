<template>
    <div class="orders-list">
        <div class="orders-list__wrapper">
            <table class="table orders-table">
                <thead class="order-table__header">
                    <tr class="orders-table__titles">
                        <th class="orders-table__titles-text" v-for="title in headerTitles" :key="title">
                            {{ title }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orders" :key="order.id">
                        <router-link :to="{ path: 'order', query: {orderId: order.id}}" class="orders-table__link">
                            <td><span class="table-title">Номер</span>{{ order.num }}</td>
                            <td><span class="table-title">Дата заказа</span>{{ formatDate(order.orderDate).orderDate }}</td>
                            <td><span class="table-title">Сумма без скидки</span>{{ order.sumWithoutDiscount }} руб.</td>
                            <td><span class="table-title">Сумма со скидкой</span>{{ order.sumWithDiscount }} руб.</td>
                            <td><span class="table-title">Сумма скидки</span>{{ order.sumOfDiscount }} руб. </td>
                            <td><span class="table-title">Статус</span>{{ order.status }}</td>
                        </router-link>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { formatDate } from '@/helpers/FormatDate';
import { computed } from 'vue';

import { useStore } from 'vuex';

const store = useStore()
const orders = computed(() => store.state.orders.ordersList.result)
const headerTitles = ['№', 'Дата', 'Сумма без скидки', 'Сумма со скидкой', 'Сумма скидки', 'Статус']

</script>

<style scoped lang="scss">
.orders-list {

    &__wrapper {
        max-width: 960px;
        margin: 0 auto;
    }
}

.orders-table {
    border-radius: 5px;
    font-weight: normal;
    border: none;
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;

    &__link {
        display: contents;
        width: 100%;
    }
}


</style>