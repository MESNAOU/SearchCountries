const mongoose = require('mongoose');

const paysSchema = new mongoose.Schema({
  flags: {
    png: { type: String, required: true }
  },
  name: {
    common: { type: String, required: true },
    official: { type: String, required: true }
  },
  capital: [{ type: String, required: true }],
  region: { type: String, required: true },
  subregion: { type: String, required: true },
  maps: {
    googleMaps: { type: String, required: true }
  },
  population: { type: String, required: true }
});

const Pays = mongoose.model('Pays', paysSchema);

module.exports = Pays;