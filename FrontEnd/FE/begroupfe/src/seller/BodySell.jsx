import axios from "axios"
import React, { useState, useEffect } from "react"
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineShop,
  AiOutlineOrderedList,
  AiOutlineLineChart,
} from "react-icons/ai"
import { HiOutlineTicket } from "react-icons/hi"
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
    setIsVoucher,
    raise,
    setRaise,
    inactiveTab,
    setInactiveTab,
  } = useGlobalContext()

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
            color: "#009944cc",
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const controlPage = (control) => {
    switch (control) {
      case "create":
        setIsCreateStore(!isCreateStore)
        break
      case "restore":
        setInactiveTab(true)
        break
      case "update":
        setIsUpdateStore(!isUpdateStore)
        break
      case "detail":
        history.push(`/seller/store/${idStoreUpdate.id}`)
        break
      case "order":
        setIsOrderDetail(true)
        break
      case "statistic":
        setIsStatic(true)
        break
      case "voucher":
        setIsVoucher(true)
        break
      default:
        break
    }
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
              {inactiveTab ? (
                <div
                  className='store-product__header-ctrl'
                  onClick={() => setInactiveTab(false)}
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
                  <p>+ Thêm cửa hàng</p>
                </div>
              )}
              <div
                className={`store-product__header-ctrl${
                  inactiveTab ? "--active" : ""
                }`}
                onClick={() => controlPage("restore")}
              >
                <p>
                  <AiOutlineEdit className='store-item__icon' />
                  Khôi phục cửa hàng
                </p>
              </div>
              {idStoreUpdate ? (
                inactiveTab ? (
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
                      onClick={handleDeleteStore}
                    >
                      <p>
                        <AiOutlineDelete className='store-item__icon' />
                        Xóa cửa hàng
                      </p>
                    </div>
                    <div
                      className='store-product__header-ctrl'
                      onClick={() => controlPage("detail")}
                    >
                      <p>
                        <AiOutlineShop className='store-item__icon' />
                        Xem cửa hàng
                      </p>
                    </div>
                    <div
                      className='store-product__header-ctrl'
                      onClick={() => controlPage("order")}
                    >
                      <p>
                        <AiOutlineOrderedList className='store-item__icon' />
                        Đơn hàng
                      </p>
                    </div>
                    <div
                      className='store-product__header-ctrl'
                      onClick={() => controlPage("statistic")}
                    >
                      <p>
                        <AiOutlineLineChart className='store-item__icon' />
                        Thống kê
                      </p>
                    </div>
                    <div
                      className='store-product__header-ctrl'
                      onClick={() => controlPage("voucher")}
                    >
                      <p>
                        <HiOutlineTicket className='store-item__icon' />
                        Voucher
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
            <Store item={10} inactiveTab={inactiveTab} />
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
