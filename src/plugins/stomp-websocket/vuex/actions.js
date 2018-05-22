import * as mutations from './mutations_types'

export const connect = context => {
  context.commit(mutations.setShow, true)
}

export const disconnect = context => {
  context.commit(mutations.setShow, false)
}
