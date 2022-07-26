import React, { useEffect, useState } from 'react'
import HeaderMain from '../Header'
import MainMenu from '../Main'
import BoxSeller from '../UserShop/BoxSeller'
import axios from 'axios'
import { useParams } from "react-router-dom"
function Payment() {
    const [DataPay, setDataPay] = useState([])
    const {_id} = useParams();
    useEffect(() => {
        axios.get('http://localhost:9000/api/seller/' + _id).then(res => setDataPay(res.data))
    })
    console.log(DataPay)
    return (
        <div>
            <MainMenu />
            <div className="home_content">
                <HeaderMain />
                <div className='shop_content'>
                    <h3>{DataPay._id}</h3>
                </div>
            </div>
        </div>
    )
}

export default Payment