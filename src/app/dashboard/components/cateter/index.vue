
<script>
import vueSlider from 'vue-slider-component'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      cateter: 'getCateter',
      enabled: 'isEnabledTerapia'
    })
  },
  components: { vueSlider },
  mounted () {
    console.log(this.enabled)
  }
}
</script>

<template>
  <div>
    <fieldset>
      <legend class="legend">{{ cateter.description }}</legend>
      <vue-slider class="box-list" v-model="cateter.value" 
        :lazy="true" 
        :interval="5" 
        :max="100" 
        :dotSize="20"
        :piecewise="true" 
        :tooltip="'hover'" 
        :disabled="!enabled.value" 
        :formatter="'{value}(L/min)'"/>
    </fieldset>
  </div>
</template>
