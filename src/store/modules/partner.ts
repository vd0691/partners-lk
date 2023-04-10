import usePartnerService from "@/services/PartnerService";
import { ActionTree, MutationTree } from "vuex";
import store from "..";
import { PartnerState } from "@/interfaces/StoreInterface";

const partnerService = usePartnerService()

const state = ():PartnerState => ({
    partner: {} 
})

const actions:ActionTree<PartnerState, ''> = {
    async GET_PARTNER({ commit }, username) {
        const partner = await partnerService.getPartner(username)
        commit('PARTNER_ID', partner)  
    }
}

const mutations:MutationTree<PartnerState> = {
    PARTNER_ID(state, payload) {
        state.partner = payload
        store.dispatch('GET_CONTRACTORS', payload.id)
    }        
}

export default {
        state,
        actions,
        mutations
}