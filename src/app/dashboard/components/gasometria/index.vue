<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      gasometria: state => state.dashboard.gasometria
    })
  }
}
</script>

<template>
  <div>
    <fieldset>
      <div class="col-sm-12 gap">
          <ul class="list-group">
            <li class="list-group-item" v-for="item in gasometria.dados">
              <span v-tooltip="item.description">{{ item.param }}</span>
              <span class="badge badge-warning">{{ item.value }}</span>
            </li>
          </ul>
      </div>
    </fieldset>
  </div>

</template>
