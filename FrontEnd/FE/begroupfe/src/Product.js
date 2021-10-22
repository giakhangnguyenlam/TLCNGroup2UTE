import axios from "axios"
import React, { useEffect, useState } from "react"
import { AiFillStar, AiFillHeart } from "react-icons/ai"
import { useGlobalContext } from "./context"

function Product() {
  const { cate, cateType } = useGlobalContext()
  const [body, setBody] = useState([])
  let url = "https://tlcngroup2be.herokuapp.com/product"
  let category =
    (cate === "1" && "clothes") ||
    (cate === "2" && "shoes") ||
    (cate === "3" && "accessories")

  if (cate) {
    url = `https://tlcngroup2be.herokuapp.com/product/category/${cate}`
    if (cateType) {
      url = `https://tlcngroup2be.herokuapp.com/product/category/${category}/${cateType}`
    }
    if (cateType === "khac1" || cateType === "khac2") {
      url = `https://tlcngroup2be.herokuapp.com/product/category/${category}/khac`
    }
  }

  const fetchData = async () => {
    try {
      let res = await axios({
        method: "GET",
        url,
      })
      if (res.status === 200) {
        let arr = res.data.filter((item) => item !== null)
        setBody(arr)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [cate, cateType])

  return (
    <div className='grid__row' key={789}>
      {/* Product item */}
      {body.map((item) => {
        if (item) {
          let {
            id,
            storeId,
            category,
            name,
            quantity,
            price,
            description,
            image,
          } = item
          if (category === 1) {
            category = "Clothes"
          }
          if (category === 2) {
            category = "Shoes"
          }
          if (category === 3) {
            category = "Accessories"
          }
          return (
            <div className='grid__colum-2-4' key={id}>
              <a href='/' className='product-item' key={id}>
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
                  <span className='product-item__origin-name'>Trung Quốc</span>
                </div>
                <div className='product-item__favorite'>
                  <i className='fas fa-check'></i>
                  <span>Yêu thích</span>
                </div>
                <div className='product-item__sale'>
                  <span className='product-item__sale-percent'>10%</span>
                  <span className='product-item__sale-label'>GIẢM</span>
                </div>
              </a>
            </div>
          )
        }
        return <></>
      })}
    </div>
  )
}

export default Product
