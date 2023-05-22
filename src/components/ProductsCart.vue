<template>
    <div class="cart">
        <h1 class="cart__title">{{ !cartIsEmpty ? 'Корзина' : 'Ваша корзина пуста' }}</h1>
        <div class="cart__checkout-status" v-if="checkoutStatus">
            {{ checkoutStatus }}
        </div>
        <div class="cart__wrapper" v-if="!cartIsEmpty">
            <div class="cart__content">
                <CartProductsTable />
            </div>
            <div class="cart__sidebar">
                <CartOrder />
            </div>
        </div>
        <div class="cart__controls">
            <BaseButton text="Добавить товары" class="cart__controls-button" @click="fetchProducts(), openWindow()" />
            <BaseButton  text="Очистить корзину" class="cart__controls-button" @click="clearCart" v-if="!cartIsEmpty"/>
            
        </div>
        <ModalWindow v-if="isWindowOpen" @close-window="closeWindow">
            <ProductsList 
                @product-event="(product, amount) => addToCart(product, amount)"
             />
            <div class="cart__modal-more">
                <BaseButton class="cart__more-button" 
                    @click="loadMore" 
                    text="Загрузить еще" 
                />
            </div>
        </ModalWindow>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import CartOrder from './CartOrder.vue';
import CartProductsTable from './CartProductsTable.vue'
import ModalWindow from './ModalWindow.vue';
import ProductsList from './ProductsList.vue';
import { Product } from '@/interfaces/Interfaces';
import BaseButton from './BaseButton.vue';

const size = ref(20)
const store = useStore()
const cartTotal = computed(() => store.getters.GET_CART_TOTAL)
const cartIsEmpty = computed(() => cartTotal.value.totalAmount < 1)
const checkoutStatus = computed(() => store.state.cart.checkoutStatus)

const isWindowOpen = ref(false)

const fetchProducts = () => {
    store.dispatch('FETCH_PRODUCTS', {})
}

const addToCart = (product: Product, amount: number) => {
    store.dispatch('ADD_TO_CART', { product, amount })
}

const openWindow = () => {
    isWindowOpen.value = true
}
const closeWindow = () => {
    isWindowOpen.value = false
}

const clearCart = () => {
    store.dispatch('CLEAR_CART')
}

const loadMore = () => {
    size.value = size.value + 20
}

watch([size], () => {
    store.dispatch('FETCH_PRODUCTS', {
        size: size.value
    })
})

</script>

<style scoped lang="scss">
.cart {

    &__wrapper {
        display: flex;

        @media screen and (max-width: 1024px) {
            flex-direction: column;
        }
    }

    &__content {
        width: 70%;
        margin-right: 30px;

        @media screen and (max-width: 1024px) {
            width: 100%;
        }
    }

    &__products-box {
        height: 500px;
        overflow-y: scroll;
    }

    &__controls-button {
        margin: 5px 10px;
    }

    &__checkout-status {
        font-size: 16px;
        font-weight: bold;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        text-align: center;
        margin-bottom: 16px;
    }

    &__modal-more {
        margin: 20px 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &__more-button {
        padding: 5px;
    }
}

.cart .cart-order {
    border: 1px solid #ccc;
    border-radius: 4px;
    position: sticky;
    top: 60px;
}
</style>