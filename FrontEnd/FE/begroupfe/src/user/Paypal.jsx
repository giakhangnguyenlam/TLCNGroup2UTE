import axios from "axios"
import React, { useEffect, useRef } from "react"
import { useHistory } from "react-router"
import { useGlobalContext } from "../context"

function Paypal({ value, code, cart }) {
  const paypal = useRef()
  const history = useHistory()
  const { orderData, setLoading, setRaise } = useGlobalContext()

  const handleCheckout = async () => {
    setLoading(true)
    const jwt = localStorage.getItem("jwt")

    try {
      let res = await axios({
        method: "post",
        url: "https://tlcngroup2be.herokuapp.com/user/orderwithpaypal",
        data: orderData,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 201) {
        try {
          const resp = await axios({
            method: "delete",
            url: `https://utesharecode.herokuapp.com/items/sharecode/${code}`,
          })
          if (resp.status === 200) {
            const listProdId = orderData.listProducts.toString()
            localStorage.setItem("recProdId", listProdId)
            history.push("/")
            localStorage.removeItem(cart)
            setLoading(false)
          }
        } catch (error) {
          setRaise({
            header: "Đặt hàng",
            content: "Có lỗi xảy ra, mời bạn liên hệ với bộ phận hỗ trợ!",
            color: "#cf000fcc",
          })
          console.log(error)
          setLoading(false)
        }
      }
    } catch (error) {
      setLoading(false)
      setRaise({
        header: "Đặt hàng",
        content: "Một hoặc vài sản phẩm bạn muốn mua hiện đã hết hàng!",
        color: "#cf000fcc",
      })
      console.log(error)
    }
  }

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value,
                },
              },
            ],
          })
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture()
          handleCheckout()
          return order
        },
        onError: (err) => console.log(err),
      })
      .render(paypal.current)
  }, [])

  return <div ref={paypal} style={{ height: "120px" }}></div>
}

export default Paypal
