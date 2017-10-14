import * as mutations from './mutations_types'

export default {
  [mutations.setList] (state, list) {
    state.list = list
  },
  [mutations.setFilter] (state, filter) {
    state.filter = filter
  }
}
