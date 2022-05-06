const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var MessageSchema = new Schema({
    conversationId:{
        type:Number
    },
    sender:{
        type:String
    },
    text:{
        type:String
    }
})

 
autoIncrement.initialize(mongoose.connection);
MessageSchema.plugin(autoIncrement.plugin, {model : 'MessageSchema', field: "id"});

var MessageSchema = mongoose.model('MessageSchema', MessageSchema);

module.exports = MessageSchema;