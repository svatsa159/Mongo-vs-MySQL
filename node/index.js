var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/movies";
var express=require('express');
var app=express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));
var movie = new mongoose.Schema({
  title: String
},{collection:'data'});
app.get('/',function(req,res){
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
  Movie.find({"cast":{$in:["Idris Elba"]}}).lean().exec(function (err, moviess) {
      // return res.end(JSON.stringify(moviess));
      return res.render("ind.ejs",{moviess:moviess,i:1})
  });

});
var server=app.listen(3000,function() {});
