import React from 'react'
import './Shop.css'
function BoxSeller() {
  return (
    <div className='box_seller'>
            <div className='box_like'>
              <div className='child_box_like'>
                <i class='bx bx-store-alt'></i>
                <h5>Product</h5>
              </div>
              <div className='child_box_like'>
              <i class='bx bx-user-plus'></i>
                <h5>Following</h5>
              </div>
              <div className='child_box_like'>
              <i class='bx bx-message-square-dots'></i>
                <h5>Chat Response Rate</h5>
              </div>
            </div>
            <div className='box_like'>
            <div className='child_box_like'>
            <i class='bx bx-group' ></i>
                <h5>Followers</h5>
              </div>
              <div className='child_box_like'>
              <i class='bx bx-star' ></i>
                <h5>Evaluate</h5>
              </div>
              <div className='child_box_like'>
              <i class='bx bx-user-check' ></i>
                <h5>Participation</h5>
              </div>
            </div>
            <div className='box_user_sell'>
              <div className='ava_shop_on'>
                  <div className='avatar_shop'></div>
                  <div className='name_on_shop'>
                    <h5>Nguyen Thanh An</h5>
                    <p>Online 2 minutes ago</p>
                  </div>
              </div>
              <div className='follow_chat'>
                <div className='fc_box'>
                <i class='bx bx-plus'></i>
                <h5>FOLLOW</h5>
                </div>
                <div className='fc_box'>
                <i class='bx bx-chat' ></i>
                <h5>CHAT</h5>
                </div>
              </div>
            </div>
          </div>
  )
}

export default BoxSeller