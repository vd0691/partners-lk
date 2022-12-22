import useProductsService from "@/services/ProductsService"
import { ActionTree, GetterTree, MutationTree } from "vuex"

const productsService = useProductsService()

interface State {
    productsList: []
}


const state = () => ({
    productsList: []
})

const getters:GetterTree<State, ''> = {
    getCategories(state) {
        return state.productsList.filter((item: {isGroup: boolean}) => item?.isGroup)
    }
}

const actions:ActionTree<State, ''> = {
    fetchProducts({commit}) {
        productsService.getAllProducts()
        .then(response => {
            commit('productsRequest', response?.data)
        })
    }
}

const mutations:MutationTree<State> = {
    productsRequest(state, payload) {
        state.productsList = payload
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}