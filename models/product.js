//Schema Setup
var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    
        productId: {type: Number},
        category: {
        categoryName: {type:String, index : "text"},
        },
        details: {
        title: {type:String, index : "text"}, 
        description: {type:String, index : "text"},
        },
        filters: {
        brand: {type:String, index : "text"},
        condition: {type:String, index : "text"},
        price: {type: Number},
        size: [
            String
        ],
        material: {type:String, index : "text"},
        color: {type:String, index : "text"},
        flaw: {type:String, index : "text"},
        }
        
});

productSchema.index({'$**': 'text'});
productSchema.set('autoIndex', true);


module.exports= mongoose.model('Product', productSchema);