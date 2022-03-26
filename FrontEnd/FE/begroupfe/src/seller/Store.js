import React, { useEffect, useState } from "react"
import { useGlobalContext } from "../context"
import ReactPaginate from "react-paginate"
import axios from "axios"

function Store({ item }) {
  const { idStoreUpdate, setIdStoreUpdate, reloadSell } = useGlobalContext()
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [storeList, setStoreList] = useState([])
  const [isList, setIsList] = useState(false)
  const userid = localStorage.getItem("id")
  const jwt = localStorage.getItem("jwt")

  const handlePageClick = (event) => {
    const newOffset = (event.selected * item) % storeList.length
    setItemOffset(newOffset)
  }

  const fetchData = async () => {
    setIsList(false)
    try {
      let res = await axios({
        method: "get",
        url: `https://tlcngroup2be.herokuapp.com/seller/store/userid/${userid}`,
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
    fetchData()
  }, [reloadSell])

  useEffect(() => {
    document.documentElement.scrollTop = 0
    setPageCount(Math.ceil(storeList.length / item))
  }, [item, storeList])

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
            storeList.slice(itemOffset, itemOffset + item).map((product) => {
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

export default Store
