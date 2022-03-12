import { React } from "react"
import { useGlobalContext } from "../context"
import Logo from "../assets/img/output-onlinepngtools.png"

function HeaderAuth() {
  const { auth } = useGlobalContext()
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
            <div className='header-auth__title'>
              {auth === "login" ? "Đăng nhập" : "Đăng ký"}
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default HeaderAuth
