
const { modoSazonal } = require('../config')

function podePlantar(planta, estacaoAtual) {
  if (!modoSazonal) return true
  if (!planta.estacoesPermitidas || planta.estacoesPermitidas.length === 0) return true

  return planta.estacoesPermitidas.includes(estacaoAtual) ||
         planta.estacoesPermitidas.includes('todas')
}

module.exports = { podePlantar }
