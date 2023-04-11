
import axios from "axios"

const API_URL = process.env.VUE_APP_API_URL

export default function useUsersService() {
    const getUserId = async (userName:string) => {
        try {
            const userId = await axios.get(`${API_URL}/users/name/${userName}`)
            return userId.data

        } catch (error) {
            console.log(error)
        }
    }
    
    return { getUserId }
}