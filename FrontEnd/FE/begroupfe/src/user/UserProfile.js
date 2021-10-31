import axios from "axios"
import React, { useEffect, useState } from "react"

function UserProfile() {
  const dob = localStorage.getItem("dateofbirth")
  const jwt = localStorage.getItem("jwt")
  const userid = localStorage.getItem("id")

  const [user, setUser] = useState({
    name: localStorage.getItem("name"),
    dateofbirth: `${dob.slice(6, 10)}-${dob.slice(3, 5)}-${dob.slice(0, 2)}`,
    email: localStorage.getItem("email"),
    address: localStorage.getItem("address"),
    gender: localStorage.getItem("gender"),
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const dateBirth = user.dateofbirth
    const dd = dateBirth.slice(8)
    const mm = dateBirth.slice(5, 7)
    const yyyy = dateBirth.slice(0, 4)
    try {
      let res = await axios({
        method: "PUT",
        url: `https://tlcngroup2be.herokuapp.com/user/${userid}`,
        data: { ...user, dateofbirth: `${dd}-${mm}-${yyyy}` },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 200) {
        console.log("done", res.data)
        let { name, dateofbirth, email, address, gender, jwt } = res.data
        localStorage.setItem("name", name)
        localStorage.setItem("dateofbirth", dateofbirth)
        localStorage.setItem("email", email)
        localStorage.setItem("address", address)
        localStorage.setItem("gender", gender)
        localStorage.setItem("jwt", jwt)
      }
    } catch (error) {
      console.log(error)
    }
  }

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
                <h4 className='category-list__heading'>Tài khoản</h4>
                <li className='category-item category-item--active'>
                  <a
                    href='/user/account/profile'
                    className='category-item__link'
                  >
                    Hồ sơ người dùng
                  </a>
                </li>
                <li className='category-item'>
                  <a
                    href='/user/account/password'
                    className='category-item__link'
                  >
                    Quản lý mật khẩu
                  </a>
                </li>
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
    </div>
  )
}

export default UserProfile
