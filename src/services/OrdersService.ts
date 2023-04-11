
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
                products,
                vtOrderStatuses: [
                    {
                        userId: userId
                    }
                ]
            })
            return order.data

        } catch (error) {
            console.log(error)
        }
    }


    return { postOrder }
}