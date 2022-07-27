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
    },
    Collectibles:{
        type: Boolean
    },
    Utility:{
        type: Boolean
    },
    Price:{
        type: Number
    }
},{
    collection:'ProductSeller'
})

module.exports = mongoose.model('ProductSeller', SellerPSchema)