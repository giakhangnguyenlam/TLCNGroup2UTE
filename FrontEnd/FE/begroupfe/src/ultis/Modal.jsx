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
import Voucher from "../seller/Voucher"
import AdminDiscount from "../admin/AdminDiscount"
function Modal() {
  const {
    isCreateStore,
    isUpdateStore,
    isOrderDetail,
    isStatic,
    isVoucher,
    isDiscount,
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
  if (isVoucher) {
    return <Voucher />
  }
  if (isDiscount) {
    return <AdminDiscount />
  }
  if (isComment) {
    return <UserComment />
  }
  return <></>
}

export default Modal
