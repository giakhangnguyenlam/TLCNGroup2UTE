import axios from "axios"
import React, { useEffect, useState } from "react"
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { BsArrowReturnRight } from "react-icons/bs"
import { useHistory } from "react-router"
import noCart from "../assets/img/blankCart.png"
import { useGlobalContext } from "../context"
import "../assets/css/cart.css"

function CartPage() {
  const userId = localStorage.getItem("id")
  const { isCartReady, setOrderData, reloadSell, setReloadSell } =
    useGlobalContext()
  let cart = JSON.parse(localStorage.getItem(`cart${userId}`))
  const [load, setLoad] = useState(false)
  const [height, setHeight] = useState(0)
  const [code, setCode] = useState("")
  const history = useHistory()
  let sum = 0

  if (userId && cart.length) {
    cart.forEach((element) => {
      sum += element.price * element.amount
    })
  }

  const handleChange = (e, id, index) => {
    const newQuan = e.target.value
    if (/^[0-9]*$/.test(newQuan)) {
      changeAmount(id, newQuan, index)
    }
  }

  const handleDelete = async (id, index) => {
    const del = window.confirm("Bạn muốn xóa sản phẩm chứ?")
    if (del) {
      setLoad(true)
      try {
        const res = await axios({
          method: "DELETE",
          url: `https://cnpmmbe.herokuapp.com/item/${id}`,
        })
        if (res.status === 200) {
          // setIsCartUpdate(!isCartUpdate)
          const newCart = cart.splice(index, 1)
          console.log(newCart)
          if (newCart.length === 0) {
            localStorage.removeItem(`cart${userId}`)
            setReloadSell(!reloadSell)
          } else {
            localStorage.setItem(`cart${userId}`, JSON.stringify(newCart))
            setReloadSell(!reloadSell)
          }
          setLoad(false)
        }
      } catch (error) {}
    }
  }
  const changeAmount = async (id, amount, index) => {
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
        // setIsCartUpdate(!isCartUpdate)

        cart[index].amount = amount
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
        // setIsCartUpdate(!isCartUpdate)
        localStorage.setItem(`cart${userId}`, JSON.stringify(res.status))
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
    }
  }, [isCartReady])

  useEffect(() => {}, [reloadSell])

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
              {cart ? (
                cart.map((item, index) => {
                  return (
                    <div
                      className={`cart__body-wrap ${
                        userId == item.idUser ? "" : "cart__body-wrap--disable"
                      }`}
                      key={index}
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
                                item.amount - 1 <= 0 ? 1 : item.amount - 1,
                                index
                              )
                            }
                          >
                            <AiOutlineMinus />
                          </div>
                          <input
                            type='text'
                            className='amount__item amount__input'
                            value={item.amount}
                            onChange={(e) => handleChange(e, item.id, index)}
                          />
                          <div
                            className='amount__item'
                            onClick={() =>
                              changeAmount(item.id, item.amount + 1, index)
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
                          onClick={() => handleDelete(item.id, index)}
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
