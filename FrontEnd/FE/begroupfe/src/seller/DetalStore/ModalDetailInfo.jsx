import React from "react"
import { useGlobalContext } from "../../context"
import Info1 from "./Info1"
import Info2 from "./Info2"
import Info3 from "./Info3"

function ModalDetailInfo() {
  const { cateStoreProd } = useGlobalContext()
  if (cateStoreProd === 1) {
    return <Info1 />
  }
  if (cateStoreProd === 2) {
    return <Info2 />
  }
  if (cateStoreProd === 3) {
    return <Info3 />
  }
}

export default ModalDetailInfo
