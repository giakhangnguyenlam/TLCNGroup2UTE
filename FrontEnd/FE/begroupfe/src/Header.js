import { React, useState } from "react"
import Navbar from "./Navbar"

function Header() {
  return (
    <header className='header'>
      <div className='grid'>
        <Navbar />
      </div>
    </header>
  )
}

export default Header
