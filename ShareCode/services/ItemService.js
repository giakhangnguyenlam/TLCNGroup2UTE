var Item = require("../schemas/ItemSchema");

var addItem = (req, res, next) => {
    Item.findOne({idUser: req.body.idUser}, (err, item) => {
        if (err) {return res.status(404).json(err)}
        if(item){
            var itemSchema = new Item(req.body);
            itemSchema.shareCode = item.shareCode;
            itemSchema.save((err, result) => {
                if(err) return res.status(404).json(err);
                return res.status(201).json(result);
            })
        }
        else{
            var itemSchema = new Item(req.body);
            itemSchema.shareCode = generateToken();
            itemSchema.save((err, result) => {
                if(err) return res.status(404).json(err);
                return res.status(201).json(result);
            })
        }
    })
}

var updateItem = (req, res, next) => {
    Item.findOne({id:req.params.id}, (err, item)=> {
        if(err) return res.status(404).json(err);
        if(item){
            item.amount = req.body.amount;
            item.save((err, result) => {
                if(err) return res.status(404).json(err);
                return res.status(200).json(result);
            })
        }
        else{
            return res.status(404).json({mess: "Can't find item"});
        }
    })
}

var deleteItem = (req, res, next) => {
    Item.deleteOne({id: req.params.id}, (err) => {
        if(err) return res.status(404).json(err);
        return res.status(200).json({mess:"Delete item successfully"});
    })
}
 
var getItem = (req, res, next) => {

    Item.findOne({idUser:req.params.iduser}, (err, result) => {

        if(err) return res.status(404).json(err);
        if(result){
            Item.find({shareCode: result.shareCode}, (err, items) => {
                if(err) return res.status(404).json(err);
                return res.status(200).json(items);
            })
        }
        else{
            return res.status(200).json({mess:"Chưa có sản phẩm trong giỏ hàng"});;
        }
    })

}

var updateSharecode = (req, res, next) => {
    Item.find({idUser: req.params.iduser}, (err, items) => {
        if(err) return res.status(404).json(err);
        for(const item of items){
            item.shareCode = req.params.sharecode;
            item.save((err) => {
                if(err) return res.status(404).json(err);
            })
        }
    })

    return res.status(200).json({mess: "Update share code successfully"});
}

var deleteItems = (req, res, next) => {
    Item.deleteMany({shareCode: req.params.sharecode}, (err) => {
        if(err) return res.status(404).json(err);
        return res.status(200).json({mess: "Delete items successfully"});
    })
}

var generateToken = () => {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

module.exports = {
    addItem,
    updateItem,
    deleteItem,
    getItem,
    updateSharecode,
    deleteItems
}