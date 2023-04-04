import { Product } from "@/interfaces/Product"
import { ActionTree, GetterTree, MutationTree } from "vuex"

const cart = JSON.parse(localStorage.getItem('cart') || '[]')
interface State {
    cartProducts: any[]
}

const state = () => ({
    cartProducts: <State>cart
})

// getters
const getters: GetterTree<State, any> = {
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
const actions: ActionTree<State, ''> = {
    ADD_TO_CART({ state, commit }, { product, amount, n_row }) {

        commit('ADD_TO_CART', {
            id: product.id,
            name: product.name,
            vendorCode: product.vendorCode,
            retailPriceBeforeDiscount: product.retailPriceBeforeDiscount,
            retailPrice: product.retailPrice,
            discount: product.discount,
            amount: amount,
            n_row
        })
        localStorage.setItem('cart', JSON.stringify(state.cartProducts))

    },

    CHANGE_PRODUCT_AMOUNT({ state, commit }, { id, amount }) {
        commit('CHANGE_AMOUNT', { id, amount })
        localStorage.setItem('cart', JSON.stringify(state.cartProducts))
    },

    CHECKOUT_ORDER({ commit }, products) {
        commit('CLEAR_CART')
        console.log(products)
    },

    REMOVE_FROM_CART({ commit }, productId) {
        commit('REMOVE_FROM_CART', productId)
    },

    CLEAR_CART({ commit }) {
        commit('CLEAR_CART')
    }
}

// mutations
const mutations: MutationTree<State> = {
    ADD_TO_CART(state, { n_row, id, amount = 1, retailPriceBeforeDiscount, discount, retailPrice, name, vendorCode }) {
        state.cartProducts.push({
            n_row: n_row + 1,
            id,
            amount: Number(amount),
            retailPriceBeforeDiscount,
            discount,
            retailPrice,
            total: amount * retailPrice,
            name,
            vendorCode
        })
    },
    CHANGE_AMOUNT(state, { id, amount }) {
        const cartItem = state.cartProducts.find(item => item.id === id)
        cartItem.amount = amount
        cartItem.total = amount * cartItem.retailPrice
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