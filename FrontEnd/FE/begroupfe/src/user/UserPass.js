import axios from "axios"
import React, { useEffect, useState } from "react"
import { useGlobalContext } from "../context"

function UserPass({ setHeight, setLoad }) {
  let jwt = localStorage.getItem("jwt")
  const userid = localStorage.getItem("id")
  const [password, setPassword] = useState({ old: "", new: "", re: "" })
  const { setRaise } = useGlobalContext()

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let url = `https://tlcngroup2be.herokuapp.com/user/password/${userid}`
    if (password.re === "" || password.old === "" || password.new === "") {
      setRaise({
        header: "Thông báo",
        content: "Vui lòng nhập đầy đủ thông tin",
        color: "#f0541e",
      })
    } else if (password.re !== password.new) {
      setRaise({
        header: "Thông báo",
        content: "Mật khẩu nhập lại không trùng khớp",
        color: "#f0541e",
      })
    } else {
      setLoad(true)
      try {
        let res = await axios({
          method: "PUT",
          url,
          data: { password: password.new, oldPassword: password.old },
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        if (res.status === 200) {
          setPassword({ old: "", new: "", re: "" })
          localStorage.setItem("jwt", res.data.jwt)
          setLoad(false)
          setRaise({
            header: "Thay đổi thông tin",
            content: "Đổi mật khẩu thành công",
            color: "#4bb534",
          })
        }
      } catch (error) {
        setLoad(false)
        setRaise({
          header: "Thay đổi thông tin",
          content: "Đổi mật khẩu thất bại, vui lòng xem lại mật khẩu cũ",
          color: "#dc143c",
        })
      }
    }
  }

  useEffect(() => {
    let body = document.body,
      html = document.documentElement

    setHeight(
      Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      )
    )
  }, [])

  return (
    <div className='product'>
      <div className='grid__row'>
        <div
          className='auth-form__container'
          style={{
            width: "100%",
            backgroundColor: "var(--white-color)",
          }}
        >
          <div className='auth-form__form' style={{ marginTop: "10px" }}>
            <div className='auth-form__group'>
              <div className='auth-form__group-item'>
                <label className='auth-form__label' style={{ width: "25%" }}>
                  Mật khẩu cũ
                </label>
                <input
                  type='password'
                  className='auth-form__input'
                  value={password.old}
                  onKeyDown={handleEnter}
                  onChange={(e) =>
                    setPassword({ ...password, old: e.target.value })
                  }
                />
              </div>
            </div>
            <div className='auth-form__group'>
              <div className='auth-form__group-item'>
                <label className='auth-form__label' style={{ width: "25%" }}>
                  Mật khẩu mới
                </label>
                <input
                  type='password'
                  className='auth-form__input'
                  value={password.new}
                  onKeyDown={handleEnter}
                  onChange={(e) =>
                    setPassword({ ...password, new: e.target.value })
                  }
                />
              </div>
            </div>
            <div className='auth-form__group'>
              <div className='auth-form__group-item'>
                <label className='auth-form__label' style={{ width: "25%" }}>
                  Nhập lại mật khẩu mới
                </label>
                <input
                  type='password'
                  className='auth-form__input'
                  value={password.re}
                  onKeyDown={handleEnter}
                  onChange={(e) =>
                    setPassword({
                      ...password,
                      re: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div
            className='auth-form__controls'
            style={{ justifyContent: "center" }}
          >
            <button
              className='btn btn--primary'
              onClick={(e) => handleSubmit(e)}
            >
              XÁC NHẬN
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPass
