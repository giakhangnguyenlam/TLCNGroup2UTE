import axios from "axios"
import React, { useEffect, useState, useRef } from "react"
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { BsArrowReturnRight } from "react-icons/bs"
import { useHistory } from "react-router"
import noCart from "../assets/img/blankCart.png"
import { useGlobalContext } from "../context"
import "../assets/css/cart.css"
import { createRef } from "react/cjs/react.production.min"

function CartPage() {
  const refContainer = useRef([])
  const userId = localStorage.getItem("id")
  const jwt = localStorage.getItem("jwt")
  const { isCartReady, setOrderData, cart, setIsCartUpdate, isCartUpdate } =
    useGlobalContext()
  const [load, setLoad] = useState(false)
  const [height, setHeight] = useState(0)
  const [code, setCode] = useState("")
  const [reload, setReload] = useState(false)
  const history = useHistory()
  const amount = []
  let sum = 0

  if (userId && cart.length) {
    cart.forEach((element) => {
      sum += element.price * element.amount
    })
  }

  // const debounce = (callback, wait) => {
  //   let timeoutId = null
  //   return (...args) => {
  //     window.clearTimeout(timeoutId)
  //     timeoutId = window.setTimeout(() => {
  //       callback.apply(null, args)
  //     }, wait)
  //   }
  // }

  const handleChange = (e, index) => {
    console.log(refContainer.current[index].value)
    refContainer.current[index].value = e.target.value
  }

  const handleInput = (id, index) => {
    const newQuan = refContainer.current[index].value
    if (/^[0-9]*$/.test(newQuan)) {
      // changeAmount(id, newQuan)
    }
  }

  const handleDelete = async (id) => {
    const del = window.confirm("Bạn muốn xóa sản phẩm chứ?")
    if (del) {
      setLoad(true)
      try {
        const res = await axios({
          method: "DELETE",
          url: `https://cnpmmbe.herokuapp.com/item/${id}`,
        })
        if (res.status === 200) {
          setIsCartUpdate(!isCartUpdate)
          setLoad(false)
        }
      } catch (error) {}
    }
    // setReloadSell(!reloadSell)
  }
  const changeAmount = async (id, amount) => {
    setLoad(true)
    try {
      const res = await axios({
        method: "put",
        url: `https://cnpmmbe.herokuapp.com/item/${id}`,
        data: {
          amount,
        },
      })
      if (res.status === 200) {
        setIsCartUpdate(!isCartUpdate)
        setLoad(false)
      }
    } catch (error) {}
  }
  // const changeAmountAfterStop = useCallback(debounce(changeAmount, 300), [])
  // const reFetchCart = async () => {
  //   setCartReady(false)
  //   try {
  //     let res = await axios({
  //       method: "get",
  //       url: `https://cnpmmbe.herokuapp.com/item/iduser/${userId}`,
  //       headers: {
  //         Authorization: `Bearer ${jwt}`,
  //       },
  //     })
  //     if (res.status === 200 && Array.isArray(res.data)) {
  //       const tempCart = []
  //       res.data.forEach(async (item) =>
  //         (await item.idUser) == userId
  //           ? tempCart.unshift(item)
  //           : tempCart.push(item)
  //       )
  //       setCart(tempCart)
  //       setCartReady(true)
  //     }
  //     // else {
  //     //   console.log(res.data, res.status)
  //     //   setCart([])
  //     // }
  //   } catch (error) {
  //     console.log("cart", error)
  //   }
  // }

  const handleGetCart = async () => {
    setLoad(true)
    try {
      const res = await axios({
        method: "PUT",
        url: `https://utesharecode.herokuapp.com/item/iduser/${userId}/sharecode/${code}`,
      })
      if (res.status === 200) {
        setIsCartUpdate(!isCartUpdate)
        setLoad(false)
      }
    } catch (error) {}
  }

  const handleCheckout = async () => {
    const data = {
      userId: Number(userId),
      total: sum,
      listProducts: [],
      listQuantities: [],
      listDescription: [],
      listProductNames: [],
      listPrices: [],
    }
    cart.forEach((item) => {
      data.listProducts.push(item.idProduct)
      data.listQuantities.push(item.amount)
      data.listDescription.push(item.description)
      data.listProductNames.push(item.name)
      data.listPrices.push(item.price)
    })
    setOrderData(data)
    history.push("/checkout")
  }

  const createRefC = async (cart) => {
    refContainer.current = cart.map(
      (element, i) => refContainer.current[i] ?? createRef()
    )
    cart.map((item, index) => (refContainer.current[index].value = item.amount))
  }

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
    if (userId === null) {
      history.push("/")
    }
  }, [])

  useEffect(() => {
    if (cart.length !== 0 && isCartReady) {
      setCode(cart[0].shareCode)
      createRefC(cart)
      setReload(true)
      // console.log(refContainer)
    } else {
      setReload(false)
    }
  }, [cart, isCartReady])

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
              {reload ? (
                cart.map((item, index) => {
                  amount[item.id] = item.amount
                  return (
                    <div
                      className={`cart__body-wrap ${
                        userId == item.idUser ? "" : "cart__body-wrap--disable"
                      }`}
                      key={item.idProduct + item.amount + index}
                    >
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
                            onClick={() =>
                              changeAmount(
                                item.id,
                                item.amount - 1 <= 0 ? 1 : item.amount - 1
                              )
                            }
                          >
                            <AiOutlineMinus />
                          </div>
                          <input
                            type='text'
                            className='amount__item amount__input'
                            ref={refContainer.current[index]}
                            value={refContainer.current[index].value}
                            onChange={(e) => handleChange(e, index)}
                            onBlur={() => handleInput(item.id, index)}
                          />
                          <div
                            className='amount__item'
                            onClick={() =>
                              changeAmount(item.id, item.amount + 1)
                            }
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
                        }).format(item.price * item.amount)}
                      </div>
                      <div className='cart__header-item'>
                        <AiOutlineDelete
                          className='cart__icon'
                          onClick={() => handleDelete(item.id)}
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
                  <div className='item__text'>
                    Giỏ hàng của bạn còn trống {console.log("cart", cart)}
                  </div>
                </div>
              )}
            </div>
            {reload ? (
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
            {reload ? (
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
