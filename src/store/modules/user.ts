import { ActionTree, MutationTree } from "vuex";
import { UserState, RootState } from "@/interfaces/StoreInterface";
import useUsersService from "@/services/UsersService";

const userService = useUsersService()

const state = ():UserState => ({
    userId: {
        name: '',
        id: '',
        status: ''
    }
})

const actions:ActionTree<UserState, RootState> = {
    async GET_USER_ID({ commit }, username) {
        const userId = await userService.getUserId(username)
        commit('USER_ID', userId)  
    }
}

const mutations:MutationTree<UserState> = {
    USER_ID(state, payload) {
        state.userId = payload
    }        
}

export default {
        state,
        actions,
        mutations
}