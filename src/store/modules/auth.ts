import router from "@/router";
import useAuthService from "@/services/authService";
import { ActionTree, MutationTree } from "vuex";


interface State {
    user: string | null
    status: { loggedIn: boolean }
}

const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
const authService = useAuthService()

const state = () => ({
    user: currentUser ? currentUser : null,
    status: {
        loggedIn: currentUser ? true : false
    }   
})

const actions:ActionTree<State, ''> = {
    login({ commit }, user) {
        authService.login(user.username, user.password)
        .then(
            user => {
                commit('loginSucces', user)
                localStorage.setItem('user', JSON.stringify(user) || '')
                router.push('/')
            }
        )       
    },
    
    logout({commit}) {
        authService.logout()
        commit('logout')
    }
}

const mutations:MutationTree<State> = {
    loginSucces(state, user) {
        state.status = { loggedIn: true }
        state.user = user
    },
    logout(state) {
        state.status.loggedIn = false
        state.user = null
    }
    
}

export default {
        state,
        actions,
        mutations
}