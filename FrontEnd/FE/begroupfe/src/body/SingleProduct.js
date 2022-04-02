import axios from "axios"
import React, { useEffect, useState, useRef } from "react"
import { useParams } from "react-router"
import {
  AiOutlineRight,
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiFillHeart,
} from "react-icons/ai"
import { cateAccList, cateShoList, cateCloList } from "../ultis/data"
import { useGlobalContext } from "../context"
import blank from "../assets/img/blank.png"
import noCmt from "../assets/img/noCmt.png"
import Popup from "../ultis/Popup"
import { useHistory } from "react-router-dom"
function SingleProduct() {
  const { id } = useParams()
  const { loading, setLoading, raise, setRaise, setReloadSell, reloadSell } =
    useGlobalContext()
  const [prod, setProd] = useState({
    price: 0,
    image: blank,
    category: undefined,
    name: "",
    size: [],
    color: [],
    quantity: undefined,
  })
  const [listSameItem, setListSameItem] = useState([])
  const [detail, setDetail] = useState([])
  const [label, setLabel] = useState([])
  const [cmtList, setCmtList] = useState([])
  const [choose, setChoose] = useState({}) //luu color va size khi khach chon
  const [info, setInfo] = useState({
    productId: "",
    quantity: 1,
  })
  const redirect = (path) => {
    history.push(path)
  }

  const history = useHistory()
  const ref = useRef()

  const handleAddCart = (action) => {
    const userId = localStorage.getItem("id")
    const role = localStorage.getItem("role")
    // console.log(choose)
    if (userId) {
      if (
        role === "ROLE_USER" &&
        choose.color + 1 &&
        ((choose.size + 1 && (prod.category === 1 || prod.category === 2)) ||
          prod.category === 3)
      ) {
        const cartInfo = JSON.parse(localStorage.getItem(`cart${userId}`)) || []
        const price = prod.isDiscount
          ? (prod.price * (100 - prod.discount)) / 100
          : prod.price
        const totalN = info.quantity * price
        const product = Number(id)
        const quantity = info.quantity
        let description = ""

        if (prod.category === 1 || prod.category === 2) {
          description = `màu ${prod.color[choose.color]}, size ${
            prod.size[choose.size]
          }`
        } else if (prod.category === 3) {
          description = `màu ${prod.color[choose.color]}`
        }
        let res = false
        cartInfo.forEach((item) => {
          if (item.product === product && item.description === description) {
            item.quantity += quantity
            item.total += totalN
            res = true
          }
        })
        if (!res) {
          cartInfo.push({
            name: prod.name,
            price,
            image: prod.image,
            total: totalN,
            product,
            quantity,
            description,
          })
        }
        localStorage.setItem(`cart${userId}`, JSON.stringify(cartInfo))
        if (action === "add") {
          setRaise({
            header: "Thêm sản phẩm",
            content: "Thêm vào giỏ hàng hoàn tất!",
            color: "#4bb534",
          })
          setReloadSell(!reloadSell)
        } else {
          redirect("/cart")
        }
      } else {
        if (role !== "ROLE_USER") {
          setRaise({
            header: "Thông báo",
            content: "Bạn cần phải là người mua hàng để mua sản phẩm!",
            color: "#f0541e",
          })
        } else {
          setRaise({
            header: "Thông báo",
            content: "Bạn cần chọn đủ thông tin để mua sản phẩm!",
            color: "#f0541e",
          })
        }
      }
    } else {
      redirect("/user/auth")
    }
  }

  const fetchData = async () => {
    try {
      let res = await axios({
        method: "GET",
        url: `https://tlcngroup2be.herokuapp.com/product/${id}`,
      })
      if (res.status === 200) {
        const {
          category,
          image,
          name,
          price,
          quantity,
          description,
          isDiscount,
          discount,
        } = await res.data
        return {
          status: 200,
          category,
          image,
          name,
          price,
          quantity,
          description,
          isDiscount,
          discount,
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  const fetchCompare = async (name) => {
    try {
      const res = await axios({
        method: "get",
        url: `https://tlcngroup2be.herokuapp.com/product/suggestions/name/${name}`,
      })
      if (res.status === 200) {
        setListSameItem(res.data)
      }
    } catch (error) {}
  }
  const fetchCategory = async (id, category) => {
    if (category === 1) {
      try {
        let res = await axios({
          method: "GET",
          url: `https://tlcngroup2be.herokuapp.com/product/categoryclothes/${id}`,
          responseType: "json",
        })
        if (res.status === 200) {
          let { type, brand, origin, size, color, material } = await res.data
          cateCloList.forEach((item) =>
            item.value === type ? (type = item.name) : ""
          )
          setLabel(["Loại", "Hãng", "Xuất xứ", "Chất liệu"])
          setDetail([type, brand, origin, material])
          return { size, color }
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (category === 2) {
      try {
        let res = await axios({
          method: "GET",
          url: `https://tlcngroup2be.herokuapp.com/product/categoryshoes/${id}`,
          responseType: "json",
        })
        if (res.status === 200) {
          let {
            style,
            sole,
            height,
            weight,
            warranty,
            origin,
            size,
            color,
            material,
          } = await res.data
          cateShoList.forEach((item) =>
            item.value === style ? (style = item.name) : ""
          )
          setLabel([
            "Loại",
            "Đế giày",
            "Dài",
            "Rộng",
            "Bảo hành",
            "Xuất xứ",
            "Chất liệu",
          ])
          setDetail([style, sole, height, weight, warranty, origin, material])
          return { size, color }
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (category === 3) {
      try {
        let res = await axios({
          method: "GET",
          url: `https://tlcngroup2be.herokuapp.com/product/categoryaccessories/${id}`,
          responseType: "json",
        })
        if (res.status === 200) {
          let { type, brand, origin, color, material } = await res.data
          cateAccList.forEach((item) =>
            item.value === type ? (type = item.name) : ""
          )
          setLabel(["Loại", "Hãng", "Xuất xứ", "Chất liệu"])
          setDetail([type, brand, origin, material])
          return { color }
        }
      } catch (error) {
        console.log(error)
      }
      console.log("cate")
    }
  }
  const fetchComment = async () => {
    try {
      let res = await axios({
        method: "get",
        url: `https://tlcngroup2be.herokuapp.com/product/comment/${id}`,
      })
      if (res.status === 200) {
        return { status: 200, data: res.data }
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    document.documentElement.scrollTop = 0
    const fetch = async () => {
      setLoading(true)
      const res = await fetchData()
      const {
        category,
        image,
        name,
        price,
        quantity,
        description,
        status,
        isDiscount,
        discount,
      } = res
      if (status === 200) {
        const result = await fetchCategory(id, category)
        fetchCompare(name)
        if (category === 1 || category === 2) {
          const { size, color } = result
          setProd({
            ...prod,
            category,
            image,
            name,
            price,
            quantity,
            size,
            color,
            description,
            isDiscount,
            discount,
          })
        }
        if (category === 3) {
          const { color } = result
          setProd({
            ...prod,
            category,
            image,
            name,
            price,
            quantity,
            color,
            description,
            isDiscount,
            discount,
          })
        }
        const comment = await fetchComment()
        if (comment.status === 200) {
          setCmtList(comment.data)
        }
        setLoading(false)
      }
    }
    fetch()
  }, [])

  const handlInput = (e) => {
    const newQuan = e.target.value
    if (/^[0-9]*$/.test(newQuan)) {
      if (newQuan <= prod.quantity) {
        setInfo({ ...info, quantity: newQuan })
      } else {
        setInfo({ ...info, quantity: prod.quantity })
      }
    }
    if (newQuan === "") {
      setInfo({ ...info, quantity: 1 })
    }
  }

  return (
    <div className='container'>
      <div className='grid'>
        <div className='grid__row' style={{ paddingTop: "14px" }}>
          <div className='grid__colum-12'>
            <div
              className={`singleProd__breadcrum ${
                loading && "breadcrum--disable"
              }`}
            >
              <div
                className='singleProd__breadcrum-home'
                onClick={() => redirect("/")}
              >
                Trang chủ
              </div>

              <AiOutlineRight className='singleProd__breadcrum-divide' />
              <div className='singleProd__breadcrum-item'>
                {prod.category === 1
                  ? "Quần áo"
                  : prod.category === 2
                  ? "Giày"
                  : "Phụ kiện"}
              </div>
              <AiOutlineRight className='singleProd__breadcrum-divide' />
              <div className='singleProd__breadcrum-item'>{prod.name}</div>
            </div>

            <div className='singleProd__brief'>
              <div className='brief__image-wrap'>
                <div className='bried__image'>
                  <div
                    className='brief__image-item'
                    style={{ backgroundImage: `url(${prod.image})` }}
                  ></div>
                </div>
              </div>

              <div className='brief__product'>
                <div className='brief__product-wrap'>
                  <div className='brief__product-header'>
                    <span>{prod.name}</span>
                  </div>
                  {prod.isDiscount ? (
                    <div className='brief__product-price'>
                      <div className='brief__product-price-cur'>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format((prod.price * (100 - prod.discount)) / 100)}
                      </div>
                      <div className='brief__product-price-old'>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(prod.price)}
                      </div>
                    </div>
                  ) : (
                    <div className='brief__product-price'>
                      <div className='brief__product-price-cur'>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(prod.price)}
                      </div>
                    </div>
                  )}

                  {prod.color.length ? (
                    <div className='brief__product-shipping'>
                      <div className='brief__product-shipping-wrap'>
                        <div
                          className='shipping-wrap'
                          style={{ alignItems: "center" }}
                        >
                          <label className='brief__product-label'>
                            Màu sắc
                          </label>
                          <div className='brief__color'>
                            {prod.color.map((item, index) => {
                              return (
                                <div
                                  className={
                                    choose.color === index
                                      ? "brief__color-item--choose"
                                      : "brief__color-item"
                                  }
                                  key={index}
                                  onClick={() =>
                                    setChoose({ ...choose, color: index })
                                  }
                                >
                                  {item}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {prod.size.length ? (
                    <div className='brief__product-shipping'>
                      <div className='brief__product-shipping-wrap'>
                        <div
                          className='shipping-wrap'
                          style={{ alignItems: "center" }}
                        >
                          <label className='brief__product-label'>
                            Kích cỡ
                          </label>
                          <div className='brief__color'>
                            {prod.size.map((item, index) => {
                              return (
                                <div
                                  className={
                                    choose.size === index
                                      ? "brief__color-item--choose"
                                      : "brief__color-item"
                                  }
                                  key={index}
                                  onClick={() =>
                                    setChoose({ ...choose, size: index })
                                  }
                                >
                                  {item}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className='brief__product-amount'>
                    <div className='brief__product-shipping-wrap'>
                      <div
                        className='shipping-wrap'
                        style={{ alignItems: "center" }}
                      >
                        <label className='brief__product-label'>Số lượng</label>
                        <div className='shipping'>
                          <div className='amount__choose'>
                            <div
                              className='amount__item'
                              onClick={() => {
                                let newQuan =
                                  info.quantity - 1 < 0 ? 0 : info.quantity - 1
                                setInfo({ ...info, quantity: newQuan })
                              }}
                            >
                              <AiOutlineMinus />
                            </div>
                            <input
                              type='text'
                              className='amount__item amount__input'
                              value={info.quantity}
                              onChange={(e) => handlInput(e)}
                            />
                            <div
                              className='amount__item'
                              onClick={() => {
                                let newQuan = info.quantity + 1
                                setInfo({ ...info, quantity: newQuan })
                              }}
                            >
                              <AiOutlinePlus />
                            </div>
                          </div>
                          <div className='amount__quantity'>
                            {prod.quantity} sản phẩm
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {listSameItem.length ? (
                    <div className='brief__product-compare'>
                      <div className='brief__product-compare-wrap'>
                        <div className='compare__item-desc'>
                          <div className='compare__item-title'>
                            {listSameItem.length} sản phẩm khác
                          </div>
                          <div className='compare__item-min-price'>
                            Giá từ{" "}
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(
                              Math.min(
                                ...listSameItem.map((item) => item.price)
                              )
                            )}
                          </div>
                        </div>
                        <div
                          className='compare__item-btn'
                          onClick={() => (ref.current.style.display = "block")}
                        >
                          {" "}
                          So sánh
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className='brief__product-controls'>
                    <div
                      className='brief__product-btn btn btn-enhance'
                      onClick={() => handleAddCart("add")}
                    >
                      Thêm vào giỏ hàng
                    </div>
                    <div
                      className='btn btn--primary btn-enhance'
                      style={{ fontSize: "1.6rem" }}
                      onClick={() => handleAddCart("buy")}
                    >
                      Mua ngay
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className='singleProd__content'
              ref={ref}
              style={{ display: "none" }}
            >
              <div style={{ padding: "10px 10px 0" }}>
                <div className='content__header'>
                  So sánh giá sản phẩm: {prod.name}
                </div>
              </div>
              <div
                className='singleProd__content-wrap'
                style={{ display: "flex" }}
              >
                {listSameItem.map((item) => {
                  let {
                    productId,
                    discount,
                    name,
                    price,
                    isDiscount,
                    image,
                    storeName,
                  } = item
                  if (isDiscount) {
                    price = (price * (100 - discount)) / 100
                  }
                  return (
                    <div className='grid__colum-12-2' key={productId}>
                      <div
                        className='product-item'
                        key={productId}
                        onClick={() =>
                          (window.location.href = `${window.location.origin}/product/${productId}`)
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
                          {/* <span className='product-item__sold'>
                            còn {quantity}
                          </span> */}
                        </div>
                        <div className='product-item__origin'>
                          <span className='product-item__brand'>
                            Tiệm: {storeName}
                          </span>
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
                            <span className='product-item__sale-label'>
                              GIẢM
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className='singleProd__content'>
              <div className='singleProd__content-wrap'>
                <div className='content__wrap'>
                  <div className='content__header'>CHI TIẾT SẢN PHẨM</div>
                  <div className='content__body'>
                    {label.map((item, index) => {
                      return (
                        <div className='content__body-item' key={index}>
                          <label className='content__body-label'>{item}</label>
                          <div>{detail[index]}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className='content__wrap'>
                  <div className='content__header'>MÔ TẢ SẢN PHẨM</div>
                  <div className='content__body'>
                    <div className='content__body-item'>{prod.description}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className='singleProd__content'>
              <div className='singleProd__content-wrap'>
                <div className='content__wrap comment__wrap'>
                  <div
                    className='content__header'
                    style={{ backgroundColor: "var(--white-color" }}
                  >
                    ĐÁNH GIÁ SẢN PHẨM
                  </div>
                  <div className='content__body'>
                    {cmtList.length ? (
                      cmtList.map((item, index) => {
                        return (
                          <div className='comment__body-item' key={index}>
                            <div className='comment__name'>{item.username}</div>
                            <div className='comment__rating'>
                              <AiFillStar
                                className={`comment__icon ${
                                  item.star >= 1 && "comment__rating--rated"
                                }`}
                              />
                              <AiFillStar
                                className={`comment__icon ${
                                  item.star >= 2 && "comment__rating--rated"
                                }`}
                              />
                              <AiFillStar
                                className={`comment__icon ${
                                  item.star >= 3 && "comment__rating--rated"
                                }`}
                              />
                              <AiFillStar
                                className={`comment__icon ${
                                  item.star >= 4 && "comment__rating--rated"
                                }`}
                              />
                              <AiFillStar
                                className={`comment__icon ${
                                  item.star >= 5 && "comment__rating--rated"
                                }`}
                              />
                            </div>
                            <div className='comment__content'>
                              {item.comment}
                            </div>
                            <div className='comment__time'>{item.date}</div>
                          </div>
                        )
                      })
                    ) : (
                      <div className='comment__body-item--null'>
                        <div className='item__icon'>
                          <img src={noCmt} alt='no comment' />
                        </div>
                        <div className='item__text'>Chưa có đánh giá</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {raise && (
        <Popup
          header={raise.header}
          content={raise.content}
          color={raise.color}
        />
      )}
    </div>
  )
}

export default SingleProduct
