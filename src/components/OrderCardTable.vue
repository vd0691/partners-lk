<template>
    <table class="table orders-table">
        <thead class="table-thead order-table__header">
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
                <td><span class="table-title">№</span>{{ item.nrow }}</td>
                <td><span class="table-title">Номенклатура</span>
                    <div class="table__item-name" @click="changeProduct(item.id)">
                        {{ item.name}}
                    </div>
                </td>
                <td><span class="table-title">Количество</span>{{ item.amount }} шт. </td> 
                <td><span class="table-title">% cкидки</span>{{ item.discount }} </td>
                <td><span class="table-title">Цена со скидкой</span>{{ item.price }} руб. </td>
                <td><span class="table-title">Сумма со скидкой</span>{{ item.total }} руб. </td>
                <td v-if="props.order.status === 'NEW'"><span class="table-title">Удалить</span><button @click="removeItem(item.itemId)">Удалить</button></td>
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

const changeProduct = (id:number) => {
    console.log(id)
}
const removeItem = (itemId:string) => {
    store.dispatch('REMOVE_FROM_ORDER', itemId)
}
</script>

<style scoped lang="scss">

</style>