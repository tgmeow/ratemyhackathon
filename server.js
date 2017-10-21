
const mysql = require('mysql');
const express = require('express');
var http = require('http');
var https = require('https');

var app = express();


app.set('port', (process.env.PORT || 5000));
app.use(express.static('./build'));
app.use('/static', express.static('./static'));

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