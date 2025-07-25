import mongoose from 'mongoose';
import Garden from '../models/Garden.js';
import Planta from '../models/Planta.js';

await mongoose.connect('mongodb://localhost:27017/myLittleGarden');

console.log('🔍 Buscando jardins...');
const gardens = await Garden.find();

for (const garden of gardens) {
  let precisaSalvar = false;

  for (const vaso of garden.vasos) {
    // Se o vaso está com o nome da planta como string (ex: 'Girassol')
    if (typeof vaso.planta === 'string') {
      const planta = await Planta.findOne({ nome: vaso.planta });
      if (planta) {
        console.log(`🌱 Convertendo "${vaso.planta}" para ObjectId em jardim: ${garden.nome}`);
        vaso.planta = planta._id;
        precisaSalvar = true;
      } else {
        console.warn(`⚠️ Planta "${vaso.planta}" não encontrada no banco!`);
      }
    }
  }

  if (precisaSalvar) {
    await garden.save();
    console.log(`✅ Jardim "${garden.nome}" atualizado.`);
  }
}

console.log('🏁 Fim do processo de atualização!');
