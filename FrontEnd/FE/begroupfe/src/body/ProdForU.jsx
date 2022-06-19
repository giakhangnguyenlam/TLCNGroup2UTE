import React, { useEffect, useState } from "react"
import { AiFillStar, AiFillHeart } from "react-icons/ai"
import ReactPaginate from "react-paginate"
import { useHistory } from "react-router"
import { useGlobalContext } from "../context"

function FrodForU({ item, sort, filter }) {
  const { searchInfo, recomend, setRecomend, isReady } = useGlobalContext()
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const history = useHistory()

  useEffect(
    () => {
      document.documentElement.scrollTop = 0
      setPageCount(
        Math.ceil(
          recomend.filter((item) =>
            item.name.toLowerCase().includes(searchInfo.toLowerCase())
          ).length / item
        )
      )
    },
    [
      item,
      recomend.filter((item) =>
        item.name.toLowerCase().includes(searchInfo.toLowerCase())
      ),
    ],
    filter,
    recomend
  )

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * item) %
      recomend.filter((item) =>
        item.name.toLowerCase().includes(searchInfo.toLowerCase())
      ).length
    setItemOffset(newOffset)
  }

  useEffect(() => {
    if (sort !== "none") {
      const newBody = recomend.sort((a, b) =>
        sort === "inc" ? b.price - a.price : a.price - b.price
      )
      setRecomend(newBody)
    }
  }, [sort])

  return (
    <>
      <div className='product'>
        <div className='grid__row' key={789}>
          {/* Product item */}
          {recomend.filter((item) =>
            item.name.toLowerCase().includes(searchInfo.toLowerCase())
          ).length === 0 ? (
            isReady ? (
              <div className='waiting'>Không có sản phẩm</div>
            ) : (
              <div className='waiting'>Loading...</div>
            )
          ) : (
            recomend
              .filter(
                (item) => filter.start <= item.price && item.price <= filter.end
              )
              .filter((item) =>
                item.name.toLowerCase().includes(searchInfo.toLowerCase())
              )
              .slice(itemOffset, itemOffset + item)
              .map((item) => {
                let {
                  id,
                  discount,
                  category,
                  name,
                  quantity,
                  price,
                  isDiscount,
                  image,
                } = item
                if (category === 1) {
                  category = "Quần áo"
                }
                if (category === 2) {
                  category = "Giày"
                }
                if (category === 3) {
                  category = "Phụ kiện"
                }
                if (isDiscount) {
                  price = (price * (100 - discount)) / 100
                }
                return (
                  <div className='grid__colum-2-4' key={id}>
                    <div
                      className='product-item'
                      key={id}
                      onClick={() => history.push(`/product/${id}`)}
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
                        <span className='product-item__sold'>
                          còn {quantity}
                        </span>
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

export default FrodForU
