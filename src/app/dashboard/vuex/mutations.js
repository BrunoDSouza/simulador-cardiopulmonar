import * as mutations from './mutations_types'

export default {
  [mutations.setList] (state, list) {
    state.list = list
  },
  [mutations.setPaciente] (state, paciente) {
    state.paciente = paciente
  },
  [mutations.setGasometria] (state, gasometria) {
    state.gasometria = gasometria
  },
  [mutations.setSimetria] (state, simetria) {
    state.simetria = simetria
  },
  [mutations.setVentilador] (state, ventilador) {
    state.procedimentos.ventilador = ventilador
  },
  [mutations.setCateter] (state, cateter) {
    state.procedimentos.cateter = cateter
  },
  [mutations.setProcedimentos] (state, procedimentos) {
    state.procedimentos = procedimentos
  },
  [mutations.setProcedimentosConfig] (state, value) {
    state.procedimentos.config.value = value
  }
}
