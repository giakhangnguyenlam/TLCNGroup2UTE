const Message = require('../schemas/MessageSchema')

var addMessage = async (req, res, next) => {
    var message  = new Message(req.body);
    try {
       const savedMessage = await message.save();
       return res.status(201).json(savedMessage);
    } catch (error) {
        return res.status(500).json({mess: error});
    }
}


var getMessage = (req, res, next) => {
    Message.find({conversationId: req.params.id}, (err, messages) => {
        if(err) return res.status(500).json({mess: err});
        return res.status(200).json(messages);
    })
}

module.exports = {
    addMessage,
    getMessage
}