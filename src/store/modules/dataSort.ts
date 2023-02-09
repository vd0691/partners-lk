import { ActionTree, MutationTree } from "vuex"

interface State {
    perPage:number,
    sort: string,
}

const params:State = JSON.parse(localStorage.getItem('sortParams') || '{}')

const state = () => ({
    perPage: params.perPage,
    sort: params.sort
})

const actions:ActionTree<State, ''> = {
    GET_PER_PAGE({commit}, payload) {
        commit('PER_PAGE', payload)
    },

    GET_SORT({commit}, payload) {
        commit('SORT', payload)
    }     
}

const mutations:MutationTree<State> = {
    PER_PAGE(state, payload) {
        params.perPage = payload
        localStorage.setItem('sortParams', JSON.stringify(params))
        state.perPage = params.perPage
        
    },
    SORT(state, payload) {
        params.sort = payload.sort
        localStorage.setItem('sortParams', JSON.stringify(params))
        state.sort = params.sort
    }      
}

export default {
    state,
    actions,
    mutations
}