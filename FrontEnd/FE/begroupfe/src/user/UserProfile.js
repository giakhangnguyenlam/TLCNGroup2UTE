import axios from "axios"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import Popup from "../ultis/Popup"
import { useGlobalContext } from "../context"

function UserProfile() {
  const dob = localStorage.getItem("dateofbirth") || ""
  const jwt = localStorage.getItem("jwt")
  const userid = localStorage.getItem("id")
  const role = localStorage.getItem("role")

  const { loading, setLoading, raise, setRaise } = useGlobalContext()

  const history = useHistory()
  const [height, setHeight] = useState(0)
  const [user, setUser] = useState({
    name: localStorage.getItem("name"),
    dateofbirth: `${dob.slice(6, 10)}-${dob.slice(3, 5)}-${dob.slice(0, 2)}`,
    email: localStorage.getItem("email"),
    address: localStorage.getItem("address"),
    phone: localStorage.getItem("phone"),
    gender: localStorage.getItem("gender"),
  })

  const handleRedirect = (page) => {
    history.push(`/user/${page}`)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const dateBirth = user.dateofbirth
    const dd = dateBirth.slice(8)
    const mm = dateBirth.slice(5, 7)
    const yyyy = dateBirth.slice(0, 4)
    let url = `https://tlcngroup2be.herokuapp.com/user/${userid}`
    if (Object.values(user).includes("")) {
      setLoading(false)
      setRaise({
        header: "Thay đổi thông tin",
        content: "Không được bỏ trống thông tin!",
        color: "#dc143c",
      })
    } else {
      try {
        let res = await axios({
          method: "PUT",
          url,
          data: { ...user, dateofbirth: `${dd}-${mm}-${yyyy}` },
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        if (res.status === 200) {
          let { name, dateofbirth, email, address, gender, jwt, phone } =
            res.data
          localStorage.setItem("name", name)
          localStorage.setItem("dateofbirth", dateofbirth)
          localStorage.setItem("email", email)
          localStorage.setItem("address", address)
          localStorage.setItem("gender", gender)
          localStorage.setItem("jwt", jwt)
          localStorage.setItem("phone", phone)
          setRaise({
            header: "Cập nhật thông tin",
            content: "Cập nhật thành công!",
            color: "#4bb534",
          })
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
        setRaise({
          header: "Thay đổi thông tin",
          content: "Có lỗi xảy ra, mời bạn thử lại lần sau.",
          color: "#dc143c",
        })
      }
    }
  }

  useEffect(() => {
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
                Xin chào, {user.name}
              </h3>
              <ul className='category-list'>
                <h4
                  className='category-list__heading'
                  onClick={() => handleRedirect("account/profile")}
                >
                  Tài khoản
                </h4>
                <li className='category-item category-item--active'>
                  <div
                    onClick={() => handleRedirect("account/profile")}
                    className='category-item__link'
                  >
                    Hồ sơ người dùng
                  </div>
                </li>
                <li className='category-item'>
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
                      {" "}
                      Hồ sơ người dùng
                    </h4>
                  </div>

                  <div
                    className='auth-form__form'
                    style={{ marginTop: "10px" }}
                  >
                    <div className='auth-form__group'>
                      <div className='auth-form__group-item'>
                        <label className='auth-form__label'>Tên</label>
                        <input
                          type='text'
                          className='auth-form__input'
                          value={user.name}
                          onChange={(e) =>
                            setUser({ ...user, name: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className='auth-form__group'>
                      <div className='auth-form__group-item'>
                        <label className='auth-form__label'>Email</label>
                        <input
                          type='text'
                          className='auth-form__input'
                          value={user.email}
                          onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className='auth-form__group'>
                      <div className='auth-form__group-item'>
                        <label className='auth-form__label'>Phone</label>
                        <input
                          type='text'
                          className='auth-form__input'
                          value={user.phone}
                          onChange={(e) =>
                            setUser({ ...user, phone: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className='auth-form__group'>
                      <div className='auth-form__group-item'>
                        <label className='auth-form__label'>Địa chỉ</label>
                        <input
                          type='text'
                          className='auth-form__input'
                          value={user.address}
                          onChange={(e) =>
                            setUser({ ...user, address: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className='auth-form__group'>
                      <div className='auth-form__group-item'>
                        <label className='auth-form__label'>Sinh nhật</label>
                        <input
                          type='date'
                          className='auth-form__input'
                          value={user.dateofbirth}
                          onChange={(e) =>
                            setUser({ ...user, dateofbirth: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className='auth-form__group'>
                      <div className='auth-form__group-item'>
                        <label className='auth-form__label'>Giới tính</label>
                        <select
                          className='auth-form__input'
                          name='gender'
                          defaultValue={user.gender}
                          onChange={(e) =>
                            setUser({ ...user, gender: e.target.value })
                          }
                        >
                          <option value='null'>Chọn giới tính</option>
                          <option value='male'>Nam</option>
                          <option value='female'>Nữ</option>
                        </select>
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
                      LƯU THÔNG TIN
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

export default UserProfile
