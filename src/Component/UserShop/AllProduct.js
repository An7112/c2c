import React, { Component } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Pet from '../../Image/pet8.png';
import { getCurrentUser } from "../Auth/Services/AuthService";
import axios from 'axios';
import MainMenu from '../Main';
import HeaderMain from '../Header';
import BoxSeller from './BoxSeller';
import './Shop.css'
import HeaderLinkShop from './HeaderLinkShop';
export class AllProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: getCurrentUser(),
            SellerPr: []
        }
    }
    componentDidMount() {
        axios.get('http://localhost:9000/api/seller').then((res) => {
            this.setState({ SellerPr: res.data })
        })
    }
    deleteRow(_id) {
        axios.delete(`http://localhost:9000/api/seller/${_id}`)
        window.location.reload(false)
    }
    render() {
        const SellerPrById = this.state.SellerPr.filter((element) => {
            return element.IdSeller == this.state.user._id
        })
        console.log(SellerPrById)
        return (
            <div>
                <MainMenu />
                <div className="home_content">
                    <HeaderMain />
                    <div className='shop_content'>
                        <BoxSeller />
                        <HeaderLinkShop />
                        <div className='Product_All'>
                            <div class="row">
                                {SellerPrById.map((element) => (
                                    <div class="column">
                                        <Card>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image={element.ProductImg}
                                                    alt="green iguana"
                                                />
                                                <div className='Box_Ava'>
                                                    <img src={Pet} alt=""></img>
                                                </div>
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div" color="white">
                                                        {element.ProductName}
                                                    </Typography>
                                                    <Typography variant="body2" color="white">
                                                        {element.ProductTitle}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions>
                                                <Button size="small" color="primary" onClick={() => this.deleteRow(element._id)}>
                                                    Delete
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AllProduct