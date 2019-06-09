<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      simetria: state => state.dashboard.simetria
    })
  }
}
</script>

<template>
  <div>
      <div class="col-sm-6 gap" v-for="(item, index) in simetria.dados" v-bind:key="index">
        <fieldset>
          <legend class="legend">{{ item.name }}</legend>
          <ul class="list-group box-list">
            <li class="list-group-item" v-for="(item_list, internalIndex) in item.data" v-bind:key="internalIndex">
              <span v-tooltip="item_list.description">{{ item_list.param }}</span>
              <span class="badge">{{ item_list.value }}</span>
            </li>
          </ul>
        </fieldset>  
    </div>
  </div>
</template>
