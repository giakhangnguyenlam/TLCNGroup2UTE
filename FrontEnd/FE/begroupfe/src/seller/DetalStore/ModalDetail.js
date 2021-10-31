import React from "react"
import { useGlobalContext } from "../../context"
import ModalDetailCreate from "./ModalDetailCreate"
import ModalDetailUpdate from "./ModalDetailUpdate"
import ModalDetailInfo from "./ModalDetailInfo"

function ModalDetail() {
  const { isDetailCreate, isDetailUpdate, isDetailInfo } = useGlobalContext()
  if (isDetailCreate) {
    return <ModalDetailCreate />
  }
  if (isDetailUpdate) {
    return <ModalDetailUpdate />
  }
  if (isDetailInfo) {
    return <ModalDetailInfo />
  }
  return <></>
}

export default ModalDetail
