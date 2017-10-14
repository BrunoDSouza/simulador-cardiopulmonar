import * as mutations from './mutations_types'

export default {
  [mutations.setShow] (state, value) {
    state.show = value
  }
}
