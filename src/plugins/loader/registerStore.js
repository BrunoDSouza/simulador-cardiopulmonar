import module from './vuex'

const registerStore = store => {
  store.registerModule('LOADER', {...module})
}

export default registerStore
