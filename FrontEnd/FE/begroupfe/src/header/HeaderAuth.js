import { React } from "react"
import Logo from "../assets/img/output-onlinepngtools.png"

function HeaderAuth() {
  return (
    <header className='header-auth'>
      <div className='grid'>
        <nav className='header-auth-nav'>
          <div className='header-auth-nav__item'>
            <div className='header-auth__logo'>
              <a href='/' className='header__logo-link'>
                <img src={Logo} alt='' />
              </a>
            </div>
            <div className='header-auth__title'>Đăng ký</div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default HeaderAuth
