import router from "@/router";
import useAuthService from "@/services/authService";
import { ActionTree, MutationTree } from "vuex";


interface State {
    user: User
    status: { loggedIn: boolean }
}
interface User {
    username:string,
    password:string
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
                router.push('/')
            }
        )       
    }
}

const mutations:MutationTree<State> = {
    loginSucces(state) {
        state.status = { loggedIn: true }
        state.user = currentUser
    }
}

export default {
        state,
        actions,
        mutations
}