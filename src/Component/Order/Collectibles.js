import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Pet from '../../Image/pet8.png';
import axios from 'axios';
import './Order.css'
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../Auth/Services/AuthService';
import AllProduct from '../UserShop/AllProduct';
import { useSelector } from "react-redux";
function Collectibles(props) {

  const {onAdd} = props
  const products = useSelector((state) => state.allReducer.products);
  const Collectibles = products.filter((element) => {
    return element.Collectibles == true
  })
  const Data = Collectibles.filter((element) => {
    if (props.SearchData === '') {
      return element;
    } else {
      return element.ProductName.toLowerCase().includes(props.SearchData)
    }
  })
  // const [Cart, setCart] = useState([])
  // const AddCart = index => {
  //   setCart(Cart.concat(Data[index]))
  // }
  // const senData = () => {
  //   props.parentCallback(Cart)
  // }
  return (
    <div>
      <div className="container">
        {Data.map((element, index) => (
          <Card key={element._id}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={element.ProductImg}
                alt="green iguana"
              />
              <Link to={'/Your_shop/'+ element.IdSeller}>
              <div className='Box_Ava'>
                <img src={Pet} alt=""></img>
              </div>
              </Link>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" color="white">
                  {element.ProductName}  
                </Typography>
                <Typography variant="body2" color="white">
                {element.Price}$
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link to={'/Payment/' + element._id}>
                <Button size="small" color="primary">
                  Buy now
                </Button>
              </Link>
                <Button size="small" color="primary" onClick={() => onAdd(element)}>
                  Add to cart
                </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Collectibles
