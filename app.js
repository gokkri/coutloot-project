const fetch = require('node-fetch');
const express = require('express');
const fs =require('fs');
const app = express();

const Product  = require('./models/product');



const  mongoose    = require("mongoose");
const mongoDB = "mongodb://gokkri:hello123@ds127825.mlab.com:27825/coutloot"
mongoose.connect(mongoDB, {useCreateIndex: true, useNewUrlParser: true, autoIndex: true}).catch((err) => {console.log(err)})





//fetching data from JSON - to be done only once

/*
const all = JSON.parse(fs.readFileSync('products.json', 'utf-8'));

allproductsarray = all.products;

console.log(allproductsarray[0]);

 Product.insertMany(allproductsarray);
     console.log('Done!');
*/





//index route - fetch all products=============================================================================================================================

app.get('/', function(req, res){
    Product.find(function(err, x) {
        if (err)
            {res.send(err)};
        res.send(x); 
        var count = x.length
        console.log(count);
    });
})


//search route=================================================================================================================================================

app.get('/products', function(req, res){
        
    var pTitle = req.query.title;
    var pDescription = req.query.description;
    var pBrand = req.query.brand;
 

    var searchTerms = ""
    if(pTitle){searchTerms += pTitle};
    if(pDescription){searchTerms += " " + pDescription};
    if(pBrand){searchTerms+= " " + pBrand};

    console.log(searchTerms)
          

    Product.find(
       {$text : { $search : searchTerms} } 
    , function(err, x) {
        if (err)
            {res.send(err)};
        res.send(x)
        
        var count = x.length
        console.log(count); 
    })
})





//app running on port==============================================================================================================================================
const port = 3725
app.listen(process.env.PORT || port,() => {
    console.log("running on " + port)
}) 