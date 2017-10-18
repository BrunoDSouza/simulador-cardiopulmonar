
<script>
import vueSlider from 'vue-slider-component'
export default {
  data () {
    return {
      value: 54
    }
  },
  components: { vueSlider }
}
</script>

<template>
  <div>
    <fieldset>
      <legend class="legend">Cateter nasal de O²</legend>
      <vue-slider class="box-list" v-model="value" :lazy="true" :interval="20" :max="100" :dotSize="20"
      :piecewise="true" :tooltip="'hover'" :formatter="'{value}(L/min)'"/>
    </fieldset>
  </div>
</template>
