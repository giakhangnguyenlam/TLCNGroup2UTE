import axios from "axios"
import React, { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import { useGlobalContext } from "../context"
import AdminSearch from "./AdminSearch"

function AdminPage() {
  const jwt = localStorage.getItem("jwt")
  const [allUser, setAllUser] = useState()
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [userName, setUserName] = useState([])
  const [search, setSearch] = useState("")
  const { reloadSell } = useGlobalContext()

  useEffect(() => {
    let isApiSubscribed = true
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
        if (res.status === 200 && isApiSubscribed) {
          setAllUser(res.data)
        }
      } catch (error) {}
    }
    const fetchAllUserName = async () => {
      try {
        let res = await axios({
          method: "get",
          url: "https://tlcngroup2be.herokuapp.com/admin/usernames",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        if (res.status === 200 && isApiSubscribed) {
          setUserName(res.data)
        }
      } catch (error) {
        console.log("fetch user name", error)
      }
    }
    fetchAllUserName()
    fetchData()
    return () => {
      isApiSubscribed = false
    }
  }, [reloadSell])

  useEffect(() => {
    if (allUser) {
      setPageCount(
        Math.ceil(
          allUser.filter((item) => item.username.includes(search)).length / 20
        )
      )
    }
  }, [allUser ? allUser.filter((item) => item.username.includes(search)) : ""])

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * 20) %
      allUser.filter((item) => item.username.includes(search)).length
    setItemOffset(newOffset)
  }
  return (
    <React.Fragment>
      {allUser ? (
        <AdminSearch
          setSearch={setSearch}
          data={userName}
          placeholder={"Nh???p username ????? t??m ki???m"}
        />
      ) : (
        ""
      )}
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
            T??n ng?????i d??ng
          </div>
          <div
            className='store-item__info-nav'
            style={{ borderRight: "1px solid #979797" }}
          >
            Th??ng tin li??n l???c
          </div>
          <div className='store-item__info-nav'>Th??ng tin c?? nh??n</div>
        </div>
      </div>
      {allUser ? (
        allUser.filter((item) => item.username.includes(search)).length ? (
          allUser
            .filter((item) => item.username.includes(search))
            .slice(itemOffset, itemOffset + 20)
            .map((product, index) => {
              let { name, dateofbirth, email, address, phone, gender, role } =
                product
              if (gender === "male") {
                gender = "Nam"
              } else if (gender === "female") {
                gender = "N???"
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
                      <div className='store-item__info-item'>S??t: {phone}</div>
                      <div className='store-item__info-item'>
                        Email: {email}
                      </div>
                      <div className='store-item__info-item'>
                        ?????a ch???: {address}
                      </div>
                    </div>
                    <div className='store-item__info'>
                      <div className='store-item__info-item'>
                        Sinh nh???t: {dateofbirth}
                      </div>
                      <div className='store-item__info-item'>
                        Ph??i: {gender}
                      </div>
                      <div className='store-item__info-item'>
                        Hi???n ??ang l??{" "}
                        {role === "ROLE_USER"
                          ? "ng?????i d??ng."
                          : role === "ROLE_SELLER"
                          ? "ng?????i b??n h??ng."
                          : role === "ROLE_SHIPPER"
                          ? "ng?????i giao h??ng."
                          : "ng?????i qu???n tr???."}
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
              Kh??ng c?? ng?????i d??ng
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
    </React.Fragment>
  )
}

export default AdminPage
