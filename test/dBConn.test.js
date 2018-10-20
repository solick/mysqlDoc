/**
 * Created by lynmatten on 24.06.14.
 */

var dbwrap =  require('../src/dBConn/dBWrapper.js');
var config = require('../src/config.js');



exports.instanciate = {

    setUp: function (callback) {
        this.obj = new dbwrap.dBConn(config);
    }
}