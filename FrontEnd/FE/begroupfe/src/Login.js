import axios from "axios"
import { useState } from "react"
import { FaFacebook, FaGoogle } from "react-icons/fa"

const Login = ({ isLogin, setIsLogin, isSignup, setIsSignup }) => {
  const [account, setAccount] = useState({
    username: "",
    password: "",
  })
  const handlechange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setAccount({ ...account, [name]: value })
  }
  const changeSignup = () => {
    setIsLogin(!isLogin)
    setIsSignup(!isSignup)
  }
  const fetchData = () => {
    axios({
      method: "post",
      url: "http://localhost:8080/login",
      data: { ...account },
      headers: { "Access-Control-Allow-Origin": "*" },
      responseType: "json",
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    fetchData()
  }
  return (
    <div className='modal'>
      <div className='modal__overlay'></div>
      <div className='modal__body'>
        <div className='auth-form'>
          <div className='auth-form__container'>
            <div className='auth-form__header'>
              <h3 className='auth-form__heading'> Đăng nhập</h3>
              <span className='auth-form__switch-btn' onClick={changeSignup}>
                Đăng ký
              </span>
            </div>

            <div className='auth-form__form'>
              <div className='auth-form__group'>
                <input
                  type='text'
                  name='username'
                  className='auth-form__input'
                  placeholder='Tên đăng nhập'
                  value={account.username}
                  onChange={handlechange}
                />
              </div>
              <div className='auth-form__group'>
                <input
                  type='password'
                  name='password'
                  className='auth-form__input'
                  placeholder='Mật khẩu'
                  value={account.password}
                  onChange={handlechange}
                />
              </div>
            </div>

            <div className='auth-form__aside'>
              <div className='auth-form__help'>
                <a href='' className='auth-form__help-link'>
                  Quên mật khẩu
                </a>
                <a href='' className='auth-form__help-link'>
                  Đăng nhập với SMS
                </a>
              </div>
            </div>

            <div className='auth-form__controls'>
              <button
                className='btn btn--normal auth-form__controls-back'
                onClick={() => setIsLogin(!isLogin)}
              >
                TRỞ LẠI
              </button>
              <button className='btn btn--primary' onClick={handleSubmit}>
                ĐĂNG NHẬP
              </button>
            </div>
          </div>

          <div className='auth-form__socials'>
            <button className='btn btn--with-icon btn--size-s --facebook'>
              <FaFacebook className='auth-form__socials-icon' />
              <span className='auth-form__social-text'>
                Kết nối với Facebook
              </span>
            </button>
            <button className='btn btn--with-icon btn--size-s --google'>
              <FaGoogle className='auth-form__socials-icon' />
              <span className='auth-form__social-text'>Kết nối với Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
