<script>
import { mapGetters } from 'vuex'
import { getClassByValue } from '../../services'

export default {
  computed: {
    ...mapGetters({
      gasometria: 'getGasometria',
      colors: 'getColors'
    })
  },
  props: ['enableEdit'],
  methods: {
    getNameClass (item) {
      return getClassByValue(item.value, item.min, item.max, item.normal, this.colors)
    }
  }
}
</script>

<template>
  <div>
    <fieldset>
      <div class="col-sm-12 gap">
          <ul class="list-group">
            <li class="list-group-item" v-for="(item, index) in gasometria.dados" v-bind:key="index">
              <span v-tooltip="item.description">{{ item.param }}</span>
              <span v-if="!enableEdit" class="badge" :class="getNameClass(item)" >{{ item.value }}</span>
              <span v-if="enableEdit" style="float: right;">
                <input type="number" style="text-align: center;" v-model.number="item.value" 
                  step="0.1" inputmode="numeric" pattern="[0-9]*">  
              </span>
            </li>
            <li v-if="enableEdit" class="list-group-item">  
              <span v-tooltip="gasometria.SpO2.description">{{ gasometria.SpO2.param }}</span>
              <span style="float: right;">
                <input type="number" style="text-align: center;" v-model.number="gasometria.SpO2.value" 
                  step="0.1" inputmode="numeric" pattern="[0-9]*">  
              </span>
            </li>
          </ul>
      </div>
    </fieldset>
  </div>

</template>
