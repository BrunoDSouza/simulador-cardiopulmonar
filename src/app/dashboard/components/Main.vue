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
            <div class="box-header">Paciente</div>
            <div class="row">
              <div class="col-sm-4">
                <fieldset>
                  <legend class="legend">Dados gerais</legend>
                  <ul class="list-group">
                    <li class="list-group-item">
                      Idade <span class="badge">22</span>
                    </li>
                    <li class="list-group-item">
                      Peso <span class="badge">77kg</span>
                    </li>
                    <li class="list-group-item">
                      Altura <span class="badge">1.70m</span>
                    </li>
                    <li class="list-group-item">
                      <span v-tooltip="'Heyyy'">IMC</span>
                      <span class="badge">22.5</span>
                    </li>
                  </ul>
                </fieldset>
              </div>
              <div class="col-sm-4">
                <fieldset>
                  <legend class="legend">Fisiologia Pulmonar</legend>
                  <ul class="list-group">
                    <li class="list-group-item">
                      Rva (cmH2O/l/s) <span class="badge">2</span>
                    </li>
                    <li class="list-group-item">
                      Cst (ml/cmH2O) <span class="badge">140</span>
                    </li>
                    <li class="list-group-item">
                      VD/VT <span class="badge">0.30</span>
                    </li>
                    <li class="list-group-item">
                      Shunt (%) <span class="badge">1</span>
                    </li>
                  </ul>
                </fieldset>
              </div>
              <div class="col-sm-4">
                <fieldset>
                  <legend class="legend">Esforça Muscular</legend>
                  <ul class="list-group">
                    <li class="list-group-item">
                      Pmus (cmH2O) <span class="badge">22</span>
                    </li>
                    <li class="list-group-item">
                      f (rpm) <span class="badge">77kg</span>
                    </li>
                    <li class="list-group-item">
                      Duração (s) <span class="badge">1.70m</span>
                    </li>
                  </ul>
                </fieldset>
              </div>
            </div>
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
