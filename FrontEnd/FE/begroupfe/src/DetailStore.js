import React, { useState, useEffect, useRef } from "react"
import { useGlobalContext } from "./context"
import ModalDetail from "./ModalDetail"
import axios from "axios"
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineInfoCircle,
} from "react-icons/ai"

function DetailStore() {
  const jwt = localStorage.getItem("jwt")
  const ref = useRef(null)
  const wFit = window.screen.availWidth * 0.8
  const hFit = window.screen.availHeight * 0.835
  const end = (hFit - 158) * 0.008 > 10 ? "10px" : (hFit - 158) * 0.008
  console.log(
    hFit,
    hFit - 158,
    (hFit - 158) * 0.92,
    (hFit - 158) * 0.08,
    (hFit - 158) * 0.008 > 10 ? "10px" : (hFit - 158) * 0.008
  )
  const {
    setIsDetailStore,
    idStoreUpdate,
    setIsDetailCreate,
    reloadDetailStore,
    setReloadDetailStore,
    setIdStoreProd,
    setCateStoreProd,
    setIsDetailUpdate,
    setIsDetailInfo,
    setCateClo,
    setCateSho,
    setCateAcc,
  } = useGlobalContext()
  const [productList, setProductList] = useState([])
  const fetchData = () => {
    axios({
      method: "get",
      url: `https://tlcngroup2be.herokuapp.com/seller/product/store/${idStoreUpdate}`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }).then((res) => setProductList(res.data))
  }

  useEffect(() => {
    fetchData()
  }, [reloadDetailStore])

  const handleUpdateProd = (id) => {
    setIsDetailUpdate(true)
    setIdStoreProd(id)
  }
  const handleDeleteProd = async (id) => {
    try {
      let res = await axios({
        method: "delete",
        url: `https://tlcngroup2be.herokuapp.com/seller/product/${id}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 200) {
        setReloadDetailStore(!reloadDetailStore)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleInfo = async (id, category) => {
    setCateStoreProd(category)
    if (category === 1) {
      try {
        let res = await axios({
          method: "GET",
          url: `https://tlcngroup2be.herokuapp.com/product/categoryclothes/${id}`,
          responseType: "json",
        })
        if (res.status === 200) {
          const {
            type,
            brand,
            origin,
            size,
            color,
            material,
            gender,
            productId,
          } = await res.data
          setCateClo({
            type,
            brand,
            origin,
            size,
            color,
            material,
            gender,
            productId,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (category === 2) {
      try {
        let res = await axios({
          method: "GET",
          url: `https://tlcngroup2be.herokuapp.com/product/categoryshoes/${id}`,
          responseType: "json",
        })
        if (res.status === 200) {
          const {
            style,
            sole,
            height,
            weight,
            warranty,
            origin,
            size,
            color,
            material,
            gender,
            productId,
          } = await res.data
          setCateSho({
            style,
            sole,
            height,
            weight,
            warranty,
            origin,
            size,
            color,
            material,
            gender,
            productId,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (category === 3) {
      try {
        let res = await axios({
          method: "GET",
          url: `https://tlcngroup2be.herokuapp.com/product/categoryaccessories/${id}`,
          responseType: "json",
        })
        if (res.status === 200) {
          const { type, brand, origin, color, material, productId } =
            await res.data
          setCateAcc({
            type,
            brand,
            origin,
            color,
            material,
            productId,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }

    setIsDetailInfo(true)
  }

  return (
    <>
      <div className='modal'>
        <div
          className='modal__overlay'
          onClick={() => setIsDetailStore(false)}
        ></div>
        <div className='modal__body'>
          <div className='auth-form' style={{ width: wFit, height: hFit }}>
            <div className='auth-form__container'>
              <div
                className='auth-form__header'
                style={{ flexDirection: "column" }}
                ref={ref}
              >
                <h3 className='store-product__heading'>Sản phẩm của tôi</h3>
                <div
                  className='store-product__header-add'
                  onClick={() => setIsDetailCreate(true)}
                >
                  <p>+ Thêm sản phẩm</p>
                </div>
                <div className='store-product__header-nav'>
                  <div className='w60x store-product__header-nav-item '>
                    Stt
                  </div>
                  <div className='store-product__header-nav-item w300x'>
                    Hình ảnh
                  </div>
                  <div className='store-product__header-nav-item w250x'>
                    Tên
                  </div>
                  <div className='store-product__header-nav-item w10'>
                    Số lượng
                  </div>
                  <div className='store-product__header-nav-item w10'>Giá</div>
                  <div
                    className='store-product__header-nav-item'
                    style={{ flexGrow: "1" }}
                  >
                    Mô tả
                  </div>
                  <div className='store-product__header-nav-item w10'>
                    <AiOutlineEdit />
                    <AiOutlineDelete />
                    <AiOutlineInfoCircle />
                  </div>
                </div>
              </div>

              <div
                className='store-product__body'
                style={{ height: (hFit - 158) * 0.92 }}
              >
                {productList.map((product, index) => {
                  const {
                    id,
                    category,
                    name,
                    quantity,
                    price,
                    description,
                    image,
                  } = product
                  return (
                    <div className='store-product__body-item ' key={id}>
                      <div className='store-item store-item__number'>
                        {index + 1}
                      </div>
                      <div className='store-item w300x'>
                        <div
                          className='store-item__img'
                          style={{ backgroundImage: `url(${image})` }}
                        ></div>
                      </div>
                      <div className='store-item store-item__name'>{name}</div>
                      <div className='store-item store-item__amount'>
                        {" "}
                        {quantity}
                      </div>
                      <div className='store-item store-item__price'>
                        {price}đ
                      </div>
                      <div className='store-item store-item__desc'>
                        {description}
                      </div>
                      <div className=' store-item' style={{ border: "none" }}>
                        <AiOutlineEdit
                          className='store-item__icon'
                          onClick={() => handleUpdateProd(id)}
                        />
                        <AiOutlineDelete
                          className='store-item__icon'
                          onClick={() => handleDeleteProd(id)}
                        />
                        <AiOutlineInfoCircle
                          className='store-item__icon'
                          onClick={() => handleInfo(id, category)}
                        />
                      </div>
                    </div>
                  )
                })}
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
                  onClick={() => setIsDetailStore(false)}
                >
                  <i className='fas fa-undo' style={{ fontSize: "1.6rem" }}></i>
                  TRỞ LẠI
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalDetail />
    </>
  )
}

export default DetailStore
