import axios from "axios"
import React, { useEffect, useState } from "react"
import { useGlobalContext } from "../context"

function UserProfile({ setHeight, setLoad }) {
  const dob = localStorage.getItem("dateofbirth") || ""
  const jwt = localStorage.getItem("jwt")
  const userid = localStorage.getItem("id")

  const { setRaise } = useGlobalContext()

  const [user, setUser] = useState({
    name: localStorage.getItem("name"),
    dateofbirth: `${dob.slice(6, 10)}-${dob.slice(3, 5)}-${dob.slice(0, 2)}`,
    email: localStorage.getItem("email"),
    address: localStorage.getItem("address"),
    phone: localStorage.getItem("phone"),
    gender: localStorage.getItem("gender"),
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoad(true)
    const dateBirth = user.dateofbirth
    const dd = dateBirth.slice(8)
    const mm = dateBirth.slice(5, 7)
    const yyyy = dateBirth.slice(0, 4)
    let url = `https://tlcngroup2be.herokuapp.com/user/${userid}`
    if (Object.values(user).includes("")) {
      setLoad(false)
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
            color: "#009944cc",
          })
          setLoad(false)
        }
      } catch (error) {
        setLoad(false)
        setRaise({
          header: "Thay đổi thông tin",
          content: "Có lỗi xảy ra, mời bạn thử lại lần sau.",
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
                <label className='auth-form__label'>Tên</label>
                <input
                  type='text'
                  className='auth-form__input'
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
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
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
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
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
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
  )
}

export default UserProfile
