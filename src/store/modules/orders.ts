import { OrdersState, RootState } from "@/interfaces/StoreInterface"
import useOrdersService from "@/services/OrdersService"
import { ActionTree, MutationTree } from "vuex"

const ordersService = useOrdersService()

const state = ():OrdersState => ({
    ordersList: [],
    totalItems: 0
})


const actions:ActionTree<OrdersState, RootState> = {
    async FETCH_ORDERS({commit, rootState}, {from, size}) {
       const orders = await ordersService.getOrders(rootState.partner.partner.id, from, size)
        commit('FETCH_ORDERS', orders)
    }    
}

const mutations:MutationTree<OrdersState> = {
    FETCH_ORDERS(state, orders) {
        state.ordersList = orders
    }    
}

export default {
    state,
    actions,
    mutations
}