/**
 * Created by lynmatten on 25.06.14.
 */



require('jasmine-expect');
var request = require('request');
var config = require("../src/config");


jasmine.getEnv().defaultTimeoutInterval = 5000;

describe("General Server behaviour", function() {

    it("should respond with a html structured site", function(done) {

        request("http://localhost:" + config.srv.port, function(error, response, body) {

            var patt = new RegExp("<(.*)html(.*)>.*<head(.*)>.*</head>.*<body(.*)>.*</body>.*</html>");

            var ret = patt.test(body);

            expect(ret).toBeTrue();

            //console.log("ret: " + ret);
            //console.log(body);

            done();


        });


    });

    it("should pass not existing sites to an error site", function(done) {

        request("http://localhost:" + config.srv.port + "/this/site/does/not/exist", function(error, response, body) {

            //console.log(error);

            var retCode = response.statusCode;

            expect(retCode).toEqual(404);
            //console.log("StatusCode: " + retCode);
            //console.log(body);

            done();
        });

    });


});


describe("List path", function() {

    it("should return a valid page (Code 200)", function(done) {

        request("http://localhost:" + config.srv.port + "/list", function(error, response, body) {

            var retCode = response.statusCode;

            //console.log("retCode: " + retCode);
            expect(retCode).toEqual(200);

            done();

        });

    });

    it("list/procedures should return a valid page (Code 200)", function(done) {

        request("http://localhost:" + config.srv.port + "/list/procedures", function(error, response, body) {

            var retCode = response.statusCode;

            //console.log("retCode: " + retCode);
            expect(retCode).toEqual(200);

            done();

        });

    });

    it("list/procedure should return a valid page (Code 200)", function(done) {

        request("http://localhost:" + config.srv.port + "/list/procedure", function(error, response, body) {

            var retCode = response.statusCode;

            //console.log("retCode: " + retCode);
            expect(retCode).toEqual(200);

            done();

        });

    });

    it("list/tables should return a valid page (Code 200)", function(done) {

        request("http://localhost:" + config.srv.port + "/list/tables", function(error, response, body) {

            var retCode = response.statusCode;

            //console.log("retCode: " + retCode);
            expect(retCode).toEqual(200);

            done();

        });

    });

    it("list/table should return a valid page (Code 200)", function(done) {

        request("http://localhost:" + config.srv.port + "/list/table", function(error, response, body) {

            var retCode = response.statusCode;

            //console.log("retCode: " + retCode);
            expect(retCode).toEqual(200);

            done();

        });

    });

});


describe("menu path", function() {

    it("should return a valid page (Code 200)", function(done) {

        request("http://localhost:" + config.srv.port + "/menu", function(error, response, body) {

            var retCode = response.statusCode;

            //console.log("retCode: " + retCode);
            expect(retCode).toEqual(200);

            done();

        });

    });

    it("menu/procedures should return a valid page (Code 200)", function(done) {

        request("http://localhost:" + config.srv.port + "/menu/procedures", function(error, response, body) {

            var retCode = response.statusCode;

            //console.log("retCode: " + retCode);
            expect(retCode).toEqual(200);

            done();

        });

    });

    it("menu/tables should return a valid page (Code 200)", function(done) {

        request("http://localhost:" + config.srv.port + "/menu/tables", function(error, response, body) {

            var retCode = response.statusCode;

            //console.log("retCode: " + retCode);
            expect(retCode).toEqual(200);

            done();

        });

    });

});


describe("print path", function() {

    it("should return a valid page (Code 200)", function(done) {

        request("http://localhost:" + config.srv.port + "/print", function(error, response, body) {

            var retCode = response.statusCode;

            //console.log("retCode: " + retCode);
            expect(retCode).toEqual(200);

            done();

        });

    });

    it("menu/procedures should return a valid page (Code 200)", function(done) {

        request("http://localhost:" + config.srv.port + "/print/procedures", function(error, response, body) {

            var retCode = response.statusCode;

            //console.log("retCode: " + retCode);
            expect(retCode).toEqual(200);

            done();

        });

    });

    it("menu/tables should return a valid page (Code 200)", function(done) {

        request("http://localhost:" + config.srv.port + "/print/tables", function(error, response, body) {

            var retCode = response.statusCode;

            //console.log("retCode: " + retCode);
            expect(retCode).toEqual(200);

            done();

        });

    });


});