import axios from "axios"
import React, { useEffect, useState } from "react"
import { AiOutlineCheck } from "react-icons/ai"
import ReactPaginate from "react-paginate"
import { useHistory } from "react-router"
import logo1 from "../assets/img/logo1.png"
import { useGlobalContext } from "../context"
import Popup from "../ultis/Popup"

function AlreadyOrder() {
  const jwt = localStorage.getItem("jwt")
  const shipperId = localStorage.getItem("id")
  const { loading, setLoading, raise, setRaise, reloadSell, setReloadSell } =
    useGlobalContext()
  const [shipperPage, setShipperPage] = useState("all")
  const [height, setHeight] = useState(0)
  const [allOrder, setAllOrder] = useState()
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const history = useHistory()

  const handleReceive = async (orderId) => {
    setLoading(true)
    let url = "https://tlcngroup2be.herokuapp.com/shipper/receiveorder"
    if (shipperPage === "receive") {
      url = "https://tlcngroup2be.herokuapp.com/shipper/deliveryorder"
    }
    try {
      let res = await axios({
        method: "post",
        url,
        data: {
          orderId,
          shipperId,
        },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 201) {
        setReloadSell(!reloadSell)
        setLoading(false)
        setRaise({
          header: "Nhận giao đơn hàng",
          content: res.data.mess,
          color: "#4bb534",
        })
      }
    } catch (error) {}
  }

  const fetchData = async () => {
    setAllOrder()
    let url = "https://tlcngroup2be.herokuapp.com/shipper"
    if (shipperPage === "receive") {
      url = `https://tlcngroup2be.herokuapp.com/shipper/order/${shipperId}`
    }
    if (shipperPage === "success") {
      url = `https://tlcngroup2be.herokuapp.com/shipper/ordersuccess/${shipperId}`
    }
    try {
      let res = await axios({
        method: "get",
        url,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 200) {
        setAllOrder(res.data)
      }
    } catch (error) {}
  }

  useEffect(() => {
    if (localStorage.getItem("role") === "ROLE_SHIPPER") {
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
      fetchData()
    } else {
      history.push("/")
    }
  }, [shipperPage, reloadSell])

  useEffect(() => {
    if (allOrder) {
      setPageCount(Math.ceil(allOrder.length / 20))
    }
  }, [allOrder])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 20) % allOrder.length
    setItemOffset(newOffset)
  }
  return (
    <>
      <div
        className='container'
        style={{ backgroundImage: `url(${logo1})`, backgroundColor: "unset" }}
      >
        <div className='grid' style={{ overflow: "hidden" }}>
          <div className='grid__row'>
            <div className='grid__colum-12'>
              <div className='store'>
                <div className='store-wrap'>
                  <div className='store__nav-wrap'>
                    <div className='store__nav-options'>
                      <div
                        className={`w400px store__nav-tab ${
                          shipperPage === "all" ? "store__nav-tab--active" : ""
                        }`}
                        onClick={() => setShipperPage("all")}
                      >
                        Tất cả đơn hàng
                      </div>
                      <div
                        className={`w400px store__nav-tab ${
                          shipperPage === "receive"
                            ? "store__nav-tab--active"
                            : ""
                        }`}
                        onClick={() => setShipperPage("receive")}
                      >
                        Đơn hàng đã nhận
                      </div>
                      <div
                        className={`w400px store__nav-tab ${
                          shipperPage === "success"
                            ? "store__nav-tab--active"
                            : ""
                        }`}
                        onClick={() => setShipperPage("success")}
                      >
                        Đơn hàng đã giao
                      </div>
                    </div>
                  </div>
                  <div className='store__contain' style={{ marginTop: "10px" }}>
                    <div className='store__contain-wrap--enhance'>
                      <div className='store__contain-item'>
                        <div
                          className='store-product__body-item '
                          style={{
                            border: "1px solid #979797",
                            fontWeight: "600",
                            height: "40px",
                          }}
                        >
                          <div
                            className='store-item store-item__number'
                            style={{ borderRight: "1px solid #979797" }}
                          >
                            ID
                          </div>
                          <div
                            className='store-item w300x'
                            style={{ borderRight: "1px solid #979797" }}
                          >
                            Tên người nhận
                          </div>
                          <div
                            className={`${
                              shipperPage === "success"
                                ? "store-item__info-nav"
                                : "store-item__info-nav--35"
                            }`}
                            style={{ borderRight: "1px solid #979797" }}
                          >
                            Thông tin người nhận
                          </div>
                          <div
                            className={`${
                              shipperPage === "success"
                                ? "store-item__info-nav"
                                : "store-item__info-nav--35"
                            }`}
                            style={{ borderRight: "1px solid #979797" }}
                          >
                            Mô tả sản phẩm
                          </div>
                          {shipperPage !== "success" && (
                            <div className='store-item__info-nav--4'>
                              <AiOutlineCheck />
                            </div>
                          )}
                        </div>
                      </div>
                      {allOrder ? (
                        allOrder.length ? (
                          allOrder
                            .slice(itemOffset, itemOffset + 20)
                            .map((product, index) => {
                              let {
                                orderId,
                                name,
                                phone,
                                address,
                                description,
                                total,
                              } = product

                              return (
                                <div
                                  className='store__contain-item'
                                  key={index}
                                >
                                  <div
                                    className='store-product__body-item '
                                    style={{ border: "1px solid #979797" }}
                                  >
                                    <div
                                      className='store-item store-item__number'
                                      style={{
                                        borderRight: "1px solid #979797",
                                      }}
                                    >
                                      {orderId}
                                    </div>
                                    <div
                                      className='store-item w300x'
                                      style={{
                                        borderRight: "1px solid #979797",
                                      }}
                                    >
                                      {name}
                                    </div>
                                    <div
                                      className={`${
                                        shipperPage === "success"
                                          ? "store-item__info"
                                          : "store-item__info--35"
                                      }`}
                                      style={{
                                        borderRight: "1px solid #979797",
                                      }}
                                    >
                                      <div className='store-item__info-item'>
                                        Số điện thoại: {phone}
                                      </div>
                                      <div className='store-item__info-item'>
                                        Địa chỉ: {address}
                                      </div>
                                    </div>
                                    <div
                                      className={`${
                                        shipperPage === "success"
                                          ? "store-item__info"
                                          : "store-item__info--35"
                                      }`}
                                      style={{
                                        borderRight: "1px solid #979797",
                                      }}
                                    >
                                      <div className='store-item__info-item'>
                                        Mô tả: {description}
                                      </div>
                                      <div className='store-item__info-item'>
                                        Tổng tiền:{" "}
                                        {new Intl.NumberFormat("vi-VN", {
                                          style: "currency",
                                          currency: "VND",
                                        }).format(total)}
                                      </div>
                                    </div>
                                    {shipperPage !== "success" && (
                                      <div className='store-item__info-nav--4'>
                                        <AiOutlineCheck
                                          className='store-item__info--btn'
                                          onClick={() => handleReceive(orderId)}
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )
                            })
                        ) : (
                          <div
                            className='store__contain-item'
                            style={{
                              height: "calc(100% - 50px)",
                              width: "100%",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <div
                              className='store-product__body-item '
                              style={{
                                display: "unset",
                                width: "unset",
                                fontSize: "26px",
                              }}
                            >
                              {shipperPage === "receive"
                                ? "Chưa nhận đơn hàng"
                                : "Không có đơn hàng"}
                            </div>
                          </div>
                        )
                      ) : (
                        <div
                          className='store__contain-item'
                          style={{
                            height: "calc(100% - 50px)",
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            className='store-product__body-item '
                            style={{
                              display: "unset",
                              width: "unset",
                              fontSize: "26px",
                            }}
                          >
                            Loading...
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <ReactPaginate
                    nextLabel='>'
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel='<'
                    pageClassName='pagination-item'
                    pageLinkClassName='pagination-item__link'
                    previousClassName='pagination-item'
                    previousLinkClassName='pagination-item__link'
                    nextClassName='pagination-item'
                    nextLinkClassName='pagination-item__link'
                    breakLabel='...'
                    breakClassName='pagination-item'
                    breakLinkClassName='pagination-item__link'
                    containerClassName='pagination admin__pagination'
                    activeClassName='pagination-item--active'
                    // renderOnZeroPageCount={null}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {loading && (
          <div
            className='modal__overlay'
            style={{ zIndex: "2", top: "0", height }}
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
    </>
  )
}

export default AlreadyOrder
