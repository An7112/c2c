import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Pet from '../../Image/pet8.png';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
function Utility(props) {
  const products = useSelector((state) => state.allReducer.products);
  const Util = products.filter((element) => {
    return element.Utility == true
  })
  const Data = Util.filter((element) => {
    if (props.SearchData === '') {
      return element;
    } else {
      return element.ProductName.toLowerCase().includes(props.SearchData)
    }
  })
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
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Utility