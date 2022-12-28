import { AuthorizationHeader } from "@/helpers/AuthorizationHeader"
import router from "@/router"
import axios, { AxiosError } from "axios"

const API_URL = process.env.VUE_APP_API_URL

export default function useProductsService() {
    const getAllProducts = async () => {
        try {
            const allProducts = await axios.get(`${API_URL}/items`, {
                headers: AuthorizationHeader()
            })
            return allProducts

        } catch (error) {
            console.log(error)
        }
    }

    const getCategories = async () => {
        try {
            const categories = await axios.get(`${API_URL}/items/groups`, {
                headers: AuthorizationHeader()
            })
            return categories
        } catch (error) {
            console.log(error)
        }
    }

    return { getAllProducts, getCategories }
}