
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
var http = require('http');
var https = require('https');

//use pubconfig for heroku deployment, config for local deployment.
const config = process.env.PORT ? require('./pubconfig') : require('./config');

var app = express();


app.set('port', (process.env.PORT || 5000));
app.use(express.static('./build'));
app.use('/static', express.static('./static'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//Connect to db. USES POOLING
const sqlPool = mysql.createPool(config.db.connectionOp);
//test connection
sqlPool.getConnection(function (err, connection) {
    connection.release();
    if (err) console.log(err);
    else console.log("DB connected!");
});

//function to query a database using a pooled connection, given a query and a callback function.
//No error handling
function pooledQuery(sqlQuery, callback) {
    //console.log(sqlQuery); //debug ONLY
    sqlPool.getConnection(function (err, connection) {
        connection.query(sqlQuery, function (err, res) {
            connection.release();
            if (err) console.log('Error getting data from db!');
            if (typeof callback === 'function') callback(err, res);
            else console.log('Error query callback is not a function.');
        });
    }); //END POOL
}

//TODO: SQL, SERVER ROUTING/API LOGIC TO SQL
//SQL: Name of hackathon --> unique ID
//listofhackathons (hard code this :'( )
//info of hackathon (hard code this :'( ), summary (hard code this)

//individual ratings of a hackathon --> MYSQL

//RETURN VALUES:
//id 	- unique hackathon id name (string)
//title - review title name (string)
//created_date	- post date of review (datetime)
//venue	- 0 to 10 int
//sponsors/prizes - 0 to 10 int
//food	- 0 to 10 int
//recommend	- 0 or 1 (boolean 1 is yes)
//reimbursement amount	- integer between 0 and 16 million
//comments	- string block of text, supports emojis
app.get('/data/reviews', function (req, res) {
	function handleDBResp(err, resp) {
        if (err) console.log(err);
		
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ data: resp }));
    }
	//unique id = hackathon name
	//default order (no params is by review date ascending)
	function parseParamsQuery(query, callback){
		let sqlQuery = 'SELECT * FROM ' + config.db.tableName + ' WHERE id =' + sqlPool.escape(query) + ' ORDER BY created_date ASC';
		
		sqlPool(sqlQuery, function(err, res){
			if(typeof callback === 'function') callback(err, res);
		});
		
	}
	
	parseParamsQuery(req.query, handleDBResp);
});

//Post form data (review) to add to DB
//REQUIRED PARAMS:
//id to identify hackathon //maybe TODO, check that this is a valid hackathon name in db
//title of review
//venue rating (0-10)
//funding rating (0-10)
//food rating (0-10)
//recommend (0-1)
//reimbursement (0-16mil)
//comments (text, limit to 4194304 chars)
app.post('/add/reviews', function(req, res){
	//TODO: parse body, title --> escape text --> add to mysql
    //If missing any of the parameters, then DO NOT ADD the review and return some error response.
    console.log(req.body);
	
	if(!req.body || !('id' in req.body && 'title' in req.body && 'venue' in req.body && 'funding' in req.body && 'food' in req.body && 'rec' in req.body && 'reimb' in req.body && 'comments' in req.body)){
		//missing an item. do nothing and return an error response
		res.json(400, {status: 400, error: 'Wrong or missing parameters'})
	} else {
        function handleDBResp(err, resp) {
            if (err){
                console.log(err);
                res.json(500, {status: 500, error: 'Failed to update database'});
            } else{
                res.json(200, {status: 200, success: 'Database updated'});
            }
        }
		//parse input to query lang with escapings
		let myQuery = 'INSERT INTO ' + config.db.tableName
			+ ' (id, title, venue, funding, food, recommend, reimburse, comments) VALUES ?';
		let dataArr = [req.body.id, req.body.title, req.body.venue, req.body.funding, req.body.food, req.body.rec, req.body.reimb, req.body.comments];
        
        //make sql query
        sqlPool.getConnection(function (err, connection) {
            connection.query(myQuery, dataArr, function (err, res) {
                connection.release();
                if (err) console.log('Error getting data from db!');
                handleDBResp(err, res);
            });
        }); //END POOL
	}
	
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