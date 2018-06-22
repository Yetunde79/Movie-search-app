var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.use(express.static("public"));

var request = require('request');

app.get("/", function(req,res){
    res.render("search");
});

app.get("/request", function(req, res){
    var query = encodeURIComponent(req.query.search);
    var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";

    request(url, function(error, response, body){
        var data = JSON.parse(body);
        if(!data["Error"] && response.statusCode === 200){
            
            res.render("results", {data: data});
        }
        else{
            res.redirect("error");
        }
    })
});


app.get("*", function(req, res){
    res.render("error");
});

app.listen(port, function(){
    console.log("Server running");
});
