import * as mutations from './mutations_types'
import { getDados } from '../services'

export const setDados = (context) => context.commit(mutations.setList, getDados())
export const setFilter = (context, payload) => context.commit(mutations.setFilter, payload)
