import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Pet from '../../Image/pet8.png';
import { getCurrentUser } from "../Auth/Services/AuthService";
import MainMenu from '../Main';
import HeaderMain from '../Header';
import BoxSeller from './BoxSeller';
import './Shop.css'
import HeaderLinkShop from './HeaderLinkShop';
export default function Utility() {
    const [Data, SetData] = useState([])
    const deleteRow = (_id) => {
        axios.delete(`http://localhost:9000/api/seller/${_id}`)
        window.location.reload(false)
    }
    useEffect(() => {
        axios.get('http://localhost:9000/api/seller').then((res) => {
            SetData(res.data)
        })
    })
    console.log(Data)
    const Collectible = Data.filter((element) => {
        return element.Collectibles === false
      })
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
                                {Collectible.map((element) => (
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
}
