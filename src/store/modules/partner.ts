import usePartnerService from "@/services/PartnerService";
import { ActionTree, MutationTree } from "vuex";
import store from "..";
import { PartnerState, RootState } from "@/interfaces/StoreInterface";

const partnerService = usePartnerService()

const state = ():PartnerState => ({
    partner: {
        id: '',
        name: '',
        account: '',
        discount: 0
    } 
})

const actions:ActionTree<PartnerState, RootState> = {
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