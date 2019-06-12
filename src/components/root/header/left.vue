<script>
  export default { }
</script>

<template>
  <ul class="nav navbar-nav">
    <router-link :to="{ name: 'dashboard', params: { id: 1 } }" tag="li" exact >
      <a>Aluno</a>
    </router-link>
    <router-link :to="{ name: 'dashboard', params: { id: 2 } }" tag="li" exact >
      <a>Professor</a>
    </router-link>
  </ul>
</template>
