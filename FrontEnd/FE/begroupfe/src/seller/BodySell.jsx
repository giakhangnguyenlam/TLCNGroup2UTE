import axios from "axios"
import React, { useState, useEffect } from "react"
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineShop,
  AiOutlineOrderedList,
  AiOutlineLineChart,
} from "react-icons/ai"
import { useHistory } from "react-router"
import { useGlobalContext } from "../context"
import Popup from "../ultis/Popup"
import Store from "./Store"

function BodySell() {
  const [height, setHeight] = useState()
  const [load, setLoad] = useState(false)
  const jwt = localStorage.getItem("jwt")
  const history = useHistory()
  const {
    isCreateStore,
    setIsCreateStore,
    isUpdateStore,
    setIsUpdateStore,
    idStoreUpdate,
    reloadSell,
    setReloadSell,
    setIsOrderDetail,
    setIsStatic,
    raise,
    setRaise,
  } = useGlobalContext()

  const handleClick = () => {
    setIsCreateStore(!isCreateStore)
  }
  const handleUpdateStore = () => {
    setIsUpdateStore(!isUpdateStore)
  }
  const handleDeleteStore = async () => {
    let del = window.confirm("Bạn muốn xóa cửa hàng này?")
    if (del) {
      setLoad(true)
      try {
        let res = await axios({
          method: "delete",
          url: `https://tlcngroup2be.herokuapp.com/seller/store/${idStoreUpdate.id}`,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        if (res.status === 200) {
          setReloadSell(!reloadSell)
          setLoad(false)
          setRaise({
            header: "Xóa cửa hàng",
            content: "Xóa thành công!",
            color: "#4bb534",
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  const handleDetailStore = () => {
    // setIdStoreUpdate(store)
    history.push(`/seller/store/${idStoreUpdate.id}`)
  }
  const handleOrderDetail = () => {
    setIsOrderDetail(true)
  }
  const handleStatic = () => {
    setIsStatic(true)
  }

  useEffect(() => {
    const body = document.body,
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
    if (localStorage.getItem("role") !== "ROLE_SELLER") {
      history.push("/")
    }
  }, [reloadSell])

  return (
    <div className='container'>
      <div className='grid'>
        <div className='grid__row contain'>
          <div className='grid__colum-2'>
            <nav style={{ marginBottom: "10px" }}>
              <div className='store-product__header-ctrl' onClick={handleClick}>
                <p>+ Thêm cửa hàng</p>
              </div>
              {idStoreUpdate && (
                <>
                  <div
                    className='store-product__header-ctrl'
                    onClick={handleUpdateStore}
                  >
                    <p>
                      <AiOutlineEdit className='store-item__icon' />
                      Sửa thông tin
                    </p>
                  </div>
                  <div
                    className='store-product__header-ctrl'
                    onClick={handleDeleteStore}
                  >
                    <p>
                      <AiOutlineDelete className='store-item__icon' />
                      Xóa cửa hàng
                    </p>
                  </div>
                  <div
                    className='store-product__header-ctrl'
                    onClick={handleDetailStore}
                  >
                    <p>
                      <AiOutlineShop className='store-item__icon' />
                      Xem cửa hàng
                    </p>
                  </div>
                  <div
                    className='store-product__header-ctrl'
                    onClick={handleOrderDetail}
                  >
                    <p>
                      <AiOutlineOrderedList className='store-item__icon' />
                      Đơn hàng
                    </p>
                  </div>
                  <div
                    className='store-product__header-ctrl'
                    onClick={handleStatic}
                  >
                    <p>
                      <AiOutlineLineChart className='store-item__icon' />
                      Thống kê
                    </p>
                  </div>
                </>
              )}
            </nav>
          </div>

          <div className='grid__colum-10'>
            <Store item={10} />
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

export default BodySell
