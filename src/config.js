/**
 * Created by lynmatten on 14.06.14.
 */

var os = require('os');

var config = {};

config.debugLevel = 2;

config.srv = {};

config.srv.port = "9000";
config.srv.env = "development";


config.db = {};
// config.db.address = 'stw-staging.mm1-technology.net';
// config.db.database = 'stw_dev';
// config.db.password = 'xfVQK7pK23zaqP9';
config.db.address = 'mysql-test.mm1-technology.net';
config.db.password = 'root';
config.db.database = 'STW_dev_2';
config.db.user = 'root';
config.db.port = '3306';
config.db.debugMode = true;

config.dbDoc = {};
config.dbDoc.Author = "Julia Heydecke";
config.dbDoc.Date = "2018-12-12";
config.dbDoc.Customer = "Stahlwille GmbH";

config.dbDoc.Procedures = {};
config.dbDoc.Procedures.Title = "List of Stored Procedures";
config.dbDoc.Procedures.TitleDetail = "This document lists and declares all stored procedures in alphabetical order within the defined database.";
config.dbDoc.Procedures.Version = "0.2";

config.dbDoc.Tables = {};
config.dbDoc.Tables.Title = "List of all Tables";
config.dbDoc.Tables.TitleDetail = "This document lists and declares all tables ";
config.dbDoc.Tables.Version = "0.2";


module.exports = config;
