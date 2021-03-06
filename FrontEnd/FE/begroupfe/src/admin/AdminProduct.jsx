import axios from "axios"
import React, { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import { useGlobalContext } from "../context"
import { AiFillStar, AiFillHeart } from "react-icons/ai"
import AdminSearch from "./AdminSearch"

function AdminProduct({ setHeight }) {
  const jwt = localStorage.getItem("jwt")
  const {
    idStoreProd,
    setIdStoreProd,
    inactiveProd,
    reloadSell,
    reloadDetailStore,
  } = useGlobalContext()
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [productList, setProductList] = useState([])
  const [productName, setProductName] = useState([])
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
            inactiveProd ? "inactive" : ""
          }products`,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        if (res.status === 200 && isApiSubscribed) {
          setProductList(res.data)
          setIsList(true)
        }
      } catch (error) {}
    }
    const fetchAllProductName = async () => {
      try {
        let res = await axios({
          method: "get",
          url: `https://tlcngroup2be.herokuapp.com/admin/${
            inactiveProd ? "inactive" : ""
          }productnames`,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        if (res.status === 200 && isApiSubscribed) {
          setProductName(res.data)
        }
      } catch (error) {
        console.log("fetch product name", error)
      }
    }
    setProductList([])
    setProductName([])
    setIsList(false)
    fetchAllProductName()
    fetchData()
    return () => {
      // cancel the subscription
      isApiSubscribed = false
    }
  }, [reloadSell, inactiveProd, reloadDetailStore])

  useEffect(() => {
    if (productList) {
      setPageCount(
        Math.ceil(
          productList.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          ).length / 10
        )
      )
    }
  }, [
    productList.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    ),
  ])

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * 10) %
      productList.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      ).length
    setItemOffset(newOffset)
  }

  return (
    <React.Fragment>
      {productList.length ? (
        <AdminSearch
          setSearch={setSearch}
          data={productName}
          placeholder={"Nh???p t??n s???n ph???m ????? t??m ki???m"}
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
          {productList.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          ).length === 0 ? (
            isList ? (
              <div className='waiting'>Kh??ng c?? s???n ph???m</div>
            ) : (
              <div className='waiting'>Loading...</div>
            )
          ) : (
            productList
              .filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
              )
              .slice(itemOffset, itemOffset + 10)
              .map((product) => {
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
                  category = "Qu???n ??o"
                }
                if (category === 2) {
                  category = "Gi??y"
                }
                if (category === 3) {
                  category = "Ph??? ki???n"
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
                        <span className='product-item__sold'>
                          c??n {quantity}
                        </span>
                      </div>
                      <div className='product-item__origin'>
                        <span className='product-item__brand'>{category}</span>
                        {/* <span className='product-item__origin-name'>Trung Qu???c</span> */}
                      </div>
                      <div className='product-item__favorite'>
                        <i className='fas fa-check'></i>
                        <span>Y??u th??ch</span>
                      </div>
                      {isDiscount && (
                        <div className='product-item__sale'>
                          <span className='product-item__sale-percent'>
                            {discount}%
                          </span>
                          <span className='product-item__sale-label'>GI???M</span>
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
    </React.Fragment>
  )
}

export default AdminProduct
