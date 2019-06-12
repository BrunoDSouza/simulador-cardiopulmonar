import store from '@/vuex'

// const isAuthRoute = route => route.path.indexOf('/auth') !== -1
// const isLogged = () => store.getters.isLogged
const setTypeDashboard = route => Number.parseInt(route.params.id)

export default (to, from, next) => {
  // if (!isAuthRoute(to) && !isLogged()) next('/auth')
  // else next()
  const value = setTypeDashboard(to)
  store.dispatch('setTypeDashboard', value)
  next()
}
