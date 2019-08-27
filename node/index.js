var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/movies";
var express=require('express');
var app=express();

app.get('/',function(req,res){
  mongoose.connect(url, {useNewUrlParser: true});
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    // we're connected!
    console.log("Connected");
  });
  var movie = new mongoose.Schema({
    title: String
  },{collection:'data'});
  var Movie = mongoose.model('Movie', movie);
  Movie.find().lean().exec(function (err, moviess) {
      return res.end(JSON.stringify(moviess));
  });

});
var server=app.listen(3000,function() {});
