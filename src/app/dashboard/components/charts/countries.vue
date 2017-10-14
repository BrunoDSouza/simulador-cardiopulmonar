<script>
import { mapActions } from 'vuex'
import Highcharts from 'highcharts'
import _ from 'lodash'
import base from './abstractChart'
export default {
  extends: base,
  methods: {
    ...mapActions(['setDados']),
    dataSource () {
      const countries = this.getCountries(this.localList)
      const categories = this.getCategories(countries)
      const values = this.getValues(countries)

      this.chart === null ? (
        this.chart = this.setUp({ categories, values })
      ) : (
        this.chart.series[0].setData(values)
      )
    },
    getCountries (list) {
      return _(list).map(item => item.country)
                    .countBy()
                    .map((value, key) => ({key, value}))
                    .orderBy(['value'], ['desc'])
                    .value()
    },
    getCategories (countries) {
      return countries.map(country => country.key)
    },
    getValues (countries) {
      return countries.map(country => country.value)
    },
    setUp (obj) {
      const { categories, values } = obj

      return Highcharts.chart('container-country', {
        title: { text: 'Countries' },
        exporting: { enabled: false },
        xAxis: { categories },
        yAxis: {
          title: {
            text: 'Quantity (Persons)'
          }
        },
        credits: { enabled: false },
        series: [{
          type: 'column',
          colorByPoint: false,
          name: 'Quantity',
          data: values,
          showInLegend: false
        }]
      })
    }
  }
}
</script>

<template>
  <div id="container-country"></div>
</template>
