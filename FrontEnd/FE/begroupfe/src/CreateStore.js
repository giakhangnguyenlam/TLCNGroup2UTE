import axios from "axios"
import { React, useRef, useState } from "react"
import { useGlobalContext } from "./context"

function CreateStore() {
  const { isCreateStore, setIsCreateStore, reloadSell, setReloadSell } =
    useGlobalContext()
  const refImg = useRef(null)
  const [newStore, setNewStore] = useState({
    file: "",
    userId: "1",
    nameStore: "",
    storeDescription: "",
  })

  const handleClick = () => {
    setIsCreateStore(!isCreateStore)
  }
  const handleUpImg = () => {
    refImg.current.click()
  }
  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let i = e.target.files[0]
      console.log(i)
      setNewStore({ ...newStore, file: i })
    }
  }
  const uploadData = async () => {
    const data = new FormData()
    data.append("file", newStore.file)
    data.append("userId", newStore.userId)
    data.append("nameStore", newStore.nameStore)
    data.append("storeDescription", newStore.storeDescription)
    try {
      let res = await axios({
        method: "post",
        url: "https://tlcngroup2be.herokuapp.com/seller/store",
        data,
        headers: {
          "content-type": "multipart/form-data",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraGFuZ3NlbGxlciIsImV4cCI6MTYzNDU0MjM3OSwiaWF0IjoxNjM0NDU1OTc5fQ.drPHZYkE1VFRTV3v9cHRiwyKGLPdUQg39-8O_v-GYEk",
        },
      })
      if (res.status === 200) {
        setReloadSell(!reloadSell)
        setIsCreateStore(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    uploadData()
  }

  return (
    <div className='modal'>
      <div className='modal__overlay' onClick={handleClick}></div>
      <div className='modal__body'>
        <div className='auth-form'>
          <div className='auth-form__container'>
            <div className='auth-form__header'>
              <h3 className='auth-form__heading'>Tạo cửa hàng mới</h3>
            </div>

            <div className='auth-form__form'>
              <div className='auth-form__group'>
                <input
                  type='text'
                  className='auth-form__input'
                  value={newStore.nameStore}
                  onChange={(e) =>
                    setNewStore({ ...newStore, nameStore: e.target.value })
                  }
                  placeholder='Tên của hàng'
                />
              </div>
              <div className='auth-form__group'>
                <input
                  type='text'
                  className='auth-form__input'
                  value={newStore.storeDescription}
                  onChange={(e) =>
                    setNewStore({
                      ...newStore,
                      storeDescription: e.target.value,
                    })
                  }
                  placeholder='Mô tả về cửa hàng'
                />
              </div>
              <div className='auth-form__group'>
                <input
                  ref={refImg}
                  type='file'
                  className='auth-form__input-file'
                  onChange={handleChange}
                />
                <div
                  className='auth-form__input auth-form__input-btn'
                  onClick={handleUpImg}
                >
                  Chọn ảnh
                </div>
              </div>
            </div>

            <div
              className='auth-form__controls'
              style={{ justifyContent: "center" }}
            >
              <button
                className='btn btn--normal auth-form__controls-back'
                onClick={handleClick}
              >
                TRỞ LẠI
              </button>
              <button className='btn btn--primary' onClick={handleSubmit}>
                TẠO CỬA HÀNG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateStore