import axios from "axios"
import React, { useState, useEffect } from "react"
import {
  AiOutlineUser,
  AiOutlineShop,
  AiOutlineInfoCircle,
  AiOutlineOrderedList,
  AiOutlineShopping,
  AiOutlineDelete,
  AiOutlineLineChart,
  AiOutlineEdit,
} from "react-icons/ai"
import { HiOutlineTicket } from "react-icons/hi"
import { RiCoupon3Line, RiDashboardLine } from "react-icons/ri"
import AdminUser from "./AdminUser"
import AdminStore from "./AdminStore"
import AdminProduct from "./AdminProduct"
import AdminOrders from "./AdminOrder"
import { useGlobalContext } from "../context"
import Popup from "../ultis/Popup"
import { useHistory } from "react-router-dom"
import AdminDashboard from "./AdminDashboard"

function AdminBody() {
  const jwt = localStorage.getItem("jwt")
  const [load, setLoad] = useState(false)
  const {
    raise,
    idStoreUpdate,
    idStoreProd,
    setIdStoreProd,
    setIdStoreUpdate,
    setReloadSell,
    setIsUpdateStore,
    setIsOrderDetail,
    setIsStatic,
    setIsVoucher,
    setIsDiscount,
    setRaise,
    reloadSell,
    reloadDetailStore,
    setCateClo,
    setCateSho,
    setCateAcc,
    setIsDetailInfo,
    setCateStoreProd,
    setIsDetailUpdate,
  } = useGlobalContext()
  const [height, setHeight] = useState(0)
  const [adminPage, setAdminPage] = useState("dashboard")
  const history = useHistory()

  const handleChange = (page) => {
    setIdStoreUpdate(null)
    setIdStoreProd(null)
    setAdminPage(page)
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

  const handleDelete = async () => {
    let page = adminPage
    let del = window.confirm(
      `Bạn muốn xóa ${page === "store" ? "cửa hàng" : "sản phẩm"} chứ?`
    )
    if (del) {
      let url = ""
      let header = ""
      if (page === "store") {
        url = `https://tlcngroup2be.herokuapp.com/seller/store/${idStoreUpdate.id}`
        header = "Xóa cửa hàng"
      } else {
        url = `https://tlcngroup2be.herokuapp.com/seller/product/${idStoreProd.id}/category/${idStoreProd.category}`
        header = "Xóa sản phẩm"
      }
      setLoad(true)
      try {
        let res = await axios({
          method: "delete",
          url,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        if (res.status === 200) {
          setReloadSell(!reloadSell)
          setLoad(false)
          setRaise({
            header,
            content: "Xóa thành công!",
            color: "#4bb534",
          })
        }
      } catch (error) {}
    }
  }

  const controlPage = (control) => {
    switch (control) {
      case "updateStore":
        setIsUpdateStore(true)
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
      case "updateProd":
        setIsDetailUpdate(true)
        break
      case "discount":
        setIsDiscount(true)
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("username") || !localStorage.getItem("adm")) {
      history.push("/admin/auth")
    }
  }, [])

  useEffect(() => {}, [reloadSell, reloadDetailStore])

  return (
    <div className='container'>
      <div className='grid'>
        <div className='grid__row contain'>
          <div className='grid__colum-2'>
            <nav style={{ marginBottom: "10px" }}>
              <div
                className={`store-product__header-ctrl${
                  adminPage === "dashboard" ? "--active" : ""
                }`}
                onClick={() => handleChange("dashboard")}
              >
                <p>
                  <RiDashboardLine className='store-item__icon' />
                  Tổng hợp
                </p>
              </div>
              <div
                className={`store-product__header-ctrl`}
                onClick={() => controlPage("statistic")}
              >
                <p>
                  <AiOutlineLineChart className='store-item__icon' />
                  Doanh thu
                </p>
              </div>
              <div
                style={{
                  marginBottom: "10px",
                  height: "1px",
                  backgroundColor: "#999",
                }}
              ></div>
              <div
                className={`store-product__header-ctrl${
                  adminPage === "user" ? "--active" : ""
                }`}
                onClick={() => handleChange("user")}
              >
                <p>
                  <AiOutlineUser className='store-item__icon' />
                  Người dùng
                </p>
              </div>
              <div
                className={`store-product__header-ctrl${
                  adminPage === "store" ? "--active" : ""
                }`}
                onClick={() => handleChange("store")}
              >
                <p>
                  <AiOutlineShop className='store-item__icon' />
                  Cửa hàng
                </p>
              </div>
              <div
                className={`store-product__header-ctrl${
                  adminPage === "item" ? "--active" : ""
                }`}
                onClick={() => handleChange("item")}
              >
                <p>
                  <AiOutlineShopping className='store-item__icon' />
                  Sản phẩm
                </p>
              </div>
              <div
                className={`store-product__header-ctrl${
                  adminPage === "order" ? "--active" : ""
                }`}
                onClick={() => handleChange("order")}
              >
                <p>
                  <AiOutlineOrderedList className='store-item__icon' />
                  Tổng đơn hàng
                </p>
              </div>
              {idStoreUpdate && (
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
                    onClick={() => controlPage("updateStore")}
                  >
                    <p>
                      <AiOutlineEdit className='store-item__icon' />
                      Sửa thông tin
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
                  <div
                    className='store-product__header-ctrl'
                    onClick={handleDelete}
                  >
                    <p>
                      <AiOutlineDelete className='store-item__icon' />
                      Xóa cửa hàng
                    </p>
                  </div>
                </React.Fragment>
              )}
              {idStoreProd && (
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
                    onClick={() => controlPage("updateProd")}
                  >
                    <p>
                      <AiOutlineEdit className='store-item__icon' />
                      Sửa thông tin
                    </p>
                  </div>
                  <div
                    className='store-product__header-ctrl'
                    onClick={handleInfo}
                  >
                    <p>
                      <AiOutlineInfoCircle className='store-item__icon' />
                      Chi tiết sản phẩm
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
                  <div
                    className='store-product__header-ctrl'
                    onClick={handleDelete}
                  >
                    <p>
                      <AiOutlineDelete className='store-item__icon' />
                      Xóa sản phẩm
                    </p>
                  </div>
                </React.Fragment>
              )}
            </nav>
          </div>

          <div className='grid__colum-10'>
            {adminPage === "dashboard" && <AdminDashboard />}
            {adminPage === "user" && <AdminUser />}
            {adminPage === "store" && <AdminStore setHeight={setHeight} />}
            {adminPage === "item" && <AdminProduct setHeight={setHeight} />}
            {adminPage === "order" && <AdminOrders />}
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

export default AdminBody
