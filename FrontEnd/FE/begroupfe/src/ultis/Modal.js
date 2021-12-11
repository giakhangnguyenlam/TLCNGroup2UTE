import React from "react"
import { useGlobalContext } from "../context"
import Signup from "../header/Signup"
import Login from "../header/Login"
import CreateStore from "../seller/CreateStore"
import UpdateStore from "../seller/UpdateStore"
import DetailStore from "../seller/DetailStore"
import UserComment from "../user/UserComment"
import OrderDetail from "../seller/OrderDetail"
import Static from "../seller/Static"
function Modal() {
  const {
    isLogin,
    isSignup,
    isCreateStore,
    isUpdateStore,
    isDetailStore,
    isSellerSignup,
    isShipperSignup,
    isOrderDetail,
    isStatic,
    isComment,
  } = useGlobalContext()
  if (isSignup || isSellerSignup || isShipperSignup) {
    return <Signup />
  }
  if (isLogin) {
    return <Login />
  }
  if (isCreateStore) {
    return <CreateStore />
  }
  if (isUpdateStore) {
    return <UpdateStore />
  }
  if (isDetailStore) {
    return <DetailStore />
  }
  if (isOrderDetail) {
    return <OrderDetail />
  }
  if (isStatic) {
    return <Static />
  }
  if (isComment) {
    return <UserComment />
  }
  return <></>
}

export default Modal
