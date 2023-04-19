<template>
    <div class="order-card">
        <div class="order-card__wrapper">
            <div class="order-card__header">
                <div class="order-card__header-content">
                    <OrderCardInfo :order="order" />
                </div>
            </div>
            <div class="order-card__list">
                <div class="order-card__list-content">
                    <OrderCardTable :order="order" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { Order } from '@/interfaces/Interfaces';
import OrderCardInfo from './OrderCardInfo.vue';
import OrderCardTable from './OrderCardTable.vue';



const store = useStore()
const route = useRoute()
const order = computed<Order>(() => store.state.orders.order)
onMounted(() => {
    store.dispatch('FETCH_ORDER', route.query.orderId as string)
})
</script>

<style scoped lang="scss">
.order-card {

    &__wrapper {
        max-width: 1024px;
        margin: 0 auto;
    }

    &__header {
        margin: 30px 0;
    }

    &__header-content {
        border: 1px solid #eee;
        border-radius: 4px;
        padding: 10px;
    }
}
</style>