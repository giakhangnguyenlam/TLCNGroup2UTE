import axios from "axios"
import React, { useEffect, useState } from "react"
import { useGlobalContext } from "../context"

function OrderDetail() {
  const jwt = localStorage.getItem("jwt")
  const wFit = window.screen.availWidth * 0.8
  const hFit = window.screen.availHeight * 0.835
  const { setIsOrderDetail, idStoreUpdate } = useGlobalContext()
  const [screen, setScreen] = useState(false)
  const [orders, setOrders] = useState()
  let today = new Date()
  let dd = String(today.getDate()).padStart(2, "0")
  let mm = String(today.getMonth() + 1).padStart(2, "0")
  let yyyy = today.getFullYear()

  today = yyyy + "-" + mm + "-" + dd
  const [date, newDate] = useState(today)

  const fetchData = async () => {
    let url = ""
    let dateUWant = new Date(date)
    let dateUHave = new Date(Date.now())
    if (dateUWant <= dateUHave) {
      if (dateUWant === dateUHave) {
        url = `https://tlcngroup2be.herokuapp.com/seller/order/${idStoreUpdate.id}`
      } else {
        let ndd = String(dateUWant.getDate()).padStart(2, "0")
        let nmm = String(dateUWant.getMonth() + 1).padStart(2, "0")
        let nyyyy = dateUWant.getFullYear()

        url = `https://tlcngroup2be.herokuapp.com/seller/order/${idStoreUpdate.id}/date/${ndd}-${nmm}-${nyyyy}`
      }
      try {
        let res = await axios({
          method: "get",
          url,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        if (!res.data.length) {
          setOrders(null)
          setScreen(true)
        }
        if (res.status === 200 && res.data.length) {
          let orderList = []
          let list = res.data
          for await (const item of list) {
            let { productId, orderId, quantity, description } = item
            let result = await axios({
              method: "get",
              url: `https://tlcngroup2be.herokuapp.com/seller/product/${productId}`,
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            })
            if (result.status === 200) {
              const { image, name } = await result.data
              orderList.push({
                productId,
                image,
                name,
                orderId,
                quantity,
                description,
              })
            }
          }
          setOrders(orderList)
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      setOrders()
      setScreen(true)
    }
  }

  useEffect(() => {
    setScreen(false)
    fetchData()
  }, [date])

  return (
    <>
      <div className='modal'>
        <div
          className='modal__overlay'
          onClick={() => setIsOrderDetail(false)}
        ></div>
        <div className='modal__body'>
          <div className='auth-form' style={{ width: wFit, height: hFit }}>
            <div className='auth-form__container'>
              <div
                className='auth-form__header'
                style={{ flexDirection: "column" }}
              >
                <h3 className='store-product__heading'>Đơn hàng của tôi</h3>
                <div className='store-product__header-add'>
                  <label className='order__label'>Chọn ngày:</label>
                  <input
                    type='date'
                    className='order__date'
                    value={date}
                    onChange={(e) => newDate(e.target.value)}
                  />
                </div>
                <div className='store-product__header-nav'>
                  <div className='w60x store-product__header-nav-item w10'>
                    Mã đơn hàng
                  </div>
                  <div className='store-product__header-nav-item w250x'>
                    Hình ảnh
                  </div>
                  <div
                    className='store-product__header-nav-item'
                    style={{ flexGrow: "1" }}
                  >
                    Tên
                  </div>
                  <div className='store-product__header-nav-item w10'>
                    Số lượng
                  </div>
                  <div className='store-product__header-nav-item w300x'>
                    Mô tả
                  </div>
                </div>
              </div>

              <div
                className='store-product__body'
                style={{ height: (hFit - 158) * 0.92 }}
              >
                {orders ? (
                  orders.map((product, index) => {
                    const { image, name, orderId, quantity, description } =
                      product
                    return (
                      <div className='store-product__body-item ' key={index}>
                        <div
                          className='store-item store-item__number'
                          style={{ width: "10%" }}
                        >
                          {orderId}
                        </div>
                        <div className='store-item w250x'>
                          <div
                            className='store-item__img'
                            style={{ backgroundImage: `url(${image})` }}
                          ></div>
                        </div>
                        <div
                          className='store-item store-item__name'
                          style={{ flexGrow: "1" }}
                        >
                          {name}
                        </div>
                        <div className='store-item store-item__amount'>
                          {quantity}
                        </div>
                        <div
                          className='store-item store-item__desc w300x'
                          style={{ flexGrow: "unset" }}
                        >
                          <div className='store-item__desc-content'>
                            {description}
                          </div>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className='order__wait '>
                    <div className='order__wait-content'>
                      {screen ? "Không có sản phẩm" : "Loading..."}
                    </div>
                  </div>
                )}
              </div>

              <div
                className='auth-form__controls'
                style={{
                  justifyContent: "center",
                  marginTop: "0",
                  height: (hFit - 158) * 0.08,
                }}
              >
                <button
                  className='btn btn--normal auth-form__controls-back'
                  style={{
                    width: "100%",
                    height: (hFit - 158) * 0.07,
                    marginTop:
                      (hFit - 158) * 0.01 > 10 ? "10px" : (hFit - 158) * 0.01,
                  }}
                  onClick={() => setIsOrderDetail(false)}
                >
                  <i className='fas fa-undo' style={{ fontSize: "1.6rem" }}></i>
                  TRỞ LẠI
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderDetail
