import { React } from "react"
import { FaQuestionCircle } from "react-icons/fa"
import { useGlobalContext } from "../context"
import { useHistory } from "react-router"

function Navbar() {
  const { setAuth } = useGlobalContext()
  const userRole = localStorage.getItem("role")
  const userName = localStorage.getItem("name")
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
    <nav className='header__navbar'>
      <ul className='header__navbar-list'>
        <li className='header__navbar-item --divine'>
          <div
            className='header__navbar-item-link'
            onClick={
              userRole === "ROLE_SELLER"
                ? () => redirect("/seller/store")
                : () => authPage("sellerSignup")
            }
          >
            {userRole === "ROLE_SELLER"
              ? "Quản lý cửa hàng"
              : "Trở thành người bán"}
          </div>
        </li>
        <li className='header__navbar-item'>
          <div
            className='header__navbar-item-link'
            onClick={
              userRole === "ROLE_SHIPPER"
                ? () => redirect("/shipper")
                : () => authPage("shipperSignup")
            }
          >
            {userRole === "ROLE_SHIPPER"
              ? "Trang người giao hàng"
              : "Trở thành người giao hàng"}
          </div>
        </li>
      </ul>
      <ul className='header__navbar-list'>
        <li className='header__navbar-item --divine'>
          <a href='/about' className='header__navbar-item-link'>
            <FaQuestionCircle className='header__navbar-icon' />
            Hỗ trợ
          </a>
        </li>
        {userName ? (
          <li className='header__navbar-item header__navbar-user'>
            <span className='header__navbar-user-name'>
              Xin chào, {userName}!
            </span>

            <ul className='header__navbar-user-menu'>
              <li className='header__navbar-user-item'>
                <a href='/user/setting'>Tài khoản của tôi</a>
              </li>
              <li
                className='header__navbar-user-item'
                onClick={() => handleLogout("login")}
              >
                <a href=''>Đổi tài khoản</a>
              </li>
              <li className='header__navbar-user-item'>
                <a href='/user/setting?state=order'>Đơn hàng</a>
              </li>
              <li
                className='header__navbar-user-item --separate'
                onClick={() => handleLogout("logout")}
              >
                <a href=''>Đăng xuất</a>
              </li>
            </ul>
          </li>
        ) : (
          <>
            <li
              className='header__navbar-item header__navbar-item--bold --divine'
              onClick={() => authPage("signup")}
            >
              Đăng ký
            </li>
            <li
              className='header__navbar-item header__navbar-item--bold'
              onClick={() => authPage("login")}
            >
              Đăng nhập
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
