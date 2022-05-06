const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var ConversationSchema = new Schema({
    membersId:{
        type: Array
    },
    membersName:{
        type: Array
    },
    productId: Number,
    productName: String,
    productImage: String
})

 
autoIncrement.initialize(mongoose.connection);
ConversationSchema.plugin(autoIncrement.plugin, {model : 'ConversationSchema', field: "id"});

var ConversationSchema = mongoose.model('ConversationSchema', ConversationSchema);

module.exports = ConversationSchema;