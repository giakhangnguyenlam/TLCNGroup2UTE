import axios from "axios"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { useGlobalContext } from "../context"
import Popup from "../ultis/Popup"

function UserPass() {
  let jwt = localStorage.getItem("jwt")
  const userid = localStorage.getItem("id")
  const name = localStorage.getItem("name")
  const [height, setHeight] = useState(0)
  const [password, setPassword] = useState({ old: "", new: "", re: "" })
  const history = useHistory()
  const { loading, setLoading, raise, setRaise } = useGlobalContext()

  const handleRedirect = (page) => {
    history.push(`/user/${page}`)
  }

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
      setLoading(true)
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
          setLoading(false)
          setRaise({
            header: "Thay đổi thông tin",
            content: "Đổi mật khẩu thành công",
            color: "#4bb534",
          })
        }
      } catch (error) {
        setLoading(false)
        setRaise({
          header: "Thay đổi thông tin",
          content: "Đổi mật khẩu thất bại, vui lòng xem lại mật khẩu cũ",
          color: "#dc143c",
        })
      }
    }
  }

  useEffect(() => {
    let role = localStorage.getItem("role")
    if (
      role !== "ROLE_USER" &&
      role !== "ROLE_SELLER" &&
      role !== "ROLE_SHIPPER"
    ) {
      history.push("/")
    }
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
    <div className='container'>
      <div className='grid'>
        <div className='grid__row contain'>
          <div className='grid__colum-2'>
            <nav className='category'>
              <h3
                className='category__heading'
                style={{ lineHeight: "2.2rem", padding: "10px 0" }}
              >
                Xin chào, {name}
              </h3>
              <ul className='category-list'>
                <h4
                  className='category-list__heading'
                  onClick={() => handleRedirect("account/profile")}
                >
                  Tài khoản
                </h4>
                <li className='category-item'>
                  <div
                    onClick={() => handleRedirect("account/profile")}
                    className='category-item__link'
                  >
                    Hồ sơ người dùng
                  </div>
                </li>
                <li className='category-item category-item--active'>
                  <div
                    onClick={() => handleRedirect("account/password")}
                    className='category-item__link'
                  >
                    Quản lý mật khẩu
                  </div>
                </li>
                <h4
                  className='category-list__heading'
                  onClick={() => handleRedirect("order")}
                >
                  Đơn mua
                </h4>
              </ul>
            </nav>
          </div>

          <div className='grid__colum-10'>
            <div className='product'>
              <div className='grid__row'>
                <div
                  className='auth-form__container'
                  style={{
                    width: "100%",
                    backgroundColor: "var(--white-color)",
                  }}
                >
                  <div
                    className='auth-form__header'
                    style={{
                      borderBottom: "1px solid #c3c3c3",
                      margin: "4px 0",
                    }}
                  >
                    <h4
                      className='auth-form__heading'
                      style={{
                        margin: "0",
                        padding: "10px 0",
                        fontSize: "1.8rem",
                        lineHeight: "2.2rem",
                      }}
                    >
                      Quản lý mật khẩu
                    </h4>
                  </div>

                  <div
                    className='auth-form__form'
                    style={{ marginTop: "10px" }}
                  >
                    <div className='auth-form__group'>
                      <div className='auth-form__group-item'>
                        <label
                          className='auth-form__label'
                          style={{ width: "25%" }}
                        >
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
                        <label
                          className='auth-form__label'
                          style={{ width: "25%" }}
                        >
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
                        <label
                          className='auth-form__label'
                          style={{ width: "25%" }}
                        >
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
          </div>
        </div>
      </div>
      {loading && (
        <div
          className='modal__overlay'
          style={{ zIndex: "5", top: "0", height }}
        >
          <div className='loading'>
            <div className='loading__one'></div>
            <div className='loading__two'></div>
            <div className='loading__three'></div>
          </div>
        </div>
      )}
      {raise && (
        <Popup
          header={raise.header}
          content={raise.content}
          color={raise.color}
        />
      )}
    </div>
  )
}

export default UserPass
