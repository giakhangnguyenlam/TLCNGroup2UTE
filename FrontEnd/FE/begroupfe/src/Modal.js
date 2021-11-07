import React from "react"
import { useGlobalContext } from "./context"
import Signup from "./header/Signup"
import Login from "./header/Login"
import CreateStore from "./seller/CreateStore"
import UpdateStore from "./seller/UpdateStore"
import DetailStore from "./seller/DetailStore"
import UserComment from "./user/UserComment"
import OrderDetail from "./seller/OrderDetail"
function Modal() {
  const {
    isLogin,
    isSignup,
    isCreateStore,
    isUpdateStore,
    isDetailStore,
    isSellerSignup,
    isOrderDetail,
    isComment,
  } = useGlobalContext()
  if (isSignup || isSellerSignup) {
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
  if (isComment) {
    return <UserComment />
  }
  return <></>
}

export default Modal
