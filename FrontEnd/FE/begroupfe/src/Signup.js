import { useState } from "react"
import axios from "axios"
import { useGlobalContext } from "./context"
import { formAuth } from "./data"
import ModalFooter from "./ModalFooter"

const Signup = () => {
  const { isLogin, setIsLogin, isSignup, setIsSignup } = useGlobalContext()
  const [errors, setErrors] = useState({})
  const [person, setPerson] = useState({
    name: "",
    dateofbirth: "",
    email: "",
    gender: "",
    username: "",
    password: "",
    rePassword: "",
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
  const checkError = (person) => {
    let errs = {}
    if (!person.name) {
      errs.name = "Không được bỏ trống trường này!"
    }
    if (!person.dateofbirth) {
      errs.dateofbirth = "Không được bỏ trống trường này!"
    } else {
      const persBirth = new Date(person.dateofbirth)
      const currDay = new Date()
      if (currDay < persBirth) {
        errs.dateofbirth = "Lỗi! Ngày tháng năm sinh không hợp lệ"
      }
    }

    if (!person.email) {
      errs.email = "Không được bỏ trống trường này!"
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(person.email)
    ) {
      errs.email = "Sai định dạng email"
    }
    if (!person.gender) {
      errs.gender = "Không được bỏ trống trường này!"
    }
    if (!person.username) {
      errs.username = "Không được bỏ trống trường này!"
    }
    if (!person.password) {
      errs.password = "Không được bỏ trống trường này!"
    } else if (!/^[a-zA-Z][a-zA-Z0-9!@#$%^&*]{7,16}$/.test(person.password)) {
      errs.password =
        "Mật khẩu chứa chữ cái và số, bắt đầu bằng chữ, dài từ 7-16 ký tự"
    }
    if (!person.rePassword) {
      errs.rePassword = "Không được bỏ trống trường này!"
    } else if (person.rePassword !== person.password) {
      errs.rePassword = "Không khớp với mật khẩu ở trên"
    }
    setErrors(errs)
  }
  const fetchData = () => {
    const { rePassword, ...rest } = person
    const dateBirth = rest.dateofbirth
    const dd = dateBirth.slice(8)
    const mm = dateBirth.slice(5, 7)
    const yyyy = dateBirth.slice(0, 4)

    axios
      .post("https://tlcngroup2be.herokuapp.com/signup", {
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
    checkError(person)
    if (Object.keys(errors).length === 0) {
      fetchData()
    }
  }

  return (
    <div className='modal'>
      <div
        className='modal__overlay'
        onClick={() => setIsSignup(!isSignup)}
      ></div>
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
              {formAuth.map((ele, index) => {
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
                      value={person[name]}
                      onChange={handlechange}
                    />
                    {errors[name] ? (
                      <p className='auth-form__error'>{errors[name]}</p>
                    ) : (
                      " "
                    )}
                  </div>
                )
              })}
              <div className='auth-form__group'>
                <select
                  className={`auth-form__input ${
                    errors.gender && "auth-form__input--err"
                  }`}
                  name='gender'
                  onChange={handlechange}
                >
                  <option value='null'>CHọn giới tính</option>
                  <option value='male'>Nam</option>
                  <option value='female'>Nữ</option>
                </select>
                {errors.gender ? (
                  <p className='auth-form__error'>{errors.gender}</p>
                ) : (
                  " "
                )}
              </div>
            </div>

            <div className='auth-form__aside'>
              <p className='autho-form__policy'>
                Bằng việc đăng ký, bạn đã đồng ý với shop về
                <a href='/dkdv' className='auth-form__text-link'>
                  Điều khoản dịch vụ
                </a>{" "}
                &
                <a href='/csbm' className='auth-form__text-link'>
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

          <ModalFooter />
        </div>
      </div>
    </div>
  )
}

export default Signup
