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
function Collectibles(props) {
  const [ListArt, setListArt] = useState([])

  useEffect(() => {
    axios.get('http://localhost:9000/api/seller').then(res => setListArt(res.data))
  }, [])
  const Data = ListArt.filter((element) => {
    if (props.SearchData === '') {
      return element;
    } else {
      return element.ProductName.toLowerCase().includes(props.SearchData)
    }
  })
  console.log(Data)
  return (
    <div>
      <div className="container">
        {Data.map((element) => (
          <Card key={element._id}>
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
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Collectibles
