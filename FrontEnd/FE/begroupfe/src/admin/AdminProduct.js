import axios from "axios"
import React, { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import { useGlobalContext } from "../context"
import { AiFillStar, AiFillHeart } from "react-icons/ai"

function AdminProduct({ setHeight }) {
  const jwt = localStorage.getItem("jwtA")
  const { idStoreProd, setIdStoreProd, reloadSell } = useGlobalContext()
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [productList, setProductList] = useState([])
  const [isList, setIsList] = useState(false)

  const fetchData = async () => {
    setIsList(false)
    try {
      let res = await axios({
        method: "get",
        url: "https://tlcngroup2be.herokuapp.com/admin/products",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 200) {
        setProductList(res.data)
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
    if (productList) {
      setPageCount(Math.ceil(productList.length / 10))
    }
  }, [productList])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % productList.length
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
          {productList.length === 0 ? (
            isList ? (
              <div className='waiting'>Không có sản phẩm</div>
            ) : (
              <div className='waiting'>Loading...</div>
            )
          ) : (
            productList.slice(itemOffset, itemOffset + 10).map((product) => {
              let {
                id,
                category,
                name,
                quantity,
                price,
                image,
                isDiscount,
                discount,
              } = product
              if (category === 1) {
                category = "Quần áo"
              }
              if (category === 2) {
                category = "Giày"
              }
              if (category === 3) {
                category = "Phụ kiện"
              }
              return (
                <div
                  className='grid__colum-2-4'
                  key={id}
                  onClick={() => setIdStoreProd(product)}
                >
                  <div
                    className='product-item'
                    key={id}
                    style={
                      idStoreProd
                        ? id === idStoreProd.id
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
                    <h4 className='product-item__name'>{name}</h4>
                    <div className='product-item__price'>
                      <span className='product-item__price-cur'>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(price)}
                      </span>
                    </div>
                    <div className='product-item__action'>
                      <span className='product-item__action-like product-item__action-like--liked'>
                        <AiFillHeart className='product-item__action-like-icon product-item__heart' />
                        <AiFillHeart className='product-item__action-liked-icon product-item__heart' />
                      </span>
                      <div className='product-item__rating'>
                        <AiFillStar className='product-item__star--gold product-item__star' />
                        <AiFillStar className='product-item__star--gold product-item__star' />
                        <AiFillStar className='product-item__star--gold product-item__star' />
                        <AiFillStar className='product-item__star--gold product-item__star' />
                        <AiFillStar className='product-item__star' />
                      </div>
                      <span className='product-item__sold'>còn {quantity}</span>
                    </div>
                    <div className='product-item__origin'>
                      <span className='product-item__brand'>{category}</span>
                      {/* <span className='product-item__origin-name'>Trung Quốc</span> */}
                    </div>
                    <div className='product-item__favorite'>
                      <i className='fas fa-check'></i>
                      <span>Yêu thích</span>
                    </div>
                    {isDiscount && (
                      <div className='product-item__sale'>
                        <span className='product-item__sale-percent'>
                          {discount}%
                        </span>
                        <span className='product-item__sale-label'>GIẢM</span>
                      </div>
                    )}
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

export default AdminProduct
