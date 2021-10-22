import { React } from "react"
import { IoLogoFacebook, IoLogoInstagram } from "react-icons/io"
import { FaBell, FaQuestionCircle } from "react-icons/fa"
import HeaderQrLink from "./HeaderQrLink"
import qrCode from "./assets/img/qr_code.png"
import HeaderNoti from "./HeaderNoti"
import { useGlobalContext } from "./context"
import { useHistory } from "react-router"

function Navbar() {
  const { isLogin, setIsLogin, isSignup, setIsSignup } = useGlobalContext()
  const userRole = localStorage.getItem("role")
  const userName = localStorage.getItem("name")
  const history = useHistory()
  const redirectUser = () => {
    history.push("/user/account/profile")
  }
  const handleLogout = () => {
    localStorage.removeItem("id")
    localStorage.removeItem("name")
    localStorage.removeItem("dateofbirth")
    localStorage.removeItem("email")
    localStorage.removeItem("address")
    localStorage.removeItem("gender")
    localStorage.removeItem("jwt")
    localStorage.removeItem("role")
    localStorage.removeItem("expire")
  }
  return (
    <nav className='header__navbar'>
      <ul className='header__navbar-list'>
        <li className='header__navbar-item --divine'>
          <a href='/seller' className='header__navbar-item-link'>
            {userRole === "ROLE_SELLER"
              ? "Quản lý cửa hàng"
              : "Trở thành người bán"}
          </a>
        </li>
        <li className='header__navbar-item --divine --qr'>
          Tải ứng dụng
          {/* Header QR */}
          <div className='header__qrcode'>
            <img src={qrCode} alt='qr code' className='header__qrcode-img' />
            <HeaderQrLink />
          </div>
        </li>
        <li className='header__navbar-item'>
          <span className='header__navbar-title--nopointer'>Kết nối</span>
          <a
            href='https://www.facebook.com/'
            className='header__navbar-icon-link'
          >
            <IoLogoFacebook />
          </a>
          <a
            href='https://www.instagram.com/'
            className='header__navbar-icon-link'
          >
            <IoLogoInstagram />
          </a>
        </li>
      </ul>
      <ul className='header__navbar-list'>
        <li className='header__navbar-item --divine --noti'>
          <a href='' className='header__navbar-item-link'>
            <FaBell className='header__navbar-icon' />
            Thông báo
          </a>
          {/* Header notification */}
          <HeaderNoti />
        </li>
        <li className='header__navbar-item --divine'>
          <a href='/about' className='header__navbar-item-link'>
            <FaQuestionCircle className='header__navbar-icon' />
            Hỗ trợ
          </a>
        </li>
        {userName ? (
          <li
            className='header__navbar-item header__navbar-user'
            onClick={redirectUser}
          >
            <span className='header__navbar-user-name'>
              Xin chào, {userName}!
            </span>

            <ul className='header__navbar-user-menu'>
              <li className='header__navbar-user-item'>
                <a href='/user/account/profile'>Tài khoản của tôi</a>
              </li>
              <li className='header__navbar-user-item'>
                <a href=''>Đơn hàng</a>
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
              onClick={() => setIsSignup(!isSignup)}
            >
              Đăng ký
            </li>
            <li
              className='header__navbar-item header__navbar-item--bold'
              onClick={() => setIsLogin(!isLogin)}
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
