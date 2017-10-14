<script>
import { mapState, mapActions } from 'vuex'
import filters from './filters'
import countries from './charts/countries'
import languages from './charts/languages'
import monitor from './charts/MonitorFC'

export default {
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  mounted () {
    this.setDados()
  },
  methods: {
    ...mapActions(['setDados']),
    getRandomRange (min, max) {
      return Math.random() * (max - min + 1) + min
    }
  },
  components: { filters, countries, languages, monitor }
}
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-6 gap-right">
          <div class="well">
            <fieldset>
              <legend>Paciente</legend>
            </fieldset>
          </div>
      </div>
      <div class="col-sm-3 gap">
        <div class="well">
          <fieldset>
            <legend>Historico</legend>
          </fieldset>
        </div>
      </div>
      <div class="col-sm-3 gap-left">
        <div class="well">
          <fieldset>
            <legend>Tomada de Decisão</legend>
          </fieldset>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-6 gap-right">
        <div class="well">
          <fieldset>
            <legend>Monitores</legend>
            <monitor/>
          </fieldset>
        </div>
      </div>
      <div class="col-sm-3 gap">
        <div class="well">
          <fieldset>
            <legend>Gasometria</legend>
          </fieldset>
        </div>
      </div>
      <div class="col-sm-3 gap-left">
        <div class="well">
          <fieldset>
            <legend>Parâmetros</legend>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
</template>
