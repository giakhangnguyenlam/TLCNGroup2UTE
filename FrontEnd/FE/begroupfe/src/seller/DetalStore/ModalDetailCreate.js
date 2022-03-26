import React, { useState, useRef, useEffect } from "react"
import { useGlobalContext } from "../../context"
import axios from "axios"
import ModalStep2 from "./ModalStep2"
import Loading from "../../ultis/Loading"

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
    setRaise,
    loading,
    setLoading,
  } = useGlobalContext()
  const [valid, setValid] = useState({ state: false, value: "" })
  const [nameData, setNameData] = useState([])
  const [displayData, setDisplayData] = useState()
  const [error, setError] = useState()
  const [isStep2, setIsStep2] = useState({ state: false, productId: 1 })
  const [newProduct, setNewProduct] = useState({
    storeid: idStoreUpdate.id,
    category: "",
    name: "",
    quantity: "",
    price: "",
    desc: "",
    file: "",
  })
  const [fileName, setFileName] = useState("")
  const refImg = useRef(null)

  const handleUpImg = () => {
    refImg.current.click()
  }
  const checkValid = (e) => {
    setNewProduct({ ...newProduct, name: e.target.value })
    if (e.target.value !== "") {
      setValid({ state: true, value: e.target.value })
    }
  }
  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let i = e.target.files[0]
      setFileName(i.name)
      setNewProduct({ ...newProduct, file: i })
    }
  }
  const uploadData = async () => {
    const isEmpty = Object.values(newProduct).includes("")
    if (isEmpty) {
      setError("Vui lòng nhập đầy đủ thông tin")
    } else {
      setLoading(true)
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
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  const uploadCategory = async (url, data) => {
    const isEmpty = Object.values(data).includes("")
    if (isEmpty) {
      setError("Vui lòng nhập đầy đủ thông tin")
    } else {
      setLoading(true)
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
          setReloadDetailStore(!reloadDetailStore)
          setIsDetailCreate(false)
          setLoading(false)
          setRaise({
            header: "Thêm sản phẩm",
            content: "Thêm sản phẩm thành công!",
            color: "#4bb534",
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isStep2.state === true) {
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
      uploadData()
    }
  }
  const fetchData = async () => {
    try {
      let res = await axios({
        method: "GET",
        url: "https://tlcngroup2be.herokuapp.com/product/productnames",
      })
      if (res.status === 200) {
        setNameData(res.data)
      }
    } catch (error) {}
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (nameData.length !== 0) {
      let ar = nameData.filter(
        (item) => item.toLowerCase().indexOf(valid.value.toLowerCase()) + 1
      )
      setDisplayData(ar)
    }
  }, [valid.value])

  return (
    <div className='modal'>
      <div
        className='modal__overlay'
        onClick={() => isStep2.state === false && setIsDetailCreate(false)}
      ></div>
      <div className='modal__body'>
        <div className='auth-form'>
          <div className='auth-form__container'>
            <div className='auth-form__header'>
              <h3 className='auth-form__heading' style={{ margin: "10px 0" }}>
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
                <div
                  className='auth-form__group'
                  style={{ position: "relative" }}
                >
                  <input
                    type='text'
                    className='auth-form__input'
                    value={newProduct.name}
                    onChange={checkValid}
                    placeholder='Tên sản phẩm'
                  />
                  <div
                    className='header__search-history'
                    style={{ maxHeight: "180px", overflowY: "overlay" }}
                  >
                    <h3 className='header__search-history-heading'>
                      Tên sản phẩm
                    </h3>
                    <ul className='header__search-history-list'>
                      {displayData
                        ? displayData.map((item, index) => {
                            return (
                              <li
                                className='header__search-history-item'
                                key={index}
                                onClick={() =>
                                  setNewProduct({ ...newProduct, name: item })
                                }
                              >
                                <div>{item}</div>
                              </li>
                            )
                          })
                        : ""}
                    </ul>
                  </div>
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
                    <option value='1'>Quần áo</option>
                    <option value='2'>Giày dép</option>
                    <option value='3'>Phụ kiện</option>
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
                    {fileName ? fileName : "Chọn ảnh"}
                  </div>
                </div>
              </div>
            )}
            {error ? <p className='auth-form__error'>{error}</p> : " "}
            <div
              className='auth-form__controls'
              style={{ justifyContent: "center", margin: "10px 0" }}
            >
              {isStep2.state === false && (
                <button
                  className='btn btn--normal auth-form__controls-back'
                  onClick={() => {
                    setIsDetailCreate(false)
                  }}
                >
                  TRỞ LẠI
                </button>
              )}

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
      {loading && <Loading />}
    </div>
  )
}

export default ModalDetailCreate
