import axios from "axios"
import React, { useState, useEffect } from "react"
import ReactPaginate from "react-paginate"
import { useHistory } from "react-router-dom"
import { useGlobalContext } from "../context"
import { AiOutlineCheck } from "react-icons/ai"

function ItemShipper({ setLoading, setHeight, page }) {
  const shipperId = localStorage.getItem("id")
  const jwt = localStorage.getItem("jwt")
  const [allOrder, setAllOrder] = useState()
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const { reloadSell, setReloadSell, setRaise } = useGlobalContext()
  const history = useHistory()

  const handleReceive = async (orderId) => {
    setLoading(true)
    let url = "https://tlcngroup2be.herokuapp.com/shipper/receiveorder"
    if (page === "receive") {
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
    if (page === "receive") {
      url = `https://tlcngroup2be.herokuapp.com/shipper/order/${shipperId}`
    }
    if (page === "success") {
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

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 20) % allOrder.length
    setItemOffset(newOffset)
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
  }, [page, reloadSell])

  useEffect(() => {
    if (allOrder) {
      setPageCount(Math.ceil(allOrder.length / 20))
    }
  }, [allOrder])
  return (
    // <div className='store-wrap'>
    <>
      <div className='store__contain-item'>
        <div
          className='store-product__body-item '
          style={{
            border: "1px solid #979797",
            fontWeight: "600",
            height: "40px",
            backgroundColor: "var(--white-color)",
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
              page === "success"
                ? "store-item__info-nav"
                : "store-item__info-nav--35"
            }`}
            style={{ borderRight: "1px solid #979797" }}
          >
            Thông tin người nhận
          </div>
          <div
            className={`${
              page === "success"
                ? "store-item__info-nav"
                : "store-item__info-nav--35"
            }`}
            style={
              page !== "success"
                ? {
                    borderRight: "1px solid #979797",
                  }
                : {}
            }
          >
            Mô tả sản phẩm
          </div>
          {page !== "success" && (
            <div className='store-item__info-nav--4'>
              <AiOutlineCheck />
            </div>
          )}
        </div>
      </div>
      {allOrder ? (
        allOrder.length ? (
          allOrder.slice(itemOffset, itemOffset + 20).map((product, index) => {
            const { orderId, name, phone, address, description, total } =
              product

            return (
              <div className='store__contain-item' key={index}>
                <div
                  className='store-product__body-item '
                  style={{
                    border: "1px solid #979797",
                    backgroundColor: "var(--white-color)",
                  }}
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
                      page === "success"
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
                      page === "success"
                        ? "store-item__info"
                        : "store-item__info--35"
                    }`}
                    style={
                      page !== "success"
                        ? {
                            borderRight: "1px solid #979797",
                          }
                        : {}
                    }
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
                  {page !== "success" && (
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
              height: "200px",
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
              {page === "receive" ? "Chưa nhận đơn hàng" : "Không có đơn hàng"}
            </div>
          </div>
        )
      ) : (
        <div
          className='store__contain-item'
          style={{
            height: "200px",
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
    </>
  )
}

export default ItemShipper
