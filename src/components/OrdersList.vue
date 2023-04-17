<template>
    <div class="orders-list">
        <div class="orders-list__wrapper">
            <table class="orders-table">
                <thead class="order-table__header">
                    <tr class="orders-table__titles">
                        <th class="orders-table__titles-text" v-for="title in headerTitles" :key="title">
                            {{ title }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orders" :key="order.id">
                        <router-link :to="{ name: 'order', query: {orderId: order.id}}" class="orders-table__link">
                            <td><span>Номер</span>{{ order.num }}</td>
                            <td><span>Дата заказа</span>{{ formatDate(order.orderDate) }}</td>
                            <td><span>Сумма без скидки</span>{{ order.sumWithoutDiscount }} руб.</td>
                            <td><span>Сумма со скидкой</span>{{ order.sumWithDiscount }} руб.</td>
                            <td><span>Сумма скидки</span>{{ order.sumOfDiscount }} руб. </td>
                            <td><span>Статус</span>{{ order.status }}</td>
                        </router-link>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';

import { useStore } from 'vuex';

const store = useStore()
const orders = computed(() => store.state.orders.ordersList)
const headerTitles = ['№', 'Дата', 'Сумма без скидки', 'Сумма со скидкой', 'Сумма скидки', 'Статус']

const formatDate = (date: string) => {
    const time = date.split('T')[1]
    const orderDate = date.split('T')[0].replace(/^(\d+)-(\d+)-(\d+)$/, `$3.$2.$1`)
    const orderTime = time.slice(0, -time.length + 5)
    const currentDate = orderDate + ' ' + orderTime
    return currentDate
}
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

.orders-table th,
.orders-table td {
    padding: 10px 20px;
    font-size: 13px;
    border: none;
    font-family: Verdana, sans-serif;
    border: 1px solid #337AB7;
    vertical-align: top;
}

.orders-table th {
    color: #FFF;
    background: #337AB7;
    font-weight: bold;
    border: 1px solid #1a4a73;
    text-transform: uppercase;
    text-align: center;
}

.orders-table tr:nth-child(even) {
    background: #edf7ff;
}

.orders-table td span {
    background: #337AB7;
    color: #FFF;
    display: none;
    font-size: 11px;
    font-weight: bold;
    font-family: Verdana, sans-serif;
    text-transform: uppercase;
    padding: 5px 10px;
    position: absolute;
    top: 0;
    left: 0;
}

@media(max-width: 768px) {
    .orders-table thead {
        display: none;
    }

    .orders-table tr {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-bottom: 30px;
    }

    .orders-table td {
        margin: 0 -1px -1px 0;
        padding-top: 35px;
        position: relative;
        width: 50%;
    }

    .orders-table td span {
        display: block;
    }
}

@media(max-width: 480px) {
    .orders-table td {
        width: 100%;
    }
}</style>