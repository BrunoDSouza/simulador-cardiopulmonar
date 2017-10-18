<script>
import { mapActions } from 'vuex'
import Highcharts from 'highcharts'
import Dark from './themes/dark'
import base from './abstractChart'
export default {
  extends: base,
  methods: {
    ...mapActions(['setDados']),
    dataSource () {
      this.setUp()
    },
    setUp () {
      Highcharts.setOptions(Dark)

      Highcharts.chart('container-monitor2', {
        chart: {
          type: 'spline',
          animation: Highcharts.svg, // don't animate in old IE
          marginRight: 10,
          events: {
            load () {
              var fc = this.series[0]
              setInterval(() => {
                let x = new Date().getTime()
                let y = Math.random() * (90 - 88 + 1) + 88
                fc.addPoint([x, y], true, true)
              }, 530)
            }
          }
        },
        title: { text: '' },
        xAxis: {
          type: 'datetime'
          // tickPixelInterval: 150
        },
        yAxis: {
          title: {
            text: 'bpm',
            style: {
              color: '#fff'
            }
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },
        tooltip: {
          formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
            Highcharts.numberFormat(this.y, 2)
          },
          enabled: true
        },
        legend: {
          enabled: true,
          itemStyle: {
            color: '#fff',
            fontWeight: 'bold',
            textOverflow: 'ellipsis'
          }
        },
        exporting: { enabled: false },
        credits: { enabled: false },
        series: [{
          name: 'FC',
          marker: { enabled: false },
          data: (function () {
            var data = []
            let i
            var time = (new Date()).getTime()
            for (i = -19; i <= 0; i += 1) {
              data.push({
                x: time + i * 1000,
                y: Math.random()
              })
            }
            return data
          }())
        }]
      })
    }
  }
}
</script>

<template>
  <div>
    <fieldset>
      <legend class="legend">Frequência cardiaca</legend>
      <div id="container-monitor2" class="box-single" style="width=100%; height:150px;"></div>
    </fieldset>
  </div>


</template>
