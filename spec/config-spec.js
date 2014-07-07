//spec/config-spec.js

var config = require('../src/config.js');
require('jasmine-expect');

describe("config object", function() {

    it("should not be undefined", function() {

        expect(config).not.toEqual(undefined);

    });

    it("should contain a srv object", function() {

        expect(config.srv).toBeDefined();
    });

    it("should contain a db object", function() {

        expect(config.db).toBeDefined();
    });

    it("should contain a dbDoc object", function() {

        expect(config.dbDoc).toBeDefined();
    });

    it("should contain a dbDoc.Procedures object", function() {

        expect(config.dbDoc.Procedures).toBeDefined();

    });

    it("should contain a dbDoc.Tables object", function() {

        expect(config.dbDoc.Tables).toBeDefined();
    });

    it("should contain a debugLevel member", function() {
       expect(config.debugLevel).toBeDefined();
    });

    it("debugLevel should be a number", function() {
       expect(config.debugLevel).toBeNumber();
    });

    it("debugLevel should be between 0 and 5", function() {
       expect(config.debugLevel).toBeWithinRange(0,5);
    });


});

describe("config.db object", function() {

    it("should not be undefined", function() {

        expect(config.db).toBeDefined();
    });

    it("should contain a db.address member", function() {

        expect(config.db.address).toBeDefined();
    });

    it("should contain a db.user member", function() {
        expect(config.db.user).toBeDefined();

    });

    it("should contain a db.password member", function() {

        expect(config.db.password).toBeDefined();
    });

    it("should contain a db.database member", function() {
        expect(config.db.database).toBeDefined();
    });

    it("should contain a db.port member", function() {
        expect(config.db.port).toBeDefined();
    });

    it("db.address should not be empty", function() {
       expect(config.db.address).not.toEqual("");

    });

    it("db.user should not be empty", function() {
        expect(config.db.user).not.toEqual("");

    });

    it("db.password should not be empty", function() {
        expect(config.db.password).not.toEqual("");

    });

    it("db.database should not be empty", function() {
        expect(config.db.database).not.toEqual("");

    });

    it("db.port should not be empty", function() {
        expect(config.db.port).not.toEqual("");

    });

    it("should contain a db.debugMode member", function() {
       expect(config.db.debugMode).toBeDefined();
    });

    it("db.debugMode should be boolean", function() {
        expect(config.db.debugMode).toBeBoolean();
    });

});


describe("config.srv object", function() {

    it("should contain a srv.port member", function() {
       expect(config.srv.port).toBeDefined();

    });

    it("srv.port should not be empty", function() {
        expect(config.srv.port).not.toEqual("");

    });

    it("should contain a srv.env member", function() {
       expect(config.srv.env).toBeDefined();
    });

    it("srv.env should not be emtpy", function() {
       expect(config.srv.env).not.toEqual("");
    });

    it("should be a valid string (development, test, production)", function() {
        var validNames = ["development","test","production"];
        expect(validNames).toContain(config.srv.env);
    });

});
