import axios from "axios"
import React, { useEffect, useState } from "react"
import { useGlobalContext } from "../context"
import Loading from "../ultis/Loading"
import Popup from "../ultis/Popup"

function OrderDetail() {
  const jwt = localStorage.getItem("jwt")
  const wFit = window.screen.availWidth * 0.8
  const hFit = window.screen.availHeight * 0.835
  const {
    setIsOrderDetail,
    idStoreUpdate,
    reloadSell,
    setReloadSell,
    loading,
    setLoading,
    raise,
    setRaise,
  } = useGlobalContext()
  const [screen, setScreen] = useState(false)
  const [orders, setOrders] = useState()
  let today = new Date()
  let dd = String(today.getDate()).padStart(2, "0")
  let mm = String(today.getMonth() + 1).padStart(2, "0")
  let yyyy = today.getFullYear()
  let hh = String(today.getHours()).padStart(2, "0")
  let min = String(today.getMinutes()).padStart(2, "0")
  let sec = String(today.getSeconds()).padStart(2, "0")

  today = `${yyyy}-${mm}-${dd} ${hh}:${min}:${sec}`
  const [date, newDate] = useState(today)

  const handleCheck = async (id) => {
    setLoading(true)
    try {
      let res = await axios({
        method: "put",
        url: `https://tlcngroup2be.herokuapp.com/seller/orderdetail/status/${id}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 200) {
        setLoading(false)
        setReloadSell(!reloadSell)
        setRaise({
          header: "Kiểm soát đơn hàng",
          content:
            "Xác nhận thành công, Sản phẩm của bạn sẽ được giao cho khách!",
          color: "#009944cc",
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchData = async () => {
    setScreen(false)
    setOrders(null)
    const id = window.location.pathname.split("/")[3] || -1
    let url = ""
    let dateUWant = new Date(date)
    let dateUHave = new Date(Date.now())
    if (dateUWant <= dateUHave) {
      if (
        dateUWant.getDate() === dateUHave.getDate() &&
        dateUWant.getMonth() === dateUHave.getMonth() &&
        dateUWant.getFullYear() === dateUHave.getFullYear()
      ) {
        url = `https://tlcngroup2be.herokuapp.com/seller/order/${id}`
      } else {
        let ndd = String(dateUWant.getDate()).padStart(2, "0")
        let nmm = String(dateUWant.getMonth() + 1).padStart(2, "0")
        let nyyyy = dateUWant.getFullYear()

        url = `https://tlcngroup2be.herokuapp.com/seller/order/${id}/datestatus/${ndd}-${nmm}-${nyyyy}`
      }
      console.log(url)
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
          setOrders(res.data.reverse())
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
    fetchData()
  }, [date, reloadSell])

  return (
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
                  value={date.split(" ")[0]}
                  onChange={(e) => newDate(`${e.target.value} 00:00:00`)}
                />
              </div>
              <div className='store-product__header-nav'>
                <div className='w60x store-product__header-nav-item w10'>
                  ID
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
                <div className='store-product__header-nav-item w250x'>
                  Trạng thái
                </div>
                <div className='store-product__header-nav-item w10'>
                  Thao tác
                </div>
              </div>
            </div>

            <div
              className='store-product__body'
              style={{ height: (hFit - 158) * 0.92 }}
            >
              {orders ? (
                orders.map((product, index) => {
                  const {
                    id,
                    productName,
                    orderId,
                    quantity,
                    description,
                    status,
                  } = product
                  return (
                    <div className='store-product__body-item ' key={index}>
                      <div
                        className='store-item store-item__number'
                        style={{ width: "10%" }}
                      >
                        {orderId}
                      </div>
                      <div
                        className='store-item store-item__name'
                        style={{ flexGrow: "1" }}
                      >
                        {productName}
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
                      <div className='store-item w250x'>{status}</div>
                      <div className='store-item' style={{ width: "8.5%" }}>
                        <div
                          className='store-item__btn'
                          onClick={() => handleCheck(id)}
                        >
                          OK
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
      {loading && <Loading />}
      {raise && (
        <Popup
          header={raise.header}
          content={raise.content}
          color={raise.color}
        />
      )}
    </div>
  )
}

export default OrderDetail
