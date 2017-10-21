
const mysql = require('mysql');
const express = require('express');
var http = require('http');
var https = require('https');

//use pubconfig for heroku deployment, config for local deployment.
const config = process.env.PORT ? require('./pubconfig') : require('./config');

var app = express();


app.set('port', (process.env.PORT || 5000));
app.use(express.static('./build'));
app.use('/static', express.static('./static'));
app.use(bodyParser.urlencoded({
    extended: true
}));
/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

//Connect to db. USES POOLING
const sqlPool = mysql.createPool(config.db.connectionOp);
//test connection
sqlPool.getConnection(function (err, connection) {
    //TODO REMOVE THROWS
    connection.release();
    if (err) console.log(err);
    else console.log("DB connected!");
});

//function to get entries from database using a pooled connection, given a query and a callback function.
//No error handling
function pooledQuery(sqlQuery, callback) {
    //console.log(sqlQuery); //debug ONLY
    sqlPool.getConnection(function (err, connection) {
        connection.query(sqlQuery, function (err, res) {
            connection.release();
            if (err) console.log('Error getting data from db!');
            if (typeof callback === 'function') callback(err, res);
            else console.log('Error query callback is not a function.');
            }
        });
    }); //END POOL
}

//unique id = hackathon name
//default order (no params is by review date ascending)
function parseParamsQuery(query, callback){
	let sqlQuery = 'SELECT * FROM ' + config.db.tableName + ' WHERE id =' mysql.escape(query);
	
	sqlPool(sqlQuery, function(err, res){
		if(typeof callback === 'function') callback(err, res);
	});
	
}

//TODO: SQL, SERVER ROUTING/API LOGIC TO SQL
//SQL: Name of hackathon --> unique ID
//listofhackathons (hard code this :'( )
//info of hackathon (hard code this :'( ), summary (hard code this)

//individual ratings of a hackathon --> MYSQL
app.get('/data/reviews', function (req, res) {
	function handleDBResp(err, resp) {
        if (err) console.log(err);
		
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        //console.log(resp);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ data: resp }));
    }
	
	parseParamsQuery(req.query, handleDBResp);
});

app.post('/add/reviews', function(req, res){
	//req.body.somethingsomething
	
	//TODO: parse body --> escape text --> add to mysql
});


app.use(function (req, res) {
    res.status(404);
    res.send('404: Oops, no hackathons here O_O');
});

/*****END SERVER ROUTING*****/

var httpServer = http.createServer(app);
var httpsServer = https.createServer(app);
httpServer.listen(app.get('port'), function () {
    console.log("Node app is running at [host]:" + app.get('port'))
});

httpsServer.listen('8443', function () {
    console.log("Node app is running at [host]:" + 8443)
});