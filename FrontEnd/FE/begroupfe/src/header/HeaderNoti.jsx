import React from "react"
import { notis } from "../ultis/data"

function HeaderNoti() {
  return (
    <div className='header__noti'>
      <header className='header__noti-header'>
        <h3>Thông báo mới nhận</h3>
      </header>
      <ul className='header__noti-list'>
        {notis.map((noti, index) => {
          const { name, src, href, text, desc } = noti
          return (
            <li className='header__noti-item' key={index}>
              {/*header__noti-item--viewed*/}
              <a href={href} className='header__noti-link'>
                <img src={src} alt={name} className='header__noti-img' />
                <div className='header__noti-info'>
                  <span className='header__noti-name'>{text}</span>
                  <span className='header__noti-desc'>{desc}</span>
                </div>
              </a>
            </li>
          )
        })}
      </ul>
      <footer className='header__noti-footer'>
        <a href='' className='header__noti-footer-btn'>
          Xem tất cả
        </a>
      </footer>
    </div>
  )
}

export default HeaderNoti
