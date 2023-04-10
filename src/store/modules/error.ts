import { ErrorsState } from "@/interfaces/StoreInterface";
import { ActionTree, MutationTree } from "vuex"

const state = ():ErrorsState => ({
    message: null     
})

const actions:ActionTree<ErrorsState, ''> = {
    getErrorMessage({commit}, message) {
        commit('errorMessage', message)
    },

    clearErrorMessage({commit}) {
        commit('clearErrorMessage')
    }
    
}

const mutations:MutationTree<ErrorsState> = {
    errorMessage(state, message) {
        state.message = message 
    },
    
    clearErrorMessage(state) {
        state.message = null
    }
}

export default {
    state,
    actions,
    mutations
}