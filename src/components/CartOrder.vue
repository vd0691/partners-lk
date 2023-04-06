<template>
    <div class="cart-order">
        <div class="cart-order__wrapper">
            <ContractorSelect :is-selected="isContractorSelected"/>
            <h3>Ваш заказ</h3>
            <div class="cart-order__info">
                <div class="info-item">
                    <span class="info-item__title">
                        Всего товаров:
                    </span>
                    <span class="info-item__value">
                        {{ cartTotal.totalAmount }} шт.
                    </span>
                </div>
                <div class="info-item">
                    <span class="info-item__title">
                        Скидка:
                    </span>
                    <span class="info-item__value">
                        {{ cartTotal.discount }} руб.
                    </span>
                </div>
                <div class="info-item">
                    <span class="info-item__title info-item__total-title">
                        Сумма без скидки:
                    </span>
                    <span class="info-item__value info-item__total-value">
                        {{ cartTotal.totalWithoutDiscount }} руб.
                    </span>
                </div>
                <div class="info-item">
                    <span class="info-item__title info-item__total-title">
                        Итого со скидкой:
                    </span>
                    <span class="info-item__value info-item__total-value-discount">
                        {{ cartTotal.totalWithDiscount }} руб.
                    </span>
                </div>
            </div>
            <button @click="getCheckout" :disabled="!contractorId"> Оформить заказ</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import ContractorSelect from './ContractorSelect.vue';

const store = useStore()
const partnerId = computed(() => store.state.partner.partner?.id)
const contractorId = computed(() => store.state.contractors.contractor.id)
const isContractorSelected = ref()
const productsForCheckout = computed(() => store.getters.CART_PRODUCTS)
const cartTotal = computed(() => store.getters.GET_CART_TOTAL)
const checkoutBody = reactive({
    sumWithoutDiscount: cartTotal.value.totalWithoutDiscount,
    sumOfDiscount: cartTotal.value.discount,
    sumWithDiscount: cartTotal.value.totalWithDiscount,
    contractorId: contractorId.value,
    partnerId: partnerId.value,
    orderVts: productsForCheckout.value,
    vtOrderStatuses: [
        {
            "userId": "string"
        }
    ]
})

const getCheckout = () => {  
   store.dispatch('CHECKOUT_ORDER', checkoutBody)
}

</script>

<style scoped lang="scss">
.cart-order {

    &__wrapper {
        width: 100%;
        padding: 10px;
    }

}

.info-item {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    font-size: 15px;

    &__value {
        font-weight: bold;
    }

    &__total-value-discount {
        font-size: 18px;
    }
}
</style>