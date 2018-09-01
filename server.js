var subdomain = require('express-subdomain');
var express = require("express");
var app = express();
var path = require("path");

var router = express.Router();

// --- monKey Data endpoint

router.get('/:address', function(req, res) {
    res.redirect('https://bananomonkeys.herokuapp.com/api/' + req.params.address);
});
 
app.use(subdomain('api', router));

app.use('/static', express.static(__dirname + '/static'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/favicon.ico', function (req, res) {
    res.sendFile(path.join(__dirname + '/favicon.ico'));
});

//  --- monKey image endpoints
app.get('/image', function(req,res) {

    let address = req.query.address; 
    let accesories = req.query.acc || null; 
    let format = req.query.format || null;
    let background = req.query.bg || null;

    let api_url = 'https://bananomonkeys.herokuapp.com/image?address=' + address
    if(background) api_url += '&bg=' + background;
    if(accesories) api_url += '&acc=' + accesories;
    if(format) api_url += '&format=' + format;

    res.redirect(api_url);
});

var port = process.env.PORT || 3000;

app.listen(port);

console.log("Running on Port " + port);
