import React from "react"
import logo from "../assets/img/logo.png"
import userImg from "../assets/img/user.png"

function Headeradmin() {
  let admin = localStorage.getItem("username")
  return (
    <div className='header' style={{ height: "60px" }}>
      <div className='grid'>
        <div className='header-sell'>
          <div className='header-sell__logo'>
            <a href='/' className='header-sell__logo-link'>
              <img src={logo} alt='' />
            </a>
          </div>
          <div className='header-sell__user'>
            <img src={userImg} alt='' className='header-sell__user-img' />
            <span className='header-sell__user-name'>{admin}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Headeradmin
