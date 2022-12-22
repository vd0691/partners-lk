import { ActionTree, MutationTree } from "vuex"

interface State {
    isLoading: boolean
}

const state = () => ({
    isLoading: true
})

const actions:ActionTree<State, ''> = {
    getLoadingStatus({commit}, payload) {
        commit('loadingStatus', payload)
    }    
}

const mutations:MutationTree<State> = {
    loadingStatus(state, payload) {
        state.isLoading = payload
    }
}

export default {
    state,
    actions,
    mutations
}