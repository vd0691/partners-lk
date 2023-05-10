import router from "@/router";
import store from "@/store";
import axios from "axios";

export const useInterceptors = () => {
    axios.interceptors.request.use(function (config) {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        config.headers = config.headers ?? {}
        if (user.token) {
            config.headers.authorization = `Token_${user.token}`
        }
        return config;
      }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });
    axios.interceptors.response.use(function (config) {
        // Do something with request
        return config;
      }, function (error) {
        if (error.response.status === 401) {
            store.dispatch('LOGOUT')
            router.push('/login')
        }
        return Promise.reject(error);
    });
}