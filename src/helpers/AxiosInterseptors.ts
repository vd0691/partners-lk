import axios from "axios"
import  store from "@/store";

    export const loaderInterceptor = () => {
        axios.interceptors.request.use(function (config) {
            store.dispatch('getLoadingStatus', true)            
            return config;
          }, function (error) {
            store.dispatch('getLoadingStatus', false)
            return Promise.reject(error);
        }); 
        axios.interceptors.response.use(function (config) {
            store.dispatch('getLoadingStatus', false)            
            return config;
          }, function (error) {
            store.dispatch('getLoadingStatus', false)
            return Promise.reject(error);
        });        
    }

