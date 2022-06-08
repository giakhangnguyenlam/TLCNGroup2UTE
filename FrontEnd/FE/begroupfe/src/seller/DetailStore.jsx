import React, { useEffect, useState } from "react"
import { useGlobalContext } from "../context"
import StoreItem from "./DetalStore/StoreItem"
import Popup from "../ultis/Popup"
import {
  AiOutlineEdit,
  AiOutlineShop,
  AiOutlineDelete,
  AiOutlineRollback,
  AiOutlineInfoCircle,
} from "react-icons/ai"
import { RiCoupon3Line } from "react-icons/ri"
import axios from "axios"
import { useParams } from "react-router-dom"
import ModalDetailDiscount from "./DetalStore/ModalDetailDiscount"

function DetailStore() {
  const { storeId } = useParams()
  const [height, setHeight] = useState()
  const [load, setLoad] = useState()
  const jwt = localStorage.getItem("jwt")
  const {
    idStoreProd,
    isDetailDiscount,
    setIdStoreUpdate,
    setIsDetailCreate,
    reloadDetailStore,
    setReloadDetailStore,
    setCateStoreProd,
    setIsDetailUpdate,
    setIsDetailInfo,
    setIsDetailDiscount,
    setCateClo,
    setCateSho,
    setCateAcc,
    raise,
    setIdStoreProd,
    inactiveProd,
    setInactiveProd,
  } = useGlobalContext()

  const controlPage = (control) => {
    switch (control) {
      case "create":
        setIdStoreUpdate({ id: storeId })
        setIsDetailCreate(true)
        break
      case "restore":
        setInactiveProd(true)
        break
      case "update":
        setIsDetailUpdate(true)
        break
      case "discount":
        setIsDetailDiscount(true)
        break
      case "back":
        setIsDetailDiscount(false)
        break
      default:
        break
    }
  }

  const handleDeleteProd = async () => {
    let del = window.confirm("Bạn muốn xóa sản phẩm này?")
    if (del) {
      setLoad(true)
      try {
        let res = await axios({
          method: "delete",
          url: `https://tlcngroup2be.herokuapp.com/seller/product/${idStoreProd.id}/category/${idStoreProd.category}`,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        if (res.status === 200) {
          setIdStoreProd(null)
          setReloadDetailStore(!reloadDetailStore)
          setLoad(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  const handleInfo = async () => {
    setCateStoreProd(idStoreProd.category)
    if (idStoreProd.category === 1) {
      setLoad(true)
      try {
        let res = await axios({
          method: "GET",
          url: `https://tlcngroup2be.herokuapp.com/product/categoryclothes/${idStoreProd.id}`,
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
          setLoad(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (idStoreProd.category === 2) {
      setLoad(true)
      try {
        let res = await axios({
          method: "GET",
          url: `https://tlcngroup2be.herokuapp.com/product/categoryshoes/${idStoreProd.id}`,
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
          setLoad(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (idStoreProd.category === 3) {
      try {
        setLoad(true)
        let res = await axios({
          method: "GET",
          url: `https://tlcngroup2be.herokuapp.com/product/categoryaccessories/${idStoreProd.id}`,
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
          setLoad(false)
        }
      } catch (error) {
        console.log(error)
      }
    }

    setIsDetailInfo(true)
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
  }, [])

  return (
    <div className='container'>
      <div className='grid'>
        {isDetailDiscount ? (
          <>
            <div
              className='store-product__header-ctrl'
              style={{ marginTop: "10px", display: "inline-flex" }}
            >
              <p onClick={() => controlPage("back")}>
                <AiOutlineRollback className='store-item__icon' />
                Đổi sản phẩm
              </p>
            </div>
            <ModalDetailDiscount setLoad={setLoad} />
          </>
        ) : (
          <div className='grid__row contain'>
            <div className='grid__colum-2'>
              {/* {isDetailDiscount ? (
              <nav className='category' style={{ marginBottom: "10px" }}>
                <div className='store-product__header-add' onClick={handleBack}>
                  <p>
                    <AiOutlineRollback className='store-item__icon' />
                    Trở về
                  </p>
                </div>
              </nav>
            ) : ( */}
              <nav style={{ marginBottom: "10px" }}>
                {inactiveProd ? (
                  <div
                    className='store-product__header-ctrl'
                    onClick={() => setInactiveProd(false)}
                  >
                    <p>
                      <AiOutlineShop className='store-item__icon' />
                      Về trang chủ
                    </p>
                  </div>
                ) : (
                  <div
                    className='store-product__header-ctrl'
                    onClick={() => controlPage("create")}
                  >
                    <p>+ Thêm sản phẩm</p>
                  </div>
                )}
                <div
                  className='store-product__header-ctrl'
                  onClick={() => controlPage("restore")}
                >
                  <p style={{ fontSize: "1.4rem" }}>
                    <AiOutlineEdit className='store-item__icon' />
                    Khôi phục sản phẩm
                  </p>
                </div>
                {idStoreProd ? (
                  inactiveProd ? (
                    <React.Fragment>
                      <div
                        style={{
                          marginBottom: "10px",
                          height: "1px",
                          backgroundColor: "#999",
                        }}
                      ></div>
                      <div
                        className='store-product__header-ctrl'
                        onClick={() => controlPage("update")}
                      >
                        <p>
                          <AiOutlineEdit className='store-item__icon' />
                          Khôi phục
                        </p>
                      </div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <div
                        style={{
                          marginBottom: "10px",
                          height: "1px",
                          backgroundColor: "#999",
                        }}
                      ></div>
                      <div
                        className='store-product__header-ctrl'
                        onClick={() => controlPage("update")}
                      >
                        <p>
                          <AiOutlineEdit className='store-item__icon' />
                          Sửa thông tin
                        </p>
                      </div>
                      <div
                        className='store-product__header-ctrl'
                        onClick={handleDeleteProd}
                      >
                        <p>
                          <AiOutlineDelete className='store-item__icon' />
                          Xóa sản phẩm
                        </p>
                      </div>
                      <div
                        className='store-product__header-ctrl'
                        onClick={handleInfo}
                      >
                        <p>
                          <AiOutlineInfoCircle className='store-item__icon' />
                          Thông tin chi tiết
                        </p>
                      </div>
                      <div
                        className='store-product__header-ctrl'
                        onClick={() => controlPage("discount")}
                      >
                        <p>
                          <RiCoupon3Line className='store-item__icon' />
                          Mã giảm giá
                        </p>
                      </div>
                    </React.Fragment>
                  )
                ) : (
                  ""
                )}
              </nav>
            </div>

            <div className='grid__colum-10'>
              <StoreItem item={10} inactiveProd={inactiveProd} />
            </div>
          </div>
        )}
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

export default DetailStore
