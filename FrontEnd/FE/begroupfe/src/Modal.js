import React from "react"
import { useGlobalContext } from "./context"
import Signup from "./Signup"
import Login from "./Login"
import CreateStore from "./CreateStore"
import UpdateStore from "./UpdateStore"
import DetailStore from "./DetailStore"

function Modal() {
  const { isLogin, isSignup, isCreateStore, isUpdateStore, isDetailStore } =
    useGlobalContext()
  if (isSignup) {
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
  return <></>
}

export default Modal
