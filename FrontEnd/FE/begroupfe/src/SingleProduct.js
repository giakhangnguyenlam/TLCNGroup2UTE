import axios from "axios"
import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { AiOutlineRight, AiOutlineDown } from "react-icons/ai"
import { FiTruck } from "react-icons/fi"
import { useGlobalContext } from "./context"

function SingleProduct() {
  const { id } = useParams()
  const { loading, setLoading } = useGlobalContext()
  const jwt = localStorage.getItem("jwt")
  const [prod, setProd] = useState({})
  const history = useHistory()
  const fetchData = async () => {
    setLoading(true)
    try {
      let res = await axios({
        method: "GET",
        url: `https://tlcngroup2be.herokuapp.com/seller/product/${id}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 200) {
        setProd(res.data)
        setLoading(false)
      }
    } catch (error) {}
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='container'>
      <div className='grid'>
        <div className='grid__row' style={{ paddingTop: "14px" }}>
          <div className='grid__colum-12'>
            <div
              className={`singleProd__breadcrum ${
                loading && "breadcrum--disable"
              }`}
            >
              <div
                className='singleProd__breadcrum-home'
                onClick={() => history.push("/")}
              >
                Trang chủ
              </div>
              <AiOutlineRight className='singleProd__breadcrum-divide' />
              <div className='singleProd__breadcrum-item'>
                {prod.category === 1
                  ? "Quần áo"
                  : prod.category === 2
                  ? "Giày"
                  : "Phụ kiện"}
              </div>
              <AiOutlineRight className='singleProd__breadcrum-divide' />
              <div className='singleProd__breadcrum-item'>{prod.name}</div>
            </div>

            <div className='singleProd__brief'>
              <div className='brief__image-wrap'>
                <div className='bried__image'>
                  <div
                    className='brief__image-item'
                    style={{ backgroundImage: `url(${prod.image})` }}
                  ></div>
                </div>
              </div>

              <div className='brief__product'>
                <div className='brief__product-wrap'>
                  <div className='brief__product-header'>
                    <span>{prod.name}</span>
                  </div>
                  <div className='brief__product-price'>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(prod.price)}
                  </div>

                  <div className='brief__product-shipping'>
                    <div className='brief__product-shipping-wrap'>
                      <div className='shipping-wrap'>
                        <label className='brief__product-label'>
                          Vận chuyển
                        </label>
                        <div className='shipping'>
                          <FiTruck
                            className='shipping__icon'
                            style={{ marginRight: "10px" }}
                          />
                          <div className='shipping__ship'>
                            <div className='shipping__item'>
                              <label
                                className='brief__product-label'
                                style={{ marginRight: "4px" }}
                              >
                                Vận chuyển tới
                              </label>
                              <div className='shipping__item-choose'>
                                <label style={{ fontSize: "1.4rem" }}>
                                  thủ đức
                                </label>
                                <AiOutlineDown
                                  className='shipping__icon'
                                  style={{ marginLeft: "4px" }}
                                />
                              </div>
                            </div>
                            <div className='shipping__item'>
                              <label
                                className='brief__product-label'
                                style={{ marginRight: "4px" }}
                              >
                                Phí Vận chuyển
                              </label>
                              <div className='shipping__item-choose'>
                                <label style={{ fontSize: "1.4rem" }}>
                                  0 đ
                                </label>
                                <AiOutlineDown
                                  className='shipping__icon'
                                  style={{ marginLeft: "4px" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='brief__product-amount'></div>

                  <div className='brief__product-controls'>
                    <div className='brief__product-btn btn'>
                      Thêm vào giỏ hàng
                    </div>
                    <div
                      className='btn btn--primary'
                      style={{ fontSize: "1.6rem" }}
                    >
                      Mua ngay
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct
