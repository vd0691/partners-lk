import { createStore } from 'vuex'
import auth from './modules/auth'
import error from './modules/error'
export default createStore({
  modules: {
    auth,
    error    
  }
})
