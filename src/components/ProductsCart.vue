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
            <button class="cart__controls-button" @click="addProducts">Добавить товары</button>
            <button class="cart__controls-button" @click="clearCart" v-if="!cartIsEmpty">Удалить все товары</button>
        </div>
        <ModalWindow v-if="isWindowOpen" @close-window="closeWindow">
            <ProductsList class="cart__products-box" />
            <PagePagination :total-items="totalItems" :per-page="20" />
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
import PagePagination from './PagePagination.vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const store = useStore()
const cartTotal = computed(() => store.getters.GET_CART_TOTAL)
const cartIsEmpty = computed(() => cartTotal.value.totalAmount < 1)
const checkoutStatus = computed(() => store.state.cart.checkoutStatus)
const partnerId = computed(() => store.state.partner.partner?.id)
const totalItems = computed(() => store.state.products.totalItems)
const currentPage =  computed(() => route.query.from)
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
watch([currentPage], () => {
  if (partnerId.value) {
      store.dispatch('FETCH_PRODUCTS', {
      partnerId: partnerId.value,
      from: currentPage.value,  
    })
  }
  
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
}

.cart .cart-order {
    border: 1px solid #ccc;
    border-radius: 4px;
    position: sticky;
    top: 60px;
}
</style>