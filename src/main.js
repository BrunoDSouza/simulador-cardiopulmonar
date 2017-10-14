import Vue from 'vue'
import router from '@/router'
import App from '@/app/Main'
import store from '@/vuex'
import loader from '@/plugins/loader'

Vue.use(loader, store)

 /* eslint-disable no-new */
new Vue({
  name: 'Principal',
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
