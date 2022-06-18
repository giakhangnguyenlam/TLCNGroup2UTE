import axios from "axios"
import React, { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import "../assets/css/UserOrder.css"

function UserOrder({ setHeight, handleChange, setOrderId }) {
  const jwt = localStorage.getItem("jwt")
  const userid = localStorage.getItem("id")
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [orderList, setOrderList] = useState()
  const [tab, setTab] = useState("all")

  const handleRedirect = (id) => {
    setOrderId(id)
    handleChange("orderItem")
  }

  const fetchData = async () => {
    try {
      let res = await axios({
        method: "get",
        url: `https://tlcngroup2be.herokuapp.com/user/orderhistory/${userid}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 200) {
        const data = {
          order: [],
          ready: [],
          shipping: [],
          finish: [],
          cancle: [],
        }
        res.data.reverse().forEach((item) => {
          switch (item.orderStatus) {
            case "Đặt hàng thành công":
              data.order.push(item)
              break
            case "Đơn hàng đã chuẩn bị xong":
              data.ready.push(item)
              break
            case "Đang giao hàng":
              data.shipping.push(item)
              break
            case "Giao hàng thành công":
              data.finish.push(item)
              break
            case "Đã hủy":
              data.cancle.push(item)
              break

            default:
              break
          }
        })
        data["all"] = res.data.reverse()
        setOrderList(data)
      }
    } catch (error) {}
  }

  useEffect(() => {
    fetchData()
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
  useEffect(() => {
    if (orderList) {
      if (orderList[tab]) {
        setPageCount(Math.ceil(orderList[tab].length / 15))
      }
    }
  }, [orderList ? orderList[tab] : orderList])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 15) % orderList[tab].length
    setItemOffset(newOffset)
  }

  return (
    <>
      <div className='product'>
        <div className='order__switch-wrap'>
          <div
            className={`order__switch-item ${
              tab === "all" && "order__switch-item--active"
            }`}
            onClick={() => setTab("all")}
          >
            Tất cả
          </div>
          <div
            className={`order__switch-item ${
              tab === "order" && "order__switch-item--active"
            }`}
            onClick={() => setTab("order")}
          >
            Chờ xác nhận
          </div>
          <div
            className={`order__switch-item ${
              tab === "ready" && "order__switch-item--active"
            }`}
            onClick={() => setTab("ready")}
          >
            Chờ lấy hàng
          </div>
          <div
            className={`order__switch-item ${
              tab === "shipping" && "order__switch-item--active"
            }`}
            onClick={() => setTab("shipping")}
          >
            Đang giao
          </div>
          <div
            className={`order__switch-item ${
              tab === "finish" && "order__switch-item--active"
            }`}
            onClick={() => setTab("finish")}
          >
            Đã giao
          </div>
          <div
            className={`order__switch-item ${
              tab === "cancle" && "order__switch-item--active"
            }`}
            onClick={() => setTab("cancle")}
          >
            Đã hủy
          </div>
        </div>
        <div className='grid__row'>
          <div
            className='auth-form__container'
            style={{
              width: "100%",
              backgroundColor: "var(--white-color)",
              paddingBottom: "10px",
              minHeight: "500px",
            }}
          >
            <div className='order__nav'>
              <div className='order__nav-item' style={{ width: "10%" }}>
                Mã đơn
              </div>
              <div className='order__nav-item' style={{ width: "14%" }}>
                Ngày mua
              </div>
              <div className='order__nav-item' style={{ width: "27%" }}>
                Sản phẩm
              </div>
              <div className='order__nav-item'>Tổng tiền</div>
              <div className='order__nav-item' style={{ width: "14%" }}>
                Thanh toán
              </div>
              <div
                className='order__nav-item'
                style={{ width: "20%", textAlign: "right" }}
              >
                Trạng thái đơn hàng
              </div>
            </div>
            {orderList ? (
              orderList[tab].length ? (
                orderList[tab]
                  .slice(itemOffset, itemOffset + 15)
                  .map((item) => {
                    const {
                      id,
                      orderDate,
                      total,
                      product,
                      paymentStatus,
                      orderStatus,
                    } = item
                    return (
                      <div
                        className='order__body order__body--hover'
                        key={id}
                        onClick={() => handleRedirect(id)}
                      >
                        <div
                          className='order__nav-item order__id'
                          style={{ width: "10%" }}
                        >
                          <span>{id}</span>
                        </div>
                        <div
                          className='order__nav-item'
                          style={{ width: "14%" }}
                        >
                          {orderDate}
                        </div>
                        <div
                          className='order__nav-item'
                          style={{ width: "27%" }}
                        >
                          {product}
                        </div>
                        <div className='order__nav-item'>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(total)}
                        </div>
                        <div
                          className='order__nav-item'
                          style={{ width: "14%" }}
                        >
                          {paymentStatus}
                        </div>
                        <div
                          className='order__nav-item'
                          style={{
                            width: "20%",
                            textAlign: "right",
                            fontSize: "12px",
                          }}
                        >
                          {orderStatus}
                        </div>
                      </div>
                    )
                  })
              ) : (
                <div
                  className='order__body'
                  style={{
                    width: "100%",
                    height: "378px",
                    fontSize: "24px",
                    borderBottom: "none",
                    justifyContent: "center",
                  }}
                >
                  Không có đơn hàng
                </div>
              )
            ) : (
              <div
                className='order__body'
                style={{
                  width: "100%",
                  height: "378px",
                  fontSize: "24px",
                  borderBottom: "none",
                  justifyContent: "center",
                }}
              >
                Đang tải ...
              </div>
            )}
          </div>
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
        containerClassName='pagination user__pagination'
        activeClassName='pagination-item--active'
        renderOnZeroPageCount={null}
      />
    </>
  )
}

export default UserOrder
