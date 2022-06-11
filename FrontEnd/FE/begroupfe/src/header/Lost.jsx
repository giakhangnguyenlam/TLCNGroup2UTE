import axios from "axios"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { useGlobalContext } from "../context"
import { formAuth } from "../ultis/data"

function Lost() {
  const history = useHistory()
  const {
    setAuth,
    // reloadSell,
    // setReloadSell,
    setLoading,
  } = useGlobalContext()
  const [errors, setErrors] = useState({})
  const [account, setAccount] = useState({
    username: "",
  })
  const handlechange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setAccount({ ...account, [name]: value })
  }
  const changeSignup = (type) => {
    setAuth(type)
  }
  const checkError = async ({ username }) => {
    let errs = {}
    if (!username) {
      errs.name = "Không được bỏ trống trường này!"
    }
    setErrors(errs)
    return errs
  }
  const fetchData = async () => {
    setLoading(true)
    let url = "https://tlcngroup2be.herokuapp.com/forgotpassword"
    try {
      let res = await axios({
        method: "post",
        url,
        data: { ...account },
        headers: { "Access-Control-Allow-Origin": "*" },
        responseType: "json",
      })
      if (res.status === 200) {
        // let {
        //   id,
        //   name,
        //   dateofbirth,
        //   email,
        //   address,
        //   gender,
        //   jwt,
        //   role,
        //   phone,
        // } = await res.data
        // localStorage.setItem("id", id)
        // localStorage.setItem("name", name)
        // localStorage.setItem("dateofbirth", dateofbirth)
        // localStorage.setItem("email", email)
        // localStorage.setItem("address", address)
        // localStorage.setItem("phone", phone)
        // localStorage.setItem("gender", gender)
        // localStorage.setItem("jwt", jwt)
        // localStorage.setItem("role", role)
        // localStorage.setItem("expire", new Date().getTime() + 43200000)
        // // setReloadSell(!reloadSell)
        setErrors({ form: res.data.mess + "!!! Please check your email." })
        setLoading(false)
        // history.goBack()
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
          <h3 className='auth-form__heading'> Khôi phục mật khẩu</h3>
          <span
            className='auth-form__switch-btn'
            onClick={() => changeSignup("login")}
          >
            Đăng nhập
          </span>
        </div>

        <div className='auth-form__form'>
          {formAuth.slice(3, 4).map((ele, index) => {
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
          <p
            className='auth-form__error'
            style={
              errors["form"] !== "Can't change password"
                ? { color: "#009944cc" }
                : {}
            }
          >
            {errors["form"]}
          </p>
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
            ĐẶT LẠI MẬT KHẨU
          </button>
        </div>
      </div>
    </div>
  )
}

export default Lost
