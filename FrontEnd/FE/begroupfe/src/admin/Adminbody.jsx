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
    inactiveTab,
    setInactiveTab,
    inactiveProd,
    setInactiveProd,
  } = useGlobalContext()
  const [height, setHeight] = useState(0)
  const [orderId, setOrderId] = useState(null)
  const [adminPage, setAdminPage] = useState("dashboard")
  const history = useHistory()

  const handleChange = (page) => {
    setIdStoreUpdate(null)
    setIdStoreProd(null)
    switch (page) {
      case "restore":
        setAdminPage("")
        setInactiveProd(false)
        setInactiveTab(true)
        break
      case "reitem":
        setAdminPage("")
        setInactiveTab(false)
        setInactiveProd(true)
        break
      default:
        setInactiveTab(false)
        setInactiveProd(false)
        setAdminPage(page)
        break
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
      case "cancleOrder":
        cancleOrder()
        break
      case "statistic":
        setIsStatic(true)
        break
      case "statisticAdm":
        setIdStoreUpdate(null)
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

  const cancleOrder = async () => {
    let del = window.confirm(`B???n mu???n h???y ????n h??ng ${orderId} ch????`)
    if (del) {
      setLoad(true)
      try {
        const res = await axios({
          method: "DELETE",
          url: `https://tlcngroup2be.herokuapp.com/admin/order/${orderId}`,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        if (res.status === 200) {
          setReloadSell(!reloadSell)
          setLoad(false)
          setRaise({
            header: "H???y ????n h??ng",
            content: "H???y th??nh c??ng!",
            color: "#009944cc",
          })
        }
      } catch (error) {
        console.log(error)
        if (error.response.data) {
          setLoad(false)
          setRaise({
            header: "H???y ????n h??ng",
            content: error.response.data,
            color: "#cf000fcc",
          })
        }
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

  const handleDelete = async () => {
    let page = adminPage
    let del = window.confirm(
      `B???n mu???n x??a ${page === "store" ? "c???a h??ng" : "s???n ph???m"} ch????`
    )
    if (del) {
      let url = ""
      let header = ""
      if (page === "store") {
        url = `https://tlcngroup2be.herokuapp.com/seller/store/${idStoreUpdate.id}`
        header = "X??a c???a h??ng"
      } else {
        url = `https://tlcngroup2be.herokuapp.com/seller/product/${idStoreProd.id}/category/${idStoreProd.category}`
        header = "X??a s???n ph???m"
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
            content: "X??a th??nh c??ng!",
            color: "#009944cc",
          })
        }
      } catch (error) {}
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("username") || !localStorage.getItem("adm")) {
      history.push("/admin/auth")
    }
  }, [reloadSell, reloadDetailStore])

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
                  T???ng h???p
                </p>
              </div>
              <div
                className={`store-product__header-ctrl`}
                onClick={() => controlPage("statisticAdm")}
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
                  Ng?????i d??ng
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
                  C???a h??ng
                </p>
              </div>
              <div
                className={`store-product__header-ctrl${
                  inactiveTab ? "--active" : ""
                }`}
                onClick={() => handleChange("restore")}
              >
                <p>
                  <AiOutlineShop className='store-item__icon' />
                  Kh??i ph???c c???a h??ng
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
                  S???n ph???m
                </p>
              </div>
              <div
                className={`store-product__header-ctrl${
                  inactiveProd ? "--active" : ""
                }`}
                onClick={() => handleChange("reitem")}
              >
                <p style={{ fontSize: "1.4rem" }}>
                  <AiOutlineShopping className='store-item__icon' />
                  Kh??i ph???c s???n ph???m
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
                  T???ng ????n h??ng
                </p>
              </div>

              {idStoreUpdate &&
                (inactiveTab ? (
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
                        Kh??i ph???c
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
                      onClick={() => controlPage("updateStore")}
                    >
                      <p>
                        <AiOutlineEdit className='store-item__icon' />
                        S???a th??ng tin
                      </p>
                    </div>
                    <div
                      className='store-product__header-ctrl'
                      onClick={() => controlPage("order")}
                    >
                      <p>
                        <AiOutlineOrderedList className='store-item__icon' />
                        ????n h??ng
                      </p>
                    </div>
                    <div
                      className='store-product__header-ctrl'
                      onClick={() => controlPage("statistic")}
                    >
                      <p>
                        <AiOutlineLineChart className='store-item__icon' />
                        Th???ng k??
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
                        X??a c???a h??ng
                      </p>
                    </div>
                  </React.Fragment>
                ))}

              {idStoreProd &&
                (inactiveProd ? (
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
                        Kh??i ph???c
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
                      onClick={() => controlPage("updateProd")}
                    >
                      <p>
                        <AiOutlineEdit className='store-item__icon' />
                        S???a th??ng tin
                      </p>
                    </div>
                    <div
                      className='store-product__header-ctrl'
                      onClick={handleInfo}
                    >
                      <p>
                        <AiOutlineInfoCircle className='store-item__icon' />
                        Chi ti???t s???n ph???m
                      </p>
                    </div>
                    <div
                      className='store-product__header-ctrl'
                      onClick={() => controlPage("discount")}
                    >
                      <p>
                        <RiCoupon3Line className='store-item__icon' />
                        M?? gi???m gi??
                      </p>
                    </div>
                    <div
                      className='store-product__header-ctrl'
                      onClick={handleDelete}
                    >
                      <p>
                        <AiOutlineDelete className='store-item__icon' />
                        X??a s???n ph???m
                      </p>
                    </div>
                  </React.Fragment>
                ))}

              {orderId && (
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
                    onClick={() => controlPage("cancleOrder")}
                  >
                    <p>
                      <AiOutlineEdit className='store-item__icon' />
                      H???y ????n h??ng
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
            {inactiveTab && <AdminStore setHeight={setHeight} />}
            {adminPage === "item" && <AdminProduct setHeight={setHeight} />}
            {inactiveProd && <AdminProduct setHeight={setHeight} />}
            {adminPage === "order" && (
              <AdminOrders
                orderId={orderId}
                setOrderId={setOrderId}
                setHeight={setHeight}
              />
            )}
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
