<script>
import { mapState, mapActions } from 'vuex'
import vueSlider from 'vue-slider-component'
import { uniformHeight } from '../services'
import monitorFC from './charts/MonitorFC'
import monitorFR from './charts/MonitorFR'
import ventilacao from './charts/ventilacao'
import paciente from './paciente'
import gasometria from './gasometria'
import parametros from './parametros'
import ventilador from './ventilador'

export default {
  data () {
    return {
      value: 3
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  mounted () {
    this.setDados()
    this.setPaciente()
    this.setGasometria()
    this.setParametros()
    this.setVentilador()
    this.setUniformHeight()
  },
  methods: {
    ...mapActions(['setDados', 'setPaciente', 'setGasometria', 'setParametros', 'setVentilador']),
    getRandomRange (min, max) {
      return Math.random() * (max - min + 1) + min
    },
    setUniformHeight () {
      const collection = document.querySelectorAll('div.root>div.row')
      uniformHeight(collection, 'div.well')
    }
  },
  components: {
    monitorFC, monitorFR, paciente, gasometria, parametros, ventilador, vueSlider, ventilacao
  }
}
</script>

<template>
  <div class="container-fluid root">
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
          <div class="row">
            <div class="box-header">Parâmetros</div>
            <div class="col-sm-12">
              <parametros/>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-3 gap-left">
        <div class="well">
          <div class="row">
            <div class="box-header">Ventilação</div>
            <div class="col-sm-12 gap">
              <ventilacao/>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 gap">
              <fieldset>
                <legend class="legend">Cateter nasal de O²</legend>
                <vue-slider class="box-list" v-model="value" :lazy="true" :interval="20" :max="100" :dotSize="20"
                :piecewise="true" :tooltip="'hover'" :formatter="'{value}(L/min)'"/>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6 gap-right">
        <div class="well">
          <div class="row">
            <div class="box-header">Monitores</div>
            <monitorFC/>
            <monitorFR/>
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
        <div class="well">
          <div class="row">
            <div class="box-header">Ventilador</div>
            <div class="col-sm-12">
              <ventilador/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
