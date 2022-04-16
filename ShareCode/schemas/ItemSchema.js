const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var ItemSchema = new Schema({
    id: Number,
    idUser: Number,
    idProduct: Number,
    image: String,
    name: String,
    description: String,
    price: Number,
    amount: Number,
    shareCode: String
})
 
autoIncrement.initialize(mongoose.connection);
ItemSchema.plugin(autoIncrement.plugin, {model : 'ItemSchema', field: "id"});

var ItemSchema = mongoose.model('ItemSchema', ItemSchema);

module.exports = ItemSchema;