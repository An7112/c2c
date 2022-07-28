import React, { useEffect, useState } from 'react'
import HeaderMain from '../Header'
import MainMenu from '../Main'
import BoxSeller from '../UserShop/BoxSeller'
import axios from 'axios'
import { useParams } from "react-router-dom"
import './Pay.css'
import Countdown from "react-countdown";
import buyerAva from '../../Image/pet8.png'
import calculateCountdownFromNow from "./utils";
const countdownDate = "2022-07-28 22:00";
function Payment() {
    const [DataPay, setDataPay] = useState([])
    const { _id } = useParams();
    useEffect(() => {
        axios.get('http://localhost:9000/api/seller/' + _id).then(res => setDataPay(res.data))
    })
    console.log(DataPay)
    const PriceDo = DataPay.Price * 145653
    const [
        {
          expired,
          values: { days, hours, minutes, seconds }
        },
        setResult
      ] = useState(() => calculateCountdownFromNow(countdownDate));
    
      useEffect(() => {
        if (expired) return undefined;
        const intervalId = setInterval(
          () => setResult(calculateCountdownFromNow(countdownDate)),
          1000
        );
        return () => {
          clearInterval(intervalId);
        };
      }, [expired]);

    return (
        <div>
            <MainMenu />
            <div className="home_content">
                <HeaderMain />
                <div className='shop_content'>
                    <div className='box_detail'>
                        <div className='box_img'>
                            <img src={DataPay.ProductImg} alt="" />
                            <div className='box_img_left'>
                                <div className='detail_text'>
                                    <i class='bx bxl-sketch'></i>
                                    <h3>{DataPay.ProductName}</h3>
                                </div>
                                <div className='detail_text'>
                                    <i class='bx bxl-sketch'></i>
                                    <h5>{DataPay.ProductTitle}</h5>
                                </div>
                                <div className='detail_text'>
                                    <i class='bx bxl-sketch'></i>
                                    <h5>{DataPay.ProductDetail}</h5>
                                </div>
                                <button>View Shop</button>
                                <div className='box_text'>
                                    <h5>42K +</h5>
                                    <p>Interested users</p>
                                </div>
                                <div className='box_text'>
                                    <h5>42K +</h5>
                                    <p>Interested users</p>
                                </div>
                                <div className='box_text'>
                                    <h5>42K +</h5>
                                    <p>Interested users</p>
                                </div>
                            </div>
                            <div className='box_img_right'>
                                <div className='box_img_right_detail'>
                                    <p>Price Item</p>
                                    <h3>{DataPay.Price} ETH</h3>
                                    <h5>= {PriceDo} $</h5>
                                </div>
                                <div className='box_img_right_detail borderEdge'>
                                    <p>flash sale ends later</p>
                                    <h5> {expired ? "The End!" : `${days}d ${hours}h ${minutes}m ${seconds}s`}</h5>
                                </div>
                                <div className='box_img_right_detail buttonBuy'>
                                    <button>Buy now</button>
                                </div>
                            </div>
                        </div>
                        <div className='box_comment'>
                            <div className='header_review'>
                               <h5>US PRODUCT REVIEW </h5>
                                <i class='bx bx-pencil'></i>
                            </div>
                            <div className='box_review'>
                                <div className='buyer_box'>
                                    <div className='avatar_buyer'>
                                        <img src={buyerAva} alt=""/>
                                    </div>
                                    <div className='name_buyer'>
                                        <h5>nguyenthanhan</h5>
                                    </div>
                                </div>
                                <div className='comment_box'>
                                    <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                                </div>
                            </div>
                            <div className='box_review'>
                                <div className='buyer_box'>
                                    <div className='avatar_buyer'>
                                        <img src={buyerAva} alt=""/>
                                    </div>
                                    <div className='name_buyer'>
                                        <h5>nguyenthanhan</h5>
                                    </div>
                                </div>
                                <div className='comment_box'>
                                    <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                                </div>
                            </div>
                            <div className='box_review'>
                                <div className='buyer_box'>
                                    <div className='avatar_buyer'>
                                        <img src={buyerAva} alt=""/>
                                    </div>
                                    <div className='name_buyer'>
                                        <h5>nguyenthanhan</h5>
                                    </div>
                                </div>
                                <div className='comment_box'>
                                    <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment