import React, { useState, useEffect } from "react"
import { AiOutlineShoppingCart, AiOutlineCopy } from "react-icons/ai"
import { useHistory } from "react-router"
import blankCart from "../assets/img/blankCart.png"
import { useGlobalContext } from "../context"
import { CopyToClipboard } from "react-copy-to-clipboard"

function HeaderCart() {
  const history = useHistory()
  const { isCartReady, cart } = useGlobalContext()
  const [copied, setCopy] = useState(false)
  const [reload, setReload] = useState(false)
  const handleRedirect = () => {
    if (localStorage.getItem("role") === "ROLE_USER") {
      history.push("/cart")
    }
  }

  useEffect(() => {
    if (cart.length !== 0 && isCartReady) {
      setReload(true)
    } else {
      setReload(false)
    }
  }, [cart, isCartReady])

  return (
    <div className='header__cart'>
      <div className='header__cart-wrap'>
        <AiOutlineShoppingCart
          className='header__cart-icon'
          onClick={() => handleRedirect()}
        />
        {reload ? (
          <span className='header__cart-notice'>{cart.length}</span>
        ) : (
          ""
        )}

        <div className={`header__cart-list ${reload ? "" : "--no-cart"}`}>
          <img src={blankCart} alt='' className='header__cart-no-cart-img' />
          <span className='header__cart-no-cart-msg'>Chưa có sản phẩm</span>

          {reload ? (
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

          {reload ? (
            <ul className='header__cart-list-item'>
              {cart
                .slice(0, cart.length > 4 ? 4 : cart.length)
                .map((item, index) => {
                  return (
                    <li
                      className='header__cart-item'
                      key={item.idProduct + item.amount + index}
                    >
                      <img
                        src={item.image}
                        alt=''
                        className='header__cart-item-img'
                      />
                      <div className='header__cart-item-info'>
                        <div className='header__cart-item-head'>
                          <h5 className='header__cart-item-name'>
                            {item.name}
                          </h5>
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
          ) : (
            ""
          )}

          {reload ? (
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
