import { CartState, RootState } from "@/interfaces/StoreInterface"
import { ActionTree, GetterTree, MutationTree } from "vuex"

const cart = JSON.parse(localStorage.getItem('cart') || '[]')

const state = (): CartState => ({
    cartProducts: cart
})

// getters
const getters: GetterTree<CartState, RootState> = {
    CART_PRODUCTS(state) {
        return state.cartProducts.map((item, index) => {
            return {
                n_row: index + 1,
                id: item.id,
                amount: Number(item.amount),
                sale: item.retailPriceBeforeDiscount,
                discount: item.discount,
                price: item.retailPrice,
                total: item.amount * item.retailPrice
            }
        })
    },
    GET_CART_TOTAL: (state) => {
        return state.cartProducts.reduce(({ totalWithDiscount, totalWithoutDiscount, discount, totalAmount }, product) => {
            return {
                totalWithDiscount: totalWithDiscount + product.retailPrice * product.amount,
                totalWithoutDiscount: totalWithoutDiscount + product.retailPriceBeforeDiscount * product.amount,
                discount: discount + (product.retailPriceBeforeDiscount - product.retailPrice) * product.amount,
                totalAmount: totalAmount + product.amount
            }
        }, { totalWithDiscount: 0, totalWithoutDiscount: 0, discount: 0, totalAmount: 0 });
    }
}

// actions
const actions: ActionTree<CartState, RootState> = {
    ADD_TO_CART({ commit }, { product, amount }) {

        commit('ADD_TO_CART', {
            id: product.id,
            name: product.name,
            vendorCode: product.vendorCode,
            retailPriceBeforeDiscount: product.retailPriceBeforeDiscount,
            retailPrice: product.retailPrice,
            discount: product.discount,
            amount: amount
        })
    },

    CHANGE_PRODUCT_AMOUNT({ commit }, { id, amount }) {
        commit('CHANGE_AMOUNT', { id, amount })
    },

    CHECKOUT_ORDER({ state, getters, rootState }) {
        console.log()
    },

    REMOVE_FROM_CART({ commit }, productId) {
        commit('REMOVE_FROM_CART', productId)
    },

    CLEAR_CART({ commit }) {
        commit('CLEAR_CART')
    }
}

// mutations
const mutations: MutationTree<CartState> = {
    ADD_TO_CART(state, { id, amount = 1, retailPriceBeforeDiscount, discount, retailPrice, name, vendorCode }) {
        state.cartProducts.push({
            id,
            amount: Number(amount),
            retailPriceBeforeDiscount,
            discount,
            retailPrice,
            name,
            vendorCode
        })
        localStorage.setItem('cart', JSON.stringify(state.cartProducts))
    },
    CHANGE_AMOUNT(state, { id, amount }) {
        const cartItem = state.cartProducts.find(item => item.id === id)
        if (cartItem) {
            cartItem.amount = amount
            cartItem.total = amount * cartItem.retailPrice
        }
        localStorage.setItem('cart', JSON.stringify(state.cartProducts))
    },
    REMOVE_FROM_CART(state, productId) {
        const cartItem = state.cartProducts.find((item) => item.id === productId)
        if (cartItem) {
            state.cartProducts.splice(state.cartProducts.indexOf(cartItem), 1);
            localStorage.setItem('cart', JSON.stringify(state.cartProducts))
        }

    },
    CLEAR_CART(state) {
        localStorage.removeItem('cart')
        state.cartProducts = []
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}