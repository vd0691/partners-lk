
import axios from "axios"

const API_URL = process.env.VUE_APP_API_URL

export default function useProductsService() {
    const getProducts = async (id:string, from:number, size:number, level:number, partnerId:string) => {
        try {
            const allProducts = await axios.get(`${API_URL}/items`, {
                params: {
                    partnerId: partnerId,
                    level: level,
                    from: from || 0,
                    size: size || 20,
                    groupId: id,
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