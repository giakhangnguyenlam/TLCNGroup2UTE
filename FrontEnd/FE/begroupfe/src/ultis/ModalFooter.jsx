import React from "react"
import { FaFacebook, FaGoogle } from "react-icons/fa"

function ModalFooter() {
  return (
    <div className='auth-form__socials'>
      <button className='btn btn--with-icon btn--size-s --facebook'>
        <FaFacebook className='auth-form__socials-icon' />
        <span className='auth-form__social-text'>Kết nối với Facebook</span>
      </button>
      <button className='btn btn--with-icon btn--size-s --google'>
        <FaGoogle className='auth-form__socials-icon' />
        <span className='auth-form__social-text'>Kết nối với Google</span>
      </button>
    </div>
  )
}

export default ModalFooter
