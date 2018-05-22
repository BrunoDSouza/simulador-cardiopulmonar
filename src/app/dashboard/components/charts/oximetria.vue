<script>
import Highcharts from 'highcharts'
import Highchartsmore from 'highcharts/highcharts-more'
import solidGauge from 'highcharts/modules/solid-gauge'
import base from './abstractChart'

export default {
  extends: base,
  methods: {
    dataSource () {
      this.setUp()
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
  }
}
</script>

<template>
  <div>
    <fieldset>
      <legend class="legend">Oximetria</legend>
      <div id="container-speed" class="box-list" style="width: auto; height: 150px;"></div>
    </fieldset>
  </div>
</template>
<style lang="css">
</style>
