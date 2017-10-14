
<script>
import { mapActions } from 'vuex'
import { isEmpty } from 'lodash'

export default {
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(['attemptLogin']),
    doLogin () {
      this.$loader.show()
      const user = this.user
      this.attemptLogin({...user})
          .then(() => {
            this.$router.push('/')
            this.$loader.hide()
          })
    }
  },
  computed: {
    isValid () {
      const user = this.user
      return !isEmpty(user.email) && !isEmpty(user.password)
    }
  }
}
</script>

<template>
  <div class="row">
    <div class="col-sm-6">
      <div class="page-header">
        <h2>Login</h2>
      </div>
      <div class="form-group ">
        <label>Email</label>
        <input type="email" class="form-control" autofocus="autofocus" placeholder="Digite seu email"
               v-model="user.email"/>
        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
      </div>

      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" placeholder="Digite sua senha"
               v-model="user.password"/>
        <span class="glyphicon  glyphicon-lock  form-control-feedback" ></span>
      </div>

      <div class="form-group">
        <button type="submit" @click="doLogin" class="btn btn-default" :disabled="!isValid">Sign in</button>
      </div>
    </div>
  </div>
</template>
