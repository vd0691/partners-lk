import { Contractor } from "@/interfaces/Contractor";
import { ContractorsState } from "@/interfaces/StoreInterface";
import useContractorsService from "@/services/ContractorsService";
import { ActionTree, MutationTree } from "vuex";

const currentContractor = JSON.parse(localStorage.getItem('contractor') || '{}')
const contractorsService = useContractorsService()

const state = ():ContractorsState => ({
    contractors: [],
    contractor: currentContractor
})

const actions:ActionTree<ContractorsState, ''> = {
    async GET_CONTRACTORS({ commit }, partnerId) {
        const contractors = await contractorsService.getContractors(partnerId)
        commit('GET_CONTRACTORS', contractors)  
    },
    SET_CURRENT_CONTRACTOR({state, commit}, id) {
        const currentContractor = state.contractors.find((item) => item.id === id) 
        commit('CURRENT_CONTRACTOR', currentContractor)
    }
}

const mutations:MutationTree<ContractorsState> = {
    GET_CONTRACTORS(state, payload) {
        state.contractors = payload
    },
    CURRENT_CONTRACTOR(state, contractor) {
        state.contractor = contractor,
        localStorage.setItem('contractor', JSON.stringify(contractor))
    }  
}

export default {
        state,
        actions,
        mutations
}