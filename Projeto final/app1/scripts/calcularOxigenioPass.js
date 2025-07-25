function calcularOxigenioPassivo(jardim, plantasDB, ultimaColeta) {
    let total = 0;
  
    jardim.vasos.forEach(vaso => {
      if (vaso.planta && vaso.dataPlantio) {
        const plantaInfo = plantasDB.find(p => p.nome === vaso.planta.nome);
        if (!plantaInfo) return;
  
        // ⏳ Começa a contar do maior entre plantio e última coleta
        const inicio = new Date(Math.max(
          new Date(vaso.dataPlantio),
          new Date(ultimaColeta)
        ));
  
        const minutos = Math.floor((Date.now() - inicio) / 60000);
        total += minutos * plantaInfo.oxigeniopm;
      }
    });
  
    return total;
  }
  
  module.exports = { calcularOxigenioPassivo };
  