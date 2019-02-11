const dotenv = require('dotenv').config();
const fetch = require('node-fetch');
const express = require('express');
const fs =require('fs');
const app = express();

const Product  = require('./models/product');



const  mongoose    = require("mongoose");
const mongoDB = process.env.url;
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
        res.json(x); 
        var count = x.length
        console.log(count);
    });
})


//search route=================================================================================================================================================

app.get('/search', function(req, res){
        
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
        res.json(x)
        
        var count = x.length
        console.log(count); 
    }).sort( { "filters.price" : 1 } )
})


//filter route=================================================================================================================================================

app.get('/filter', function(req, res){

// filter by Categoryname, Brand, Condition, Material, Color, Flaw, Price, Size.
 
    var pCat = req.query.cat;
    var pCondition = req.query.condition;
    var pBrand = req.query.brand;
    var pMaterial = req.query.material;
    var pColor = req.query.color;
    var pFlaw = req.query.flaw;
    var pSize = req.query.size;
    var upperPrice = req.query.upper;
    

    var mamamia = [];

            if(pCat){mamamia.push({"category.categoryName": pCat})};
            if(pCondition){mamamia.push({"filters.condition": pCondition})};
            if(pBrand){mamamia.push({"filters.brand": pBrand})};
            if(pMaterial){mamamia.push({"filters.material": pMaterial})};
            if(pColor){mamamia.push({"filters.color": pColor})};
            if(pFlaw){mamamia.push({"filters.flaw": pFlaw})};
            if(pSize){mamamia.push({"filters.size":{$in: pSize}})};
            if(upperPrice){mamamia.push({"filters.price":{ $lt : upperPrice } })};


     console.log(mamamia)
          

    Product.find({
        
        $and:mamamia

        }
        , function(err, x) {
        if (err)
            {res.send(err)};
        res.json(x)
        
        var count = x.length
        console.log(count); 
    }).sort( { "filters.price" : 1 } )
})



//app running on port==============================================================================================================================================
const port = 3000
app.listen(process.env.PORT || port,() => {
    console.log("running on " + port)
}) 