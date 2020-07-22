var express = require('express');
var router = express.Router();
var threadController = require('../controllers/threadController');

/* GET home page. */
router.get('/', threadController.getThread);

module.exports = router;
