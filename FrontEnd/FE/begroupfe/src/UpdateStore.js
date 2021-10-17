import axios from "axios"
import React, { useState, useRef } from "react"
import { useGlobalContext } from "./context"

function UpdateStore() {
  const { isUpdateStore, setIsUpdateStore, idStoreUpdate } = useGlobalContext()
  const refImg = useRef(null)
  const [storeUpdate, setStoreUpdate] = useState({
    userId: "1",
    nameStore: "",
    storeDescription: "",
    file: "",
  })
  const handleUpImg = () => {
    refImg.current.click()
  }
  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let i = e.target.files[0]
      setStoreUpdate({ ...storeUpdate, file: i })
      const { file } = storeUpdate
      const formData = new FormData()
      formData.append("file", file)
      // console.log(formData.forEach((data) => console.log(data)))
      // console.log(e.target.value)
      axios({
        method: "put",
        url: `https://tlcngroup2be.herokuapp.com/seller/store/image/${idStoreUpdate}`,
        formData,
        headers: {
          "content-type": "multipart/form-data",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraGFuZ3NlbGxlciIsImV4cCI6MTYzNDU0MjM3OSwiaWF0IjoxNjM0NDU1OTc5fQ.drPHZYkE1VFRTV3v9cHRiwyKGLPdUQg39-8O_v-GYEk",
        },
        responseType: "json",
      })
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => console.log(err.response.data))
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    fetchData()
  }
  const fetchData = () => {
    const { userId, nameStore, storeDescription } = storeUpdate
    const data = { userId, nameStore, storeDescription }
    axios({
      method: "put",
      url: `https://tlcngroup2be.herokuapp.com/seller/store/${idStoreUpdate}`,
      data,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraGFuZ3NlbGxlciIsImV4cCI6MTYzNDU0MjM3OSwiaWF0IjoxNjM0NDU1OTc5fQ.drPHZYkE1VFRTV3v9cHRiwyKGLPdUQg39-8O_v-GYEk",
      },
      responseType: "json",
    })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => console.log(err.response.data))
  }

  return (
    <div className='modal'>
      <div
        className='modal__overlay'
        onClick={() => setIsUpdateStore(!isUpdateStore)}
      ></div>
      <div className='modal__body'>
        <div className='auth-form'>
          <div className='auth-form__container'>
            <div className='auth-form__header'>
              <h3 className='auth-form__heading'>Thay đổi thông tin</h3>
            </div>

            <div className='auth-form__form'>
              <div className='auth-form__group'>
                <input
                  type='text'
                  className='auth-form__input'
                  value={storeUpdate.nameStore}
                  placeholder='Tên của hàng'
                  onChange={(e) =>
                    setStoreUpdate({
                      ...storeUpdate,
                      nameStore: e.target.value,
                    })
                  }
                />
              </div>
              <div className='auth-form__group'>
                <input
                  type='text'
                  className='auth-form__input'
                  value={storeUpdate.storeDescription}
                  placeholder='Mô tả về cửa hàng'
                  onChange={(e) =>
                    setStoreUpdate({
                      ...storeUpdate,
                      storeDescription: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div
              className='auth-form__controls'
              style={{ justifyContent: "center", margin: "10px 0 20px" }}
            >
              <button className='btn btn--normal auth-form__controls-back'>
                TRỞ LẠI
              </button>
              <button className='btn btn--primary' onClick={handleSubmit}>
                CẬP NHẬP
              </button>
            </div>
            <div
              className='auth-form__group'
              style={{ paddingTop: "10px", borderTop: "1px solid #afafaf" }}
            >
              <input
                type='file'
                ref={refImg}
                className='auth-form__input-file'
                onChange={handleChange}
              />
              <div
                className='auth-form__input auth-form__input-btn'
                onClick={handleUpImg}
              >
                CẬP NHẬP ẢNH
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateStore
