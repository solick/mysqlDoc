/**
 * Created by lynmatten on 24.06.14.
 */

var config = require('../src/config.js');


/*exports.checkConfigOject_undefined = function(test) {

    test.notEqual(config, undefined);
    test.done();

};

exports.checkConfig_DB_Object_undefined = function(test) {

    test.notEqual(config.db, undefined);
    test.done();

};

exports.checkConfig_dbDoc_Object_undefined = function(test) {

    test.notEqual(config.dbDoc, undefined);
    test.done();

};*/

exports.config_Object_Undefined = {

    checkConfig_Object_undefined: function(test) {
        test.notEqual(config, undefined);
        test.done();
    },
    checkConfig_DB_Object_undefined: function(test) {
        test.notEqual(config.db, undefined);
        test.done();
    },
    checkConfig_dbDoc_Object_undefined: function(test) {
        test.notEqual(config.dbDoc, undefined);
        test.done();
    },

    checkConfig_dbDoc_Procedures_Object_undefined : function(test) {
        test.notEqual(config.dbDoc.Procedures, undefined);
        test.done();
    },
    checkConfig_dbDic_Tables_Object_undefined : function(test) {
        test.notEqual(config.dbDoc.Tables, undefined);
        test.done();
    }

};

exports.config_db_variables_undefined = {
  config_db_address_undefined: function(test) {
      test.notEqual(config.db.address, undefined);
      test.done();
  },
    config_db_user_undefined: function (test) {
        test.notEqual(config.db.user, undefined);
        test.done();
    },
    config_db_password_undefined: function(test) {
        test.notEqual(config.db.password, undefined);
        test.done();
    },
    config_db_database_undefined : function (test) {
        test.notEqual(config.db.database, undefined);
        test.done();
    },
    config_db_port_undefined: function(test) {
        test.notEqual(config.db.port, undefined);
        test.done();
    }

};


exports.config_DB_Object_values_not_empty = {

    check_Address : function (test) {
        test.notEqual(config.db.address, "");
        test.done();
    },
    check_user: function(test) {
        test.notEqual(config.db.user, "");
        test.done();
    },
    check_password: function(test) {
        test.notEqual(config.db.password, "");
        test.done();
    },
    check_database: function(test) {
        test.notEqual(config.db.database, "");
        test.done();
    },
    check_port: function(test) {
        test.notEqual(config.db.port, "");
        test.done();

    }

};