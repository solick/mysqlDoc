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
config.db.address = '{localhost or IP}';
config.db.user = '{user}';
config.db.password = '{password}';
config.db.database = '{database}';
config.db.port = '{port}';
config.db.debugMode = true;

config.dbDoc = {};
config.dbDoc.Author = "{your name}";
config.dbDoc.Date = "{date}";
config.dbDoc.Customer = "{customer or owner of database}";

config.dbDoc.Procedures = {};
config.dbDoc.Procedures.Title = "List of Stored Procedures";
config.dbDoc.Procedures.TitleDetail = "This document lists and declares all stored procedures in alphabetical order within the defined database.";
config.dbDoc.Procedures.Version = "1.0";

config.dbDoc.Tables = {};
config.dbDoc.Tables.Title = "List of all Tables";
config.dbDoc.Tables.TitleDetail = "This document lists and declares all tables ";
config.dbDoc.Tables.Version = "1.0";


module.exports = config;
