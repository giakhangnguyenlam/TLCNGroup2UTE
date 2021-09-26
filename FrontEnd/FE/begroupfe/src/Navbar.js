import { React, useState } from 'react'
import { IoLogoFacebook, IoLogoInstagram } from 'react-icons/io'
import acer from './assets/img/acer.png'
import appGalery from './assets/img/appgalery.png'
import apple from './assets/img/apple.png'
import qrCode from './assets/img/qr_code.png'
import ggPlay from './assets/img/ggplay.png'

function Navbar({ isLogin, setIsLogin, isSignup, setIsSignup }) {
  return (
    <nav className='header__navbar'>
      <ul className='header__navbar-list'>
        <li className='header__navbar-item --divine'>Trở thành người bán</li>
        <li className='header__navbar-item --divine --qr'>
          Tải ứng dụng
          {/* Header QR */}
          <div className='header__qrcode'>
            <img src={qrCode} alt='qr code' className='header__qrcode-img' />
            <div className='header__qrcode-apps'>
              <a href='' className='header_qrcode-link'>
                <img
                  src={apple}
                  alt='AppleStore'
                  className='header_qrcode-store-img'
                />
              </a>
              <a href='' className='header_qrcode-link'>
                <img
                  src={ggPlay}
                  alt='GGplay'
                  className='header_qrcode-store-img'
                />
              </a>
              <a href='' className='header_qrcode-link'>
                <img
                  src={appGalery}
                  alt='AppGalery'
                  className='header_qrcode-store-img'
                />
              </a>
            </div>
          </div>
        </li>
        <li className='header__navbar-item'>
          <span className='header__navbar-title--nopointer'>Kết nối</span>
          <a href='' className='header__navbar-icon-link'>
            <IoLogoFacebook />
          </a>
          <a href='' className='header__navbar-icon-link'>
            <IoLogoInstagram />
          </a>
        </li>
      </ul>
      <ul className='header__navbar-list'>
        <li className='header__navbar-item --divine --noti'>
          <a href='' className='header__navbar-item-link'>
            <i className='header__navbar-icon fas fa-bell'></i>
            Thông báo
          </a>

          {/* Header notification */}
          <div className='header__noti'>
            <header className='header__noti-header'>
              <h3>Thông báo mới nhận</h3>
            </header>
            <ul className='header__noti-list'>
              <li className='header__noti-item header__noti-item--viewed'>
                <a href='' className='header__noti-link'>
                  <img
                    src={acer}
                    alt='Ảnh acer nitro 7'
                    className='header__noti-img'
                  />
                  <div className='header__noti-info'>
                    <span className='header__noti-name'>Công nghệ</span>
                    <span className='header__noti-desc'>
                      Máy tính acer nitro 7 mới ra mắt
                    </span>
                  </div>
                </a>
              </li>
              <li className='header__noti-item'>
                <a href='' className='header__noti-link'>
                  <img
                    src={acer}
                    alt='Ảnh acer nitro 7'
                    className='header__noti-img'
                  />
                  <div className='header__noti-info'>
                    <span className='header__noti-name'>
                      Công nghệ máy tính xách tay thế hệ mới năm 2025
                    </span>
                    <span className='header__noti-desc'>
                      Máy tính acer nitro 7 mới ra với tính năng ưu việt so với
                      các dòng máy cùng phân khúc
                    </span>
                  </div>
                </a>
              </li>
              <li className='header__noti-item'>
                <a href='' className='header__noti-link'>
                  <img
                    src={acer}
                    alt='Ảnh acer nitro 7'
                    className='header__noti-img'
                  />
                  <div className='header__noti-info'>
                    <span className='header__noti-name'>
                      Công nghệ máy tính xách tay thế hệ mới năm 2025
                    </span>
                    <span className='header__noti-desc'>
                      Máy tính acer nitro 7 mới ra với tính năng ưu việt so với
                      các dòng máy cùng phân khúc
                    </span>
                  </div>
                </a>
              </li>
            </ul>
            <footer className='header__noti-footer'>
              <a href='' className='header__noti-footer-btn'>
                Xem tất cả
              </a>
            </footer>
          </div>
        </li>
        <li className='header__navbar-item --divine'>
          <a href='' className='header__navbar-item-link'>
            <i className='header__navbar-icon far fa-question-circle'></i>
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
