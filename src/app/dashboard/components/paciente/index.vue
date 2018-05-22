<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      paciente: state => state.dashboard.paciente
    })
  }
}
</script>

<template>
  <div>
    <div class="col-sm-6 gap" v-for="item in paciente.dados">
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

</template>
