import { ProductsState } from "@/interfaces/StoreInterface"
import useProductsService from "@/services/ProductsService"
import { ActionTree, GetterTree, MutationTree } from "vuex"

const productsService = useProductsService()

const state = ():ProductsState => ({
    productsList: [],
    productsCategories: [],
    totalItems: 0
})

const getters:GetterTree<ProductsState, ''> = {
    GET_CATEGORIES(state) {
        return state.productsCategories.filter((item: {level: number}) => item.level === 1)
    },

    GET_SUBCATEGORIES(state) {
        return state.productsCategories.filter((item: {level: number}) => item.level > 1)
    }
}

const actions:ActionTree<ProductsState, ''> = {
    async FETCH_PRODUCTS({commit}, {id, from, size, level, partnerId}) {
       const products = await productsService.getProducts(id, from, size, level, partnerId)
        commit('PRODUCTS_REQUEST', products?.data.content)
        commit('TOTALITEMS_REQUEST', products?.data.totalElements)
    },
    async FETCH_CATEGORIES({commit}) {
        const categories = await productsService.getCategories()
        commit('CATEGORIES_REQUEST', await categories?.data)
    }
}

const mutations:MutationTree<ProductsState> = {
    PRODUCTS_REQUEST(state, payload) {
        state.productsList = payload
    },
    TOTALITEMS_REQUEST(state, payload) {
        state.totalItems = payload
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