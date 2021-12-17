import axios from "axios"
import React, { useRef, useState } from "react"
import { useGlobalContext } from "../../context"
import Loading from "../../ultis/Loading"

function ModalDetailUpdate() {
  const jwt = localStorage.getItem("jwt")
  const {
    setIsDetailUpdate,
    idStoreProd,
    setReloadDetailStore,
    reloadDetailStore,
    setRaise,
    loading,
    setLoading,
  } = useGlobalContext()
  const refImg = useRef(null)
  const [prodUpdate, setProdUpdate] = useState({
    name: idStoreProd.name,
    quantity: idStoreProd.quantity,
    price: idStoreProd.price,
    description: idStoreProd.description,
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
    data.append("file", prodUpdate.file)
    try {
      let res = await axios({
        method: "put",
        url: `https://tlcngroup2be.herokuapp.com/seller/product/image/${idStoreProd.id}`,
        data,
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 200) {
        setLoading(false)
        setReloadDetailStore(!reloadDetailStore)
        setIsDetailUpdate(false)
        setRaise({
          header: "Cập nhật sản phẩm",
          content: "Cập nhật ảnh thành công!",
          color: "#4bb534",
        })
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let i = e.target.files[0]
      setFileName(i.name)
      setProdUpdate({ ...prodUpdate, file: i })
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    fetchData()
  }
  const fetchData = async () => {
    setLoading(true)
    const { name, quantity, price, description } = prodUpdate
    const data = { name, quantity, price, description }
    try {
      let res = await axios({
        method: "put",
        url: `https://tlcngroup2be.herokuapp.com/seller/product/${idStoreProd.id}`,
        data,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        responseType: "json",
      })
      if (res.status === 200) {
        setLoading(false)
        setIsDetailUpdate(false)
        setReloadDetailStore(!reloadDetailStore)
        setRaise({
          header: "Update product",
          content: "Update product information success!",
          color: "#4bb534",
        })
      }
    } catch (error) {
      setLoading(false)
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
              <div
                className='auth-form__group'
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className='auth-form__label'>Tên</div>
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
              <div
                className='auth-form__group'
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className='auth-form__label'>Số lượng</div>
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
              <div
                className='auth-form__group'
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className='auth-form__label'>Giá</div>
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
              <div
                className='auth-form__group'
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className='auth-form__label'>Mô tả</div>
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
              <button
                className='btn btn--normal auth-form__controls-back'
                onClick={() => setIsDetailUpdate(false)}
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

export default ModalDetailUpdate
