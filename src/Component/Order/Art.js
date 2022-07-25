import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Pet from '../../Image/pet8.png';
import axios from 'axios';
import { useScroll } from 'react-use-gesture';
import { animated, useSpring } from 'react-spring';

const clamp = (value: number, clampAt: number = 30) => {
  if (value > 0) {
    return value > clampAt ? clampAt : value;
  } else {
    return value < -clampAt ? -clampAt : value;
  }
};
function Art() {
  const [style, set] = useSpring(() => ({
    transform: "perspective(500px) rotateY(0deg)"
  }))

  const bind = useScroll(event => {
    set({
      transform: `perspective(500px) rotateY(${
        event.scrolling ? clamp(event.delta[0]) : 0
      }deg)`
    });
  });

  const [ListArt, setListArt] = useState([])

  useEffect(() => {
    axios.get('http://localhost:9000/api/seller').then(res => setListArt(res.data))
  }, [])
  return (
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
  )
}

export default Art
