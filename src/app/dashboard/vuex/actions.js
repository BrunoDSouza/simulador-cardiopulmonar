import * as mutations from './mutations_types'
import { getDados, getPaciente, getGasometria } from '../services'

export const setDados = (context) => context.commit(mutations.setList, getDados())
export const setPaciente = (context) => context.commit(mutations.setPaciente, getPaciente())
export const setGasometria = (context) => context.commit(mutations.setGasometria, getGasometria())
export const setFilter = (context, payload) => context.commit(mutations.setFilter, payload)
