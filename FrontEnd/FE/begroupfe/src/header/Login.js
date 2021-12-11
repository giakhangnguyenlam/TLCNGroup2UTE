import axios from "axios"
import { useEffect, useState } from "react"
import { useGlobalContext } from "../context"
import { formAuth } from "../ultis/data"
import Loading from "../ultis/Loading"

const Login = () => {
  const {
    isLogin,
    setIsLogin,
    isSignup,
    setIsSignup,
    reloadSell,
    setReloadSell,
    loading,
    setLoading,
  } = useGlobalContext()
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
  const checkError = async ({ username, password }) => {
    let errs = {}
    if (!username) {
      errs.username = "Không được bỏ trống trường này!"
    }
    if (!password) {
      errs.password = "Không được bỏ trống trường này!"
    }
    setErrors(errs)
    return errs
  }
  const fetchData = async () => {
    setLoading(true)
    let url = "https://tlcngroup2be.herokuapp.com/login"
    try {
      let res = await axios({
        method: "post",
        url,
        data: { ...account },
        headers: { "Access-Control-Allow-Origin": "*" },
        responseType: "json",
      })
      if (res.status === 200) {
        setIsLogin(false)
        let {
          id,
          name,
          dateofbirth,
          email,
          address,
          gender,
          jwt,
          role,
          phone,
        } = await res.data
        localStorage.setItem("id", id)
        localStorage.setItem("name", name)
        localStorage.setItem("dateofbirth", dateofbirth)
        localStorage.setItem("email", email)
        localStorage.setItem("address", address)
        localStorage.setItem("phone", phone)
        localStorage.setItem("gender", gender)
        localStorage.setItem("jwt", jwt)
        localStorage.setItem("role", role)
        localStorage.setItem("expire", new Date().getTime() + 43200000)
        setReloadSell(!reloadSell)
        setLoading(false)
      }
    } catch (error) {
      if (error.response) {
        setErrors({ form: error.response.data.mess })
        setLoading(false)
      }
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    let result = await checkError(account)
    if (Object.keys(result).length === 0) {
      fetchData()
    }
  }

  useEffect(() => {}, [reloadSell])

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
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleSubmit(event)
                        }
                      }}
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
            {errors["form"] ? (
              <p className='auth-form__error'>{errors["form"]}</p>
            ) : (
              " "
            )}

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
        </div>
      </div>
      {loading && <Loading />}
    </div>
  )
}

export default Login
