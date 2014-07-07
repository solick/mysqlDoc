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
config.db.address = 'xxx.xxx.xxx.xxx';
config.db.user = 'XX';
config.db.password = 'XX';
config.db.database = 'XX';
config.db.port = '3306';
config.db.debugMode = true;

config.dbDoc = {};
config.dbDoc.Author = "Lyn Sören Matten";
config.dbDoc.Date = "2014-07-01";
config.dbDoc.Customer = "XXX";

config.dbDoc.Procedures = {};
config.dbDoc.Procedures.Title = "List of Stored Procedures";
config.dbDoc.Procedures.TitleDetail = "This document lists and declares all stored procedures in alphabetical order within the defined database.";
config.dbDoc.Procedures.Version = "1.0";

config.dbDoc.Tables = {};
config.dbDoc.Tables.Title = "List of all Tables";
config.dbDoc.Tables.TitleDetail = "This document lists and declares all tables ";
config.dbDoc.Tables.Version = "1.0";


module.exports = config;
