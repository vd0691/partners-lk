<template>
    <div class="order-card container">
        <div class="order-card__wrapper">
            <div class="order-card__header">
                <div class="order-card__header-content">
                    <OrderCardInfo />
                </div>
            </div>
            <div class="order-card__list">
                <div class="order-card__list-content">
                    <OrderCardTable  />
                    <div class="order-card__controls">
                        <BaseButton text="Отправить" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import OrderCardInfo from './OrderCardInfo.vue';
import OrderCardTable from './OrderCardTable.vue';
import BaseButton from './BaseButton.vue';

const store = useStore()
const route = useRoute()

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

    &__controls {
        margin: 20px 0;
    }
}
</style>