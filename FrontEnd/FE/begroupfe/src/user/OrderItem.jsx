import axios from "axios"
import React, { useEffect, useState } from "react"
import { useGlobalContext } from "../context"
import "../assets/css/cart.css"

function OrderItem({ orderId }) {
  const jwt = localStorage.getItem("jwt")
  const { setIsComment } = useGlobalContext()

  const [orderInfo, setOrderInfo] = useState()

  const handleCmt = (prodId) => {
    setIsComment(true)
    localStorage.setItem("prodId", prodId)
  }

  const fetchData = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `https://tlcngroup2be.herokuapp.com/user/orderdetailhistory/${orderId}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 200) {
        setOrderInfo(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='product'>
      <div className='grid__row'>
        <div
          className='auth-form__container'
          style={{
            width: "100%",
            backgroundColor: "var(--white-color)",
            paddingBottom: "10px",
            minHeight: "500px",
          }}
        >
          <div
            className='auth-form__header'
            style={{
              borderBottom: "1px solid #c3c3c3",
              margin: "4px 0",
            }}
          >
            <h4
              className='auth-form__heading'
              style={{
                margin: "0",
                padding: "10px 0",
                fontSize: "1.8rem",
                lineHeight: "2.2rem",
              }}
            >
              Các sản phẩm của đơn {orderId}
            </h4>
          </div>

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
            {orderInfo ? (
              orderInfo.length ? (
                orderInfo.map((item, index) => {
                  return (
                    <div className='cart__body-wrap' key={index}>
                      <div
                        className='cart__header-item'
                        style={{ width: "30%" }}
                      >
                        <div className='cart__body-item'>
                          <div
                            className='cart__img'
                            style={{
                              backgroundImage: `url(${item.productImage})`,
                            }}
                          ></div>
                          <div className='cart__item-name'>
                            <p>{item.productName}</p>
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
                        {item.quantity}
                      </div>
                      <div
                        className='cart__header-item cart__total'
                        style={{ width: "13%" }}
                      >
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.price * item.quantity)}
                      </div>
                      <div className='cart__header-item'>
                        <p
                          className='cart__icon'
                          style={{ fontSize: "14px" }}
                          onClick={() => handleCmt(item.productId)}
                        >
                          Nhận xét
                        </p>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div
                  className='order__body'
                  style={{
                    width: "100%",
                    height: "378px",
                    fontSize: "24px",
                    borderBottom: "none",
                    justifyContent: "center",
                  }}
                >
                  Không có sản phẩm.
                </div>
              )
            ) : (
              <div
                className='order__body'
                style={{
                  width: "100%",
                  height: "378px",
                  fontSize: "24px",
                  borderBottom: "none",
                  justifyContent: "center",
                }}
              >
                Đang tải ...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderItem
