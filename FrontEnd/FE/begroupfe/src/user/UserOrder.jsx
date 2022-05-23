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
        setOrderList(res.data.reverse())
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
      setPageCount(Math.ceil(orderList.length / 15))
    }
  }, [orderList])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 15) % orderList.length
    setItemOffset(newOffset)
  }

  return (
    <>
      <div className='product'>
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
              orderList.length ? (
                orderList.slice(itemOffset, itemOffset + 15).map((item) => {
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
                      <div className='order__nav-item' style={{ width: "14%" }}>
                        {orderDate}
                      </div>
                      <div className='order__nav-item' style={{ width: "27%" }}>
                        {product}
                      </div>
                      <div className='order__nav-item'>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(total)}
                      </div>
                      <div className='order__nav-item' style={{ width: "14%" }}>
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
