import axios from "axios"
import React, { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import { useGlobalContext } from "../context"
import AdminSearch from "./AdminSearch"

function AdminStore({ setHeight }) {
  const jwt = localStorage.getItem("jwt")
  const { idStoreUpdate, setIdStoreUpdate, reloadSell, inactiveTab } =
    useGlobalContext()
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [storeList, setStoreList] = useState([])
  const [storeName, setStoreName] = useState([])
  const [search, setSearch] = useState("")
  const [isList, setIsList] = useState(false)

  useEffect(() => {
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
    let isApiSubscribed = true
    const fetchData = async () => {
      setIsList(false)
      try {
        let res = await axios({
          method: "get",
          url: `https://tlcngroup2be.herokuapp.com/admin/${
            inactiveTab ? "inactive" : ""
          }stores`,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        if (res.status === 200 && isApiSubscribed) {
          setStoreList(res.data)
          setIsList(true)
        }
      } catch (error) {}
    }
    const fetchAllStoreName = async () => {
      try {
        let res = await axios({
          method: "get",
          url: `https://tlcngroup2be.herokuapp.com/admin/${
            inactiveTab ? "inactive" : ""
          }storenames`,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        if (res.status === 200 && isApiSubscribed) {
          setStoreName(res.data)
        }
      } catch (error) {
        console.log("fetch store name", error)
      }
    }

    setStoreList([])
    setStoreName([])
    setIsList(false)
    fetchAllStoreName()
    fetchData()
    return () => {
      // cancel the subscription
      isApiSubscribed = false
      setIdStoreUpdate(null)
    }
  }, [reloadSell, inactiveTab])

  useEffect(() => {
    if (storeList) {
      setPageCount(
        Math.ceil(
          storeList.filter((item) => item.nameStore.includes(search)).length /
            10
        )
      )
    }
  }, [storeList.filter((item) => item.nameStore.includes(search))])

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * 10) %
      storeList.filter((item) => item.nameStore.includes(search)).length
    setItemOffset(newOffset)
  }
  return (
    <React.Fragment>
      {storeList.length ? (
        <AdminSearch
          setSearch={setSearch}
          data={storeName}
          placeholder={"Nhập tên cửa hàng để tìm kiếm"}
        />
      ) : (
        ""
      )}
      <div className='product'>
        <div
          className='grid__row'
          key={789}
          // onClick={() => setIdStoreProd(null)}
        >
          {/* Product item */}
          {storeList.filter((item) => item.nameStore.includes(search))
            .length === 0 ? (
            isList ? (
              <div className='waiting'>Không có cửa hàng</div>
            ) : (
              <div className='waiting'>Loading...</div>
            )
          ) : (
            storeList
              .filter((item) => item.nameStore.includes(search))
              .slice(itemOffset, itemOffset + 10)
              .map((product) => {
                const { id, nameStore, image } = product
                return (
                  <div
                    className='grid__colum-2-4'
                    key={id}
                    onClick={() => setIdStoreUpdate(product)}
                  >
                    <div
                      className='product-item'
                      key={id}
                      style={
                        idStoreUpdate
                          ? id === idStoreUpdate.id
                            ? { border: "2px solid var(--primary-color)" }
                            : {}
                          : {}
                      }
                    >
                      <div
                        className='product-item__img'
                        style={{
                          backgroundImage: `url(${image})`,
                        }}
                      ></div>
                      <h4 className='product-item__name'>{nameStore}</h4>
                      <div className='product-item__price'>
                        <span className='product-item__price-cur'></span>
                      </div>
                      <div className='product-item__origin'>
                        <span className='product-item__brand'>Cửa hàng</span>
                      </div>
                    </div>
                  </div>
                )
              })
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
        containerClassName='pagination product__pagination'
        activeClassName='pagination-item--active'
        renderOnZeroPageCount={null}
      />
    </React.Fragment>
  )
}

export default AdminStore
