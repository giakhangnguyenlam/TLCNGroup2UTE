import axios from "axios"
import React, { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import { useGlobalContext } from "../context"

function AdminStore({ setHeight }) {
  const jwt = localStorage.getItem("jwtA")
  const { idStoreUpdate, setIdStoreUpdate, reloadSell } = useGlobalContext()
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [storeList, setStoreList] = useState([])
  const [isList, setIsList] = useState(false)

  const fetchData = async () => {
    setIsList(false)
    try {
      let res = await axios({
        method: "get",
        url: "https://tlcngroup2be.herokuapp.com/admin/stores",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 200) {
        setStoreList(res.data)
        setIsList(true)
      }
    } catch (error) {}
  }

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
    fetchData()
  }, [reloadSell])

  useEffect(() => {
    if (storeList) {
      setPageCount(Math.ceil(storeList.length / 10))
    }
  }, [storeList])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 20) % storeList.length
    setItemOffset(newOffset)
  }
  return (
    <>
      <div className='product'>
        <div
          className='grid__row'
          key={789}
          // onClick={() => setIdStoreProd(null)}
        >
          {/* Product item */}
          {storeList.length === 0 ? (
            isList ? (
              <div className='waiting'>Không có cửa hàng</div>
            ) : (
              <div className='waiting'>Loading...</div>
            )
          ) : (
            storeList.slice(itemOffset, itemOffset + 10).map((product) => {
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
    </>
  )
}

export default AdminStore
