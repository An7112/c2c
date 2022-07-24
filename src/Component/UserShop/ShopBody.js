import React, { Component } from 'react'
import HeaderMain from '../Header'
import AllProduct from './AllProduct'
import BoxSeller from './BoxSeller'
import { Link, useLocation } from "react-router-dom";
import CreateProduct from './CreateProduct'
import './Shop.css'
import HeaderLinkShop from './HeaderLinkShop';
function ShopBody() {
  return (
    <div className="home_content">
      <HeaderMain />
      <div className='shop_content'>
        <BoxSeller />
        <HeaderLinkShop />
        <div className='Product_Created'>
          <h1>Walk</h1>
        </div>
      </div>
    </div>
  )
}

export default ShopBody