import React, { Component, useEffect, useState } from 'react'
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
import { useSelector,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setProducts } from '../../redux/actions/productsActions';
const AllProduct = () => {
    const products = useSelector((state) => state.allReducer.products);
    const dispatch = useDispatch();
    const fetchProducts = async () => {
      const response = await axios
        .get("http://localhost:9000/api/seller")
        .catch((err) => {
          console.log("Err: ", err);
        });
      dispatch(setProducts(response.data));
    };
    useEffect(() => {
      fetchProducts();
    }, []);
    const deleteRow = (_id) => {
        axios.delete(`http://localhost:9000/api/seller/${_id}`)
        window.location.reload(true)
    }
    const user = useSelector((state) => state.allReducer.user);
    const SellerPrById = products.filter((element) => {
        return element.IdSeller === user._id
    })
    console.log(user._id)
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
                                                <Typography variant="body2" color="white">
                                                    {element.Price}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" color="primary" onClick={() => deleteRow(element._id)}>
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
    // }
}

export default AllProduct