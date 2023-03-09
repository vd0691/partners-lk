
import axios from "axios"

const API_URL = process.env.VUE_APP_API_URL

export default function usePartnerService() {
    const getPartner = async (username:string) => {
        try {
            const partner = await axios.get(`${API_URL}/partners/user/name/${username}`)
            return partner.data

        } catch (error) {
            console.log(error)
        }
    }

    return { getPartner }
}