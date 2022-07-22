const mongoose = require('mongoose');

const SellerPSchema = mongoose.Schema({
    ProductImg:{
        type: String,
        require: true
    },
    IdSeller:{
        type: String,
        require: true
    },
    ProductName:{
        type: String,
    },
    ProductTitle:{
        type: String
    },
    ProductDetail:{
        type: String
    }
},{
    collection:'ProductSeller'
})

module.exports = mongoose.model('ProductSeller', SellerPSchema)