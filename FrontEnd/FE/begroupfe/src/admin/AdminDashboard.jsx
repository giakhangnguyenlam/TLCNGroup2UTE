import axios from "axios"
import { React, useEffect, useState } from "react"
import "../assets/css/adminDashboard.css"
import DashboardItem from "./DashboardItem"

function AdminDashboard() {
  const jwt = localStorage.getItem("jwt")
  const [data, setData] = useState({})

  useEffect(() => {
    const userLink = axios({
      method: "GET",
      url: "https://tlcngroup2be.herokuapp.com/admin/numberofuser",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    const productLink = axios({
      method: "GET",
      url: "https://tlcngroup2be.herokuapp.com/admin/numberofproduct",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    const storeLink = axios({
      method: "GET",
      url: "https://tlcngroup2be.herokuapp.com/admin/numberofstore",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    const orderLink = axios({
      method: "GET",
      url: "https://tlcngroup2be.herokuapp.com/admin/numberoforder",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    axios
      .all([userLink, productLink, storeLink, orderLink])
      .then(
        axios.spread((...res) => {
          const user = res[0].data
          const store = res[1].data
          const product = res[2].data
          const order = res[3].data
          setData({ user, store, product, order })
        })
      )
      .catch((errors) => {
        // react on errors.
      })
  }, [])

  useEffect(() => {})

  return (
    <div className='product'>
      <div className='grid__row'>
        <div
          className='auth-form__container'
          style={{
            width: "100%",
            backgroundColor: "var(--white-color)",
          }}
        >
          <div className='admin-dashboard__wrap'>
            <div className='admin-dashboard__column'>
              <DashboardItem
                data={data.user}
                title={"Người dùng"}
                background={{
                  backgroundImage: "linear-gradient(45deg, #451fc3, #2a77d7)",
                }}
              />
              <DashboardItem
                data={data.product}
                title={"Sản phẩm"}
                background={{
                  backgroundImage: "linear-gradient(45deg, #4e01bc, #2d6cd4)",
                }}
              />
            </div>
            <div className='admin-dashboard__column'>
              <DashboardItem
                data={data.store}
                title={"Cửa hàng"}
                background={{
                  backgroundImage: "linear-gradient(45deg, #384acc, #1aaae2)",
                }}
              />
              <DashboardItem
                data={data.order}
                title={"Đơn hàng"}
                background={{
                  backgroundImage: "linear-gradient(45deg, #3f34c8, #228fdc)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
