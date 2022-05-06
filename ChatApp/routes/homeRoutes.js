var express = require('express');
var router = express.Router();

const {addConversation, getConversation} = require("../services/ConversationService")
const {addMessage, getMessage} = require('../services/MessageService')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/conversation', addConversation);
router.get('/conversation/:id', getConversation);

router.post('/message', addMessage);
router.get('/message/conversationid/:id', getMessage);

module.exports = router;
