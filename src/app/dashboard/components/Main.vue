<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { uniformHeight, convertToObject, compareObject } from '../services'
import swal from 'sweetalert'
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
      count: {procedimentos: 0, ventilador: 0, cateter: 0},
      procedimentos: {},
      ventilador: {},
      cateter: {}
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
    this.procedimentos = convertToObject(this.procedimentosStore)
    this.ventilador = convertToObject(this.ventiladorStore)
    this.cateter = convertToObject(this.cateterStore)
  },
  methods: {
    ...mapActions(['setDados', 'setPaciente', 'setGasometria', 'setSimetria', 'setVentilador', 'setProcedimentos']),
    getRandomRange (min, max) {
      return Math.random() * (max - min + 1) + min
    },
    setUniformHeight () {
      const collection = document.querySelectorAll('div.root>div.row')
      uniformHeight(collection, 'div.well')
    },
    confirmAction () {
      swal({
        title: 'Deseja confirmar as alterações?',
        icon: 'info',
        buttons: true,
        dangerMode: false
      })
      .then((willDelete) => {
        if (willDelete) {
          swal('As procedimentos foram aplicados!', {
            icon: 'success',
            buttons: false,
            timer: 1500
          })
        }
      })
    },
    compareOject (value, oldValue) {
      if (!compareObject(value, oldValue) && this.count <= 0) {
        this.count++
      } else if (compareObject(value, oldValue) && this.count > 0) {
        this.count--
      }
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

<template>
  <div class="container-fluid root">
    <div id="container-decisao">
      <button class="btn btn-info btn-confirm" v-if="enabledButton" @click="confirmAction">Confirmar alterações</button>
    </div>
    <div class="row list-flex">
      <div class="col-sm-4 gap-right list-item">
          <div class="well list-content">
            <div class="row">
              <div class="box-header">Procedimentos</div>
              <procedimento/>
            </div>
          </div>
      </div>
      <div class="col-sm-4 gap list-item">
          <div class="well list-content">
            <div class="row">
              <div class="box-header">Paciente</div>
              <paciente/>
            </div>
          </div>
      </div>
      <div class="col-sm-4 gap-left list-item">
        <div class="well list-content">
          <div class="row">
            <div class="box-header">Ventilação</div>
            <div class="col-sm-6 gap">
              <oximetria/>
            </div>
            <div class="col-sm-6 gap">
              <simetria/>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 gap">
              <cateter/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row list-flex">
      <div class="col-sm-6 gap-right list-item">
        <div class="well list-content">
          <div class="row">
            <div class="box-header">Monitores</div>
            <monitorFC/>
            <monitorFR/>
          </div>
        </div>
      </div>
      <div class="col-sm-3 gap list-item">
        <div class="well list-content">
          <div class="row">
            <div class="box-header">Gasometria</div>
            <gasometria/>
          </div>
        </div>
      </div>
      <div class="col-sm-3 gap-left list-item">
        <div class="well list-content">
          <div class="row">
            <div class="box-header">Ventilador</div>
            <div class="col-sm-12">
              <ventilador/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <audio autoplay loop preload="auto" style=" width:300px;">
      <source src="static/songs/beat-cardio.mp3" type="audio/mpeg">
    </audio>
    <audio autoplay loop preload="auto" style=" width:300px;">
      <source src="static/songs/heartbeat.mp3" type="audio/mpeg">
    </audio>
  </div>
</template>

<style lang='scss'>
  
  .btn-confirm {
    border-radius: 22px;
    position: fixed;
    z-index: 1;
    transition: all .3s cubic-bezier(.65,.05,.36,1);
    margin-left: 40%;
    margin-right: 40%;
  }

  .btn-confirm:hover {
    box-shadow: 4px 3px 20px 2px rgba(40, 42, 42, 0.36);
    transition: all .3s cubic-bezier(.65,.05,.36,1);
    background-color: #ff5d5d !important;
    border-color: #ff5d5d !important;;
  }

</style>
