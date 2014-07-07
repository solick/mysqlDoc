/**
 * Created by lynmatten on 16.06.14.
 */

var express = require('express');
var router = express.Router();



/* GET overview of printable documents*/
router.get('/', function(req,res) {

    res.send("Overview over printable Documents");

});




module.exports = router;