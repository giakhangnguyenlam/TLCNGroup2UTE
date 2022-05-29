import axios from "axios"
import React, { useState, useContext, useEffect } from "react"

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const expire = localStorage.getItem("expire")
  const exp = new Date()
  if (
    exp.getTime() >= expire ||
    (window.location.pathname !== "/admin" && localStorage.getItem("adm"))
  ) {
    localStorage.removeItem("id")
    localStorage.removeItem("name")
    localStorage.removeItem("username")
    localStorage.removeItem("dateofbirth")
    localStorage.removeItem("email")
    localStorage.removeItem("address")
    localStorage.removeItem("gender")
    localStorage.removeItem("jwt")
    localStorage.removeItem("adm")
    localStorage.removeItem("role")
    localStorage.removeItem("expire")
  }

  const jwt = localStorage.getItem("jwt")
  const userId = localStorage.getItem("id")

  const [searchInfo, setSearchInfo] = useState("")
  const [body, setBody] = useState([])
  const [cart, setCart] = useState([])
  const [isCartUpdate, setIsCartUpdate] = useState(false)
  const [isReady, setReady] = useState(false)
  const [isCartReady, setCartReady] = useState(false)
  const [orderData, setOrderData] = useState([])
  const [sumCheckout, setSum] = useState(0)
  const [voucher, setVoucher] = useState([])

  const [isAdmin, setIsAdmin] = useState(false)
  const [auth, setAuth] = useState("login")
  const [cate, setCate] = useState("")
  const [cateType, setCateType] = useState("")
  const [cateName, setCateName] = useState("")

  const [isCreateStore, setIsCreateStore] = useState(false)
  const [isUpdateStore, setIsUpdateStore] = useState(false)
  const [isDetailStore, setIsDetailStore] = useState(false)
  const [isDetailCreate, setIsDetailCreate] = useState(false)
  const [isDetailUpdate, setIsDetailUpdate] = useState(false)
  const [isDetailInfo, setIsDetailInfo] = useState(false)
  const [isDetailDiscount, setIsDetailDiscount] = useState(false)
  const [isOrderDetail, setIsOrderDetail] = useState(false)
  const [isStatic, setIsStatic] = useState(false)
  const [isVoucher, setIsVoucher] = useState(false)
  const [isDiscount, setIsDiscount] = useState(false)
  const [isComment, setIsComment] = useState(false)

  const [idStoreUpdate, setIdStoreUpdate] = useState(null)
  const [idStoreProd, setIdStoreProd] = useState(null)
  const [cateStoreProd, setCateStoreProd] = useState(null)
  const [reloadSell, setReloadSell] = useState(false)
  const [reloadDetailStore, setReloadDetailStore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [raise, setRaise] = useState(false)
  const [adminPage, setAdminPage] = useState("user")

  const [cateClo, setCateClo] = useState({
    type: "",
    brand: "",
    origin: "",
    size: [],
    color: [],
    material: "",
    gender: "",
    productId: "",
  })
  const [cateSho, setCateSho] = useState({
    style: "",
    sole: "",
    origin: "",
    size: [],
    color: [],
    height: "",
    weight: "",
    material: "",
    warranty: "",
    gender: "",
    productId: "",
  })
  const [cateAcc, setCateAcc] = useState({
    type: "",
    brand: "",
    origin: "",
    color: [],
    material: "",
    productId: "",
  })

  const clearCateClo = () =>
    setCateClo({
      type: "",
      brand: "",
      origin: "",
      size: [],
      color: [],
      material: "",
      gender: "",
      productId: "",
    })
  const clearCateSho = () =>
    setCateSho({
      style: "",
      sole: "",
      origin: "",
      size: [],
      color: [],
      height: "",
      weight: "",
      material: "",
      warranty: "",
      gender: "",
      productId: "",
    })
  const clearCateAcc = () =>
    setCateAcc({
      type: "",
      brand: "",
      origin: "",
      color: [],
      material: "",
      productId: "",
    })

  const fetchCart = async () => {
    setCartReady(false)
    try {
      const res = await axios({
        method: "get",
        url: `https://utesharecode.herokuapp.com/item/iduser/${userId}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 200 && Array.isArray(res.data)) {
        const cartName = `cart${userId}`
        const tempCart = []
        if (
          localStorage.getItem(cartName) &&
          JSON.parse(localStorage.getItem(cartName)).length === 0
        ) {
          localStorage.removeItem(cartName)
        }
        res.data.forEach(async (item) => {
          const {
            idUser,
            idProduct,
            name,
            image,
            description,
            amount,
            price,
            id,
            shareCode,
            storeId,
            storeName,
          } = item
          if (idUser === userId) {
            tempCart.unshift({
              idUser,
              idProduct,
              name,
              image,
              description,
              amount,
              price,
              id,
              shareCode,
              storeId,
              storeName,
            })
          } else {
            tempCart.push({
              idUser,
              idProduct,
              name,
              image,
              description,
              amount,
              price,
              id,
              shareCode,
              storeId,
              storeName,
            })
          }
        })
        const storeDivide = tempCart
          .map((item) => item.storeId)
          .filter((v, i, a) => a.indexOf(v) === i)
        const finishCart = []
        storeDivide.forEach((item) =>
          finishCart.push(tempCart.filter((ele) => ele.storeId === item))
        )
        localStorage.setItem(cartName, JSON.stringify(finishCart))
        setCartReady(true)
      }
      // else {
      //   console.log(res.data, res.status)
      //   setCart([])
      // }
    } catch (error) {
      console.log("cart", error)
    }
  }

  const fetchData = async () => {
    let url = "https://tlcngroup2be.herokuapp.com/product"
    let categoryy =
      (cate === "1" && "clothes") ||
      (cate === "2" && "shoes") ||
      (cate === "3" && "accessories")

    if (cate) {
      url = `https://tlcngroup2be.herokuapp.com/product/category/${cate}`
      if (cateType) {
        url = `https://tlcngroup2be.herokuapp.com/product/category/${categoryy}/${cateType}`
      }
      if (cateType === "khac1" || cateType === "khac2") {
        url = `https://tlcngroup2be.herokuapp.com/product/category/${categoryy}/khac`
      }
    }
    setReady(false)
    try {
      let res = await axios({
        method: "GET",
        url,
      })
      if (res.status === 200) {
        let arr = await res.data.filter((item) => item !== null)
        setBody(arr)
        setReady(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [cate, cateType])

  useEffect(() => {
    if (userId && jwt) {
      fetchCart()
    }
  }, [isCartUpdate])

  return (
    <AppContext.Provider
      value={{
        searchInfo,
        body,
        cart,
        isCartUpdate,
        isReady,
        isCartReady,
        orderData,
        sumCheckout,
        voucher,
        isAdmin,
        auth,
        cate,
        cateType,
        cateName,
        reloadSell,
        reloadDetailStore,
        isCreateStore,
        isUpdateStore,
        isDetailStore,
        isDetailCreate,
        isDetailUpdate,
        isDetailInfo,
        isDetailDiscount,
        isOrderDetail,
        isStatic,
        isVoucher,
        isDiscount,
        isComment,
        idStoreUpdate,
        idStoreProd,
        cateStoreProd,
        cateClo,
        cateSho,
        cateAcc,
        loading,
        raise,
        adminPage,
        setSearchInfo,
        setBody,
        setCart,
        setCartReady,
        setIsCartUpdate,
        setOrderData,
        setSum,
        setVoucher,
        setIsDiscount,
        setIsAdmin,
        setAuth,
        setCate,
        setCateType,
        setCateName,
        setReloadSell,
        setReloadDetailStore,
        setIsCreateStore,
        setIsUpdateStore,
        setIsDetailStore,
        setIsDetailCreate,
        setIsDetailUpdate,
        setIsDetailInfo,
        setIsDetailDiscount,
        setIsOrderDetail,
        setIsStatic,
        setIsVoucher,
        setIsComment,
        setIdStoreUpdate,
        setIdStoreProd,
        setCateStoreProd,
        setCateClo,
        setCateSho,
        setCateAcc,
        clearCateClo,
        clearCateSho,
        clearCateAcc,
        setLoading,
        setRaise,
        setAdminPage,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
