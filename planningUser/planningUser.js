/*
 *
 * OpenBBS - Console - Ads Server
 *
 */



var packageJson   = require('./package.json');
var express	      = require('express');
var bodyParser    = require('body-parser');
var config        = require('config') ;
var request       = require('request');
var cookieParser  = require('cookie-parser');
var favicon       = require('serve-favicon');




/*
 *
 * Express 4 - Configuration
 *
 */


var app = express();
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.urlencoded({ extended: true }));    // parse application/x-www-form-urlencoded
app.use(bodyParser.json())  ;  // parse application/json
app.use(cookieParser());
app.use(function(req, res, next) {
    res.header("X-powered-by", "openBBS");
    next();
});
app.use(function(req, res, next) {
    console.log(' - ',req.originalUrl);
    next();
});






//
// Matching
//

var planning            = require('./v1/planningUser');

app.post('/v1/planning',
    planning.getplanning);

var status = 'running';

app.get('/op', function(req,res){
    res.status(200).json(['stop','start','reboot'])
});


app.get('/op/stop', function(req,res){
    status = 'stopped';
    res.status(200).send('STOPED');
});


app.get('/op/start', function(req,res){
    status = 'running';
    res.status(200).send('RUNNING');
});


app.get('/op/reboot', function(req,res){
    console.log(" * shutdown request");
    writeDBlog('adserv', "shutdown request");
    res.status(200).send('SHUTDOWN');
    process.exit(0);
});


/*
 *
 * health Check
 *
 */

app.get('/health', function(req,res){
    res.status(200).json(['status','version','env', 'cache', 'db'])
});



var server = app.listen(config.service.port, function () {
  console.log(' * '+config.service.name+' v'
                   +packageJson.version+' starting on http://localhost:'
                   + config.service.port);
});


