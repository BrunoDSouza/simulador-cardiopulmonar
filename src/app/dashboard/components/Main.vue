<script>
import { mapState, mapActions } from 'vuex'
import monitor from './charts/MonitorFC'
import monitor2 from './charts/MonitorFR'
import paciente from './paciente'
import gasometria from './gasometria'

export default {
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  mounted () {
    this.setDados()
    this.setPaciente()
    this.setGasometria()
  },
  methods: {
    ...mapActions(['setDados', 'setPaciente', 'setGasometria']),
    getRandomRange (min, max) {
      return Math.random() * (max - min + 1) + min
    }
  },
  components: { monitor, monitor2, paciente, gasometria }
}
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-6 gap-right">
          <div class="well">
            <div class="row">
              <div class="box-header">Paciente</div>
              <paciente/>
            </div>
          </div>
      </div>
      <div class="col-sm-3 gap">
        <div class="well">
          <div class="box-header">Parâmetros</div>
          <fieldset>
            <legend>Parâmetros</legend>
          </fieldset>
        </div>
      </div>
      <div class="col-sm-3 gap-left">
        <div class="well">
          <div class="box-header">Tomada de decisão</div>
          <fieldset>
            <legend>Tomada de Decisão</legend>
          </fieldset>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-6 gap-right">
        <div class="well">
          <div class="row">
            <div class="box-header">Monitores</div>
            <monitor/>
            <monitor2/>
          </div>

        </div>
      </div>
      <div class="col-sm-3 gap">
        <div class="well">
          <div class="row">
            <div class="box-header">Gasometria</div>
            <gasometria/>
          </div>
        </div>
      </div>
      <div class="col-sm-3 gap-left">

      </div>
    </div>
  </div>
</template>
