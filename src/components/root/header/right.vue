<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data () {
      return {
        isDropDownMenu: false
      }
    },
    computed: {
      ...mapGetters(['isLogged', 'currentUser'])
    },
    methods: {
      ...mapActions(['logoutUser']),
      toggleDropDownMenu () {
        this.isDropDownMenu = !this.isDropDownMenu
      },
      doLogoutUser () {
        this.$loader.show()
        this.logoutUser()
        setTimeout(() => {
          this.$loader.hide()
          this.$router.push('/auth')
        }, 1000)
      }
    }
  }
</script>

<template>
  <ul class="nav navbar-nav navbar-right">
      <router-link :to="{ name: 'auth' }" tag="li" v-if="!isLogged" >
        <a>Entrar</a>
      </router-link>

      <li class="dropdown" v-if="isLogged" :class="{ open: isDropDownMenu }">
        <a href="javascript:;" @click="toggleDropDownMenu"
           class="dropdown-toggle"> {{ currentUser.name }} <span class="caret"></span>
        </a>
        <ul class="dropdown-menu">
          <li><a href="javascript:;">Action</a></li>
          <li><a href="javascript:;">Other Action</a></li>
          <li><a href="javascript:;">Settings</a></li>
          <li><a href="javascript:;">Something here</a></li>
          <li role="separator" class="divider"></li>
          <li><a href="javascript:;" @click="doLogoutUser" >Logout</a></li>
        </ul>
      </li>
  </ul>
</template>
