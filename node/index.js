var express=require('express');
var app=express();


// CORS Headers
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


// Define Mongoose Schema
var mongoose = require('mongoose');
var movie = new mongoose.Schema({
  title: String
},{collection:'data'});


// Mongo Route
app.get('/mongo',function(req,res){
  var url = "mongodb://localhost:27017/movies";
  console.log('initiated');
  mongoose.connect(url, {useNewUrlParser: true});
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {});
  // Define Mongoose Model
  var Movie = mongoose.model('Movie', movie);
  Movie.find({},{_id:0}).lean().exec(function (err, moviess) {
      return res.end(JSON.stringify(moviess));
  });
});


// MySQL Route
app.get('/mysql',function(req,res){
  var mysql = require('mysql');
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Welcome1*",
  database: "movies"
  });
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM data", function (err, result, fields) {
      if (err) throw err;
      res.send(JSON.stringify(result));
    });
  });
});


//Import Graphql
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

const cors =require('cors');
app.use(cors())
//Graphql schema
var schema = buildSchema(`
    type Query {
        cast: [String],
        genres: [String],
        year: Int,
        title: String
    }
`);

//Movies database
var moviesk = function(){
  var mysql = require('mysql');

  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Welcome1*",
  database: "movies"
  });
  console.log("GOT");
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM data", function (err, result, fields) {
      if (err) throw err;
      console.log("GOT");
      return(JSON.stringify(result));
    });
  });
};

//Root Scheme
var root={
  data: moviesk
};
//Graphql Endpoint
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql : true
}));

// Server Start
var server=app.listen(6069,function() {});
