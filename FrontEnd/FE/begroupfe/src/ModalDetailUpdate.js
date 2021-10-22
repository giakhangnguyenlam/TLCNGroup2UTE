import axios from "axios"
import React, { useRef, useState } from "react"
import { useGlobalContext } from "./context"

function ModalDetailUpdate() {
  const {
    setIsDetailUpdate,
    idStoreProd,
    setReloadDetailStore,
    reloadDetailStore,
  } = useGlobalContext()
  const refImg = useRef(null)
  const [prodUpdate, setProdUpdate] = useState({
    name: "",
    quantity: "",
    price: "",
    description: "",
    file: "",
  })
  const handleUpImg = () => {
    refImg.current.click()
  }
  const handleSubmitImg = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("file", prodUpdate.file)
    try {
      let res = await axios({
        method: "put",
        url: `https://tlcngroup2be.herokuapp.com/seller/product/image/${idStoreProd}`,
        data,
        headers: {
          "content-type": "multipart/form-data",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraGFuZ3NlbGxlcjA0IiwiZXhwIjoxNjM0NzI5NjUzLCJpYXQiOjE2MzQ2NDMyNTN9.jfkWF-6nQvU2-oDIqjhBLZH9JNziXXWrloCpHGtPulQ",
        },
      })
      if (res.status === 200) {
        setReloadDetailStore(!reloadDetailStore)
        setIsDetailUpdate(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let i = e.target.files[0]
      console.log(i)
      setProdUpdate({ ...prodUpdate, file: i })
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    fetchData()
  }
  const fetchData = async () => {
    const { name, quantity, price, description } = prodUpdate
    const data = { name, quantity, price, description }
    try {
      let res = await axios({
        method: "put",
        url: `https://tlcngroup2be.herokuapp.com/seller/product/${idStoreProd}`,
        data,
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraGFuZ3NlbGxlcjA0IiwiZXhwIjoxNjM0NzI5NjUzLCJpYXQiOjE2MzQ2NDMyNTN9.jfkWF-6nQvU2-oDIqjhBLZH9JNziXXWrloCpHGtPulQ",
        },
        responseType: "json",
      })
      if (res.status === 200) {
        setIsDetailUpdate(false)
        setReloadDetailStore(!reloadDetailStore)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='modal'>
      <div
        className='modal__overlay'
        onClick={() => setIsDetailUpdate(false)}
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
                  value={prodUpdate.name}
                  placeholder='Tên sản phẩm'
                  onChange={(e) =>
                    setProdUpdate({
                      ...prodUpdate,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className='auth-form__group'>
                <input
                  type='text'
                  className='auth-form__input'
                  value={prodUpdate.quantity}
                  placeholder='Số lượng sản phẩm'
                  onChange={(e) =>
                    setProdUpdate({
                      ...prodUpdate,
                      quantity: e.target.value,
                    })
                  }
                />
              </div>
              <div className='auth-form__group'>
                <input
                  type='text'
                  className='auth-form__input'
                  value={prodUpdate.price}
                  placeholder='Giá sản phẩm'
                  onChange={(e) =>
                    setProdUpdate({
                      ...prodUpdate,
                      price: e.target.value,
                    })
                  }
                />
              </div>
              <div className='auth-form__group'>
                <input
                  type='text'
                  className='auth-form__input'
                  value={prodUpdate.description}
                  placeholder='Mô tả về sản phẩm'
                  onChange={(e) =>
                    setProdUpdate({
                      ...prodUpdate,
                      description: e.target.value,
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
                Chọn ảnh mới
              </div>
              <div
                className='auth-form__controls'
                style={{ justifyContent: "center", margin: "10px 0 20px" }}
              >
                <button className='btn btn--primary' onClick={handleSubmitImg}>
                  CẬP NHẬP ẢNH
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalDetailUpdate
