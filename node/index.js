var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";



var str="";
var express=require('express');
var app=express();
var c=10;
app.get('/mov',function(req,res)
{
  MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    var db=client.db('movies');
    console.log("Database connected!");
    var curs = db.getCollection('data').find({}).toArray;
    // cursor.each(function(err, doc) {
    //   if(doc!=undefined){
    //     str=str+"&nbsp;&nbsp;&nbsp;&nbsp;Title&nbsp;&nbsp;"+doc.title+"</br>";
    //     console.log(doc.title);}
    // },function(err){});
     console.log(curs);
    res.send(curs);

    client.close();
  });

});
app.get('/',function(req,res){
  res.send("Wasssup");
})
var server=app.listen(3000,function() {});
