import React from 'react'
import { Link, useLocation } from "react-router-dom";
import './Shop.css'
function HeaderLinkShop() {
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/")
    return (
        <div className='header_link_shop'>
            <Link className='link' to="/Your_shop/">
                <div className={splitLocation[2] ==="" ? "activeShop" : ""}>
                    <h5>Walk</h5>
                </div>
            </Link>
            <Link className='link' to="/Your_shop/ALL_PRODUCTS">
                <div className={splitLocation[2] === "ALL_PRODUCTS" ? "activeShop" : ""}>
                    <h5>ALL PRODUCTS</h5>
                </div>
            </Link>
            <Link className='link' to="/Your_shop/T_Shirt">
                <div className={splitLocation[2] === "T_Shirt" ? "activeShop" : ""}>
                    <h5>T-Shirt</h5>
                </div>
            </Link>
            <Link className='link' to="/Your_shop/Create_Item">
                <div className={splitLocation[2] === "Create_Item" ? "activeShop" : ""}>
                    <h5>Create Item</h5>
                </div>
            </Link>
        </div>
    )
}

export default HeaderLinkShop