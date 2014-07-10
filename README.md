mysqlDoc
========

node.js Web-based MySql Documentation tool - inspired by doxygen

For a basic tutorial please visit my website under <http://lm-consult.com/wp/projects/mysql-documentation-with-node-js/>.

#how-to install

1. make sure, node.js and npm are installed
2. run npm install
3. after successfully installed modules change to /src
4. open config.js

you will find the folling template:


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
    config.dbDoc.Procedures.TitleDetail = "This document lists and declares all stored procedures in alphabetical order w$
    config.dbDoc.Procedures.Version = "1.0";
    
    config.dbDoc.Tables = {};
    config.dbDoc.Tables.Title = "List of all Tables";
    cofig.dbDoc.Tables.TitleDetail = "This document lists and declares all tables ";
    config.dbDoc.Tables.Version = "1.0";
    
    
    module.exports = config;


Enter the ip of the database server, which should be normally `127.0.0.1`

Also enter login and password and the databse you want to be documented.

**Please note that the user need to have access privileges for the general mysql database. If possible, simply use the root account**

You can than also change th author, date and the title, details and versions for the documents.

Not just run **node /src/bin/www.js** and use your prefered web browser to open localhost:9000 to get the information about your site.

