<template>
    <div class="cart">
        <h1 class="cart__title">{{ !cartIsEmpty ? 'Корзина' : 'Ваша корзина пуста' }}</h1>
        <div class="cart__wrapper" v-if="!cartIsEmpty">
            <div class="cart__content">
                <CartProductsTable />
            </div>
            <div class="cart__sidebar">
                <CartOrder />
            </div>
        </div>
        <div class="cart__controls">
            <button class="cart__controls-button" @click="addProducts">Добавить товары</button>
            <button class="cart__controls-button" @click="clearCart" v-if="!cartIsEmpty">Удалить все товары</button>
        </div>
        <ModalWindow v-if="isWindowOpen" @close-window="closeWindow">
            <ProductsList class="cart__products-box" />
        </ModalWindow>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import CartOrder from './CartOrder.vue';
import CartProductsTable from './CartProductsTable.vue'
import ModalWindow from './ModalWindow.vue';
import ProductsList from './ProductsList.vue';

const store = useStore()
const cartTotal = computed(() => store.getters.GET_CART_TOTAL)
const cartIsEmpty = computed(() => cartTotal.value.totalAmount < 1)
const partnerId = computed(() => store.state.partner.partner?.id)
const isWindowOpen = ref(false)
const addProducts = () => {
    store.dispatch('FETCH_PRODUCTS', {
        partnerId: partnerId.value
    })
    isWindowOpen.value = true
}
const closeWindow = () => {
    isWindowOpen.value = false
}

const clearCart = () => {
    store.dispatch('CLEAR_CART')
}

</script>

<style scoped lang="scss">
.cart {

    &__wrapper {
        display: flex;
    }

    &__content {
        width: 70%;
        margin-right: 30px;
    }

    &__sidebar {
        width: 20%;
    }

    &__products-box {
        height: 500px;
        overflow-y: scroll;
    }

    &__controls-button {
        margin: 5px 10px;
    }
}

.cart .cart-order {
    border: 1px solid #ccc;
    border-radius: 4px;
    position: sticky;
    top: 10px;
}
</style>