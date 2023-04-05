import axios from 'axios'
import { AxiosError } from 'axios'
import store from '@/store'
import router from '@/router'

const API_URL = process.env.VUE_APP_API_URL

export default function useAuthService() {
    
    const login = async (username:string, password:string) => {
        
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                username: username,
                password: password
            })
            return response.data
        } catch (errors) {
            const error = errors as AxiosError
            if (error.response?.status === 401) {
                store.dispatch('error/getErrorMessage', 'Вы ввели неверный логин или пароль')
            }
        }                       
    }

    const logout = () => {
        localStorage.removeItem('user')
        router.push('login')
    }

    return { login, logout }
}