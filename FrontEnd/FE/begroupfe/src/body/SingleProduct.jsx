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
  const [height, setHeight] = useState(0)
  const [load, setLoad] = useState(false)
  const {
    loading,
    setLoading,
    raise,
    setRaise,
    setIsCartUpdate,
    isCartUpdate,
    setCate,
    setCateType,
    setCateName,
  } = useGlobalContext()
  const [prod, setProd] = useState({
    price: 0,
    image: blank,
    category: undefined,
    name: "",
    size: [],
    color: [],
    quantity: undefined,
    storeId: undefined,
    storeName: "",
  })
  const userId = localStorage.getItem("id")
  let cart = JSON.parse(localStorage.getItem(`cart${userId}`))
  const [isReady, setReady] = useState(false)
  const [listCompareItem, setListCompareItem] = useState([])
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

  const clicked = (cate, type, name) => {
    setCate(cate)
    setCateType(type)
    setCateName(name)
    if (window.location.pathname !== "/") {
      history.push("/")
    }
  }

  const checkExist = async (desc) => {
    let isDuplicate = {}
    if (cart) {
      cart.forEach((item) => {
        item.forEach((ele) => {
          if (ele.idProduct === Number(id) && ele.description === desc) {
            isDuplicate = ele
          }
        })
      })
    }
    return isDuplicate
  }

  const handleAddCart = async (action) => {
    const userId = localStorage.getItem("id")
    const role = localStorage.getItem("role")

    if (userId) {
      if (
        role === "ROLE_USER" &&
        choose.color + 1 &&
        ((choose.size + 1 && (prod.category === 1 || prod.category === 2)) ||
          prod.category === 3)
      ) {
        const price = prod.isDiscount
          ? (prod.price * (100 - prod.discount)) / 100
          : prod.price
        const product = Number(id)
        const quantity = info.quantity
        let description = ""

        if (prod.category === 1 || prod.category === 2) {
          description = `m??u ${prod.color[choose.color]}, size ${
            prod.size[choose.size]
          }`
        } else if (prod.category === 3) {
          description = `m??u ${prod.color[choose.color]}`
        }
        const isDuplicate = await checkExist(description)
        setLoad(true)
        try {
          const method = Object.keys(isDuplicate).length ? "put" : "post"
          const url = Object.keys(isDuplicate).length
            ? `https://utesharecode.herokuapp.com/item/${isDuplicate.id}`
            : "https://utesharecode.herokuapp.com/item"
          const data = Object.keys(isDuplicate).length
            ? {
                amount: quantity + isDuplicate.amount,
              }
            : {
                idUser: userId,
                idProduct: product,
                storeId: prod.storeId,
                storeName: prod.nameStore,
                image: prod.image,
                name: prod.name,
                description,
                price,
                amount: quantity,
              }
          let response = await axios({
            method,
            url,
            data,
          })
          if (response.status === 200 || response.status === 201) {
            if (action === "add") {
              setRaise({
                header: "Th??m s???n ph???m",
                content: "Th??m v??o gi??? h??ng ho??n t???t!",
                color: "#009944cc",
              })
              setIsCartUpdate(!isCartUpdate)
              setLoad(false)
            } else {
              setIsCartUpdate(!isCartUpdate)
              setLoad(false)
              window.location.href = window.location.origin + "/cart"
            }
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        if (role !== "ROLE_USER") {
          setRaise({
            header: "Th??ng b??o",
            content: "B???n c???n ph???i l?? ng?????i mua h??ng ????? mua s???n ph???m!",
            color: "#cf000fcc",
          })
        } else {
          setRaise({
            header: "Th??ng b??o",
            content: "B???n c???n ch???n ????? th??ng tin ????? mua s???n ph???m!",
            color: "#cf000fcc",
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
          storeId,
          nameStore,
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
          storeId,
          nameStore,
        }
      }
    } catch (error) {
      console.log(error)
    }
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
          let { type, brand, origin, size, color, material, gender } =
            await res.data
          cateCloList.forEach((item) =>
            item.value === type ? (type = item.name) : ""
          )
          setLabel(["Lo???i", "H??ng", "Xu???t x???", "Ch???t li???u", "D??nh cho ph??i"])
          setDetail([
            type,
            brand,
            origin,
            material,
            gender === "male" ? "nam" : "n???",
          ])
          const typeCheck = res.data.type
          return { typeCheck, size, color }
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
            gender,
          } = await res.data
          cateShoList.forEach((item) =>
            item.value === style ? (style = item.name) : ""
          )
          setLabel([
            "Lo???i",
            "????? gi??y",
            "D??i",
            "R???ng",
            "B???o h??nh",
            "Xu???t x???",
            "Ch???t li???u",
            "D??nh cho ph??i",
          ])
          setDetail([
            style,
            sole,
            height,
            weight,
            warranty,
            origin,
            material,
            gender === "male" ? "nam" : "n???",
          ])
          const typeCheck = res.data.style
          return { typeCheck, size, color }
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
          setLabel(["Lo???i", "H??ng", "Xu???t x???", "Ch???t li???u"])
          setDetail([type, brand, origin, material])
          const typeCheck = res.data.type
          return { typeCheck, color }
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
    let fetchDataState = true
    const fetchCompare = async (name) => {
      try {
        const res = await axios({
          method: "get",
          url: `https://tlcngroup2be.herokuapp.com/product/suggestions/name/${name}`,
        })
        if (res.status === 200 && fetchDataState) {
          const listItem = res.data.filter(
            (item) => item !== null && item.productId !== Number(id)
          )
          setListCompareItem(listItem)
        }
      } catch (error) {}
    }

    const fetchSame = async (cate, type) => {
      try {
        const res = await axios({
          method: "get",
          url: `https://tlcngroup2be.herokuapp.com/product/category/${cate}/type/${type}`,
        })
        if (res.status === 200 && fetchDataState) {
          setReady(true)
          const listItem = res.data.filter(
            (item) => item !== null && item.id !== Number(id)
          )
          let finalList = ""
          if (listItem.length <= 12) {
            finalList = listItem
          } else {
            finalList = listItem.slice(0, 12)
            const name =
              cate === 1
                ? cateCloList.filter((item) => item.value === type)
                : cate === 2
                ? cateShoList.filter((item) => item.value === type)
                : cateAccList.filter((item) => item.value === type)
            finalList.push({ category: String(cate), type, name: name[0].name })
          }
          setListSameItem(finalList)
        }
      } catch (error) {}
    }
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
        storeId,
        nameStore,
      } = res
      if ((status === 200) & fetchDataState) {
        const result = await fetchCategory(id, category)
        fetchSame(category, result.typeCheck)
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
            storeId,
            nameStore,
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
            storeId,
            nameStore,
          })
        }
        const comment = await fetchComment()
        if (comment.status === 200 && fetchDataState) {
          setCmtList(comment.data)
        }
        setLoading(false)
      }
    }
    if (fetchDataState) {
      fetch()
    }
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
    document.documentElement.scrollTop = 0
    return () => {
      fetchDataState = false
      setLoading(false)
    }
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
                Trang ch???
              </div>

              <AiOutlineRight className='singleProd__breadcrum-divide' />
              <div className='singleProd__breadcrum-item'>
                {prod.category === 1
                  ? "Qu???n ??o"
                  : prod.category === 2
                  ? "Gi??y"
                  : "Ph??? ki???n"}
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
                            M??u s???c
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
                            K??ch c???
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
                        <label className='brief__product-label'>S??? l?????ng</label>
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
                            {prod.quantity} s???n ph???m
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {listCompareItem.length ? (
                    <div className='brief__product-compare'>
                      <div className='brief__product-compare-wrap'>
                        <div className='compare__item-desc'>
                          <div className='compare__item-title'>
                            {listCompareItem.length} s???n ph???m kh??c
                          </div>
                          <div className='compare__item-min-price'>
                            Gi?? t???{" "}
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(
                              Math.min(
                                ...listCompareItem.map((item) => item.price)
                              )
                            )}
                          </div>
                        </div>
                        <div
                          className='compare__item-btn'
                          onClick={() => (ref.current.style.display = "block")}
                        >
                          So s??nh
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='brief__product-compare'>
                      <div className='brief__product-compare-wrap'>
                        <div className='compare__item-desc'>
                          <div className='compare__item-title'>
                            So s??nh s???n ph???m:
                          </div>
                        </div>
                        <div className='amount__quantity'>
                          Hi???n ch??a c?? s???n ph???m ????? s?? s??nh
                        </div>
                      </div>
                    </div>
                  )}

                  <div className='brief__product-controls'>
                    <div
                      className='brief__product-btn btn btn-enhance'
                      onClick={() => handleAddCart("add")}
                    >
                      Th??m v??o gi??? h??ng
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

            {listCompareItem.length ? (
              <div
                className='singleProd__content'
                ref={ref}
                style={{ display: "none" }}
              >
                <div style={{ padding: "10px 10px 0" }}>
                  <div className='content__header'>
                    So s??nh gi?? s???n ph???m: {prod.name}
                  </div>
                </div>
                <div
                  className='singleProd__content-wrap'
                  style={{ display: "flex" }}
                >
                  {listCompareItem.map((item) => {
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
                            c??n {quantity}
                          </span> */}
                          </div>
                          <div className='product-item__origin'>
                            <span className='product-item__brand'>
                              Ti???m: {storeName}
                            </span>
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
                              <span className='product-item__sale-label'>
                                GI???M
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              ""
            )}

            <div className='singleProd__content'>
              <div style={{ padding: "10px 10px 0" }}>
                <div className='content__header'>S???N PH???M T????NG T???</div>
              </div>
              <div
                className='singleProd__content-wrap'
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                {listSameItem.length ? (
                  listSameItem
                    .slice(
                      0,
                      listSameItem.length <= 12
                        ? listSameItem.length
                        : listSameItem.length - 1
                    )
                    .map((item) => {
                      let {
                        id,
                        discount,
                        name,
                        price,
                        isDiscount,
                        image,
                        nameStore,
                      } = item
                      if (isDiscount) {
                        price = (price * (100 - discount)) / 100
                      }
                      return (
                        <div className='grid__colum-12-2' key={`same_${id}`}>
                          <div
                            className='product-item'
                            key={id}
                            onClick={() =>
                              (window.location.href = `${window.location.origin}/product/${id}`)
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
                            c??n {quantity}
                          </span> */}
                            </div>
                            <div className='product-item__origin'>
                              <span className='product-item__brand'>
                                Ti???m: {nameStore}
                              </span>
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
                                <span className='product-item__sale-label'>
                                  GI???M
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })
                ) : isReady ? (
                  <div className='waiting' style={{ height: "308px" }}>
                    Hi???n ch??a c?? s???n ph???m t????ng t???
                  </div>
                ) : (
                  <div className='waiting' style={{ height: "308px" }}>
                    Loading ...
                  </div>
                )}
                {listSameItem.length > 12 ? (
                  <div
                    style={{
                      width: "100%",
                      marginTop: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      className='compare__item-btn'
                      onClick={() =>
                        clicked(
                          listSameItem[12].category,
                          listSameItem[12].type,
                          listSameItem[12].name
                        )
                      }
                    >
                      Xem Th??m
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className='singleProd__content'>
              <div className='singleProd__content-wrap'>
                <div className='content__wrap'>
                  <div className='content__header'>CHI TI???T S???N PH???M</div>
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
                  <div className='content__header'>M?? T??? S???N PH???M</div>
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
                    ????NH GI?? S???N PH???M
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
                        <div className='item__text'>Ch??a c?? ????nh gi??</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {load && (
        <div
          className='modal__overlay'
          style={{ zIndex: "101", top: "0", height }}
        >
          <div className='loading'>
            <div className='loading__one'></div>
            <div className='loading__two'></div>
            <div className='loading__three'></div>
          </div>
        </div>
      )}
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
