import React, { Component } from 'react'
import HeaderMain from '../Header'
import MainMenu from '../Main'
import BoxSeller from './BoxSeller'
import HeaderLinkShop from './HeaderLinkShop'

export class TShirt extends Component {
  render() {
    return (
        <div>
            <MainMenu/>
        <div className="home_content">
        <HeaderMain />
        <div className='shop_content'>
          <BoxSeller />
          <HeaderLinkShop />
          <div className='Product_Created'>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default TShirt