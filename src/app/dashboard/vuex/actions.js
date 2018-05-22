import * as mutations from './mutations_types'
import { getDados, getPaciente, getGasometria, getSimetria, getProcedimentos } from '../services'

export const setDados = (context) => context.commit(mutations.setList, getDados())
export const setPaciente = (context) => context.commit(mutations.setPaciente, getPaciente())
export const setGasometria = (context) => context.commit(mutations.setGasometria, getGasometria())
export const setSimetria = (context) => context.commit(mutations.setSimetria, getSimetria())
export const setProcedimentos = (context) => context.commit(mutations.setProcedimentos, getProcedimentos())
export const setFilter = (context, payload) => context.commit(mutations.setFilter, payload)

export const changeConfig = (context, payload) => {
  return context.commit(mutations.setProcedimentosConfig, payload)
}
