import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Pet from '../../Image/pet8.png';
import axios from 'axios';
import './Order.css'
function Collectibles() {
  const [ListArt, setListArt] = useState([])

  useEffect(() => {
    axios.get('http://localhost:9000/api/seller').then(res => setListArt(res.data))
  }, [])

console.log(ListArt)
  return (
    <div>
      <div className="container">
        {ListArt.map((element) => (
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
                  {element.ProductTitle}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Buy now
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
      <div className="container">
        {ListArt.map((element) => (
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
              <Button size="small" color="primary">
                Buy now
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Collectibles
