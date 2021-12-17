import axios from "axios"
import React, { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import logo1 from "../assets/img/logo1.png"
import { useGlobalContext } from "../context"

function AdminOrder() {
  const jwt = localStorage.getItem("jwtA")
  const { setAdminPage } = useGlobalContext()
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
      setPageCount(Math.ceil(allOrder.length / 20))
    }
  }, [allOrder])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 20) % allOrder.length
    setItemOffset(newOffset)
  }
  return (
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
                      className='store__nav-tab'
                      onClick={() => setAdminPage("user")}
                    >
                      Tất cả người dùng
                    </div>
                    <div
                      className='store__nav-tab'
                      onClick={() => setAdminPage("store")}
                    >
                      Tất cả cửa hàng
                    </div>
                    <div
                      className='store__nav-tab store__nav-tab--active'
                      onClick={() => setAdminPage("order")}
                    >
                      Tất cả đơn hàng
                    </div>
                    <div
                      className='store__nav-tab'
                      onClick={() => setAdminPage("product")}
                    >
                      Tất cả sản phẩm
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
                          className='store-item'
                          style={{
                            borderRight: "1px solid #979797",
                            width: "120px",
                          }}
                        >
                          Mã khách hàng
                        </div>
                        <div
                          className='store-item w20'
                          style={{ borderRight: "1px solid #979797" }}
                        >
                          Ngày mua hàng
                        </div>
                        <div
                          className='store-item__info-nav--35'
                          style={{ borderRight: "1px solid #979797" }}
                        >
                          Thông tin giao hàng
                        </div>
                        <div
                          className='store-item__info-nav--35'
                          style={{ borderRight: "1px solid #979797" }}
                        >
                          Thông tin thanh toán
                        </div>
                        <div className='store-item__info-nav--35'>Tổng</div>
                      </div>
                    </div>
                    {allOrder ? (
                      allOrder
                        .slice(itemOffset, itemOffset + 20)
                        .map((product, index) => {
                          const {
                            id,
                            userId,
                            orderDate,
                            total,
                            orderStatus,
                            paymentStatus,
                          } = product
                          return (
                            <div className='store__contain-item' key={index}>
                              <div
                                className='store-product__body-item '
                                style={{
                                  border: "1px solid #979797",
                                  height: "26px",
                                }}
                              >
                                <div
                                  className='store-item store-item__number'
                                  style={{ borderRight: "1px solid #979797" }}
                                >
                                  {id}
                                </div>
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
                  renderOnZeroPageCount={null}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminOrder
