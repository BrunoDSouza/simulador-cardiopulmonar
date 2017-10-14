import * as mutations from './mutations_types'

export const showLoader = context => {
  context.commit(mutations.setShow, true)
}

export const hideLoader = context => {
  context.commit(mutations.setShow, false)
}
