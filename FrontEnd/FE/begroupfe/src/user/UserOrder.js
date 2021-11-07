import axios from "axios"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"

function UserOrder() {
  const jwt = localStorage.getItem("jwt")
  const userid = localStorage.getItem("id")
  const name = localStorage.getItem("name")
  const history = useHistory()

  const [orderList, setOrderList] = useState()

  const handleRedirect = (page) => {
    history.push(`/user/${page}`)
  }

  const fetchData = async () => {
    try {
      let res = await axios({
        method: "get",
        url: `https://tlcngroup2be.herokuapp.com/user/orderhistory/${userid}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 200) {
        setOrderList(res.data)
      }
    } catch (error) {}
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='container'>
      <div className='grid'>
        <div className='grid__row contain'>
          <div className='grid__colum-2'>
            <nav className='category'>
              <h3
                className='category__heading'
                style={{ lineHeight: "2.2rem", padding: "10px 0" }}
              >
                Xin chào, {name}
              </h3>
              <ul className='category-list'>
                <h4
                  className='category-list__heading'
                  onClick={() => handleRedirect("account/profile")}
                >
                  Tài khoản
                </h4>
                <li className='category-item'>
                  <div
                    onClick={() => handleRedirect("account/profile")}
                    className='category-item__link'
                  >
                    Hồ sơ người dùng
                  </div>
                </li>
                <li className='category-item'>
                  <div
                    onClick={() => handleRedirect("account/password")}
                    className='category-item__link'
                  >
                    Quản lý mật khẩu
                  </div>
                </li>
                <h4
                  className='category-list__heading category-list__heading--active'
                  onClick={() => handleRedirect("order")}
                >
                  Đơn mua
                </h4>
              </ul>
            </nav>
          </div>

          <div className='grid__colum-10'>
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
                      Lịch sử mua hàng
                    </h4>
                  </div>

                  <div className='order__nav'>
                    <div className='order__nav-item' style={{ width: "20%" }}>
                      Mã đơn hàng
                    </div>
                    <div className='order__nav-item'>Ngày mua</div>
                    <div className='order__nav-item'>Tổng tiền</div>
                    <div
                      className='order__nav-item'
                      style={{ width: "30%", textAlign: "center" }}
                    >
                      Trạng thái đơn hàng
                    </div>
                  </div>
                  {orderList ? (
                    orderList.map((item) => {
                      const {
                        id,
                        orderDate,
                        total,
                        orderStatus,
                        paymentStatus,
                      } = item
                      return (
                        <div className='order__body' key={id}>
                          <div
                            className='order__nav-item order__id'
                            style={{ width: "20%" }}
                            onClick={() => handleRedirect(`order/${id}`)}
                          >
                            <span>{id}</span>
                          </div>
                          <div className='order__nav-item'>{orderDate}</div>
                          <div className='order__nav-item'>
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(total)}
                          </div>
                          <div
                            className='order__nav-item'
                            style={{ width: "30%", textAlign: "right" }}
                          >
                            {`${orderStatus}, ${paymentStatus}`}
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
                      Đang tải ...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserOrder
