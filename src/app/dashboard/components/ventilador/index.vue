<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      enabled: 'isEnabledTerapia',
      ventilador: 'getVentilador'
    })
  }
}
</script>

<template>
  <div :class="{'' : !enabled.value, 'disabled-div' : enabled.value }">
    <ul class="list-group">
      <li class="list-group-item" v-for="(item, index) in ventilador.dados" v-bind:key="index">
        <span v-tooltip="item.description">{{ item.param }}</span>
        <span style="float: right;">
          <input type="number" style="text-align: center;" v-model.number="item.value" step="0.1" inputmode="numeric" :disabled="enabled.value" pattern="[0-9]*">  
        </span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">

  .disabled-div{
      opacity: 0.4;
      cursor: no-drop;
  } 

</style>