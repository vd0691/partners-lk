<template>
    <div class="product-card">
        <div class="product-card__images">
            <ProductCardImages />
        </div>
        <div class="product-card__content">
            <div class="product-card__header-box">
                <h1 class="product-card__title">
                    {{ props.product.name }}
                </h1>
            </div>
            <div class="product-card__info-box">
                <div class="product-params">
                    <dl class="product-params__item">
                        <dt class="product-params__key"><span>Артикул</span></dt>
                        <dd class="product-params__value">{{ props.product.vendorCode }}</dd>
                    </dl>
                    <dl class="product-params__item">
                        <dt class="product-params__key"><span>Страна</span></dt>
                        <dd class="product-params__value">{{ props.product.countryOfOrigin }}</dd>
                    </dl>
                </div>
            </div>
            <div class="product-card__price-box">
                <div class="price-box">
                    <span class="price-box__discount-price">{{ props.product.retailPriceBeforeDiscount }} ₽</span>
                    <span class="price-box__main-price">{{ props.product.retailPrice }} ₽</span>
                </div>
            </div>
            <div class="product-card__order-box">
                <div class="order-controls">
                    <input class="order-controls__number" v-model.number="amount"/>
                    <button class="order-controls__button" 
                        @click="addToOrder" 
                        :disabled="isInCart(props.product.id)"
                    >
                        {{ isInCart(props.product.id) ? 'В корзине' : 'В корзину' }}
                    </button>
                </div>                    
            </div>
        </div>         
    </div>
</template>

<script setup lang="ts">
import { Product } from '@/interfaces/Product';
import { computed, provide, ref } from 'vue';
import ProductCardImages from './ProductCardImages.vue'
import { useStore } from 'vuex';

const store = useStore()
const props = defineProps<{
  product: Product
}>()

const amount = ref(1)
const cartProducts = computed(() => store.state.cart.cartProducts)
const addToOrder = () => {
    store.dispatch('ADD_TO_CART', {product: props.product, amount: amount.value})
}
const isInCart = (id:string) => {
    return cartProducts.value.find((item:Product) => item.id === id)
}
provide('product', props.product)
</script>

<style scoped lang="scss">
.product-card {
    display: flex;   
    
    &__images {
        width:  50%;
    }
    
    &__content {
        width: 50%;
        display: flex;
        flex-direction: column;
        padding: 10px 25px;
    }

    &__header-box {
        padding: 10px 0;
    }

    &__info-box {
        padding: 0 10px;
    }
    
    &__title {
        font-size: 18px;
    }
}

.product-params {

    &__item {
        display: flex;
        width: 100%;
    }


    &__key {
        width:  60%;
        position: relative;

        & span {
            background: #fff;
            padding-right: 3px;
            position: relative;
        }

        &:before {
            content: "";
            position: absolute;
            border-bottom: 1px dotted #91919199;
            bottom: 3px;
            display: block;
            left: 0;
            width: 100%;
        }
    }

    &__value {
        width: 40%;
        margin: 0;
        padding: 0 0 0 4px;   
            
    }
}

.price-box {
    margin:20px 0;
    display: flex;
    align-items: center;
    justify-content: center;

    &__main-price {
        font-size: 20px;
        font-weight: bold;
    }

    &__discount-price {
        position: relative;
        font-size: 18px;
        color: #757575;
        margin-right: 15px;

        &::after {
            content: '';
            position: absolute;
            background: #c7000082;
            width: 100%;
            height: 2px;
            transform: rotate(2deg);
            top: 50%;
            left: 0;
        }
    }
}

.order-controls {
    display: flex;
    justify-content: center;

    &__number {
        width: 60px;
        height: 40px;
        margin-right: 15px;
        text-align: center;
        font-size: 14px;
    }

    &__button {
        background: #4c4c4c;
        border: none;
        border-radius: 4px;
        color: #fff;
        font-size: 16px;
    }
}

</style>