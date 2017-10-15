import Vue from 'vue'
import { VTooltip } from 'v-tooltip'
import router from '@/router'
import App from '@/app/Main'
import store from '@/vuex'
import loader from '@/plugins/loader'

Vue.use(loader, store)
Vue.directive('tooltip', VTooltip)

 /* eslint-disable no-new */
new Vue({
  name: 'Principal',
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
