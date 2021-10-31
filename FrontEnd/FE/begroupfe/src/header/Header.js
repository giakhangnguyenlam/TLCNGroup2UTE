import { React, useState } from "react"
import HeaderSearch from "./HeaderSearch"
import Navbar from "./Navbar"

function Header() {
  return (
    <header className='header'>
      <div className='grid'>
        <Navbar />
        <HeaderSearch />
      </div>
    </header>
  )
}

export default Header
