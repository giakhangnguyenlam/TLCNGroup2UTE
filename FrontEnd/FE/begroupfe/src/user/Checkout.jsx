import React, { useEffect, useState } from "react"
import { IoLocationSharp } from "react-icons/io5"
import { useGlobalContext } from "../context"
import Paypal from "./Paypal"
import axios from "axios"
import { useHistory } from "react-router"
import { BsHouse } from "react-icons/bs"
import Popup from "../ultis/Popup"
import "../assets/css/cart.css"

function Checkout() {
  const jwt = localStorage.getItem("jwt")
  const userId = localStorage.getItem("id")
  const name = localStorage.getItem("name")
  const phone = localStorage.getItem("phone")
  const address = localStorage.getItem("address")
  const cart = JSON.parse(localStorage.getItem(`cart${userId}`))
  const [height, setHeight] = useState(0)
  const {
    loading,
    setLoading,
    orderData,
    raise,
    setRaise,
    sumCheckout,
    voucher,
  } = useGlobalContext()
  const [checkout, setCheckout] = useState({ type: false, card: false })
  const history = useHistory()

  const handleCheckout = async () => {
    if (checkout.type) {
      setRaise({
        header: "Thông báo",
        content:
          "Vui lòng nhấn vào Thanh toán bằng paypal và tiến hành thanh toán",
        color: "#cf000fcc",
      })
    } else {
      setLoading(true)
      try {
        let res = await axios({
          method: "post",
          url: "https://tlcngroup2be.herokuapp.com/user/order",
          data: orderData,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        if (res.status === 201) {
          try {
            const resp = await axios({
              method: "delete",
              url: `https://utesharecode.herokuapp.com/items/sharecode/${cart[0][0].shareCode}`,
            })
            if (resp.status === 200) {
              const listProdId = orderData.listProducts.toString()
              localStorage.setItem("recProdId", listProdId)
              setRaise({
                header: "Đặt hàng",
                content: "Đặt hàng thành công",
                color: "#009944cc",
              })
              localStorage.removeItem(`cart${userId}`)
              // setLoading(false)
              history.push("/")
            }
          } catch (error) {
            setRaise({
              header: "Đặt hàng",
              content: "Có lỗi xảy ra, mời bạn liên hệ với bộ phận hỗ trợ!",
              color: "#cf000fcc",
            })
            setLoading(false)
          }
        }
      } catch (error) {
        setRaise({
          header: "Đặt hàng",
          content: "Một hoặc vài sản phẩm bạn muốn mua hiện đã hết hàng!",
          color: "#cf000fcc",
        })
        setLoading(false)
      }
    }
  }

  const callVnpay = async (
    amount,
    orderType,
    orderDescription,
    bankCode,
    language
  ) => {
    setLoading(true)
    try {
      const res = await axios({
        method: "post",
        url: "https://utevnpay.herokuapp.com/order/create_payment_url",
        data: { amount, orderType, orderDescription, bankCode, language },
      })
      if (res.status === 200) {
        setLoading(false)
        console.log(res)
      }
    } catch (error) {
      setLoading(false)
      console.log("in checkOut vnpay", error)
    }
  }

  useEffect(() => {
    if (orderData.length === 0) {
      history.push("/cart")
    }

    document.documentElement.scrollTop = 0
  }, [])

  useEffect(() => {
    let body = document.body,
      html = document.documentElement

    setHeight(
      Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      )
    )
  }, [checkout])

  return (
    <div className='container'>
      <div className='grid'>
        <div className='grid__row' style={{ paddingTop: "14px" }}>
          <div className='grid__colum-12'>
            <div className='beautiful'></div>
            <div className='cart__section--head'>
              <div className='cart__section-header'>
                <IoLocationSharp style={{ marginRight: "6px" }} />
                Địa Chỉ Nhận Hàng
              </div>
              <div className='cart__section-body'>
                {`${name} ${phone}`}
                <span>{address}</span>
              </div>
            </div>
            <div className='cart__body'>
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
              </div>
              {cart
                ? cart.map((item, ind) => {
                    return (
                      <React.Fragment key={ind}>
                        <div className='cart-store-title' key={ind + 1}>
                          <BsHouse />
                          <div className='cart-store__name'>
                            {item[0]?.storeName}
                          </div>
                        </div>

                        {item.map((ele, index) => {
                          return (
                            <div
                              className='cart__body-wrap'
                              key={`${ind + 1}${index}`}
                            >
                              <div
                                className='cart__header-item'
                                style={{ width: "30%" }}
                              >
                                <div className='cart__body-item'>
                                  <div
                                    className='cart__img'
                                    style={{
                                      backgroundImage: `url(${ele.image})`,
                                    }}
                                  ></div>
                                  <div className='cart__item-name'>
                                    <p>{ele.name}</p>
                                  </div>
                                </div>
                              </div>

                              <div
                                className='cart__header-item'
                                style={{ width: "20%" }}
                              >
                                {ele.description}
                              </div>
                              <div
                                className='cart__header-item'
                                style={{ width: "13%" }}
                              >
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(ele.price)}
                              </div>
                              <div
                                className='cart__header-item'
                                style={{ width: "14%" }}
                              >
                                <div
                                  className='amount__choose'
                                  style={{
                                    margin: "0",
                                    justifyContent: "center",
                                  }}
                                >
                                  <div
                                    className='amount__item amount__input'
                                    style={{ border: "none" }}
                                  >
                                    {ele.amount}
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
                                }).format(ele.price * ele.amount)}
                              </div>
                            </div>
                          )
                        })}
                      </React.Fragment>
                    )
                  })
                : ""}
            </div>
            <div
              className='cart__section'
              style={{
                width: "100%",
                backgroundColor: "#fafdff",
                marginTop: "-10px",
              }}
            >
              <div className='cart__section-wrap'>
                <div className='cart__section-item'>
                  Phí giao hàng của bạn là:{" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(30000)}
                </div>
                {voucher.length
                  ? voucher.map((item, index) =>
                      Object.keys(item).length && item.discount ? (
                        <div
                          className='cart__section-item'
                          style={{ color: "#dc143c", fontSize: "18px" }}
                          key={index}
                        >
                          {cart[index][0]?.storeName}: -{" "}
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.discount)}
                        </div>
                      ) : (
                        ""
                      )
                    )
                  : ""}
                <div className='cart__section-item'>
                  Tổng cộng:{" "}
                  <span>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(sumCheckout + 30000)}
                  </span>
                </div>
              </div>
            </div>
            <div className='cart__body cart__body--white'>
              <div className='cart__payment-method'>
                <div className='cart__payment-method-title'>
                  Phương thức thanh toán
                </div>
                <div className='cart__payment-method-option'>
                  <div
                    className={
                      checkout.type
                        ? "cart__payment-item"
                        : "cart__payment-item--selected"
                    }
                    onClick={() => setCheckout({ type: false, card: false })}
                  >
                    Thanh toán khi nhận hàng
                  </div>
                  <div
                    className={
                      checkout.type
                        ? "cart__payment-item--selected"
                        : "cart__payment-item"
                    }
                    onClick={() => setCheckout({ ...checkout, type: true })}
                  >
                    Thẻ tín dụng/ghi nợ
                  </div>
                </div>
              </div>
              {checkout.type ? (
                <div
                  className='cart__payment-desc'
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div
                    className='cart__payment-desc-item'
                    style={{ width: "200px" }}
                  >
                    Thanh toán bằng thẻ:
                  </div>

                  {checkout.card ? (
                    <Paypal
                      value={((sumCheckout + 30000) / 23000).toFixed(1)}
                      code={cart[0][0].shareCode}
                      cart={`cart${userId}`}
                    />
                  ) : (
                    <div
                      className='cart__payment-item'
                      onClick={() => setCheckout({ ...checkout, card: true })}
                    >
                      Thanh toán bằng paypal
                    </div>
                  )}
                  {/* <div
                    className='cart__payment-item'
                    onClick={() =>
                      callVnpay(
                        sumCheckout + 30000,
                        "fashion",
                        "Thanh toan don hang",
                        "",
                        "vn"
                      )
                    }
                  >
                    <img src={window.location.origin + "/vnpay.svg"} alt='' />
                  </div> */}
                </div>
              ) : (
                <div className='cart__payment-desc'>
                  <div
                    className='cart__payment-desc-item'
                    style={{ width: "200px" }}
                  >
                    Thanh toán khi nhận hàng
                  </div>
                  <div className='cart__payment-desc-item'>
                    Shipper sẽ gửi hàng đến địa chỉ bạn đã đăng ký và bạn sẽ trả
                    tiền cho shipper.
                  </div>
                </div>
              )}
            </div>
            <div
              className='cart__section'
              style={{ backgroundColor: "#fbfeff" }}
            >
              <div className='cart__section-break'>
                <div className='cart__section-col --right'>
                  <div>Tổng tiền hàng</div>
                  {voucher.length
                    ? voucher.map((item, index) =>
                        Object.keys(item).length && item.discount ? (
                          <div
                            style={{ color: "#dc143c", fontSize: "18px" }}
                            key={index}
                          >
                            {cart[index][0]?.storeName}:
                          </div>
                        ) : (
                          ""
                        )
                      )
                    : ""}
                  <div>Phí vận chuyển</div>
                  <div>Tổng thanh toán</div>
                </div>
                <div className='cart__section-col --left'>
                  <div>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(sumCheckout)}
                  </div>
                  {voucher.length
                    ? voucher.map((item, index) =>
                        Object.keys(item).length && item.discount ? (
                          <div
                            style={{ color: "#dc143c", fontSize: "18px" }}
                            key={index}
                          >
                            -{" "}
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(item.discount)}
                          </div>
                        ) : (
                          ""
                        )
                      )
                    : ""}
                  <div>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(30000)}
                  </div>
                  <div className='price'>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(sumCheckout + 30000)}
                  </div>
                </div>
              </div>
            </div>
            <div
              className='cart__footer'
              style={{
                flexDirection: "unset",
                justifyContent: "space-between",
              }}
            >
              <div className='cart__footer-warn'>
                Nhấn "đặt hàng" đồng nghĩa với việc bạn tuân theo điều khoản của
                shop.
              </div>
              <div
                className={`btn btn--primary btn-enhance ${
                  checkout.type && "cart__btn--disable"
                }`}
                style={{ fontSize: "1.6rem", width: "250px" }}
                onClick={handleCheckout}
              >
                Đặt hàng
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <div
          className='modal__overlay'
          style={{ zIndex: "101", top: "0", height }}
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

export default Checkout
