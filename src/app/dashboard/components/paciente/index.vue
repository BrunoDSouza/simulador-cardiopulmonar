<script>
import { getClassByValue } from '../../services'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      paciente: 'getPaciente',
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
    <div class="col-sm-6 gap" v-for="(item, index) in paciente.dados" v-bind:key="index">
      <fieldset>
        <legend class="legend">{{ item.name }}</legend>
        <ul class="list-group box-list">
          <li class="list-group-item" v-for="(item_list, indexInternal) in item.data" v-bind:key="indexInternal">
            <span v-tooltip="item_list.description">{{ item_list.param }}</span>
            <span v-if="!enableEdit" class="badge" :class="getNameClass(item_list)">{{ item_list.value }}</span>
            <span v-if="enableEdit" style="float: right;">
              <input v-if="item_list.enable" type="number" style="text-align: center;" v-model.number="item_list.value" 
                step="0.1" inputmode="numeric" pattern="[0-9]*"> 
              <span v-if="!item_list.enable" class="badge">{{ item_list.value }}</span>
            </span>
          </li>
        </ul>
      </fieldset>
    </div>
  </div>

</template>
