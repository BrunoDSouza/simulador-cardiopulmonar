<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      toggled: false
    }
  },
  methods: {
    ...mapActions(['changeConfig'])
  },
  computed: {
    ...mapGetters({
      procedimentos: 'getProcedimentos'
    })
  },
  watch: {
    toggled (val, oldVal) {
      this.changeConfig(val)
    }
  }
}
</script>

<template>
  <div>
    <div>
    </div>
    <ul class="list-group">
      <li class="list-group-item">
        <span v-tooltip="procedimentos.config.description"> {{ procedimentos.config.name }}</span>
        <span style="float: right;">
          <toggle-button id="toggle-button-id" @change="toggled = $event.value" :labels="{checked: 'Cateter', unchecked: 'Ventilador'}"
          :color="{checked: '#7DCE94', unchecked: '#82C7EB'}"
          :width="120"/>  
        </span>
        
      </li>
      <li class="list-group-item" v-for="(item, index) in procedimentos.dados" v-bind:key="index">
        <span v-tooltip="item.description">{{ item.name }}</span>
        <span style="float: right;">
          <input type="number" style="text-align: center;" v-model.number="item.value" step="0.1" inputmode="numeric" pattern="[0-9]*">  
        </span>
      </li>
    </ul>
  </div>
</template>


<style lang="scss">

  .vue-js-switch#toggle-button-id {
    font-size: 18px !important;
  }

</style>
