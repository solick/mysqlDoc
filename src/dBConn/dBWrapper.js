/**
 * Created by lynmatten on 20.06.14.
 */

var express = require('express');
//var router = express.Router();
var mysql = require('mysql');

//TODO: mysql console log dependent on config.db.debugMode state

/**
 * @constructor
 * @param dBConfig
 */
var dBConn = function(dBConfig) {
    var that = this;
    this.config = dBConfig;
    //console.log(this.config);

    if (that.config == undefined) {
        throw Error("No database configuration found");
        return;
    }
    this.pool = mysql.createPool({
        connectionLimit: 30,
        host: this.config.db.address,
        user: this.config.db.user,
        password: this.config.db.password
    });

    if(that.config.db.debugMode == true)
    {
        console.log("dBConn instance established");
    }


    /**** privileged function declaration ***/

    /**
     *
     * @param callback
     * @param procedureName
     */
    function querySP(callback, procedureName) {
        //console.log("config: " + that.config);
        var sqlStr = "";

        if (procedureName == undefined) {
            sqlStr += "SELECT " +
                "mysql.proc.name, " +
                "mysql.proc.param_list, " +
                "mysql.proc.body_utf8, " +
                "mysql.proc.type, " +
                "mysql.proc.`returns`, " +
                "mysql.proc.`comment` " +
                "FROM mysql.proc " +
                "WHERE mysql.proc.db = " + that.pool.escape(that.config.db.database);
        }
        else {
            sqlStr += "SELECT " +
                "mysql.proc.name, " +
                "mysql.proc.param_list, " +
                "mysql.proc.body_utf8, " +
                "mysql.proc.type, " +
                "mysql.proc.`returns`, " +
                "mysql.proc.`comment` " +
                "FROM mysql.proc " +
                "WHERE mysql.proc.db = " + that.pool.escape(that.config.db.database) +
                "AND mysql.proc.name = " + that.pool.escape(procedureName);
        }


        that.pool.getConnection(function (err, connection) {

            if (err) {
                if(that.config.db.debugMode == true) {
                    console.log("Error during connection to the database.");
                }
                return;
            }
            else {
                if(that.config.db.debugMode == true) {
                    console.log('connected to mysql server as id ' + connection.threadId);
                }
            }

            connection.query(sqlStr, function (err, rows) {
                if (err) {
                    if(that.config.db.debugMode == true) {
                        console.log("DB not connected, error during query");
                    }
                    return nil;
                }

                if(that.config.db.debugMode == true) {
                    console.log("successfully read stored procedure query from db");
                }
                /*
                 res.render(jadeFile, {
                 title: title,
                 results: rows
                 });
                 */

                connection.release();

                callback(null, rows);

            });


        });
    }

    /**
     *
     * @param callback
     * @param tableName
     */
    function queryTables(callback, tableName) {
        var sqlStr = "";

        if(tableName == undefined)
        {
            sqlStr += "SELECT " +
                "`information_schema`.`tables`.`TABLE_NAME` AS `table_name`," +
                "`information_schema`.`tables`.`TABLE_TYPE` AS `table_type`," +
                "`information_schema`.`tables`.`TABLE_COMMENT` AS `table_comment` " +
                "FROM `information_schema`.`tables` " +
                "WHERE (`information_schema`.`tables`.`TABLE_SCHEMA` like " + that.pool.escape(that.config.db.database) + ")";
        }
        else
        {
            sqlStr += "SELECT " +
                "`information_schema`.`tables`.`TABLE_NAME` AS `table_name`," +
                "`information_schema`.`tables`.`TABLE_TYPE` AS `table_type`," +
                "`information_schema`.`tables`.`TABLE_COMMENT` AS `table_comment` " +
                "FROM `information_schema`.`tables` " +
                "WHERE (`information_schema`.`tables`.`TABLE_SCHEMA` like " + that.pool.escape(that.config.db.database) + ") " +
                "AND (`information_schema`.`tables`.`TABLE_NAME` like " + that.pool.escape(tableName) + ") ";
        }

        //console.log(sqlStr);


        that.pool.getConnection(function(err, connection) {

            if (err) {
                if(that.config.db.debugMode == true) {
                    console.log("Error during connection to the database.");
                }
                return;
            }
            else {
                if(that.config.db.debugMode == true) {
                    console.log('connected to mysql server as id ' + connection.threadId);
                }
            }

            connection.query(sqlStr, function(err, rows) {
                if(err)
                {
                    if(that.config.db.debugMode == true) {
                        console.log("DB not connected, error during query");
                    }
                    return;
                }
                if(that.config.db.debugMode == true) {
                    console.log("successfully read all tables from database.");
                }

                //console.log(rows);

                var count = 0;

                rows.forEach(function(obj) {


                    that.pool.getConnection(function(err, connection2) {

                        if (err) {
                            if(that.config.db.debugMode == true) {
                                console.log("Error during connection to the database.");
                            }
                            return;
                        }
                        else {
                            if(that.config.db.debugMode == true) {
                                console.log('connected to mysql server as id ' + connection2.threadId);
                            }
                        }

                        var sqlStr2 = "SHOW CREATE TABLE " + that.config.db.database + "." + obj.table_name;

                        //console.log(sqlStr2);

                        /*** query Create Table command for each table ***/
                        connection2.query(sqlStr2, function(err, tmpRow) {

                            if(err)
                            {
                                if(that.config.db.debugMode == true) {
                                    console.log(err);
                                }
                                count++;
                            }
                            else {


                                //console.log(tmpRow);

                                if ("Create Table" in tmpRow[0]) {
                                    //console.log(tmpRow[0]["Table"] + " is a Table");
                                    obj.tblBody = tmpRow[0]["Create Table"];
                                }
                                else if ("Create View" in tmpRow[0]) {
                                    //console.log(tmpRow[0]["View"] + " is a View");

                                    obj.tblBody = tmpRow[0]["Create View"];
                                    obj.character_set_client = tmpRow[0]["character_set_client"];
                                    obj.collation_connection = tmpRow[0]["collation_connection"];
                                }
                                else {
                                    if(that.config.db.debugMode == true) {
                                        console.log("undefined object");
                                    }
                                }


                                /*** Query column details for each table ***/
                                that.pool.getConnection(function (err, connection3) {

                                    if (err) {
                                        if(that.config.db.debugMode == true) {
                                            console.log("Error during connection to the database.");
                                        }
                                        return;
                                    }
                                    else {
                                        if(that.config.db.debugMode == true) {
                                            console.log('connected to mysql server as id ' + connection3.threadId);
                                        }
                                    }

                                    var sqlStr2 = "SHOW FULL COLUMNS FROM " + that.config.db.database + "." + obj.table_name;

                                    //console.log(sqlStr2);

                                    connection3.query(sqlStr2, function (err, tmpRow2) {

                                        if (err) {
                                            if(that.config.db.debugMode == true) {
                                                console.log(err);
                                            }
                                        }
                                        else {


                                            //console.log(tmpRow2);
                                            obj.columnList = [];

                                            tmpRow2.forEach(function(tmpR) {

                                                var tmpObj = {};

                                                tmpObj.Field = tmpR["Field"];
                                                tmpObj.Type = tmpR["Type"];
                                                tmpObj.Collation = tmpR["Collation"];
                                                tmpObj.Null = tmpR["Null"];
                                                tmpObj.Key = tmpR["Key"];
                                                tmpObj.Default = tmpR["Default"];
                                                tmpObj.Extra = tmpR["Extra"];
                                                tmpObj.Comment = tmpR["Comment"];

                                                //console.log(obj.columnList);

                                                obj.columnList.push(tmpObj);


                                            });


                                        }

                                        count++;
                                        //console.log(count + ": " + obj.table_name + " -- length: " + rows.length);
                                        if (count == rows.length) {
                                            callback(null, rows);
                                        }

                                        connection3.release();

                                    });


                                });
                            }



                            connection2.release();

                        });



                    });

                });

                connection.release();
            });





        });

    }


    /**
     *
     * @param req
     * @param res
     */
    dBConn.prototype.procedures = function (req, res) {
        if(that.config.debugLevel > 2) {
            console.log("get list of all stored procedures and functions");
        }

        querySP(function (err, rows) {
            //console.log(rows);
            res.render("procedures", {
                title: "List of Stored Procedures",
                results: rows
            });
        });


    };

    /**
     *
     * @param req
     * @param res
     */
    dBConn.prototype.procedure = function (req, res) {
        if(that.config.debugLevel > 2) {
            console.log("get list of stored procedure or function " + req.params.name);
        }

        querySP(function (err, rows) {
            //console.log(rows);
            res.render("procedures", {
                title: "List of Stored Procedures",
                results: rows
            });
        }, req.params.name);


    };

    /**
     *
     * @param req
     * @param res
     */
    dBConn.prototype.tables = function (req, res) {
        if(that.config.debugLevel > 2) {
            console.log("get list of all tables");
        }

        queryTables(function(err, rows) {

            if(that.config.debugLevel > 2) {
                console.log("successfully read from db, now passing results to jade template");
            }
            res.render('TablesAll', {
                title: that.config.dbDoc.Tables.Title,
                results: rows
            });

        });

    };
    /**
     *
     * @param req
     * @param res
     */
    dBConn.prototype.table = function (req, res) {
        if(that.config.debugLevel > 2) {
            console.log("get information about table " + req.params.name);
        }

        queryTables(function(err, rows) {
            if (that.config.debugLevel > 2) {
            console.log("successfully read from db, now passing results to jade template");
            }
            res.render('TablesAll', {
                title: that.config.dbDoc.Tables.Title,
                results: rows
            });

        }, req.params.name);

    };


    /**
     *
     * @param req
     * @param res
     */
    dBConn.prototype.proceduresMenu = function(req, res) {

        if (that.config.debugLevel > 2) {
            console.log("Menu with list of all stored procedures and functions");
        }

        querySP(function(err, rows) {
            res.render("proceduresOverview", {
                title: "Overview of Stored Procedures",
                results: rows
            });

        });

    };

    /**
     *
     * @param req
     * @param res
     */
    dBConn.prototype.tablesMenu = function(req, res) {
        if (that.config.debugLevel > 2) {

            console.log("menu with list of all tables");
        }

        queryTables(function(err, rows) {
            res.render("TablesOverview", {
                title: "Overview of Tables and Views",
                results: rows
            });

        });

    };


    /**
     *
     * @param req
     * @param res
     */
    dBConn.prototype.proceduresPrint = function(req, res) {
        if (that.config.debugLevel > 2) {

            console.log("get printable list of all stored procedures and functions");
        }

        querySP(function(err, rows) {
            if (that.config.debugLevel > 2) {

                console.log("successfully read from db, now passing results to jade template");
            }
            res.render('proceduresPrint', {
                title: that.config.dbDoc.Procedures.Title,
                version: that.config.dbDoc.Procedures.Version,
                titleDetails: that.config.dbDoc.Procedures.TitleDetail,
                author: that.config.dbDoc.Author,
                date: that.config.dbDoc.Date,
                customer: that.config.dbDoc.Customer,
                results: rows
            });

        });



    };


    /**
     *
     */
    dBConn.prototype.tablesPrint = function(req, res) {
        if (that.config.debugLevel > 2) {
            console.log("get printable list of all tables");
        }

        queryTables(function(err, rows) {
            if (that.config.debugLevel > 2) {

                console.log("successfully read from db, now passing results to jade template");
            }
            res.render('TablesPrint', {
                title: that.config.dbDoc.Tables.Title,
                titleDetails: that.config.dbDoc.Tables.TitleDetail,
                version: that.config.dbDoc.Tables.Version,
                author: that.config.dbDoc.Author,
                date: that.config.dbDoc.Date,
                customer: that.config.dbDoc.Customer,
                results: rows
            });

        });

    };
};

exports.dBConn = dBConn;