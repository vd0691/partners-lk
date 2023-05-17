<template>
    <div class="order-info">
        <div class="order-info__item">
            Заказ: <span>№ {{ order.num }}</span>
        </div>
        <div class="order-info__item">
            Дата: <span>{{ formatDate(order.orderDate).fullDate }}</span>
        </div>
        <div class="order-info__item">
            Статус: <span>{{ order.status }}</span>
        </div>
        <div class="order-info__item">
            Сумма без скидки: <span>{{ order.sumWithoutDiscount }} руб.</span>
        </div>
        <div class="order-info__item">
            Сумма скидки: <span>{{ order.sumOfDiscount }} руб.</span>
        </div>
        <div class="order-info__item">
            Сумма со скидкой: <span>{{ order.sumWithDiscount }} руб.</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { formatDate } from '@/helpers/FormatDate';
import { Order } from '@/interfaces/Interfaces';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const order = computed<Order>(() => store.state.orders.order)

</script>

<style scoped lang="scss">
.order-info {
    display: flex;
    flex-wrap: wrap;
    font-size: 16px;

    &__item {
        width: calc(100% / 3);
        margin-bottom: 20px;

        & span {
            font-weight: 600;
        }
    }
}
</style>