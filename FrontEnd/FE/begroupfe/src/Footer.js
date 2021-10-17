import React from "react"
import FooterDownload from "./FooterDownload"

function Footer() {
  return (
    <footer className='footer'>
      <div className='grid'>
        <div className='grid__row'>
          <div className='grid__colum-2-4'>
            <h3 className='footer__heading'>Chăm sóc khách hàng</h3>
            <ul className='footer-list'>
              <li className='footer-item'>
                <a href='' className='footer-item__link'>
                  Trung tâm trợ giúp
                </a>
              </li>
              <li className='footer-item'>
                <a href='' className='footer-item__link'>
                  Shopee Mail
                </a>
              </li>
              <li className='footer-item'>
                <a href='' className='footer-item__link'>
                  Hướng dẫn mua hàng
                </a>
              </li>
            </ul>
          </div>
          <div className='grid__colum-2-4'>
            <h3 className='footer__heading'>Giới thiệu</h3>
            <ul className='footer-list'>
              <li className='footer-item'>
                <a href='' className='footer-item__link'>
                  Về Shopee
                </a>
              </li>
              <li className='footer-item'>
                <a href='' className='footer-item__link'>
                  Tuyển dụng
                </a>
              </li>
              <li className='footer-item'>
                <a href='' className='footer-item__link'>
                  Điều khoản Shopee
                </a>
              </li>
            </ul>
          </div>
          <div className='grid__colum-2-4'>
            <h3 className='footer__heading'>Danh mục</h3>
            <ul className='footer-list'>
              <li className='footer-item'>
                <a href='' className='footer-item__link'>
                  Máy tính Acer
                </a>
              </li>
              <li className='footer-item'>
                <a href='' className='footer-item__link'>
                  Máy tính Asus
                </a>
              </li>
              <li className='footer-item'>
                <a href='' className='footer-item__link'>
                  Máy tính HP
                </a>
              </li>
              <li className='footer-item'>
                <a href='' className='footer-item__link'>
                  Máy tính Vaio
                </a>
              </li>
            </ul>
          </div>
          <div className='grid__colum-2-4'>
            <h3 className='footer__heading'>Theo dõi</h3>
            <ul className='footer-list'>
              <li className='footer-item'>
                <a href='' className='footer-item__link'>
                  <i className='footer-item__icon fab fa-facebook'></i>
                  Facebook
                </a>
              </li>
              <li className='footer-item'>
                <a href='' className='footer-item__link'>
                  <i className='footer-item__icon fab fa-instagram'></i>
                  Instagram
                </a>
              </li>
              <li className='footer-item'>
                <a href='' className='footer-item__link'>
                  <i className='footer-item__icon fab fa-linkedin'></i>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div className='grid__colum-2-4'>
            <h3 className='footer__heading'>Vào cửa hàng trên ứng dụng</h3>
            <FooterDownload />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
