/**
 * Created by lynmatten on 13.06.14.
 */
//
var express = require('express');
var router = express.Router();
var config = require('../config');


/* GET overview of list options*/
router.get('/', function(req,res) {

    res.send("Overview off all List options");


});


module.exports = router;

