import axios from "axios"
import React, { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import { useGlobalContext } from "../context"

function AdminPage() {
  const jwt = localStorage.getItem("jwt")
  const [allUser, setAllUser] = useState()
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const { reloadSell } = useGlobalContext()

  const fetchData = async () => {
    const url = "https://tlcngroup2be.herokuapp.com/admin/users"
    try {
      let res = await axios({
        method: "get",
        url,
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
            className='store-item store-item__number'
            style={{ borderRight: "1px solid #979797" }}
          >
            Stt
          </div>
          <div
            className='store-item w300x'
            style={{ borderRight: "1px solid #979797" }}
          >
            Tên người dùng
          </div>
          <div
            className='store-item__info-nav'
            style={{ borderRight: "1px solid #979797" }}
          >
            Thông tin liên lạc
          </div>
          <div className='store-item__info-nav'>Thông tin cá nhân</div>
        </div>
      </div>
      {allUser ? (
        allUser.length ? (
          allUser.slice(itemOffset, itemOffset + 20).map((product, index) => {
            let { name, dateofbirth, email, address, phone, gender, role } =
              product
            if (gender === "male") {
              gender = "Nam"
            } else if (gender === "female") {
              gender = "Nữ"
            }
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
                    style={{ borderRight: "1px solid #979797" }}
                  >
                    {index + 1}
                  </div>
                  <div
                    className='store-item w300x'
                    style={{ borderRight: "1px solid #979797" }}
                  >
                    {name}
                  </div>
                  <div
                    className='store-item__info'
                    style={{ borderRight: "1px solid #979797" }}
                  >
                    <div className='store-item__info-item'>Sđt: {phone}</div>
                    <div className='store-item__info-item'>Email: {email}</div>
                    <div className='store-item__info-item'>
                      Địa chỉ: {address}
                    </div>
                  </div>
                  <div className='store-item__info'>
                    <div className='store-item__info-item'>
                      Sinh nhật: {dateofbirth}
                    </div>
                    <div className='store-item__info-item'>Phái: {gender}</div>
                    <div className='store-item__info-item'>
                      Hiện đang là{" "}
                      {role === "ROLE_USER"
                        ? "người dùng."
                        : role === "ROLE_SELLER"
                        ? "người bán hàng."
                        : role === "ROLE_SHIPPER"
                        ? "người giao hàng."
                        : "người quản trị."}
                    </div>
                  </div>
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
              Không có người dùng
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
        renderOnZeroPageCount={null}
      />
    </>
  )
}

export default AdminPage
