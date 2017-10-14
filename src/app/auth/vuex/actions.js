import * as mutations from './mutations_types'
import { postLogin } from '../services'

export const attemptLogin = (context, payload) => {
  return postLogin(payload.username, payload.password)
          .then(data => {
            context.commit(mutations.setToken, data.email)
            context.commit(mutations.setUser, data)
          })
}

export const logoutUser = (context) => context.commit(mutations.setLogout)
