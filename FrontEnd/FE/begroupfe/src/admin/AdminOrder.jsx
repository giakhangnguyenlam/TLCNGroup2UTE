import axios from "axios"
import React, { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"

function AdminOrder() {
  const jwt = localStorage.getItem("jwtA")
  const [allOrder, setAllOrder] = useState()
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)

  const fetchData = async () => {
    try {
      let res = await axios({
        method: "get",
        url: "https://tlcngroup2be.herokuapp.com/admin/orders",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 200) {
        setAllOrder(res.data.reverse())
      }
    } catch (error) {}
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (allOrder) {
      setPageCount(Math.ceil(allOrder.length / 15))
    }
  }, [allOrder])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 15) % allOrder.length
    setItemOffset(newOffset)
  }
  return (
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
            className='store-item'
            style={{
              borderRight: "1px solid #979797",
              width: "120px",
            }}
          >
            ID khách
          </div>
          <div
            className='store-item w20'
            style={{ borderRight: "1px solid #979797" }}
          >
            Ngày mua
          </div>
          <div
            className='store-item__info-nav--35'
            style={{ borderRight: "1px solid #979797" }}
          >
            Trạng thái giao hàng
          </div>
          <div
            className='store-item__info-nav--35'
            style={{ borderRight: "1px solid #979797" }}
          >
            Trạng thái thanh toán
          </div>
          <div className='store-item__info-nav--35'>Tổng</div>
        </div>
      </div>
      {allOrder ? (
        allOrder.slice(itemOffset, itemOffset + 15).map((product) => {
          const { id, userId, orderDate, total, orderStatus, paymentStatus } =
            product
          return (
            <div className='store__contain-item' key={id}>
              <div
                className='store-product__body-item '
                style={{
                  border: "1px solid #979797",
                  minHeight: "30px",
                  backgroundColor: "var(--white-color)",
                }}
              >
                <div
                  className='store-item'
                  style={{
                    borderRight: "1px solid #979797",
                    width: "120px",
                  }}
                >
                  {userId}
                </div>
                <div
                  className='store-item w20'
                  style={{ borderRight: "1px solid #979797" }}
                >
                  {orderDate}
                </div>
                <div
                  className='store-item__info-nav--35'
                  style={{
                    borderRight: "1px solid #979797",
                  }}
                >
                  {orderStatus}
                </div>
                <div
                  className='store-item__info-nav--35'
                  style={{
                    borderRight: "1px solid #979797",
                  }}
                >
                  {paymentStatus}
                </div>
                <div className='store-item__info-nav--35'>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(total)}
                </div>
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
        renderOnZeroPageCount={null}
      />
    </>
  )
}

export default AdminOrder
