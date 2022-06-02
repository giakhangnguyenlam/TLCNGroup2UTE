import axios from "axios"
import React, { useEffect, useState } from "react"
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { BsArrowReturnRight } from "react-icons/bs"
import { HiOutlineTicket } from "react-icons/hi"
import { BsHouse } from "react-icons/bs"
import { useHistory } from "react-router"
import noCart from "../assets/img/blankCart.png"
import { useGlobalContext } from "../context"
import "../assets/css/cart.css"

function CartPage() {
  const userId = localStorage.getItem("id")
  const {
    isCartReady,
    setOrderData,
    reloadSell,
    setReloadSell,
    setIsCartUpdate,
    isCartUpdate,
    sumCheckout,
    setSum,
    voucher,
    setVoucher,
  } = useGlobalContext()
  let cart = JSON.parse(localStorage.getItem(`cart${userId}`))
  const [load, setLoad] = useState(false)
  const [height, setHeight] = useState(0)
  const [code, setCode] = useState("")
  const [voucherPerStore, setVoucherActive] = useState(null)
  const history = useHistory()
  let sum = 0

  if (userId && cart) {
    cart.forEach((element) =>
      element.forEach((item) => (sum += item.price * item.amount))
    )
  }

  const handleChange = (e, id, index, ind) => {
    const newQuan = e.target.value
    if (/^[0-9]*$/.test(newQuan)) {
      changeAmount(id, newQuan, index, ind)
    }
  }

  const handleDelete = async (id, index, ind) => {
    const del = window.confirm("Bạn muốn xóa sản phẩm chứ?")
    if (del) {
      setLoad(true)
      try {
        const res = await axios({
          method: "DELETE",
          url: `https://utesharecode.herokuapp.com/item/${id}`,
        })
        if (res.status === 200) {
          // setIsCartUpdate(!isCartUpdate)
          cart[ind].splice(index, 1)
          if (cart[ind].length === 0) {
            cart.splice(ind, 1)
            if (cart.length === 0) {
              localStorage.removeItem(`cart${userId}`)
            } else {
              localStorage.setItem(`cart${userId}`, JSON.stringify(cart))
            }
            setReloadSell(!reloadSell)
          } else {
            localStorage.setItem(`cart${userId}`, JSON.stringify(cart))
            setReloadSell(!reloadSell)
          }
          setLoad(false)
        }
      } catch (error) {}
    }
  }
  const changeAmount = async (id, amount, index, ind) => {
    setLoad(true)
    try {
      const res = await axios({
        method: "put",
        url: `https://utesharecode.herokuapp.com/item/${id}`,
        data: {
          amount,
        },
      })
      if (res.status === 200) {
        // setIsCartUpdate(!isCartUpdate)

        cart[ind][index].amount = amount
        localStorage.setItem(`cart${userId}`, JSON.stringify(cart))
        setLoad(false)
        setReloadSell(!reloadSell)
      }
    } catch (error) {}
  }

  const handleGetCart = async () => {
    setLoad(true)
    try {
      const res = await axios({
        method: "PUT",
        url: `https://utesharecode.herokuapp.com/item/iduser/${userId}/sharecode/${code}`,
      })
      if (res.status === 200) {
        setIsCartUpdate(!isCartUpdate)
        localStorage.removeItem(`cart${userId}`)
        // localStorage.setItem(`cart${userId}`, JSON.stringify(res.data))
        setLoad(false)
      }
    } catch (error) {}
  }

  const handleCheckout = async () => {
    // setSum(sum)
    const data = {
      userId: Number(userId),
      total: sum,
      listProducts: [],
      listQuantities: [],
      listDescription: [],
      listProductNames: [],
      listPrices: [],
    }
    cart.forEach((ele) =>
      ele.forEach((item) => {
        data.listProducts.push(item.idProduct)
        data.listQuantities.push(item.amount)
        data.listDescription.push(item.description)
        data.listProductNames.push(item.name)
        data.listPrices.push(item.price)
      })
    )
    setOrderData(data)
    history.push("/checkout")
  }

  const convertToMoney = (data) => {
    const money = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(data)
    return money
  }

  useEffect(() => {
    const getVoucherPerStore = async () => {
      let voucherActive = []
      for (let item of cart) {
        try {
          const res = await axios({
            method: "get",
            url: `https://tlcngroup2be.herokuapp.com/voucher/storeid/${item[0]?.storeId}`,
          })
          if (res.status === 200) {
            voucherActive.push(res.data)
          }
        } catch (error) {
          console.log("voucher per store", error)
        }
      }
      setVoucherActive(voucherActive)
      const voucherTemp = voucherActive.map((item, index) => {
        let total = 0
        cart[index]?.forEach((ele) => {
          total += ele.amount * ele.price
        })
        if (item.length) {
          const temp = item.map((item) => item.bearerDiscount)
          temp.push(total)
          temp.sort((a, b) => a - b)
          const indexOfTotal = temp.lastIndexOf(total)
          console.log(temp, indexOfTotal)
          if (indexOfTotal <= 0) {
            const discount = item.filter(
              (item) => item.bearerDiscount === temp[indexOfTotal + 1]
            )
            if (sumCheckout === 0) {
              setSum(sum)
            }
            return {
              discount: 0,
              range: temp[1] - temp[0],
              disFeature: discount[0].discount,
            }
          }

          const discount = item.filter(
            (item) => item.bearerDiscount === temp[indexOfTotal - 1]
          )
          if (indexOfTotal === temp.length - 1) {
            const tempSum = sum - discount[0].discount <= 0 || 1
            setSum(tempSum)
            return { discount: discount[0].discount }
          }

          const disFeature = item.filter(
            (item) => item.bearerDiscount === temp[indexOfTotal + 1]
          )
          const tempSum = sum - discount[0].discount <= 0 || 1
          setSum(tempSum)
          return {
            discount: discount[0].discount,
            range: temp[indexOfTotal + 1] - temp[indexOfTotal],
            disFeature: disFeature[0].discount,
          }
        }
        return { discount: 0, range: 0 }
      })
      setVoucher(voucherTemp)
    }
    getVoucherPerStore()
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
    if (userId === null) {
      history.push("/")
    }
  }, [reloadSell])

  useEffect(() => {
    if (cart && cart.length !== 0 && isCartReady) {
      setCode(cart[0][0].shareCode)
    }
  }, [isCartReady])

  useEffect(() => {}, [reloadSell])
  useEffect(() => {})

  return (
    <div className='container'>
      <div className='grid'>
        <div className='grid__row' style={{ paddingTop: "14px" }}>
          <div className='grid__colum-12'>
            <div className='cart__header' key={1}>
              <div
                className='cart__header-item cart__header-item--50'
                key={"cart__header-name"}
              >
                Sản phẩm
              </div>
              <div
                className='cart__header-item'
                style={{ width: "13%" }}
                key={"cart__header-price"}
              >
                Giá
              </div>
              <div
                className='cart__header-item'
                style={{ width: "14%" }}
                key={"cart__header-amount"}
              >
                Số lượng
              </div>
              <div
                className='cart__header-item'
                style={{ width: "13%" }}
                key={"cart__header-total"}
              >
                Thành tiền
              </div>
              <div className='cart__header-item' key={"cart__header-ctrl"}>
                Thao tác
              </div>
            </div>
            <div
              className='cart__body'
              style={cart ? {} : { background: "#fff" }}
            >
              {cart ? (
                cart.map((item, ind) => {
                  return (
                    <React.Fragment key={ind}>
                      <div className='cart-store-title' key={ind + 1}>
                        <BsHouse />
                        <div className='cart-store__name'>
                          {item[0]?.storeName}
                        </div>
                      </div>

                      <div className='cart-store-title' key={ind + 2}>
                        <div className='cart-store__voucher'>
                          {voucher.length
                            ? voucher[ind].discount
                              ? voucher[ind].range
                                ? `Đã giảm ${convertToMoney(
                                    voucher[ind].discount
                                  )}, hãy mua thêm ${convertToMoney(
                                    voucher[ind].range
                                  )} để được giảm giá ${convertToMoney(
                                    voucher[ind].disFeature
                                  )}`
                                : `Đã giảm ${convertToMoney(
                                    voucher[ind].discount
                                  )}`
                              : voucher[ind].range
                              ? `Bạn hãy mua thêm ${
                                  voucher[ind].range
                                } để được giảm giá ${convertToMoney(
                                  voucher[ind].disFeature
                                )}`
                              : "Hiện cửa hàng chưa có voucher"
                            : ""}
                        </div>
                      </div>

                      {voucherPerStore ? (
                        voucherPerStore[ind].length ? (
                          <div
                            className='cart-store-title'
                            key={ind + 3}
                            style={{ position: "relative" }}
                          >
                            <div className='cart-store__voucher'>
                              <HiOutlineTicket className='store-item__icon' />{" "}
                              voucher {">"}
                            </div>
                            <div className='cart-store__threshold'>
                              {voucherPerStore[ind].map(
                                (item, indexVoucher) => {
                                  return (
                                    <div
                                      className='cart-store__threshold-item'
                                      key={indexVoucher}
                                    >
                                      Giảm giá {convertToMoney(item.discount)}{" "}
                                      khi mua hàng trên{" "}
                                      {convertToMoney(item.bearerDiscount)}
                                    </div>
                                  )
                                }
                              )}
                            </div>
                          </div>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )}

                      {item.map((ele, index) => {
                        return (
                          <div
                            className={`cart__body-wrap ${
                              userId == ele.idUser
                                ? ""
                                : "cart__body-wrap--disable"
                            }`}
                            key={ind + 1 + "" + index}
                          >
                            <div
                              className='cart__header-item'
                              key={"cart__header-name" + index}
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
                              key={"cart__header-desc" + index}
                              style={{ width: "20%" }}
                            >
                              {ele.description}
                            </div>
                            <div
                              className='cart__header-item'
                              key={"cart__header-price" + index}
                              style={{ width: "13%" }}
                            >
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(ele.price)}
                            </div>
                            <div
                              className='cart__header-item'
                              key={"cart__header-amount" + index}
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
                                  className='amount__item'
                                  onClick={() =>
                                    changeAmount(
                                      ele.id,
                                      ele.amount - 1 <= 0 ? 1 : ele.amount - 1,
                                      index,
                                      ind
                                    )
                                  }
                                >
                                  <AiOutlineMinus />
                                </div>
                                <input
                                  type='text'
                                  className='amount__item amount__input'
                                  value={ele.amount}
                                  onChange={(e) =>
                                    handleChange(e, ele.id, index, ind)
                                  }
                                />
                                <div
                                  className='amount__item'
                                  onClick={() =>
                                    changeAmount(
                                      ele.id,
                                      ele.amount + 1,
                                      index,
                                      ind
                                    )
                                  }
                                >
                                  <AiOutlinePlus />
                                </div>
                              </div>
                            </div>
                            <div
                              className='cart__header-item cart__total'
                              key={"cart__header-total" + index}
                              style={{ width: "13%" }}
                            >
                              {convertToMoney(ele.price * ele.amount)}
                            </div>
                            <div
                              className='cart__header-item'
                              key={"cart__header-icon" + index}
                            >
                              <AiOutlineDelete
                                className='cart__icon'
                                onClick={() => handleDelete(ele.id, index, ind)}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </React.Fragment>
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
            {cart ? (
              <div className='cart__header-code-wrap'>
                <div className='cart__header-code-label'>
                  Nhập share code tại đây:
                </div>
                <input
                  type='text'
                  className='cart__header-code-input'
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyUp={(e) =>
                    e.key === "Enter" && code !== "" && handleGetCart()
                  }
                />
                <BsArrowReturnRight
                  className='cart__header-code-btn'
                  onClick={() => {
                    code !== "" && handleGetCart()
                  }}
                />
              </div>
            ) : (
              ""
            )}
            {cart ? (
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
                  <p>{convertToMoney(sumCheckout)}</p>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {load && (
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
    </div>
  )
}

export default CartPage
