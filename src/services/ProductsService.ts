import { AuthorizationHeader } from "@/helpers/AuthorizationHeader"
import axios from "axios"

const API_URL = process.env.VUE_APP_API_URL

export default function useProductsService() {
    const getAllProducts =async () => {
        try {
            const allProducts = axios.get(`${API_URL}/items`, {
                headers: AuthorizationHeader()
            })
            return allProducts

        } catch (error) {
            console.log(error)
        }
    }

    return { getAllProducts }
}