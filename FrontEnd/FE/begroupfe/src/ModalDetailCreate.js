import React, { useState, useRef } from "react"
import { useGlobalContext } from "./context"
import axios from "axios"
import ModalStep2 from "./ModalStep2"

function ModalDetailCreate() {
  const jwt = localStorage.getItem("jwt")
  const {
    setIsDetailCreate,
    idStoreUpdate,
    reloadDetailStore,
    setReloadDetailStore,
    cateClo,
    setCateClo,
    clearCateClo,
    cateSho,
    setCateSho,
    clearCateSho,
    cateAcc,
    setCateAcc,
    clearCateAcc,
  } = useGlobalContext()
  const [isStep2, setIsStep2] = useState({ state: false, productId: 1 })
  const [newProduct, setNewProduct] = useState({
    storeid: idStoreUpdate,
    category: "",
    name: "",
    quantity: "",
    price: "",
    desc: "",
    file: "",
  })
  const refImg = useRef(null)

  const handleUpImg = () => {
    refImg.current.click()
  }
  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let i = e.target.files[0]
      console.log(i)
      setNewProduct({ ...newProduct, file: i })
    }
  }
  const uploadData = async () => {
    const data = new FormData()
    data.append("storeid", newProduct.storeid)
    data.append("category", newProduct.category)
    data.append("name", newProduct.name)
    data.append("quantity", newProduct.quantity)
    data.append("price", newProduct.price)
    data.append("description", newProduct.desc)
    data.append("file", newProduct.file)
    try {
      let res = await axios({
        method: "post",
        url: "https://tlcngroup2be.herokuapp.com/seller/product",
        data,
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 201) {
        setIsStep2({ ...isStep2, productId: res.data.id, state: true })
      }
    } catch (error) {
      console.log(error)
    }
  }
  const uploadCategory = async (url, data) => {
    try {
      let res = await axios({
        method: "post",
        url: `${url}`,
        data,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 201) {
        console.log("status OK")
        setReloadDetailStore(!reloadDetailStore)
        setIsDetailCreate(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    console.log("handlesubmoit")
    e.preventDefault()
    if (isStep2.state === true) {
      console.log("step2")
      if (newProduct.category === "1") {
        setCateClo({ ...cateClo, productId: isStep2.productId })
        await uploadCategory(
          "https://tlcngroup2be.herokuapp.com/seller/product/categoryclothes",
          { ...cateClo, productId: isStep2.productId }
        )
        clearCateClo()
      }
      if (newProduct.category === "2") {
        setCateSho({ ...cateSho, productId: isStep2.productId })
        await uploadCategory(
          "https://tlcngroup2be.herokuapp.com/seller/product/categoryshoes",
          { ...cateSho, productId: isStep2.productId }
        )
        console.log("updatecomplete")
        clearCateSho()
      }
      if (newProduct.category === "3") {
        setCateAcc({ ...cateAcc, productId: isStep2.productId })
        await uploadCategory(
          "https://tlcngroup2be.herokuapp.com/seller/product/categoryaccessories",
          { ...cateAcc, productId: isStep2.productId }
        )
        clearCateAcc()
      }
    }
    if (isStep2.state === false) {
      console.log("uploadata")
      uploadData()
    }
  }

  return (
    <div className='modal'>
      <div
        className='modal__overlay'
        onClick={() => setIsDetailCreate(false)}
      ></div>
      <div className='modal__body'>
        <div className='auth-form'>
          <div className='auth-form__container'>
            <div className='auth-form__header'>
              <h3 className='auth-form__heading'>
                {isStep2.state ? "Chi tiết sản phẩm" : "Thêm sản phẩm"}
              </h3>
            </div>

            {isStep2.state ? (
              <ModalStep2
                category={newProduct.category}
                id={isStep2.productId}
              />
            ) : (
              <div className='auth-form__form'>
                <div className='auth-form__group'>
                  <input
                    type='text'
                    className='auth-form__input'
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    placeholder='Tên sản phẩm'
                  />
                </div>
                <div className='auth-form__group'>
                  <select
                    className='auth-form__input '
                    name='category'
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                  >
                    <option value='null'>Chọn danh mục</option>
                    <option value='1'>Clothes</option>
                    <option value='2'>Shoes</option>
                    <option value='3'>Accessories</option>
                  </select>
                </div>
                <div className='auth-form__group'>
                  <input
                    type='text'
                    className='auth-form__input'
                    value={newProduct.quantity}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, quantity: e.target.value })
                    }
                    placeholder='Số lượng chỉ bao gồm số'
                  />
                </div>
                <div className='auth-form__group'>
                  <input
                    type='text'
                    className='auth-form__input'
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    placeholder='Giá chỉ bao gồm số'
                  />
                </div>
                <div className='auth-form__group'>
                  <input
                    type='text'
                    className='auth-form__input'
                    value={newProduct.desc}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        desc: e.target.value,
                      })
                    }
                    placeholder='Mô tả về sản phẩm'
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
            )}

            <div
              className='auth-form__controls'
              style={{ justifyContent: "center" }}
            >
              <button
                className='btn btn--normal auth-form__controls-back'
                onClick={() => {
                  isStep2.state ? setIsStep2(false) : setIsDetailCreate(false)
                }}
              >
                TRỞ LẠI
              </button>
              <button
                className='btn btn--primary'
                onClick={(e) => handleSubmit(e)}
              >
                {isStep2.state ? "THÊM SẢN PHẨM" : "TIẾP TỤC"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalDetailCreate
