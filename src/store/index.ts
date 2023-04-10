import { createStore } from 'vuex'
import auth from './modules/auth'
import error from './modules/error'
import products from './modules/products'
import dataSort from './modules/dataSort'
import partner from './modules/partner'
import cart from './modules/cart'
import contractors from './modules/contractors'
import { RootState } from '@/interfaces/StoreInterface'

export default createStore<RootState>({
  modules: {
    auth,
    error,
    products,
    dataSort,
    partner,
    cart, 
    contractors 
  }
})
