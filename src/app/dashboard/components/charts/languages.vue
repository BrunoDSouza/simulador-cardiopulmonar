<script>
// import { mapActions } from 'vuex'
import Highcharts from 'highcharts'
import base from './abstractChart'
import _ from 'lodash'

export default {
  extends: base,
  methods: {
    dataSource () {
      const languages = this.getLanguages(this.localList)
      const rank = this.setRank(languages, 10)
      const total = this.getTotal(rank)
      const data = this.getPercent(rank, total)

      this.chart === null ? (
        this.chart = this.setUp(data)
      ) : (
        this.chart.series[0].setData(data)
      )
    },
    getLanguages (list) {
      return _(list).map(item => item.language)
                    .countBy()
                    .map((y, name) => ({ name, y }))
                    .orderBy(['y'], ['desc'])
                    .value()
    },
    setRank (list, count) {
      return list.splice(0, count)
    },
    getPercent (list, total) {
      return list.reduce((acc, item) => {
        return acc.concat({
          name: item.name,
          y: ((item.y * total) / 100)
        })
      }, [])
    },
    getTotal (list) {
      return list.reduce((acc, item) => {
        return acc + item.y
      }, 0)
    },
    setUp (obj) {
      const data = obj
      return Highcharts.chart('container-language', {
        chart: {
          alignTicks: false,
          gridLineWidth: 0,
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        exporting: { enabled: false },
        title: { text: 'Languages' },
        credits: { enabled: false },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              style: {
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
              }
            }
          }
        },
        series: [{
          type: 'pie',
          name: 'Percent of',
          center: ['50%', '50%'],
          dataLabels: {
            connectorPadding: 1,
            connectorWidth: 1,
            padding: 5,
            verticalAlign: 'middle'
          },
          colorByPoint: true,
          size: '80%',
          data: data
        }]
      })
    }
  }
}
</script>

<template>
  <div id='container-language'></div>
</template>
