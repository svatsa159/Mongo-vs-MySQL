var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/movies";

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};


var str='';
var express=require('express');
var app=express();
var c=10;
app.get('/mov',function(req,res)
{
  MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    var db=client.db('movies');
    console.log("Database connected!");
    // db.collection('data').find().exec(function(err, movie) {
    //         if (err) throw err;
    //         res.render('ind.ejs', {
    //             'movie': movie
    //         })});
    // var i=0;
    // db.collection('data').find({}).forEach( function(myDoc){
    //   str+=(JSON.stringify(myDoc));
    // } );
    // res.send(str);
    var cursor=db.collection('data').find({});
    cursor.each(function(err, doc) {
      if(doc!=undefined){

        console.log(doc.title);}
    },function(err){});


    client.close();
  });

});
app.get('/',function(req,res){
  res.send("Wasssup");
});
var server=app.listen(3000,function() {});
