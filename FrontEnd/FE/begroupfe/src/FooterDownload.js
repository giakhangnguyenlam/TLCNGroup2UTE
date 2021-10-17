import React from "react"
import { qrLinks } from "./data"
import qr from "./assets/img/qr_code.png"

function FooterDownload() {
  return (
    <div className='footer__download'>
      <img href='' src={qr} alt='' className='footer__download-qr'></img>
      <div className='footer__download-apps'>
        {qrLinks.map((qrlink, index) => {
          const { name, src, link } = qrlink
          return (
            <img
              href={link}
              src={src}
              alt={name}
              className='footer__download-apps-img'
              key={index}
            />
          )
        })}
      </div>
    </div>
  )
}

export default FooterDownload
