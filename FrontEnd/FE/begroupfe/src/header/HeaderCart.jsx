import React, { useState, useEffect } from "react"
import { AiOutlineShoppingCart, AiOutlineCopy } from "react-icons/ai"
import { useHistory } from "react-router"
import blankCart from "../assets/img/blankCart.png"
import { useGlobalContext } from "../context"
import { CopyToClipboard } from "react-copy-to-clipboard"

function HeaderCart() {
  const userId = localStorage.getItem("id")
  const history = useHistory()
  const { isCartReady, reloadSell } = useGlobalContext()
  const [copied, setCopy] = useState(false)
  let cart = JSON.parse(localStorage.getItem(`cart${userId}`))
  const handleRedirect = () => {
    if (localStorage.getItem("role") === "ROLE_USER") {
      history.push("/cart")
    }
  }
  let length = 0
  cart?.forEach((item) => item.forEach((ele) => length++))

  useEffect(() => {}, [isCartReady])

  useEffect(() => {}, [reloadSell])

  return (
    <div className='header__cart'>
      <div className='header__cart-wrap'>
        <AiOutlineShoppingCart
          className='header__cart-icon'
          onClick={() => handleRedirect()}
        />
        {cart ? <span className='header__cart-notice'>{length}</span> : ""}

        <div className={`header__cart-list ${cart ? "" : "--no-cart"}`}>
          <img src={blankCart} alt='' className='header__cart-no-cart-img' />
          <span className='header__cart-no-cart-msg'>Chưa có sản phẩm</span>

          {cart ? (
            <div className='header__cart-heading'>
              Sản phẩm đã thêm
              <div className='header__cart-heading-code'>
                Share Code: {cart[0].shareCode}
                <CopyToClipboard
                  text={cart[0].shareCode}
                  onCopy={() => setCopy(true)}
                >
                  <AiOutlineCopy className='cart__icon-copy' />
                </CopyToClipboard>
                {copied && <div style={{ color: "#4bb534" }}>copied!</div>}
              </div>
            </div>
          ) : (
            ""
          )}

          {cart ? (
            <ul className='header__cart-list-item'>
              {cart
                ? cart.map((item, ind) => {
                    return (
                      <React.Fragment key={ind}>
                        {item.map((ele, index) => {
                          return (
                            <li
                              className='header__cart-item'
                              key={`${ind + 1}${index}`}
                            >
                              <img
                                src={ele.image}
                                alt=''
                                className='header__cart-item-img'
                              />
                              <div className='header__cart-item-info'>
                                <div className='header__cart-item-head'>
                                  <h5 className='header__cart-item-name'>
                                    {ele.name}
                                  </h5>
                                  <div className='header__cart-item-wrap'>
                                    <span className='header__cart-item-price'>
                                      {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                      }).format(ele.price)}
                                    </span>
                                  </div>
                                </div>

                                <div className='header__cart-item-body'>
                                  <span className='header__cart-item-description'>
                                    {ele.description}
                                  </span>
                                </div>
                              </div>
                            </li>
                          )
                        })}
                      </React.Fragment>
                    )
                  })
                : ""}
            </ul>
          ) : (
            ""
          )}

          {cart ? (
            <div
              className='header__cart-view btn btn--primary'
              onClick={() => handleRedirect()}
            >
              <span>Xem giỏ hàng</span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  )
}

export default HeaderCart
