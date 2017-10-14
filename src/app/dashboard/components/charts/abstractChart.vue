<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      chart: null
    }
  },
  computed: {
    ...mapState({
      list: state => state.dashboard.list,
      filter: state => state.dashboard.filter
    }),
    localList () {
      return this.filter !== '' ? this.list.filter(item => item.gender === this.filter) : this.list
    }
  },
  watch: {
    list () {
      this.dataSource()
    },
    filter () {
      this.dataSource()
    }
  }
}
</script>
