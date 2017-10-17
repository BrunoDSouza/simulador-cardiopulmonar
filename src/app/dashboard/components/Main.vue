<script>
import { mapState, mapActions } from 'vuex'
import Highcharts from 'highcharts'
import Highchartsmore from 'highcharts/highcharts-more'
import solidGauge from 'highcharts/modules/solid-gauge'
import vueSlider from 'vue-slider-component'
// import Dark from './charts/themes/dark'
import monitor from './charts/MonitorFC'
import monitor2 from './charts/MonitorFR'
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
    this.setUp()
    this.setDados()
    this.setPaciente()
    this.setGasometria()
    this.setParametros()
    this.setVentilador()
  },
  methods: {
    ...mapActions(['setDados', 'setPaciente', 'setGasometria', 'setParametros', 'setVentilador']),
    getRandomRange (min, max) {
      return Math.random() * (max - min + 1) + min
    },
    setUp () {
      Highchartsmore(Highcharts)
      solidGauge(Highcharts)
      var gaugeOptions = {
        chart: {
          type: 'solidgauge',
          height: 120
        },
        title: '',
        pane: {
          center: ['50%', '90%'],
          size: '170%',
          startAngle: -90,
          endAngle: 90,
          background: {
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
          }
        },
        tooltip: {
          enabled: false
        },
        // the value axis
        yAxis: {
          stops: [
            [0.1, '#DF5353'], // green
            [0.5, '#DDDF0D'], // yellow
            [0.9, '#55BF3B'] // red
          ],
          lineWidth: 0,
          minorTickInterval: null,
          tickAmount: 2,
          title: {
            y: -60
          },
          labels: {
            y: 16,
            x: 5
          }
        },
        plotOptions: {
          solidgauge: {
            dataLabels: {
              y: 8,
              x: 0,
              borderWidth: 0,
              useHTML: true
            }
          }
        }
      }
      // The speed gauge
      // Highcharts.setOptions(Dark)
      var chartSpeed = Highcharts.chart('container-speed', Highcharts.merge(gaugeOptions, {
        yAxis: {
          min: 0,
          max: 100
        },
        credits: { enabled: false },
        series: [{
          name: 'Nivel',
          data: [80],
          dataLabels: {
            format: '<div style="text-align:center"><span style="font-size:20px;color:' +
            ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}%</span><br/>' +
            '<span style="font-size:12px;color:silver">SpO 2</span></div>'
          },
          tooltip: { valueSuffix: '%' }
        }]
      }))

      // Bring life to the dials
      setInterval(function () {
        var point, newVal, inc
        if (chartSpeed) {
          point = chartSpeed.series[0].points[0]
          inc = Math.round((Math.random() - 0.5) * 100)
          newVal = point.y + inc
          if (newVal < 0 || newVal > 100) newVal = point.y - inc
          point.update(newVal)
        }
      }, 4000)
    }
  },
  components: {
    monitor,
    monitor2,
    paciente,
    gasometria,
    parametros,
    ventilador,
    vueSlider
  }
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
          <!-- <div class="row">
            <div class="box-header">Situação do Paciente</div>
            <div class="col-sm-12">
                <div class="progress progress-striped active">
                  <span style="position: absolute; margin-left:43%">80%</span>
                  <div class="progress-bar" style="width: 80%"></div>
                </div>
                <div class="container-speed" style="height: 150px; width: auto;"></div>
            </div>
          </div> -->
          <div class="row">
            <div class="box-header">Ventilação</div>
            <div class="col-sm-12 gap">
              <fieldset>
                <legend class="legend">Oximetria</legend>
                <div id="container-speed" class="box-list" style="width: auto; height: 150px;"></div>
              </fieldset>
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
