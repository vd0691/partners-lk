
import { OrderParams } from "@/interfaces/Interfaces"
import axios from "axios"

const API_URL = process.env.VUE_APP_API_URL

export default function useOrdersService() {
    const postOrder = async ({sumWithoutDiscount, sumOfDiscount, sumWithDiscount, contractorId, partnerId, products, userId}:OrderParams) => {
        try {
            const order = await axios.post(`${API_URL}/orders`, {
                sumWithoutDiscount: sumWithoutDiscount,
                sumOfDiscount: sumOfDiscount,
                sumWithDiscount: sumWithDiscount,
                contractorId: contractorId,
                partnerId: partnerId,
                orderVts: products,
                vtOrderStatuses: [
                    {
                        userId: userId
                    }
                ]
            })
            return order

        } catch (error) {
            console.log(error)
        }
    }

    const getOrders = async (partnerId:string) => {
        try {
            const orders = await axios.get(`${API_URL}/orders/partner`, {
                params: {
                    partnerId: partnerId
                }
            })
            return orders.data
            
        } catch (error) {
            console.log(error)
        }
    }


    return { postOrder, getOrders }
}