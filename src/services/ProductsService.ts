
import axios from "axios"

const API_URL = process.env.VUE_APP_API_URL

export default function useProductsService() {
    const getAllProducts = async () => {
        try {
            const allProducts = await axios.get(`${API_URL}/items`)
            return allProducts

        } catch (error) {
            console.log(error)
        }
    }

    const getProductsByCategory = async (id:string) => {
        try {
            const products = await axios.get(`${API_URL}/items?group_id=${id}`)
            return products
        } catch (error) {
            console.log(error)
        }       
    }

    const getCategories = async () => {
        try {
            const categories = await axios.get(`${API_URL}/items/groups`)
            return categories
        } catch (error) {
            console.log(error)
        }
    }

    return { getAllProducts, getProductsByCategory, getCategories }
}