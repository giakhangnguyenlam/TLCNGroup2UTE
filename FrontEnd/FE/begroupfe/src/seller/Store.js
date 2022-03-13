import React, { useEffect, useState } from "react"
import { useGlobalContext } from "../context"
import StoreItem from "./DetalStore/StoreItem"
import Popup from "../ultis/Popup"
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineInfoCircle,
} from "react-icons/ai"
import axios from "axios"
import { useParams } from "react-router-dom"

function Store() {
  const { storeId } = useParams()
  const [height, setHeight] = useState()
  const [load, setLoad] = useState()
  const jwt = localStorage.getItem("jwt")
  const {
    idStoreProd,
    setIdStoreUpdate,
    setIsDetailCreate,
    reloadDetailStore,
    setReloadDetailStore,
    setCateStoreProd,
    setIsDetailUpdate,
    setIsDetailInfo,
    setCateClo,
    setCateSho,
    setCateAcc,
    raise,
    setIdStoreProd,
  } = useGlobalContext()

  const handleUpdateProd = () => {
    setIsDetailUpdate(true)
    // setIdStoreProd(prod)
  }
  const handleDeleteProd = async () => {
    let del = window.confirm("Delete?")
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

  const handleCreate = () => {
    setIdStoreUpdate({ id: storeId })
    setIsDetailCreate(true)
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
        <div className='grid__row contain'>
          <div className='grid__colum-2'>
            <nav className='category' style={{ marginBottom: "10px" }}>
              <div className='store-product__header-add' onClick={handleCreate}>
                <p>+ Thêm sản phẩm</p>
              </div>
              {idStoreProd && (
                <div
                  className='store-product__header-ctrl'
                  onClick={() => handleUpdateProd()}
                >
                  <p>
                    <AiOutlineEdit className='store-item__icon' />
                    Sửa thông tin
                  </p>
                </div>
              )}
              {idStoreProd && (
                <div
                  className='store-product__header-ctrl'
                  onClick={() => handleDeleteProd()}
                >
                  <p>
                    <AiOutlineDelete className='store-item__icon' />
                    Xóa sản phẩm
                  </p>
                </div>
              )}
              {idStoreProd && (
                <div
                  className='store-product__header-ctrl'
                  onClick={() => handleInfo()}
                >
                  <p>
                    <AiOutlineInfoCircle className='store-item__icon' />
                    Thông tin chi tiết
                  </p>
                </div>
              )}
            </nav>
          </div>

          <div className='grid__colum-10'>
            <StoreItem item={10} />
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

export default Store