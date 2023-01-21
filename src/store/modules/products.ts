import useProductsService from "@/services/ProductsService"
import { ActionTree, GetterTree, MutationTree } from "vuex"

const productsService = useProductsService()

interface State {
    productsList: [],
    productsCategories: []
}


const state = () => ({
    productsList: [],
    productsCategories: []
})

const getters:GetterTree<State, ''> = {
    GET_CATEGORIES(state) {
        return state.productsCategories.filter((item: {level: number}) => item.level === 1)
    },

    GET_SUBCATEGORIES(state) {
        return state.productsCategories.filter((item: {level: number}) => item.level > 1)
    }
}

const actions:ActionTree<State, ''> = {
    async FETCH_PRODUCTS({commit}, {id, from, size}) {
       const products = await productsService.getProducts(id, from, size)
        commit('PRODUCTS_REQUEST', products?.data)
    },
    async FETCH_CATEGORIES({commit}) {
        const categories = await productsService.getCategories()
        commit('CATEGORIES_REQUEST', await categories?.data)
    }
}

const mutations:MutationTree<State> = {
    PRODUCTS_REQUEST(state, payload) {
        state.productsList = payload
    },
    CATEGORIES_REQUEST(state, payload) {
        state.productsCategories = payload
    }    
}

export default {
    state,
    getters,
    actions,
    mutations
}