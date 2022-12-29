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
        return state.productsCategories.filter((item: {isGroup: boolean, level: number}) => item.level === 1).slice(1) //slice delete incorrect category
    },

    GET_SUBCATEGORIES(state) {
        return state.productsCategories.filter((item: {isGroup: boolean, level: number}) => item.level > 1)
    }
}

const actions:ActionTree<State, ''> = {
    async fetchProducts({commit}) {
       const products = await productsService.getAllProducts()
        commit('productsRequest', products?.data)
    },
    async fetchCategories({commit}) {
        const categories = await productsService.getCategories()
        commit('categoriesRequest', await categories?.data)
    },
    async FETCH_PRODUCTS_BY_CATEGORY({commit}, id:string) {
        const products = await productsService.getProductsByCategory(id)
        commit('PRODUCTS_BY_CATEGORY_REQUEST', await products?.data)
    }
}

const mutations:MutationTree<State> = {
    productsRequest(state, payload) {
        state.productsList = payload
    },

    PRODUCTS_BY_CATEGORY_REQUEST(state, payload) {
        state.productsList = payload
    },

    categoriesRequest(state, payload) {
        state.productsCategories = payload
    }    
}

export default {
    state,
    getters,
    actions,
    mutations
}