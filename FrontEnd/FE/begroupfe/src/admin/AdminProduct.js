import axios from "axios"
import React, { useEffect, useState } from "react"
import { AiOutlineDelete } from "react-icons/ai"
import ReactPaginate from "react-paginate"
import logo1 from "../assets/img/logo1.png"
import { useGlobalContext } from "../context"
import Popup from "../ultis/Popup"

function AdminProduct() {
  const jwt = localStorage.getItem("jwtA")
  const {
    setAdminPage,
    loading,
    setLoading,
    raise,
    setRaise,
    reloadSell,
    setReloadSell,
  } = useGlobalContext()
  const [allUser, setAllUser] = useState()
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)

  const fetchData = async () => {
    try {
      let res = await axios({
        method: "get",
        url: "https://tlcngroup2be.herokuapp.com/admin/products",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 200) {
        setAllUser(res.data)
      }
    } catch (error) {}
  }

  useEffect(() => {
    fetchData()
  }, [reloadSell])

  useEffect(() => {
    if (allUser) {
      setPageCount(Math.ceil(allUser.length / 20))
    }
  }, [allUser])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 20) % allUser.length
    setItemOffset(newOffset)
  }

  const handleDelete = async (id, category) => {
    let del = window.confirm("Bạn muốn xóa cửa hàng chứ?")
    if (del) {
      setLoading(true)
      try {
        let res = await axios({
          method: "delete",
          url: `https://tlcngroup2be.herokuapp.com/seller/product/${id}/category/${category}`,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        if (res.status === 200) {
          setReloadSell(!reloadSell)
          setLoading(false)
          setRaise({
            header: "Xóa cửa hàng",
            content: "Xóa thành công!",
            color: "#4bb534",
          })
        }
      } catch (error) {}
    }
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
                        className='w200px store__nav-tab'
                        onClick={() => setAdminPage("user")}
                      >
                        Tất cả người dùng
                      </div>
                      <div
                        className='w200px store__nav-tab'
                        onClick={() => setAdminPage("seller")}
                      >
                        Tất cả người bán
                      </div>
                      <div
                        className='w200px store__nav-tab'
                        onClick={() => setAdminPage("unpay")}
                      >
                        Duyệt người giao hàng
                      </div>
                      <div
                        className='w200px store__nav-tab'
                        onClick={() => setAdminPage("store")}
                      >
                        Tất cả cửa hàng
                      </div>
                      <div
                        className='w200px store__nav-tab'
                        onClick={() => setAdminPage("order")}
                      >
                        Tất cả đơn hàng
                      </div>
                      <div className='w200px store__nav-tab store__nav-tab--active'>
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
                            Stt
                          </div>
                          <div
                            className='store-item w300x'
                            style={{ borderRight: "1px solid #979797" }}
                          >
                            Ảnh sản phẩm
                          </div>
                          <div
                            className='store-item__info-nav--35'
                            style={{ borderRight: "1px solid #979797" }}
                          >
                            Thông tin sản phẩm
                          </div>
                          <div
                            className='store-item__info-nav--35'
                            style={{ borderRight: "1px solid #979797" }}
                          >
                            Mô tả sản phẩm
                          </div>
                          <div className='store-item__info-nav--4'>
                            <AiOutlineDelete />
                          </div>
                        </div>
                      </div>
                      {allUser ? (
                        allUser
                          .slice(itemOffset, itemOffset + 20)
                          .map((product, index) => {
                            let {
                              id,
                              image,
                              name,
                              price,
                              quantity,
                              storeId,
                              category,
                              description,
                            } = product

                            if (category === 1) {
                              category = "Quần áo"
                            } else if (category === 2) {
                              category = "Giày dép"
                            } else if (category === 3) {
                              category = "Phụ kiện"
                            }
                            return (
                              <div className='store__contain-item' key={index}>
                                <div
                                  className='store-product__body-item '
                                  style={{ border: "1px solid #979797" }}
                                >
                                  <div
                                    className='store-item store-item__number'
                                    style={{ borderRight: "1px solid #979797" }}
                                  >
                                    {index + 1}
                                  </div>
                                  <div
                                    className='store-item w300x'
                                    style={{ borderRight: "1px solid #979797" }}
                                  >
                                    <div
                                      className='store-item__img'
                                      style={{
                                        backgroundImage: `url(${image})`,
                                      }}
                                    ></div>
                                  </div>
                                  <div
                                    className='store-item__info--35'
                                    style={{ borderRight: "1px solid #979797" }}
                                  >
                                    <div className='store-item__info-item'>
                                      Tên sản phẩm: {name}
                                    </div>
                                    <div className='store-item__info-item'>
                                      Số lượng: {quantity}
                                    </div>
                                    <div className='store-item__info-item'>
                                      Giá:{" "}
                                      {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                      }).format(price)}
                                    </div>
                                  </div>
                                  <div
                                    className='store-item__info--35'
                                    style={{ borderRight: "1px solid #979797" }}
                                  >
                                    <div className='store-item__info-item'>
                                      Mã cửa hàng: {storeId}
                                    </div>
                                    <div className='store-item__info-item'>
                                      Loại sản phẩm: {category}
                                    </div>
                                    <div className='store-item__info-item'>
                                      Mô tả: {description}
                                    </div>
                                  </div>
                                  <div className='store-item__info-nav--4'>
                                    <AiOutlineDelete
                                      className='store-item__info--btn'
                                      onClick={() => handleDelete(id, category)}
                                    />
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
        {loading && (
          <div className='modal__overlay' style={{ zIndex: "5", top: "0" }}>
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

export default AdminProduct
