import React from "react"
import asus from "../assets/img/tuf.jpg"
import { AiOutlineShoppingCart } from "react-icons/ai"
function HeaderCart() {
  return (
    <div className='header__cart'>
      <div className='header__cart-wrap'>
        <AiOutlineShoppingCart className='header__cart-icon' />
        <span className='header__cart-notice'>3</span>

        <div className='header__cart-list'>
          <img
            src='./assets/img/blankCart.png'
            alt=''
            className='header__cart-no-cart-img'
          />
          <span className='header__cart-no-cart-msg'>Chưa có sản phẩm</span>

          <h4 className='header__cart-heading'>Sản phẩm đã thêm</h4>

          <ul className='header__cart-list-item'>
            <li className='header__cart-item'>
              <img src={asus} alt='' className='header__cart-item-img' />
              <div className='header__cart-item-info'>
                <div className='header__cart-item-head'>
                  <h5 className='header__cart-item-name'>Asus tuf 2021</h5>
                  <div className='header__cart-item-wrap'>
                    <span className='header__cart-item-price'>2.000.000đ</span>
                    <span className='header__cart-item-multi'>x</span>
                    <span className='header__cart-item-quant'>1</span>
                  </div>
                </div>
                <div className='header__cart-item-body'>
                  <span className='header__cart-item-description'>
                    Phân loại: Máy tính
                  </span>
                  <span className='header__cart-item-remove'>Xóa</span>
                </div>
              </div>
            </li>
            <li className='header__cart-item'>
              <img src={asus} alt='' className='header__cart-item-img' />
              <div className='header__cart-item-info'>
                <div className='header__cart-item-head'>
                  <h5 className='header__cart-item-name'>Asus tuf 2021</h5>
                  <div className='header__cart-item-wrap'>
                    <span className='header__cart-item-price'>2.000.000đ</span>
                    <span className='header__cart-item-multi'>x</span>
                    <span className='header__cart-item-quant'>1</span>
                  </div>
                </div>
                <div className='header__cart-item-body'>
                  <span className='header__cart-item-description'>
                    Phân loại: Máy tính
                  </span>
                  <span className='header__cart-item-remove'>Xóa</span>
                </div>
              </div>
            </li>
            <li className='header__cart-item'>
              <img src={asus} alt='' className='header__cart-item-img' />
              <div className='header__cart-item-info'>
                <div className='header__cart-item-head'>
                  <h5 className='header__cart-item-name'>Asus tuf 2021</h5>
                  <div className='header__cart-item-wrap'>
                    <span className='header__cart-item-price'>2.000.000đ</span>
                    <span className='header__cart-item-multi'>x</span>
                    <span className='header__cart-item-quant'>1</span>
                  </div>
                </div>
                <div className='header__cart-item-body'>
                  <span className='header__cart-item-description'>
                    Phân loại: Máy tính
                  </span>
                  <span className='header__cart-item-remove'>Xóa</span>
                </div>
              </div>
            </li>
          </ul>

          <a href='' className='header__cart-view btn btn--primary'>
            <span>Xem giỏ hàng</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default HeaderCart
