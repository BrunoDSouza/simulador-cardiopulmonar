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
      count: {
        procedimentos: 0,
        ventilador: 0,
        cateter: 0,
        simetria: 0,
        paciente: 0,
        gasometria: 0
      },
      procedimentos: {},
      ventilador: {},
      cateter: {},
      simetria: {},
      paciente: {},
      gasometria: {},
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
      cateterStore: 'getCateter',
      simetriaStore: 'getSimetria',
      pacienteStore: 'getPaciente',
      gasometriaStore: 'getGasometria',
      typeDashboardOn: 'enableTypeDashboard'
    }),
    enabledButton () {
      return this.count.procedimentos > 0 || this.count.ventilador > 0 || this.count.cateter > 0
    },
    enabledEditParametros () {
      return this.count.paciente > 0 || this.count.simetria > 0 || this.count.gasometria > 0
    }
  },
  mounted () {
    this.setPaciente()
    this.setGasometria()
    this.setSimetria()
    this.setVentilador()
    this.setProcedimentos()
    this.initStore()
    this.connect()
  },
  methods: {
    ...mapActions(['setPaciente', 'setGasometria', 'setSimetria', 'setVentilador', 'setProcedimentos']),
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
          this.send()
          this.initStore()
          this.resetCounter()
          this.showMessage('Os procedimentos foram aplicados!', 'success', false, false, 500)
        }
      })
    },
    confirmActionEdit () {
      swal({
        title: 'Deseja confirmar as alterações no paciente?',
        icon: 'info',
        buttons: true,
        dangerMode: true
      })
      .then((confirm) => {
        if (confirm) {
          this.edit()
          this.initStore()
          this.resetCounter()
          this.showMessage('As alterações foram aplicadas!', 'success', false, false, 500)
        }
      })
    },
    showMessage (title, iconType, hasbuttons, timer) {
      swal(title, {
        icon: iconType,
        buttons: hasbuttons,
        timer: timer
      })
    },
    initStore () {
      this.procedimentos = convertToObject(this.procedimentosStore)
      this.ventilador = convertToObject(this.ventiladorStore)
      this.cateter = convertToObject(this.cateterStore)
      this.paciente = convertToObject(this.pacienteStore)
      this.simetria = convertToObject(this.simetriaStore)
      this.gasometria = convertToObject(this.gasometriaStore)
    },
    resetCounter () {
      this.count.procedimentos = 0
      this.count.ventilador = 0
      this.count.cateter = 0
      this.count.paciente = 0
      this.count.simetria = 0
      this.count.gasometria = 0
    },
    compareOject (value, oldValue) {
      if (!compareObject(value, oldValue) && this.count <= 0) {
        this.count++
      } else if (compareObject(value, oldValue) && this.count > 0) {
        this.count--
      }
    },
    connect () {
      if (this.stomp && this.stomp.connected) {
        return
      }

      var socket = new SockJS('http://localhost:8080/ws')
      this.stomp = Stomp.over(socket)
      this.stomp.debug = () => {}
      this.stomp.connect({}, this.onConnected, this.onError)
    },
    send () {
      var object = {}
      this.stomp.send('/app/simulator.send', JSON.stringify(object), {})
    },
    edit () {
      var data = {
        paciente: convertToObject(this.pacienteStore),
        simetria: convertToObject(this.simetriaStore),
        gasometria: convertToObject(this.gasometriaStore)
      }
      this.stomp.send('/app/simulator.edit', JSON.stringify(data), {})
    },
    onConnected () {
      console.log('Conectado...')
      this.stomp.subscribe('/task/edit', this.onEdition)
      this.stomp.subscribe('/task/send', this.onSend)
    },
    onError (error) {
      console.log(error)
    },
    onSend (payload) {
      console.log({'send payload': payload})
    },
    onEdition (payload) {
      console.log({'edit payload': payload})
      const data = JSON.parse(payload.body)
      this.setPaciente(data.paciente)
      this.setGasometria(data.gasometria)
      this.setSimetria(data.simetria)
      this.initStore()
      this.handlerEdit()
    },
    handlerEdit () {
      if (!this.typeDashboardOn) {
        this.showMessage('Atenção! O paciente sofreu alterações nos seus parâmetros', 'warning', false, false, 500)
      }
    },
    compareObjectHandle (newValue, oldValue, propCount) {
      let bool = compareObject(newValue, oldValue)
      if (!bool && this.count[propCount] <= 0) {
        this.count[propCount]++
        return
      }
      if (bool && this.count[propCount] > 0) {
        this.count[propCount]--
      }
    }
  },
  components: {
    monitorFC, monitorFR, paciente, gasometria, simetria, ventilador, oximetria, cateter, procedimento
  },
  watch: {
    procedimentosStore: {
      handler (val) {
        this.compareObjectHandle(val, this.procedimentos, 'procedimentos')
      },
      deep: true
    },
    ventiladorStore: {
      handler (val) {
        this.compareObjectHandle(val, this.ventilador, 'ventilador')
      },
      deep: true
    },
    cateterStore: {
      handler (val) {
        this.compareObjectHandle(val, this.cateter, 'cateter')
      },
      deep: true
    },
    simetriaStore: {
      handler (val) {
        this.compareObjectHandle(val, this.simetria, 'simetria')
      },
      deep: true
    },
    pacienteStore: {
      handler (val) {
        this.compareObjectHandle(val, this.paciente, 'paciente')
      },
      deep: true
    },
    gasometriaStore: {
      handler (val) {
        this.compareObjectHandle(val, this.gasometria, 'gasometria')
      },
      deep: true
    }
  }
}
</script>
