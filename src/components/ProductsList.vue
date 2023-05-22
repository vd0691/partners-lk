<template>
    <table class="table products-table">
        <thead class="table-thead product-table__header">
            <tr class="table-tr products-table__titles">
                <th class="table-th products-table__titles-text" v-for="title in tableTitles" :key="title">
                    {{ title }}
                </th>
            </tr>
        </thead>
        <tbody class="table-body products-table__body">
            <tr v-for="product, i in products" :key="product.id">
                <td class="products-table__item"><span class="table-title">Код</span>{{ product.vendorCode }}</td>
                <td class="products-table__item"><span class="table-title">Наименование</span>
                    <div class="products-table__item-wrapper">
                        <div class="product-name" @click="openCard(), getCurrerntProduct(product)">
                            <span class="product-novelty">
                                {{ product.isNovelty ? 'Новинка!' : '' }}
                            </span>
                            {{ product.name }}
                        </div>
                        <ProductImage :product-id="product.id" />
                    </div>
                </td>
                <td class="products-table__item"><span class="table-title">Цена оптовая, руб.</span>{{
                    product.retailPriceBeforeDiscount }} руб.
                </td>
                <td class="products-table__item"><span class="table-title">Скидка, %</span>{{ product.discount }}</td>
                <td class="products-table__item"><span class="table-title">Цена оптовая со скидкой, руб</span>{{
                    product.retailPrice }} руб.
                </td>
                <td class="products-table__item"><span class="table-title">Страна</span>{{ product.countryOfOrigin }}</td>
                <td class="products-table__item"><span class="table-title">Заказ</span>{{ product.status }}
                    <div class="order-controls">
                        <BaseInput id="quant" 
                            class="order-controls__field" placeholder="кол-во"
                            v-model="productAmount[i]" 
                        />
                        <BaseButton 
                            :disabled="!props.mode || props.mode === 'order' ? isInOrder(product.id) : isInCart(product.id)" 
                            сlass="order-controls__button" 
                            @click="addToOrder(product, i)" 
                            :text="props.mode === 'order' ? isInOrder(product.id) ? 'Добавлено' : 'Добавить' : 
                                isInCart(product.id) ? 'В корзине' : 'В корзину'"
                        />
                
                    </div>
                </td>
            </tr>
            <ModalWindow class="product-modal" v-if="cardIsOpen" @close-window="closeCard">
                <ProductCard :product="currentProduct" />
            </ModalWindow>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { OrderProduct, Product } from '@/interfaces/Interfaces';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import ProductImage from './ProductImage.vue';
import BaseInput from './BaseInput.vue';
import ModalWindow from './ModalWindow.vue';
import ProductCard from './ProductCard.vue';
import BaseButton from './BaseButton.vue';

const emit = defineEmits(['productEvent', 'e'])
const props = defineProps({
    mode: {
        type: String,
        default: 'catalog'
    }
})
const store = useStore();
const currentProduct = ref()
const productAmount = ref([])
const cardIsOpen = ref(false)
const products = computed(() => store.state.products.productsList)
const tableTitles = ['Код', 'Наименование', 'Цена опт., руб.', 'Скидка, %', 'Цена опт. со скидкой, руб.', 'Страна', 'Заказ']
const cartProducts = computed(() => store.state.cart.cartProducts)
const orderProducts = computed(() => store.state.orders.order.orderVts)
const isInOrder = (id:string) => {
    return orderProducts.value.find((item:OrderProduct) => item.itemId === id)
}
const isInCart = (id: string) => {
    return cartProducts.value.find((item:Product) => item.id === id)
}
const getCurrerntProduct = (product: Product) => {
    currentProduct.value = product
}
const openCard = () => {
    cardIsOpen.value = true
}

const closeCard = () => {
    cardIsOpen.value = false
}

const addToOrder = (product: Product, i: number) => {
    const amount = productAmount.value[i] || 1
    props.mode === 'catalog' ?
    store.dispatch('ADD_TO_CART', {product, amount}) :
    emit('productEvent', product, amount)
}

</script>

<style scoped lang="scss">
.products-table {

    &__item-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}

.product-name {
    text-align: left;

    &:hover {
        cursor: pointer;
    }
}

.order-controls {
    display: flex;
    justify-content: center;

    &__field {
        width: 30%;
        margin: 0 5px 0;
    }
}
</style>
