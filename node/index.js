var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/movies";
var express=require('express');
var app=express();
var mysql = require('mysql');

// app.set('view engine', 'ejs');
// app.use(express.static(__dirname + '/static'));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
var movie = new mongoose.Schema({
  title: String
},{collection:'data'});


app.get('/hello',function(req,res){
  console.log('initiated');
  mongoose.connect(url, {useNewUrlParser: true});
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    // we're connected!
    console.log("Connected");
  });

  // Schema


//Model
  var Movie = mongoose.model('Movie', movie);
  Movie.find({},{_id:0}).lean().exec(function (err, moviess) {
      return res.end(JSON.stringify(moviess));
      // return res.render("ind.ejs",{moviess:moviess,i:1})

  });

});
app.get('/hola',function(req,res){
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "diksha143",
  database: "movies"
});
con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM data", function (err, result, fields) {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});
})
var server=app.listen(6069,function() {});
