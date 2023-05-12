import { ErrorsState, RootState } from "@/interfaces/StoreInterface";
import { ActionTree, MutationTree } from "vuex"

const state = ():ErrorsState => ({
    message: null     
})

const actions:ActionTree<ErrorsState, RootState> = {
    PUSH_ERROR_MESSAGE({commit}, message) {
        commit('errorMessage', message)
    },

    CLEAR_ERROR_MESSAGE({commit}) {
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