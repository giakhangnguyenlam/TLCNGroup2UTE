import React from "react"
import { useGlobalContext } from "../context"
import AdminLogin from "./AdminLogin"
import AdminOrder from "./AdminOrder"
import AdminOrderUnpay from "./AdminOrderUnpay"
import AdminProduct from "./AdminProduct"
import AdminStore from "./AdminStore"
import AdminUser from "./AdminUser"
import Headeradmin from "./Headeradmin"

function AdminModal() {
  const { isAdmin, adminPage } = useGlobalContext()
  if (isAdmin) {
    if (adminPage === "user") {
      return (
        <>
          <Headeradmin />
          <AdminUser />
        </>
      )
    }
    if (adminPage === "seller") {
      return (
        <>
          <Headeradmin />
          <AdminUser />
        </>
      )
    }
    if (adminPage === "store") {
      return (
        <>
          <Headeradmin />
          <AdminStore />
        </>
      )
    }
    if (adminPage === "order") {
      return (
        <>
          <Headeradmin />
          <AdminOrder />
        </>
      )
    }
    if (adminPage === "unpay") {
      return (
        <>
          <Headeradmin />
          <AdminOrderUnpay />
        </>
      )
    }
    if (adminPage === "product") {
      return (
        <>
          <Headeradmin />
          <AdminProduct />
        </>
      )
    }
  } else {
    return <AdminLogin />
  }
}

export default AdminModal
