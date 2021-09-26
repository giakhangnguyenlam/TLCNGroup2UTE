import { useState } from "react"
import axios from "axios"
import { FaFacebook, FaGoogle } from "react-icons/fa"

const Signup = ({ isLogin, setIsLogin, isSignup, setIsSignup }) => {
  const [person, setPerson] = useState({
    name: "",
    dateofbirth: "",
    email: "",
    gender: "",
    username: "",
    password: "",
  })
  const handlechange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setPerson({ ...person, [name]: value })
  }
  const changeLogin = () => {
    setIsSignup(!isSignup)
    setIsLogin(!isLogin)
  }
  const fetchData = () => {
    const dateBirth = person.dateofbirth
    const dd = dateBirth.slice(8)
    const mm = dateBirth.slice(5, 7)
    const yyyy = dateBirth.slice(0, 4)
    axios
      .post("http://localhost:8080/signup", {
        ...person,
        dateofbirth: `${dd}-${mm}-${yyyy}`,
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    fetchData()
  }

  return (
    <div className='modal'>
      <div className='modal__overlay'></div>
      <div className='modal__body'>
        {/* Register form */}
        <div className='auth-form'>
          <div className='auth-form__container'>
            <div className='auth-form__header'>
              <h3 className='auth-form__heading'> Đăng ký</h3>
              <span className='auth-form__switch-btn' onClick={changeLogin}>
                Đăng nhập
              </span>
            </div>

            <div className='auth-form__form'>
              <div className='auth-form__group'>
                <input
                  type='text'
                  name='name'
                  className='auth-form__input'
                  placeholder='Tên bạn'
                  value={person.name}
                  onChange={handlechange}
                />
              </div>
              <div className='auth-form__group'>
                <input
                  type='date'
                  name='dateofbirth'
                  className='auth-form__input'
                  placeholder='Sinh nhật'
                  value={person.dateofbirth}
                  onChange={handlechange}
                />
              </div>
              <div className='auth-form__group'>
                <input
                  type='text'
                  name='email'
                  className='auth-form__input'
                  placeholder='Email đăng ký'
                  value={person.email}
                  onChange={handlechange}
                />
              </div>
              <div className='auth-form__group'>
                {/* <input
                  type='text'
                  className='auth-form__input'
                  placeholder='Giới tính'
                /> */}
                <select
                  className='auth-form__input'
                  name='gender'
                  onChange={handlechange}
                >
                  <option value='null'>CHọn giới tính</option>
                  <option value='male'>Nam</option>
                  <option value='female'>Nữ</option>
                </select>
              </div>
              <div className='auth-form__group'>
                <input
                  type='text'
                  name='username'
                  className='auth-form__input'
                  placeholder='Tên đăng nhập'
                  value={person.username}
                  onChange={handlechange}
                />
              </div>
              <div className='auth-form__group'>
                <input
                  type='password'
                  name='password'
                  className='auth-form__input'
                  placeholder='Mật khẩu'
                  value={person.password}
                  onChange={handlechange}
                />
              </div>
              <div className='auth-form__group'>
                <input
                  type='password'
                  className='auth-form__input'
                  placeholder='Nhập lại mật khẩu'
                />
              </div>
            </div>

            <div className='auth-form__aside'>
              <p className='autho-form__policy'>
                Bằng việc đăng ký, bạn đã đồng ý với shop về
                <a href='' className='auth-form__text-link'>
                  Điều khoản dịch vụ
                </a>{" "}
                &
                <a href='' className='auth-form__text-link'>
                  Chính sách bảo mật
                </a>
              </p>
            </div>

            <div className='auth-form__controls'>
              <button
                className='btn btn--normal auth-form__controls-back'
                onClick={() => setIsSignup(!isSignup)}
              >
                TRỞ LẠI
              </button>
              <button className='btn btn--primary' onClick={handleSubmit}>
                ĐĂNG KÝ
              </button>
            </div>
          </div>

          <div className='auth-form__socials'>
            <button className='btn btn--with-icon btn--size-s --facebook'>
              <FaFacebook className='auth-form__socials-icon' />
              <span className='auth-form__social-text'>
                Kết nối với Facebook
              </span>
            </button>
            <button className='btn btn--with-icon btn--size-s --google'>
              <FaGoogle className='auth-form__socials-icon' />
              <span className='auth-form__social-text'>Kết nối với Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
