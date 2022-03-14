import React from "react"
import { useGlobalContext } from "../context"
import CreateStore from "../seller/CreateStore"
import UpdateStore from "../seller/UpdateStore"
import ModalDetailCreate from "../seller/DetalStore/ModalDetailCreate"
import ModalDetailUpdate from "../seller/DetalStore/ModalDetailUpdate"
import ModalDetailInfo from "../seller/DetalStore/ModalDetailInfo"
import UserComment from "../user/UserComment"
import OrderDetail from "../seller/OrderDetail"
import Static from "../seller/Static"
import ModalDetailDiscount from "../seller/DetalStore/ModalDetailDiscount"
function Modal() {
  const {
    isCreateStore,
    isUpdateStore,
    isOrderDetail,
    isStatic,
    isComment,
    isDetailCreate,
    isDetailUpdate,
    isDetailInfo,
  } = useGlobalContext()
  if (isCreateStore) {
    return <CreateStore />
  }
  if (isUpdateStore) {
    return <UpdateStore />
  }
  if (isDetailCreate) {
    return <ModalDetailCreate />
  }
  if (isDetailUpdate) {
    return <ModalDetailUpdate />
  }
  if (isDetailInfo) {
    return <ModalDetailInfo />
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
