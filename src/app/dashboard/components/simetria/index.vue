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
    <div class="row" v-for="item in simetria.dados">
      <div class="col-sm-10 gap">
        <fieldset>
          <legend class="legend">{{ item.name }}</legend>
          <ul class="list-group box-list">
            <li class="list-group-item" v-for="item_list in item.data">
              <span v-tooltip="item_list.description">{{ item_list.param }}</span>
              <span class="badge">{{ item_list.value }}</span>
            </li>
          </ul>
        </fieldset>
      </div>  
    </div>
  </div>
</template>
