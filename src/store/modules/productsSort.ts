import { ActionTree, MutationTree } from "vuex"
interface State {
    itemsPerPage: number
}

const state = () => ({
    itemsPerPage: localStorage.getItem('sortOptions')     
})

const actions:ActionTree<State, ''> = {
    GET_ITEMS_NUMBER({commit}, payload) {
        commit('ITEMS_NUMBER', payload)
    }        
}

const mutations:MutationTree<State> = {
    ITEMS_NUMBER(state, payload) {
        state.itemsPerPage = payload
        localStorage.setItem('sortOptions', payload)
    }    
}

export default {
    state,
    actions,
    mutations
}