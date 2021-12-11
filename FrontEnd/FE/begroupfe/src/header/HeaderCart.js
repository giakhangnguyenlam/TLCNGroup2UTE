import React, { useEffect } from "react"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { useHistory } from "react-router"
import blankCart from "../assets/img/blankCart.png"
import { useGlobalContext } from "../context"

function HeaderCart() {
  const userId = localStorage.getItem("id")
  const history = useHistory()
  const { reloadSell } = useGlobalContext()
  const cartInfo = JSON.parse(localStorage.getItem(`cart${userId}`))
  let max = 0
  if (cartInfo) {
    max = cartInfo.length > 4 ? 4 : cartInfo.length
  }

  const handleRedirect = () => {
    if (localStorage.getItem("role") === "ROLE_USER") {
      history.push("/cart")
    }
  }

  useEffect(() => {}, [reloadSell, cartInfo])
  return (
    <div className='header__cart'>
      <div className='header__cart-wrap'>
        <AiOutlineShoppingCart
          className='header__cart-icon'
          onClick={() => handleRedirect()}
        />
        {cartInfo && (
          <span className='header__cart-notice'>{cartInfo.length}</span>
        )}

        <div className={`header__cart-list ${cartInfo ? "" : "--no-cart"}`}>
          <img src={blankCart} alt='' className='header__cart-no-cart-img' />
          <span className='header__cart-no-cart-msg'>Chưa có sản phẩm</span>

          {cartInfo && (
            <h4 className='header__cart-heading'>Sản phẩm đã thêm</h4>
          )}

          {cartInfo && (
            <ul className='header__cart-list-item'>
              {cartInfo.slice(0, max).map((item, index) => {
                return (
                  <li className='header__cart-item' key={index}>
                    <img
                      src={item.image}
                      alt=''
                      className='header__cart-item-img'
                    />
                    <div className='header__cart-item-info'>
                      <div className='header__cart-item-head'>
                        <h5 className='header__cart-item-name'>{item.name}</h5>
                        <div className='header__cart-item-wrap'>
                          <span className='header__cart-item-price'>
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(item.price)}
                          </span>
                        </div>
                      </div>

                      <div className='header__cart-item-body'>
                        <span className='header__cart-item-description'>
                          {item.description}
                        </span>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}

          {cartInfo && (
            <div
              className='header__cart-view btn btn--primary'
              onClick={() => handleRedirect()}
            >
              <span>Xem giỏ hàng</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HeaderCart
