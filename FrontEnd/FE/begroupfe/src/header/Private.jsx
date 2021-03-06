import axios from "axios"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { useGlobalContext } from "../context"
import { formAuth } from "../ultis/data"

function Private() {
  const history = useHistory()
  const {
    setAuth,
    // reloadSell,
    // setReloadSell,
    setLoading,
  } = useGlobalContext()
  const [errors, setErrors] = useState({})
  const [account, setAccount] = useState({
    name: "",
    phone: "",
    address: "",
  })
  const handlechange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setAccount({ ...account, [name]: value })
  }
  const changeSignup = (type) => {
    setAuth(type)
  }
  const checkError = async ({ name, address, phone }) => {
    let errs = {}
    if (!name) {
      errs.name = "Không được bỏ trống trường này!"
    }
    if (!address) {
      errs.address = "Không được bỏ trống trường này!"
    }
    if (!phone) {
      errs.phone = "Không được bỏ trống trường này!"
    } else if (!/^0\d{9}$/.test(phone)) {
      errs.phone = "Số điện thoại phải có 10 chữ số!"
    }
    setErrors(errs)
    return errs
  }
  const fetchData = async () => {
    setLoading(true)
    let url = "https://tlcngroup2be.herokuapp.com/signup/guestsignup"
    try {
      let res = await axios({
        method: "post",
        url,
        data: account,
      })
      if (res.status === 200) {
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
        // setReloadSell(!reloadSell)
        setLoading(false)
        history.goBack()
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

  // useEffect(() => {}, [reloadSell])

  return (
    <div className='auth-form'>
      <div className='auth-form__container'>
        <div className='auth-form__header'>
          <h3 className='auth-form__heading'> Đăng nhập ẩn danh</h3>
          <span
            className='auth-form__switch-btn'
            onClick={() => changeSignup("signup")}
          >
            Đăng ký
          </span>
        </div>

        <div className='auth-form__form'>
          {formAuth.slice(0, 1).map((ele, index) => {
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
          {formAuth.slice(6, 8).map((ele, index) => {
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
          {/* <button
            className='btn btn--normal auth-form__controls-back'
            onClick={() => setIsLogin(!isLogin)}
          >
            TRỞ LẠI
          </button> */}
          <button className='btn btn--primary' onClick={handleSubmit}>
            ĐĂNG NHẬP
          </button>
        </div>
      </div>
    </div>
  )
}

export default Private
