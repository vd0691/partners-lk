<template>
    <div class="products-box">   
        <div class="products-list">
            <div class="products-list__wrapper">
                <table class="products-table">
                    <thead class="products-table__header">
                        <tr class="products-table__titles">
                            <th class="products-table__titles-text" 
                                v-for="title in headerTitles" 
                                :key="title">
                                {{ title }}                            
                            </th>
                        </tr>
                    </thead>
                    <tbody class="products-table__body">
                        <tr class="products-table__products-list" v-for="product, i in products" :key="product.id">
                            <td class="products-table__product-item"><span class="product-id">{{ product.vendorCode }}</span></td>
                            <td class="products-table__product-item">
                                <div class="products-table__item-wrapper">
                                    <div class="product-name" @click="openCard(product)">
                                        <span class="product-novelty">
                                            {{ product.isNovelty ? 'Новинка!' : '' }}
                                        </span>
                                        {{ product.name }}
                                    </div>
                                    <ProductImage :product-id="product.id"/>
                                </div>
                            </td>
                            <td class="products-table__product-item">{{ product.retailPriceBeforeDiscount }}</td>
                            <td class="products-table__product-item">{{ product.discount }}</td>
                            <td class="products-table__product-item">{{ product.retailPrice }}</td>
                            <td class="products-table__product-item"><span class="product-country">{{ product.countryOfOrigin }}</span></td>
                            <td class="products-table__product-item">
                                <div class="order-controls">
                                    <input class="order-controls__number" placeholder="кол-во" v-model="productAmount[i]"/>
                                    <button @click="addToOrder(product, i)" 
                                            class="order-controls__button" 
                                            :disabled="isInCart(product.id)"
                                    >
                                        {{ isInCart(product.id) ? 'В корзине' : 'Добавить в корзину' }}
                                    </button>
                                </div>
                            </td>
                        </tr> 
                        <ModalWindow class="product-modal" v-if="cardIsOpen" @close-window="closeCard">
                            <ProductCard :product="currentProduct"/>                       
                        </ModalWindow>
                    </tbody>   
                </table>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Product } from '@/interfaces/Product';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import ModalWindow from './ModalWindow.vue';
import ProductCard from './ProductCard.vue';
import ProductImage from './ProductImage.vue';

const store = useStore();
const headerTitles = ['Код', 'Наименование', 'Цена опт., руб.', 'Скидка, %', 'Цена опт. со скидкой, руб.', 'Страна производитель', 'Заказ']
const products = computed(() => store.state.products.productsList) 
const currentProduct = ref()
const cartProducts = computed(() => store.state.cart.cartProducts)
const productAmount = ref([])
const cardIsOpen = ref(false)
const openCard = (product:Product) => {
    cardIsOpen.value = true
    currentProduct.value = product
}
const closeCard = () => {
    cardIsOpen.value = false
}

const addToOrder = (product:Product, i:number) => {
    const amount = productAmount.value[i]
    store.dispatch('ADD_TO_CART', {product: product, amount: amount})
}

const isInCart = (id:string) => {
    return cartProducts.value.find((item:Product) => item.id === id)
}
</script>


<style scoped lang="scss">

.products-table {
    border: 1px solid #eee;
    border-spacing: 0;
    width: 100%;

    &__header {
        background: #D1EADF;
    }
    &__titles-text {
        border: 1px solid #eee;
        padding: 7px;
        font-size: 11px;
    }
    &__products-list {
        height: 50px;
    }
    &__product-item {
        height: 40px;
        padding: 10px;
        border: 1px solid #eee;
    }
    &__item-wrapper {
        display: flex;
        justify-content: space-between;
    }
}

.order-controls {
    display: flex;
    justify-content: center;

    &__button {
        margin-left: 6px;
    }

    &__number {
        width: 28%;
        text-align: center;
    }
}

.product-id {
    font-size: 12px;
}

.product-country {
    font-size: 13px;
}

.product-name {
    text-align: left;
}

.product-novelty {
    font-size: 12px;
    color: #ff0000;
    vertical-align: text-top;
}

</style>

