/**
 * Created by lynmatten on 29.06.14.
 */

require('jasmine-expect');
var request = require('request');
var config = require("../src/config");
var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 30,
    host: config.db.address,
    user: config.db.user,
    password: config.db.password
});


describe("MySQL Database connection", function() {

    var env;


    beforeEach(function() {
        env = new jasmine.Env();
    });

    it("should have a valid mysql object from require call", function() {

        expect(mysql).toBeDefined();

    });


    it("should create a mysql pool object", function() {

        expect(pool).toBeDefined();

    });




});