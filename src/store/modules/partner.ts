import router from "@/router";
import usePartnerService from "@/services/PartnerService";
import { ActionTree, MutationTree } from "vuex";

const partnerService = usePartnerService()
interface State {
    partner: object
}


const state = () => ({
    partner: {}
})

const actions:ActionTree<State, ''> = {
    async GET_PARTNER({ commit }, username) {
        const partner = await partnerService.getPartner(username)
        commit('PARTNER_ID', partner)  
    }
}

const mutations:MutationTree<State> = {
    PARTNER_ID(state, payload) {
        state.partner = payload
    }        
}

export default {
        state,
        actions,
        mutations
}