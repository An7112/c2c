const mongoose = require('mongoose')
const SellerP = require('../model/Seller_product_Model')

exports.GetProduct = async (req, res) => {
    try{
        const GetData = await SellerP.find();
        res.json(GetData)
    }catch(err){
        res.json({message:err})
    }
}

exports.CreateProduct = async (req, res) => {
    const url = req.protocol + "://" + req.get("host")
    const CrData = new SellerP({
        ProductImg:url+"/public/" + req.file.filename,
        IdSeller: req.body.IdSeller,
        Collectibles: req.body.Collectibles,
        Utility: req.body.Utility,
        Price: req.body.Price,
        ProductName:req.body.ProductName,
        ProductTitle:req.body.ProductTitle,
        ProductDetail: req.body.ProductDetail
    })
    try{
        const SavedData = await CrData.save().then((result) => {
            res.status(200).json({
                message:"Create Product successfully!",
                ProductCreated:{
                    ProductImg: result.ProductImg,
                    IdSeller: result.IdSeller,
                    Collectibles: result.Collectibles,
                    Utility: result.Utility,
                    Price: result.Price,
                    ProductName: result.ProductName,
                    ProductTitle: result.ProductTitle,
                    ProductDetail: result.ProductDetail
                }
            })
        })
        res.json(SavedData)
    }catch(err) {
        res.json({message: err})
    }
}

exports.GetProductById = async(req, res) =>{
    try{
        const GetById = await SellerP.findById(req.params._id)
        res.json(GetById)
    }catch(err) {
        res.json({message: err})
    }
}

exports.DeleteProduct = (req, res) => {
    SellerP.remove({_id: req.params._id}, function(err, response) {
        if(err) {
            res.status(201).json({
                code:201,
                message:"Error from DeleteProduct"
            })
        }else{
            res.status(200).json({
                code:200,
                message:"Delete Product successfully!",
                data: response
            })
        }
    })
}

exports.UpdateProduct = async (req, res) => {
    const url = req.protocol + "://" + req.get("host")
    const UpdatePr = {
        ProductImg:url+"/public/" + req.file.filename,
        IdSeller: req.body.IdSeller,
        Collectibles: req.body.Collectibles,
        Utility: req.body.Utility,
        Price: req.body.Price,
        ProductName:req.body.ProductName,
        ProductTitle:req.body.ProductTitle,
        ProductDetail: req.body.ProductDetail
    }
    SellerP.findByIdAndUpdate(
        {_id: req.params._id},
        UpdatePr,
        function (err, response) {
            if(err) {
                res.status(201).json({
                    code:201,
                    message:"Error from Update Product"
                })
            }else{
                res.status(200).json({
                    code:200,
                    message:"Update Product Successfully!",
                    data: response
                })
            }
        }
    )
}