<template>
    <table class="products-table">
        <thead class="products-table__header">
            <tr class="products-table__titles">
                <th class="products-table__titles-text" v-for="title in headerTitles" :key="title">
                    {{ title }}
                </th>
            </tr>
        </thead>
        <tbody class="products-table__body">
            <tr class="products-table__products-list" v-for="product, i in cartProducts" :key="product.id">
                <td class="products-table__product-item"><span class="product-id">{{ i + 1 }}</span></td>
                <td class="products-table__product-item">
                    <div class="products-table__item-wrapper">
                        <div class="product-name">
                            <span class="product-novelty">
                                {{ product.isNovelty ? 'Новинка!' : '' }}
                            </span>
                            {{ product.name }}
                        </div>
                    </div>
                </td>
                <td class="products-table__product-item">{{ product.retailPrice }} руб.</td>
                <td class="products-table__product-item">
                    <input 
                        @input="changeAmount(product.id, $event)" 
                        :value="product.amount"
                    />
                </td>
                <td class="products-table__product-item">{{ product.retailPrice * product.amount }} руб.</td>
                <td class="products-table__product-item">
                    <div class="order-controls">
                        <button @click="removeFromCart(product.id)" class="order-controls__button">X</button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const headerTitles = ['№', 'Наименование', 'Цена', 'Кол-во', 'Сумма', 'Удалить']
const cartProducts = computed(() => store.state.cart.cartProducts)

const changeAmount = (id:string, event:Event) => {
    const value = Number((event.target as HTMLInputElement).value)
    if (value <= 0) {
        store.dispatch('REMOVE_FROM_CART', id)
    } else {
        store.dispatch('CHANGE_PRODUCT_AMOUNT', {id: id, amount: value})
    }
}

const removeFromCart = (id:string) => {
    store.dispatch('REMOVE_FROM_CART', id)
}
</script>

<style scoped lang="scss">
.products-table {
    width: 100%;


    &__product-item {

        & input {
            width: 80px;
            text-align: center;
        }
    }

    &__product-item:nth-last-child(2) {
        min-width: 140px;
        text-align: center;
        
    }
    &__product-item:nth-last-child(4) {
        min-width: 90px;
        text-align: center;
       
    }
}
</style>