import { React } from "react"
import { FaQuestionCircle } from "react-icons/fa"
import { useGlobalContext } from "../context"
import { useHistory } from "react-router"

function Navbar() {
  const { setIsLogin, setIsSignup, setIsSellerSignup, setIsShipperSignup } =
    useGlobalContext()
  const userRole = localStorage.getItem("role")
  const userName = localStorage.getItem("name")
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
    <nav className='header__navbar'>
      <ul className='header__navbar-list'>
        <li className='header__navbar-item --divine'>
          <div
            className='header__navbar-item-link'
            onClick={
              userRole === "ROLE_SELLER"
                ? () => redirect("/seller")
                : () => setIsSellerSignup(true)
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
                : () => setIsShipperSignup(true)
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
                <a onClick={() => redirect("/user/account/profile")}>
                  Tài khoản của tôi
                </a>
              </li>
              <li className='header__navbar-user-item'>
                <a onClick={() => redirect("/user/order")}>Đơn hàng</a>
              </li>
              <li className='header__navbar-user-item'>
                <a href=''>Cài đặt</a>
              </li>
              <li
                className='header__navbar-user-item --separate'
                onClick={handleLogout}
              >
                <a href=''>Đăng xuất</a>
              </li>
            </ul>
          </li>
        ) : (
          <>
            <li
              className='header__navbar-item header__navbar-item--bold --divine'
              onClick={() => setIsSignup(true)}
            >
              Đăng ký
            </li>
            <li
              className='header__navbar-item header__navbar-item--bold'
              onClick={() => setIsLogin(true)}
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
