import * as mutations from './mutations_types'

export default {
  [mutations.setList] (state, list) {
    state.list = list
  },
  [mutations.setFilter] (state, filter) {
    state.filter = filter
  },
  [mutations.setPaciente] (state, paciente) {
    state.paciente = paciente
  },
  [mutations.setGasometria] (state, gasometria) {
    state.gasometria = gasometria
  },
  [mutations.setParametros] (state, parametros) {
    state.parametros = parametros
  },
  [mutations.setVentilador] (state, ventilador) {
    state.ventilador = ventilador
  }
}
