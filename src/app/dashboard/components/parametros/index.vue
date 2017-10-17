<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      parametros: state => state.dashboard.parametros
    })
  }
}
</script>

<template>
  <div>
    <ul class="accordion">
      <li class="item-accordion" v-for="item in parametros.dados">
        <input type="checkbox" :id="item.name">
        <label :for="item.name" class="item">{{ item.name }}</label>
        <ul class="list-group">
          <li class="list-group-item" v-for="item_last in item.data">
            <span v-tooltip=""> {{ item_last.param}} </span>
            <span class="badge">{{ item_last.value }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
