import { createStore } from 'vuex'
import auth from './modules/auth'
import error from './modules/error'
import products from './modules/products'
export default createStore({
  modules: {
    auth,
    error,
    products    
  }
})
