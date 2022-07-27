import React, { Component, useEffect, useState } from 'react'
import axios from 'axios'
import { getCurrentUser } from '../Auth/Services/AuthService'
import MessageLogin from '../MessageLogin'
import './Shop.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Pet from '../../Image/pet8.png';
import MainMenu from '../Main'
import HeaderMain from '../Header'
import BoxSeller from './BoxSeller'
import HeaderLinkShop from './HeaderLinkShop'
class CreateProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ProductName: "",
            ProductTitle: "",
            ProductDetail: "",
            IMG: "",
            user: getCurrentUser(),
            Collectibles: false,
            Utility: false,
            Price: ""
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onPrice = this.onPrice.bind(this)
        this.onUtility = this.onUtility.bind(this)
        this.onCollectibles = this.onCollectibles.bind(this)
        this.onProductName = this.onProductName.bind(this)
        this.onProductTitle = this.onProductTitle.bind(this)
        this.onProductDetail = this.onProductDetail.bind(this)
        this.onFileChange = this.onFileChange.bind(this);
    }
    onFileChange(e) {
        this.setState({
            ProductImg: e.target.files[0],
            IMG: URL.createObjectURL(e.target.files[0])
        })
    }
    onProductName(e) {
        this.setState({
            ProductName: e.target.value
        })
    }
    onPrice(e) {
        this.setState({
            Price: e.target.value
        })
    }
    onProductTitle(e) {
        this.setState({
            ProductTitle: e.target.value
        })
    }
    onProductDetail(e) {
        this.setState({
            ProductDetail: e.target.value
        })
    }
    onCollectibles(e) {
        this.setState({
            Collectibles: true,
            Utility: false
        })
    }
    onUtility(e) {
        this.setState({
            Utility: true,
            Collectibles: false
        })
    }
    onSubmit(e) {
        e.preventDefault()
        const CreatePr = new FormData()
        CreatePr.append('ProductImg', this.state.ProductImg)
        CreatePr.append('Collectibles', this.state.Collectibles)
        CreatePr.append('Utility', this.state.Utility)
        CreatePr.append('IdSeller', this.state.user._id)
        CreatePr.append('Price', this.state.Price)
        CreatePr.append('ProductName', this.state.ProductName)
        CreatePr.append('ProductTitle', this.state.ProductTitle)
        CreatePr.append('ProductDetail', this.state.ProductDetail)
        axios.post('http://localhost:9000/api/seller', CreatePr).then(res => console.log(res.data))
        this.setState({
            ProductName: "",
            ProductTitle: "",
            ProductDetail: "",
            Collectibles: false,
            Utility: false,
            Price:""
        })
    }
    render() {
        console.log(this.state.Collectibles)
        return (
            <div>
                <MainMenu />
                <div className="home_content">
                    <HeaderMain />
                    <div className='shop_content'>
                        <BoxSeller />
                        <HeaderLinkShop />
                        <div className='Product_Created'>
                            <div className='form'>
                                <Card className={this.state.Collectibles === true ? 'border' : ''}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={this.state.IMG}
                                            alt="green iguana"
                                        />
                                        <div className='Box_Ava'>
                                            <img src={Pet} alt=""></img>
                                        </div>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" color="white">
                                                {this.state.ProductName}
                                            </Typography>
                                            <Typography variant="body2" color="white">
                                                {this.state.ProductTitle}
                                            </Typography>
                                            <Typography variant="body2" color="white">
                                                {this.state.Price}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Buy now
                                        </Button>
                                    </CardActions>
                                </Card>
                                {this.state.user && (
                                    <form onSubmit={this.onSubmit} className='form-control'>
                                        <div className="form-group">
                                            <label class="file-input__label" for="file-input">
                                                <i class='bx bx-cloud-upload'></i>
                                                <span>Upload file</span></label>
                                            <input type='file' onChange={this.onFileChange} name="file-input"
                                                id="file-input"
                                                className="file-input__input" required={true} />
                                        </div>
                                        <div className="form-group">
                                            <input value={this.state.ProductName} onChange={this.onProductName} className='input_text' placeholder='Choose a name for the product' />
                                        </div>
                                        <div className="form-group">
                                            <input value={this.state.ProductTitle} onChange={this.onProductTitle} className='input_text' placeholder='Choose a title for the product' />
                                        </div>
                                        <div className="form-group">
                                            <input value={this.state.ProductDetail} onChange={this.onProductDetail} className='input_text' placeholder='Choose a detail for the product' />
                                        </div>
                                        <div className="form-group">
                                            <input value={this.state.Price} onChange={this.onPrice} className='input_text' placeholder='Choose a price for the product' />
                                        </div>
                                        <div className="form-group">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={this.onCollectibles} />
                                            <label>Collectibles</label>
                                        </div>
                                        <div className="form-group">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={this.onUtility} />
                                            <label>Utility</label>
                                        </div>
                                        <div className="form-group">
                                            <input type="submit" value="Register Product" className="btn btn-primary" />
                                        </div>
                                    </form>
                                )}
                                {!this.state.user && (
                                    <MessageLogin />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateProduct