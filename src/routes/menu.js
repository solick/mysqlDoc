/**
 * Created by lynmatten on 20.06.14.
 */

var express = require('express');
var router = express.Router();
//var mysql = require('mysql');
var config = require('../config');

/* GET overview of menu*/
router.get('/', function(req,res) {

    res.send("Overview over menu options");

});

module.exports = router;
