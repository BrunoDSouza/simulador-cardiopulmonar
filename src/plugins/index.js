import Vue from 'vue'
import loader from '@/plugins/loader'
import { VTooltip } from 'v-tooltip'
import ToggleButton from 'vue-js-toggle-button'

Vue.directive('tooltip', VTooltip)

// not working
export default [...loader, ...ToggleButton]
