import { OrdersState, RootState } from "@/interfaces/StoreInterface"
import useOrdersService from "@/services/OrdersService"
import { ActionTree, GetterTree, MutationTree } from "vuex"

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
    totalItems: 0,
    replacementProductId: 0
})

const getters: GetterTree<OrdersState, RootState> = {
 
    GET_ORDER_TOTAL: (state) => {
        return state.order.orderVts.reduce(({ totalWithDiscount, totalWithoutDiscount, discount, totalAmount }, product) => {
            return {
                totalWithDiscount: totalWithDiscount + product.price * product.amount,
                totalWithoutDiscount: totalWithoutDiscount + product.sale * product.amount,
                discount: discount + (product.sale - product.price) * product.amount,
                totalAmount: totalAmount + product.amount
            }
        }, { totalWithDiscount: 0, totalWithoutDiscount: 0, discount: 0, totalAmount: 0 });
    }
}

const actions: ActionTree<OrdersState, RootState> = {
    async FETCH_ORDERS({ commit, rootState }, { from, size }) {
        const orders = await ordersService.getOrders(rootState.partner.partner.id, from, size)
        commit('FETCH_ORDERS', orders)
    },
    async FETCH_ORDER({ commit }, orderId) {
        const order = await ordersService.getOrder(orderId)
        commit('FETCH_ORDER', order)
    },
    REMOVE_FROM_ORDER({ commit, getters }, itemId) {
        commit('REMOVE_ITEM', {getters, itemId})
    },
    SET_REPLACEMENT_PRODUCT({ commit }, id) {
        commit('SET_PRODUCT', id)
    },
    CHANGE_FROM_ORDER({ commit, getters }, { product, amount }) {
        commit('CHANGE_ITEM', { getters, product, amount })
    }

}

const mutations: MutationTree<OrdersState> = {
    FETCH_ORDERS(state, orders) {
        state.ordersList = orders
    },
    FETCH_ORDER(state, order) {
        state.order = order
    },
    REMOVE_ITEM(state, {getters, itemId}) {
        const orderItem = state.order.orderVts.find((item) => item.itemId === itemId)
        if (orderItem) {
            state.order.orderVts.splice(state.order.orderVts.indexOf(orderItem), 1);
            state.order.sumWithDiscount = getters.GET_ORDER_TOTAL.totalWithDiscount 
            state.order.sumWithoutDiscount = getters.GET_ORDER_TOTAL.totalWithoutDiscount 
            state.order.sumOfDiscount = getters.GET_ORDER_TOTAL.totalWithoutDiscount - getters.GET_ORDER_TOTAL.totalWithDiscount 
        }
    },

    SET_PRODUCT(state, id) {
        state.replacementProductId = id
    },

    CHANGE_ITEM(state, {getters, product, amount=1,}) {
        state.order.orderVts.splice(state.replacementProductId, 1, {
            id: state.order.orderVts[state.replacementProductId].id,
            row: product.row,
            name: product.name,
            itemId: product.id,
            amount: amount,
            sale: product.retailPriceBeforeDiscount,
            discount: product.discount,
            price: product.retailPrice,
            total: product.retailPrice * amount
        })
        state.order.sumWithDiscount = getters.GET_ORDER_TOTAL.totalWithDiscount 
        state.order.sumWithoutDiscount = getters.GET_ORDER_TOTAL.totalWithoutDiscount 
        state.order.sumOfDiscount = getters.GET_ORDER_TOTAL.totalWithoutDiscount - getters.GET_ORDER_TOTAL.totalWithDiscount 
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
    
}