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
        sumWithDiscount: 0,
        contractorId: '',
        partnerId: '',
        orderVts: [],
        vtOrderStatuses: [],
        status: ''
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
    },
    REMOVE_FROM_ORDER({commit}, itemId) {
        commit('REMOVE_ITEM', itemId)
        console.log(itemId)
    }
}

const mutations: MutationTree<OrdersState> = {
    FETCH_ORDERS(state, orders) {
        state.ordersList = orders
    },
    FETCH_ORDER(state, order) {
        state.order = order
    },
    REMOVE_ITEM(state, itemId) {
        const orderItem = state.order.orderVts.find((item) => item.itemId === itemId)
        if (orderItem) {
            state.order.orderVts.splice(state.order.orderVts.indexOf(orderItem), 1);
            console.log(state.order.orderVts)
        }
     
    }
}

export default {
    state,
    actions,
    mutations
}