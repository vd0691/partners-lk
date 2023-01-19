
import axios from "axios"

const API_URL = process.env.VUE_APP_API_URL

export default function useProductsService() {
    const getProducts = async (id:string, from:number, size:number) => {
        try {
            const allProducts = await axios.get(`${API_URL}/items?partnerId=01e27f81-7aed-11e9-812e-00155d033601`, {
                    params: {
                    from: from || 0,
                    size: size || 20,
                    group_id: id,
                }
            })
            return allProducts

        } catch (error) {
            console.log(error)
        }
    }

    const getCategories = async () => {
        try {
            const categories = await axios.get(`${API_URL}/items/groups?size=2000`)
            return categories
        } catch (error) {
            console.log(error)
        }
    }

    return { getProducts, getCategories }
}