const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const itemSchema = new Schema({
  name:String
});

const Items = mongoose.model('item', itemSchema);

module.exports= Items