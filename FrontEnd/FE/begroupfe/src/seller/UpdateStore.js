import axios from "axios"
import React, { useState, useRef } from "react"
import { useGlobalContext } from "../context"
import Loading from "../Loading"
import Popup from "../Popup"

function UpdateStore() {
  const jwt = localStorage.getItem("jwt")
  const id = localStorage.getItem("id")
  const {
    isUpdateStore,
    setIsUpdateStore,
    idStoreUpdate,
    setReloadSell,
    reloadSell,
    loading,
    setLoading,
    setRaise,
  } = useGlobalContext()
  const refImg = useRef(null)
  const [storeUpdate, setStoreUpdate] = useState({
    userId: id,
    nameStore: idStoreUpdate.nameStore,
    storeDescription: idStoreUpdate.storeDescription,
    file: "",
  })
  const [fileName, setFileName] = useState("")
  const handleUpImg = () => {
    refImg.current.click()
  }
  const handleSubmitImg = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = new FormData()
    data.append("file", storeUpdate.file)
    try {
      let res = await axios({
        method: "put",
        url: `https://tlcngroup2be.herokuapp.com/seller/store/image/${idStoreUpdate.id}`,
        data,
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 200) {
        setLoading(false)
        setReloadSell(!reloadSell)
        setIsUpdateStore(false)
        setRaise({
          header: "Update store",
          content: "Update store image success!",
          color: "#4bb534",
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let i = e.target.files[0]
      setFileName(i.name)
      setStoreUpdate({ ...storeUpdate, file: i })
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    fetchData()
  }
  const fetchData = async () => {
    setLoading(true)
    const { userId, nameStore, storeDescription } = storeUpdate
    const data = { userId, nameStore, storeDescription }
    try {
      let res = await axios({
        method: "put",
        url: `https://tlcngroup2be.herokuapp.com/seller/store/${idStoreUpdate.id}`,
        data,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        responseType: "json",
      })
      if (res.status === 200) {
        setLoading(false)
        setReloadSell(!reloadSell)
        setIsUpdateStore(false)
        setRaise({
          header: "Update store",
          content: "Update store infomation success!",
          color: "#4bb534",
        })
      }
    } catch (error) {
      console.log(error)
    }
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
                  placeholder='Tên cửa hàng'
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
              <button
                className='btn btn--normal auth-form__controls-back'
                onClick={() => setIsUpdateStore(!isUpdateStore)}
              >
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
                {fileName ? fileName : "Chọn ảnh mới"}
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
      {loading && <Loading />}
    </div>
  )
}

export default UpdateStore
