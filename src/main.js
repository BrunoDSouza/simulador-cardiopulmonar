import Vue from 'vue'
import router from '@/router'
import App from '@/app/Main'
import store from '@/vuex'
import { VTooltip } from 'v-tooltip'
import ToggleButton from 'vue-js-toggle-button'

Vue.directive('tooltip', VTooltip)

Vue.use(ToggleButton, store)

 /* eslint-disable no-new */
new Vue({
  name: 'Principal',
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
