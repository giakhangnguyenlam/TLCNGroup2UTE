import React from "react"
import { useHistory } from "react-router-dom"
import logo from "../assets/img/logo.png"
import { useGlobalContext } from "../context"

function HeaderSeller() {
  const { setAuth } = useGlobalContext()
  const name = localStorage.getItem("name")
  const history = useHistory()

  const redirect = (page) => {
    history.push(`${page}`)
  }
  const handleLogout = (type) => {
    localStorage.removeItem("id")
    localStorage.removeItem("name")
    localStorage.removeItem("dateofbirth")
    localStorage.removeItem("email")
    localStorage.removeItem("address")
    localStorage.removeItem("phone")
    localStorage.removeItem("gender")
    localStorage.removeItem("jwt")
    localStorage.removeItem("role")
    localStorage.removeItem("expire")
    if (type !== "logout") {
      authPage(type)
    } else {
      redirect("/")
    }
  }

  const authPage = (authType) => {
    setAuth(authType)
    redirect("/user/auth")
  }

  return (
    <div className='header' style={{ height: "60px" }}>
      <div className='grid'>
        <div className='header-sell'>
          <div className='header-sell__logo'>
            <a href='/seller/store' className='header-sell__logo-link'>
              <img src={logo} alt='shopping technology' />
            </a>
          </div>
          <li className='header__navbar-item header__navbar-user'>
            <span className='header__navbar-user-name'>Xin chào, {name}!</span>

            <ul className='header__navbar-user-menu'>
              <li className='header__navbar-user-item'>
                <a href='/user/setting'>Tài khoản của tôi</a>
              </li>
              <li
                className='header__navbar-user-item --separate'
                onClick={() => handleLogout("login")}
              >
                <a href=''>Đổi tài khoản</a>
              </li>
              <li
                className='header__navbar-user-item --separate'
                onClick={() => handleLogout("logout")}
              >
                <a href=''>Đăng xuất</a>
              </li>
            </ul>
          </li>
        </div>
      </div>
    </div>
  )
}

export default HeaderSeller
