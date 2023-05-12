<template>
    <div class="order-info">
        <div class="order-info__item">
            Заказ: <span>№ {{ props.order.num }}</span>
        </div>
        <div class="order-info__item">
            Дата: <span>{{ formatDate(props.order.orderDate).fullDate }}</span>
        </div>
        <div class="order-info__item">
            Статус: <span>{{ props.order.status }}</span>
        </div>
        <div class="order-info__item">
            Сумма без скидки: <span>{{ props.order.sumWithoutDiscount }} руб.</span>
        </div>
        <div class="order-info__item">
            Сумма скидки: <span>{{ props.order.sumOfDiscount }} руб.</span>
        </div>
        <div class="order-info__item">
            Сумма со скидкой: <span>{{ props.order.sumWithDiscount }} руб.</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { formatDate } from '@/helpers/FormatDate';
import { Order } from '@/interfaces/Interfaces';

const props = defineProps<{
  order: Order
}>()

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