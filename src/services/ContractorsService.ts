
import axios from "axios"

const API_URL = process.env.VUE_APP_API_URL

export default function useContractorsService() {
    const getContractors = async (partnerId:string) => {
        try {
            const contractors = await axios.get(`${API_URL}/contractors/partner/${partnerId}`)
            return contractors.data

        } catch (error) {
            console.log(error)
        }
    }
    const getContractor = async (id:string) => {
        try {
            const contractors = await axios.get(`${API_URL}/contractors/${id}`)
            return contractors.data

        } catch (error) {
            console.log(error)
        }
    }

    return { getContractors, getContractor }
}