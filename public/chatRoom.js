var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	res.sendFile(__dirname+'/chat.html');
})

module.exports = router;