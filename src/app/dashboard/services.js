import paciente from '@/mock/paciente.json'
import gasometria from '@/mock/gasometria.json'
import simetria from '@/mock/simetria.json'
import procedimentos from '@/mock/procedimento.json'
import ventilador from '@/mock/ventilador.json'

export const getDados = () => {}
export const getPaciente = () => paciente
export const getGasometria = () => gasometria
export const getSimetria = () => simetria
export const getProcedimentos = () => procedimentos
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

export const getClassByValue = (value, min, max, normal, colors) => {
  if (!min || !max || !normal) return colors.secondary

  let diff = value - normal
  if ((diff > 0 && diff < 1) || (diff < 0 && diff > -1)) return colors.success
  if ((value > min) && (value < max)) return colors.info
  if ((value === min) || (value === max)) return colors.warning
  if ((value < min) || (value > max)) return colors.danger
}

export const convertToObject = (value) => JSON.parse(JSON.stringify(value))

export const compareObject = (obj1, obj2) => {
  for (let p in obj1) {
    if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false
    switch (typeof (obj1[p])) {
      case 'object':
        if (!compareObject(obj1[p], obj2[p])) return false
        break
      case 'function':
        if (typeof (obj2[p]) === 'undefined' || (p !== 'compare' && obj1[p].toString() !== obj2[p].toString())) return false
        break
      default:
        if (obj1[p] !== obj2[p]) return false
    }
  }
  for (let p in obj2) {
    if (typeof (obj1[p]) === 'undefined') return false
  }
  return true
}
