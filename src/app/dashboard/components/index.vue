<template src="./template.html"></template>
<style lang='scss' src="./style.css"></style>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { convertToObject, compareObject } from '../services'
import swal from 'sweetalert'
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'
import monitorFC from './charts/MonitorFC'
import monitorFR from './charts/MonitorFR'
import oximetria from './charts/oximetria'
import paciente from './paciente'
import gasometria from './gasometria'
import simetria from './simetria'
import ventilador from './ventilador'
import cateter from './cateter'
import procedimento from './procedimentos'

export default {
  data () {
    return {
      visible: false,
      count: {
        procedimentos: 0,
        ventilador: 0,
        cateter: 0
      },
      procedimentos: {},
      ventilador: {},
      cateter: {},
      stomp: {}
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    }),
    ...mapGetters({
      procedimentosStore: 'getProcedimentos',
      ventiladorStore: 'getVentilador',
      cateterStore: 'getCateter'
    }),
    enabledButton () {
      return this.count.procedimentos > 0 || this.count.ventilador || this.count.cateter > 0
    }
  },
  mounted () {
    this.setDados()
    this.setPaciente()
    this.setGasometria()
    this.setSimetria()
    this.setVentilador()
    this.setProcedimentos()
    this.initStore()
    this.connect()
  },
  methods: {
    ...mapActions(['setDados', 'setPaciente', 'setGasometria', 'setSimetria', 'setVentilador', 'setProcedimentos']),
    getRandomRange (min, max) {
      return Math.random() * (max - min + 1) + min
    },
    confirmAction () {
      swal({
        title: 'Deseja confirmar as alterações?',
        icon: 'info',
        buttons: true,
        dangerMode: false
      })
      .then((confirm) => {
        if (confirm) {
          this.initStore()
          this.resetCounter()
          swal('As procedimentos foram aplicados!', {
            icon: 'success',
            buttons: false,
            timer: 1500
          })
        }
      })
    },
    initStore () {
      this.procedimentos = convertToObject(this.procedimentosStore)
      this.ventilador = convertToObject(this.ventiladorStore)
      this.cateter = convertToObject(this.cateterStore)
    },
    resetCounter () {
      this.count.procedimentos = 0
      this.count.ventilador = 0
      this.count.cateter = 0
    },
    compareOject (value, oldValue) {
      if (!compareObject(value, oldValue) && this.count <= 0) {
        this.count++
      } else if (compareObject(value, oldValue) && this.count > 0) {
        this.count--
      }
    },
    connect () {
      var socket = new SockJS('http://localhost:8080/ws')
      this.stomp = Stomp.over(socket)
      this.stomp.debug = () => {}
      this.stomp.connect({}, this.onConnected, this.onError)
    },
    send () {
      // Add state vuex here
      var object = {}
      this.stomp.send('/app/simulator.send', JSON.stringify(object), {})
    },
    onConnected () {
      this.stomp.subscribe('/task/received', this.onMessageReceived)
    },
    onError (error) {
      console.log(error)
    },
    onMessageReceived (payload) {
      console.log(payload.body)
    }
  },
  components: {
    monitorFC, monitorFR, paciente, gasometria, simetria, ventilador, oximetria, cateter, procedimento
  },
  watch: {
    procedimentosStore: {
      handler (val) {
        let bool = compareObject(val, this.procedimentos)
        if (!bool && this.count.procedimentos <= 0) {
          this.count.procedimentos++
        } else if (bool && this.count.procedimentos > 0) {
          this.count.procedimentos--
        }
      },
      deep: true
    },
    ventiladorStore: {
      handler (val) {
        let bool = compareObject(val, this.ventilador)
        if (!bool && this.count.ventilador <= 0) {
          this.count.ventilador++
        } else if (bool && this.count.ventilador > 0) {
          this.count.ventilador--
        }
      },
      deep: true
    },
    cateterStore: {
      handler (val) {
        let bool = compareObject(val, this.cateter)
        if (!bool && this.count.cateter <= 0) {
          this.count.cateter++
        } else if (bool && this.count.cateter > 0) {
          this.count.cateter--
        }
      },
      deep: true
    }
  }
}
</script>
