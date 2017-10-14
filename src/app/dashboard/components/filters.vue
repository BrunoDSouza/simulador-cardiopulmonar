<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      genders: ['Male', 'Female'],
      selected: ''
    }
  },
  methods: {
    ...mapActions(['setFilter']),
    commit () {
      const filter = this.selected
      this.setFilter(filter)
    }
  }
}
</script>

<template>
  <div>
    <h2>Filters</h2>
    <hr>
    <select @change="commit" v-model="selected">
      <option value="">All</option>
      <option v-for="gender in genders" :value="gender">
          {{gender}}
      </option>
    </select>
    <pre>{{ }}</pre>
  </div>
</template>
