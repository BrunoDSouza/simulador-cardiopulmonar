<template>
    <div class="container-fluid">
      <Login></Login>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Login from './Forms/Login'

export default {
  components: { Login },
  computed: {
    ...mapGetters(['isLogged'])
  }
}
</script>
