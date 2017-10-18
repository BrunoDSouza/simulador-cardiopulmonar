import data from '@/mock/data.json'
import paciente from '@/mock/paciente.json'
import gasometria from '@/mock/gasometria.json'
import parametros from '@/mock/parametros.json'
import ventilador from '@/mock/ventilador.json'

export const getDados = () => data
export const getPaciente = () => paciente
export const getGasometria = () => gasometria
export const getParametros = () => parametros
export const getVentilador = () => ventilador

export const uniformHeight = (collection, selector) => {
  collection.forEach((item) => {
    let list = item.querySelectorAll(selector)
    let max = getMaxHeight(list)
    setHeight(list, max)
  })
}

const setHeight = (list, height) => {
  list.forEach((item) => {
    item.style.minHeight = `${height}px`
  })
}

const getMaxHeight = (collection) => {
  let maxHeight = 0
  collection.forEach((item) => {
    maxHeight = Math.max(maxHeight, item.offsetHeight)
  })
  return maxHeight
}
