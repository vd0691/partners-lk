import useProductsService from "@/services/ProductsService"
import { ActionTree, MutationTree } from "vuex"

const products = useProductsService()

interface State {
    products: []
}

const state = () => ({
    products: []
})

const actions:ActionTree<State, ''> = {
    getProducts({commit}) {
        products.getAllProducts()
        .then(response => {
            commit('productsRequest', response)
        })
    }
}

const mutations:MutationTree<State> = {
    productsRequest(state, payload) {
        state.products = payload
    }
}

export default {
    state,
    actions,
    mutations
}