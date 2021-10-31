import React from "react"
import logo from "../assets/img/logo.png"
import HeaderCart from "./HeaderCart"
import SearchBar from "./SearchBar"

function HeaderSearch() {
  return (
    <div className='header-with-search'>
      <div className='header__logo'>
        <a href='/' className='header__logo-link'>
          <img src={logo} alt='' />
        </a>
      </div>

      <SearchBar />
      <HeaderCart />
    </div>
  )
}

export default HeaderSearch
