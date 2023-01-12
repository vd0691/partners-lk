import { ActionTree, MutationTree } from "vuex"
interface State {
    message: string | null
}
const namespaced = true;

const state = () => ({
    message: null     
})

const actions:ActionTree<State, ''> = {
    getErrorMessage({commit}, message) {
        commit('errorMessage', message)
    },

    clearErrorMessage({commit}) {
        commit('clearErrorMessage')
    }
    
}

const mutations:MutationTree<State> = {
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
    mutations,
    namespaced
}