import React from "react"
import { useHistory } from "react-router-dom"
import logo from "../assets/img/logo.png"

function HeaderSeller() {
  const name = localStorage.getItem("name")
  const history = useHistory()

  const redirect = (page) => {
    history.push(`${page}`)
  }
  const handleLogout = () => {
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
    redirect("/")
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
                <a onClick={() => redirect("/user/account/profile")}>
                  Tài khoản của tôi
                </a>
              </li>
              <li
                className='header__navbar-user-item --separate'
                onClick={handleLogout}
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
