import axios from "axios"

const API_URL = process.env.VUE_APP_API_URL

export default function useImagesService () {
    const getImagesByItemId = async (itemId:string, from: number, size: number) => {
        try {
            const images = await axios.get(`${API_URL}/images/getByItemId/${itemId}`, {
                params: {
                    from: from || 0,
                    size: size || 10 
                }
            })
            return images.data.content
        } catch (error) {
            console.log(error)
        }
    }
    return { getImagesByItemId }
}