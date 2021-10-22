import axios from "axios"
import { useState } from "react"
import { useGlobalContext } from "./context"
import { formAuth } from "./data"
import ModalFooter from "./ModalFooter"

const Login = () => {
  const { isLogin, setIsLogin, isSignup, setIsSignup } = useGlobalContext()
  const [errors, setErrors] = useState({})
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
  const checkError = ({ username, password }) => {
    let errs = {}
    if (!username) {
      errs.username = "Không được bỏ trống trường này!"
    }
    if (!password) {
      errs.password = "Không được bỏ trống trường này!"
    }
    setErrors(errs)
  }
  const fetchData = async () => {
    try {
      let res = await axios({
        method: "post",
        url: "https://tlcngroup2be.herokuapp.com/login",
        data: { ...account },
        headers: { "Access-Control-Allow-Origin": "*" },
        responseType: "json",
      })
      if (res.status === 200) {
        setIsLogin(false)
        const { id, name, dateofbirth, email, address, gender, jwt, role } =
          res.data
        localStorage.setItem("id", id)
        localStorage.setItem("name", name)
        localStorage.setItem("dateofbirth", dateofbirth)
        localStorage.setItem("email", email)
        localStorage.setItem("address", address)
        localStorage.setItem("gender", gender)
        localStorage.setItem("jwt", jwt)
        localStorage.setItem("role", role)
        localStorage.setItem("expire", new Date().getTime() + 43200000)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    checkError(account)
    if (Object.keys(errors).length === 0) {
      fetchData()
    }
  }
  return (
    <div className='modal'>
      <div
        className='modal__overlay'
        onClick={() => setIsLogin(!isLogin)}
      ></div>
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
              {formAuth.slice(3, 5).map((ele, index) => {
                const { name, type, placeholder } = ele
                return (
                  <div className='auth-form__group' key={index}>
                    <input
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      className={`auth-form__input ${
                        errors[name] && "auth-form__input--err"
                      }`}
                      value={account[name]}
                      onChange={handlechange}
                    />
                    {errors[name] ? (
                      <p className='auth-form__error'>{errors[name]}</p>
                    ) : (
                      " "
                    )}
                  </div>
                )
              })}
            </div>

            <div className='auth-form__aside'>
              <div className='auth-form__help'>
                <a href='/comingsoon' className='auth-form__help-link'>
                  Quên mật khẩu
                </a>
                <a href='/comingsoon' className='auth-form__help-link'>
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
          <ModalFooter />
        </div>
      </div>
    </div>
  )
}

export default Login
