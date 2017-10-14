import loaderFactory from './loaderFactory'
import registerStore from './registerStore'
import PageLoader from './components/page-loader'

const install = (Vue, store) => {
  registerStore(store)
  Vue.component('PageLoader', PageLoader)
  Object.defineProperty(Vue.prototype, '$loader', {
    get () {
      return loaderFactory(this)
    }
  })
}

export default { install }
