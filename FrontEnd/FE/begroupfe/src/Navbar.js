import { React } from "react"
import { IoLogoFacebook, IoLogoInstagram } from "react-icons/io"
import { FaBell, FaQuestionCircle } from "react-icons/fa"
import HeaderQrLink from "./HeaderQrLink"
import qrCode from "./assets/img/qr_code.png"
import HeaderNoti from "./HeaderNoti"
import { useGlobalContext } from "./context"

function Navbar() {
  const { isLogin, setIsLogin, isSignup, setIsSignup } = useGlobalContext()
  return (
    <nav className='header__navbar'>
      <ul className='header__navbar-list'>
        <li className='header__navbar-item --divine'>
          <a href='/seller' className='header__navbar-item-link'>
            Trở thành người bán
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
      </ul>
    </nav>
  )
}

export default Navbar
