import axios from "axios"
import React, { useState, useContext, useEffect } from "react"

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const jwt = localStorage.getItem("jwt")
  const userId = localStorage.getItem("id")

  const [searchInfo, setSearchInfo] = useState("")
  const [body, setBody] = useState([])
  const [cart, setCart] = useState([])
  const [isCartUpdate, setIsCartUpdate] = useState(false)
  const [isReady, setReady] = useState(false)
  const [orderData, setOrderData] = useState([])

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
    try {
      let res = await axios({
        method: "get",
        url: `https://cnpmmbe.herokuapp.com/item/iduser/${userId}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 200 && Array.isArray(res.data)) {
        setCart(res.data)
      } else {
        setCart([])
      }
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
        await setBody(arr)
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
  }, [isCartUpdate, jwt, userId])

  // useEffect(() => {
  //   userId && fetchCart()
  //   fetchData()
  // }, [])

  return (
    <AppContext.Provider
      value={{
        searchInfo,
        body,
        cart,
        isCartUpdate,
        isReady,
        orderData,
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
        setIsCartUpdate,
        setOrderData,
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
