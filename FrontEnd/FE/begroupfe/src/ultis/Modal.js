import React from "react"
import { useGlobalContext } from "../context"
import CreateStore from "../seller/CreateStore"
import UpdateStore from "../seller/UpdateStore"
import DetailStore from "../seller/DetailStore"
import UserComment from "../user/UserComment"
import OrderDetail from "../seller/OrderDetail"
import Static from "../seller/Static"
function Modal() {
  const {
    isCreateStore,
    isUpdateStore,
    isDetailStore,
    isOrderDetail,
    isStatic,
    isComment,
  } = useGlobalContext()
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
