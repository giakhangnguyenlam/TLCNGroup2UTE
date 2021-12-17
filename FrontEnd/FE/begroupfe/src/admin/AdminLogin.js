import axios from "axios"
import React, { useState } from "react"
import { useGlobalContext } from "../context"
import { formAuth } from "../ultis/data"
import logo1 from "../assets/img/logo1.png"

function AdminLogin() {
  const { setIsAdmin } = useGlobalContext()
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
  const fetchData = async () => {
    try {
      let res = await axios({
        method: "POST",
        url: "https://tlcngroup2be.herokuapp.com/login",
        data: account,
      })
      if (res.status === 200) {
        if (localStorage.getItem("id")) {
          localStorage.removeItem("id")
          localStorage.removeItem("name")
          localStorage.removeItem("dateofbirth")
          localStorage.removeItem("email")
          localStorage.removeItem("address")
          localStorage.removeItem("phone")
          localStorage.removeItem("gender")
          localStorage.removeItem("jwt")
          localStorage.removeItem("role")
          localStorage.removeItem("expire")
        }
        localStorage.setItem("username", res.data.name)
        localStorage.setItem("jwtA", res.data.jwt)
        setIsAdmin(true)
      }
    } catch (error) {
      setErrors(error.response.data)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    fetchData()
  }

  return (
    <div className='modal'>
      <div
        className='modal__overlay'
        style={{ backgroundImage: `url(${logo1})`, backgroundColor: "unset" }}
      ></div>
      <div className='modal__body'>
        <div
          className='auth-form'
          style={{
            borderTop: "1px solid #cfcfcf",
            borderLeft: "1px solid #cfcfcf",
            boxShadow: "2px 2px 2px rgba(0,0,0,0.15)",
          }}
        >
          <div className='auth-form__container'>
            <div className='auth-form__header'>
              <h3 className='auth-form__heading'>Đăng nhập của Admin</h3>
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
                      className='auth-form__input'
                      value={account[name]}
                      onChange={handlechange}
                    />
                  </div>
                )
              })}
            </div>
            {Object.keys(errors).length ? (
              <div className='auth-form__error'>{errors.mess}</div>
            ) : (
              ""
            )}
            <div
              className='auth-form__controls'
              style={{ justifyContent: "center", marginTop: "40px" }}
            >
              <button
                className='btn btn--primary'
                style={{ width: "300px" }}
                onClick={handleSubmit}
              >
                ĐĂNG NHẬP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
