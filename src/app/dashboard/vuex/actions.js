import * as mutations from './mutations_types'
import { getPaciente, getGasometria, getSimetria, getProcedimentos, getVentilador } from '../services'

export const setPaciente = (context, payload) => context.commit(mutations.setPaciente, payload || getPaciente())
export const setGasometria = (context, payload) => context.commit(mutations.setGasometria, payload || getGasometria())
export const setSimetria = (context, payload) => context.commit(mutations.setSimetria, payload || getSimetria())
export const setProcedimentos = (context, payload) => context.commit(mutations.setProcedimentos, payload || getProcedimentos())
export const changeConfig = (context, payload) => context.commit(mutations.setProcedimentosConfig, payload)
export const setTypeDashboard = (context, payload) => context.commit(mutations.setTypeDashboard, payload)
export const setVentilador = (context, payload) => context.commit(mutations.setVentilador, payload || getVentilador)
