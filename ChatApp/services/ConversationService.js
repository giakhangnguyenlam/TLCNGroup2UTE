const Conversation = require("../schemas/ConversationSchema");

var addConversation = (req, res, next) => {
    Conversation.findOne({"$and":[{membersId:{"$in":[req.body.senderId, req.body.receiverId]}},{productName:req.body.productName}]}, (err, conversation) => {
        if(!conversation){
            var conversation = new Conversation({
                membersId : [req.body.senderId, req.body.receiverId],
                membersName: [req.body.senderName, req.body.receiverName],
                productId: req.body.productId,
                productName: req.body.productName,
                productImage: req.body.productImage
            });
            conversation.save((err, result) => {
                if(err) return res.status(500).json({mess: err});
                return res.status(201).json(result);
            })
        }
        else{
            return res.status(200).json(conversation);
        }
    })
}

var getConversation = (req, res, next) => {
    Conversation.find({membersId:{"$in":[parseInt(req.params.id)]}}, (err, conversations) => {
        if(err) return res.status(500).json({mess: err});
        return res.status(200).json(conversations);
    })
}

module.exports = {
    addConversation,
    getConversation
}