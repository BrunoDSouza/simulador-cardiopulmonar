export const getProcedimentos = ({ procedimentos }) => procedimentos
export const getVentilador = ({ procedimentos }) => procedimentos.ventilador
export const getCateter = ({ procedimentos }) => procedimentos.cateter
export const getPaciente = ({ paciente }) => paciente
export const getSimetria = ({ simetria }) => simetria
export const getGasometria = ({ gasometria }) => gasometria
export const isEnabledTerapia = ({ procedimentos }) => procedimentos.config
export const enableTypeDashboard = ({ typeDashboard }) => typeDashboard === 2
export const getColors = ({ colors }) => colors
export const getSpO2 = ({ gasometria }) => gasometria.SpO2
