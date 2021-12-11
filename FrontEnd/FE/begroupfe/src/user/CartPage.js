import axios from "axios"
import React, { useEffect } from "react"
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { useHistory } from "react-router"
import noCart from "../assets/img/blankCart.png"
import { useGlobalContext } from "../context"

function CartPage() {
  const userId = localStorage.getItem("id")
  const { reloadSell, setReloadSell, setOrderData } = useGlobalContext()
  const history = useHistory()
  const cartInfo = JSON.parse(localStorage.getItem(`cart${userId}`))
  let sum = 0
  if (userId && cartInfo) {
    cartInfo.forEach((element) => {
      sum += element.total
    })
  }

  const handlInput = (e, index) => {
    let newQuan = e.target.value
    if (/^[0-9]*$/.test(newQuan)) {
      cartInfo[index].quantity = newQuan < 0 ? 1 : newQuan
      cartInfo[index].total = newQuan * cartInfo[index].price
      localStorage.setItem(`cart${userId}`, JSON.stringify(cartInfo))
      setReloadSell(!reloadSell)
    }
  }

  const handleDelete = (index) => {
    let del = window.confirm("Bạn muốn xóa sản phẩm chứ?")
    if (del) {
      let newCart = cartInfo.filter((item, indexI) => {
        if (index !== indexI) {
          return item
        }
      })
      if (newCart.length === 0) {
        localStorage.removeItem(`cart${userId}`)
        setReloadSell(!reloadSell)
      } else {
        localStorage.setItem(`cart${userId}`, JSON.stringify(newCart))
        setReloadSell(!reloadSell)
      }
    }
  }

  const handleCheckout = async () => {
    let data = {
      userId: Number(userId),
      total: sum,
      listProducts: [],
      listQuantities: [],
      listDescription: [],
      listProductNames: [],
      listPrices: [],
    }
    cartInfo.map((item) => {
      data.listProducts.push(item.product)
      data.listQuantities.push(item.quantity)
      data.listDescription.push(item.description)
      data.listProductNames.push(item.name)
      data.listPrices.push(item.price)
    })
    setOrderData(data)
    history.push("/checkout")
  }

  useEffect(() => {
    if (userId === null) {
      history.push("/")
    }
  }, [reloadSell])

  return (
    <div className='container'>
      <div className='grid'>
        <div className='grid__row' style={{ paddingTop: "14px" }}>
          <div className='grid__colum-12'>
            <div className='cart__header'>
              <div className='cart__header-item cart__header-item--50'>
                Sản phẩm
              </div>
              <div className='cart__header-item' style={{ width: "13%" }}>
                Giá
              </div>
              <div className='cart__header-item' style={{ width: "14%" }}>
                Số lượng
              </div>
              <div className='cart__header-item' style={{ width: "13%" }}>
                Thành tiền
              </div>
              <div className='cart__header-item'>Thao tác</div>
            </div>
            <div className='cart__body'>
              {cartInfo ? (
                cartInfo.map((item, index) => {
                  return (
                    <div className='cart__body-wrap' key={index}>
                      <div
                        className='cart__header-item'
                        style={{ width: "30%" }}
                      >
                        <div className='cart__body-item'>
                          <div
                            className='cart__img'
                            style={{ backgroundImage: `url(${item.image})` }}
                          ></div>
                          <div className='cart__item-name'>
                            <p>{item.name}</p>
                          </div>
                        </div>
                      </div>

                      <div
                        className='cart__header-item'
                        style={{ width: "20%" }}
                      >
                        {item.description}
                      </div>
                      <div
                        className='cart__header-item'
                        style={{ width: "13%" }}
                      >
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.price)}
                      </div>
                      <div
                        className='cart__header-item'
                        style={{ width: "14%" }}
                      >
                        <div
                          className='amount__choose'
                          style={{ margin: "0", justifyContent: "center" }}
                        >
                          <div
                            className='amount__item'
                            onClick={() => {
                              cartInfo[index].quantity =
                                item.quantity - 1 < 1 ? 1 : item.quantity - 1
                              cartInfo[index].total =
                                cartInfo[index].quantity * cartInfo[index].price
                              localStorage.setItem(
                                `cart${userId}`,
                                JSON.stringify(cartInfo)
                              )
                              setReloadSell(!reloadSell)
                            }}
                          >
                            <AiOutlineMinus />
                          </div>
                          <input
                            type='text'
                            className='amount__item amount__input'
                            value={item.quantity}
                            onChange={(e) => handlInput(e, index)}
                          />
                          <div
                            className='amount__item'
                            onClick={() => {
                              cartInfo[index].quantity = item.quantity + 1
                              cartInfo[index].total =
                                cartInfo[index].quantity * cartInfo[index].price
                              localStorage.setItem(
                                `cart${userId}`,
                                JSON.stringify(cartInfo)
                              )
                              setReloadSell(!reloadSell)
                            }}
                          >
                            <AiOutlinePlus />
                          </div>
                        </div>
                      </div>
                      <div
                        className='cart__header-item cart__total'
                        style={{ width: "13%" }}
                      >
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.total)}
                      </div>
                      <div className='cart__header-item'>
                        <AiOutlineDelete
                          className='cart__icon'
                          onClick={() => handleDelete(index)}
                        />
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className='comment__body-item--null'>
                  <div
                    className='item__icon'
                    style={{ width: "180px", height: "180px" }}
                  >
                    <img
                      src={noCart}
                      alt='no comment'
                      style={{ width: "180px" }}
                    />
                  </div>
                  <div className='item__text'>Giỏ hàng của bạn còn trống</div>
                </div>
              )}
            </div>
            {cartInfo ? (
              <div className='cart__footer'>
                <div
                  className='btn btn--primary btn-enhance'
                  style={{ fontSize: "1.6rem" }}
                  onClick={() => handleCheckout()}
                >
                  Thanh toán
                </div>
                <div className='cart__finalPrice'>
                  Tổng thanh toán:
                  <p>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(sum)}
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
