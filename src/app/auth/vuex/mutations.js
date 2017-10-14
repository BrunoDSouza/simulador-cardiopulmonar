import * as mutations from './mutations_types'

export default {
  [mutations.setUser] (state, user) {
    state.user = user
  },

  [mutations.setToken] (state, token) {
    state.token = token
  },

  [mutations.setLogout] (state) {
    state.user = {}
    state.token = ''
  }
}
