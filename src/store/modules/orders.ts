import { OrdersState, RootState } from "@/interfaces/StoreInterface"
import useOrdersService from "@/services/OrdersService"
import { ActionTree, MutationTree } from "vuex"

const ordersService = useOrdersService()

const state = (): OrdersState => ({
    ordersList: [],
    order: {
        id: '',
        num: 0,
        orderDate: '',
        sumWithoutDiscount: 0,
        sumOfDiscount: 0,
        umWithDiscount: 0,
        contractorId: '',
        partnerId: '',
        orderVts: [],
        vtOrderStatuses: []
    },
    totalItems: 0
})


const actions: ActionTree<OrdersState, RootState> = {
    async FETCH_ORDERS({ commit, rootState }, { from, size }) {
        const orders = await ordersService.getOrders(rootState.partner.partner.id, from, size)
        commit('FETCH_ORDERS', orders)
    },
    async FETCH_ORDER({ commit }, orderId) {
        const order = await ordersService.getOrder(orderId)
        commit('FETCH_ORDER', order)
    }
}

const mutations: MutationTree<OrdersState> = {
    FETCH_ORDERS(state, orders) {
        state.ordersList = orders
    },
    FETCH_ORDER(state, order) {
        state.order = order
    }
}

export default {
    state,
    actions,
    mutations
}