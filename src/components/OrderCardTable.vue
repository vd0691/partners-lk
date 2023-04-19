<template>
    <table class="orders-table">
        <thead class="order-table__header">
            <tr class="orders-table__titles">
                <th class="orders-table__titles-text" v-for="title in headerTitles" :key="title">
                    {{ title }}
                </th>
                <th class="orders-table__titles-text" v-if="props.order.status === 'NEW'">
                    Редактировать                    
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in props.order.orderVts" :key="item.id">
                <td><span>№</span>{{ item.nrow }}</td>
                <td><span>Номенклатура</span>{{ item.name}}</td>
                <td><span>Количество</span>{{ item.amount }} шт. </td> 
                <td><span>% cкидки</span>{{ item.discount }} </td>
                <td><span>Цена со скидкой</span>{{ item.price }} руб. </td>
                <td><span>Сумма со скидкой</span>{{ item.total }} руб. </td>
                <td v-if="props.order.status === 'NEW'"><span>Удалить</span><button @click="removeItem(item.itemId)">Удалить</button></td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { Order } from '@/interfaces/Interfaces';
import { useStore } from 'vuex';

const store = useStore()
const props = defineProps<{
    order: Order
}>()
const headerTitles = ['№', 'Номенклатура', 'Количество', '% Скидки', 'Цена со скидкой', 'Сумма со скидкой']

const removeItem = (itemId:string) => {
    store.dispatch('REMOVE_FROM_ORDER', itemId)
}
</script>

<style scoped lang="scss">
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
}
</style>