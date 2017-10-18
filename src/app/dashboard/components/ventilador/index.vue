<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      ventilador: state => state.dashboard.ventilador
    })
  }
}
</script>

<template>
  <div>
    <ul class="list-group">
      <li class="list-group-item" v-for="item in ventilador.dados">
        <span v-tooltip="item.description">{{ item.param }}</span>
        <span class="badge badge-secondary">{{ item.value }}</span>
      </li>
    </ul>
  </div>
</template>
