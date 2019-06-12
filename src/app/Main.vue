<script>
import HeaderComponent from '@/components/root/header/main'

export default {
  name: 'app',
  components: { HeaderComponent }
}
</script>

<template>
  <div id="app">
    <HeaderComponent/>
    <router-view class="page-header"/>
  </div>
</template>

<style src="@/assets/sass/app.scss" lang="sass"></style>
<style src="@/assets/stylesheet/style.css" lang="css"></style>
<style>
  .page-header{
    padding-top: 20px;
  }
  body{
    background-color: #f1f1f1;
  }

  input[type='number']::-webkit-inner-spin-button, 
  input[type='number']::-webkit-outer-spin-button { 
      opacity: 1;
  }
  input[type='number']{
    width: 50px;
  }

</style>
