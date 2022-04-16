import axios from "axios"
import React, { useState, useEffect } from "react"
import {
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineRollback,
  AiOutlineOrderedList,
} from "react-icons/ai"
import { useGlobalContext } from "../context"
import Popup from "../ultis/Popup"
import { useHistory } from "react-router-dom"
import UserProfile from "./UserProfile"
import UserPass from "./UserPass"
import UserOrder from "./UserOrder"
import OrderItem from "./OrderItem"

function UserControl() {
  const urlParams = new URLSearchParams(window.location.search)
  const role = localStorage.getItem("role")
  const [load, setLoad] = useState(false)
  const { setAuth, raise } = useGlobalContext()
  const [height, setHeight] = useState(0)
  const [orderId, setOrderId] = useState()
  const [userPage, setUserPage] = useState(urlParams.get("state") || "profile")
  const history = useHistory()

  const handleChange = (page) => {
    setUserPage(page)
  }

  useEffect(() => {
    if (
      role !== "ROLE_USER" &&
      role !== "ROLE_SELLER" &&
      role !== "ROLE_SHIPPER"
    ) {
      setAuth("login")
      history.push("/user/auth")
    }
  }, [])

  return (
    <div className='container'>
      <div className='grid'>
        <div className='grid__row contain'>
          <div className='grid__colum-2'>
            <nav style={{ marginBottom: "10px" }}>
              <div
                className={`store-product__header-ctrl${
                  userPage === "profile" ? "--active" : ""
                }`}
                onClick={() => handleChange("profile")}
              >
                <p>
                  <AiOutlineUser className='store-item__icon' />
                  Hồ sơ
                </p>
              </div>
              <div
                className={`store-product__header-ctrl${
                  userPage === "security" ? "--active" : ""
                }`}
                onClick={() => handleChange("security")}
              >
                <p>
                  <AiOutlineLock className='store-item__icon' />
                  Mật khẩu
                </p>
              </div>
              <div
                className={`store-product__header-ctrl${
                  userPage.includes("order") ? "--active" : ""
                }`}
                onClick={() => handleChange("order")}
              >
                <p>
                  <AiOutlineOrderedList className='store-item__icon' />
                  Đơn hàng
                </p>
              </div>
              {userPage === "orderItem" && (
                <div
                  className='store-product__header-ctrl'
                  onClick={() => handleChange("order")}
                >
                  <p>
                    <AiOutlineRollback className='store-item__icon' />
                    Trở về
                  </p>
                </div>
              )}
            </nav>
          </div>

          <div className='grid__colum-10'>
            {userPage === "profile" && (
              <UserProfile setHeight={setHeight} setLoad={setLoad} />
            )}
            {userPage === "security" && (
              <UserPass setHeight={setHeight} setLoad={setLoad} />
            )}
            {userPage === "order" && (
              <UserOrder
                setHeight={setHeight}
                handleChange={handleChange}
                setOrderId={setOrderId}
              />
            )}
            {userPage === "orderItem" && <OrderItem orderId={orderId} />}
          </div>
        </div>
      </div>

      {load && (
        <div
          className='modal__overlay'
          style={{ zIndex: "5", top: "0", height }}
        >
          <div className='loading'>
            <div className='loading__one'></div>
            <div className='loading__two'></div>
            <div className='loading__three'></div>
          </div>
        </div>
      )}
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

export default UserControl
