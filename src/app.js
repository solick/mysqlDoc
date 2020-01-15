var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var routes = require('./routes/index');
var users = require('./routes/users');
var route_list = require('./routes/list');
var route_print = require('./routes/print');
var route_menu = require('./routes/menu');
var dBWrapper = require('./dBConn/dBWrapper');
var config = require('./config');

var debug = require('debug')('app');


var mysql = require('mysql');


app.set('env',config.srv.env);

var dbwrap = new dBWrapper.dBConn(config);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.use('/list', route_list);
app.get('/list/procedures', dbwrap.procedures);
app.get('/list/procedure/:name', dbwrap.procedure);
app.get("/list/procedure", function(req, res) {
    res.render('list_procedure', { title: 'Error at list one Procedure' });
});
app.get('/list/tables', dbwrap.tables);
app.get('/list/table/:name', dbwrap.table);
app.get("/list/table", function(req, res) {
    res.render('list_table', { title: 'Error at list one Table' });
});
app.use('/menu', route_menu);
app.get('/menu/procedures', dbwrap.proceduresMenu);
app.get('/menu/tables', dbwrap.tablesMenu);

app.use('/print', route_print);
app.get('/print/procedures', dbwrap.proceduresPrint);
app.get('/print/tables', dbwrap.tablesPrint);


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    debug("Error handling for development mode");
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
