var express = require('express');
var router = express.Router();

const {addItem, deleteItem, deleteItems, getItem, updateItem, updateSharecode} = require('../services/ItemService')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/item', addItem);

router.put('/item/:id', updateItem);

router.delete('/item/:id', deleteItem);

router.get('/item/iduser/:iduser', getItem);

router.put('/item/iduser/:iduser/sharecode/:sharecode', updateSharecode);

router.delete('/items/sharecode/:sharecode', deleteItems);

module.exports = router;
