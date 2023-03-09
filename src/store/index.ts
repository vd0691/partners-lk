import { createStore } from 'vuex'
import auth from './modules/auth'
import error from './modules/error'
import products from './modules/products'
import dataSort from './modules/dataSort'
import partner from './modules/partner'

export default createStore({
  modules: {
    auth,
    error,
    products,
    dataSort,
    partner 
  }
})
