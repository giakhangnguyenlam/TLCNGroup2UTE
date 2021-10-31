import React from "react"
import { qrLinks } from "../data"
function HeaderQrLink() {
  return (
    <div className='header__qrcode-apps'>
      {qrLinks.map((link, index) => {
        const { name, src, href } = link
        return (
          <a href={href} className='header_qrcode-link' key={index}>
            <img src={src} alt={name} className='header_qrcode-store-img' />
          </a>
        )
      })}
    </div>
  )
}

export default HeaderQrLink
