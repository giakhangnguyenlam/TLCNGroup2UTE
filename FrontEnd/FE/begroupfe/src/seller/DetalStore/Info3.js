import axios from "axios"
import React, { useState } from "react"
import { useGlobalContext } from "../../context"
import { Colors } from "../../ultis/data"
import Loading from "../../ultis/Loading"

function Info3() {
  const jwt = localStorage.getItem("jwt")
  const {
    cateAcc,
    setCateAcc,
    clearCateAcc,
    setIsDetailInfo,
    setRaise,
    loading,
    setLoading,
    setIdStoreProd,
  } = useGlobalContext()
  const [isEdit, setIsEdit] = useState(false)

  const addArr = (type, ele) => {
    let newArr = cateAcc[type]
    newArr.push(ele)
    setCateAcc({ ...cateAcc, [type]: newArr })
  }
  const rmvArr = (type, ele) => {
    let newArr = cateAcc[type].filter((item) => {
      if (item !== ele) {
        return item
      }
    })
    setCateAcc({ ...cateAcc, [type]: newArr })
  }
  const doNothing = (e) => e.preventDefault()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { type, brand, origin, color, material, productId } = cateAcc
    setLoading(true)
    try {
      let res = await axios({
        method: "PUT",
        url: `https://tlcngroup2be.herokuapp.com/seller/product/categoryaccessories/${productId}`,
        data: {
          type,
          brand,
          origin,
          color,
          material,
          productId,
        },
        headers: { Authorization: `Bearer ${jwt}` },
      })
      if (res.status === 200) {
        setIdStoreProd(null)
        setIsDetailInfo(false)
        clearCateAcc()
        setLoading(false)
        setRaise({
          header: "Cập nhật thông tin",
          content: "Cập nhật danh mục sản phẩm thành công!",
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
        onClick={() => {
          setIsDetailInfo(false)
          clearCateAcc()
        }}
      ></div>
      <div className='modal__body'>
        <div className='auth-form'>
          <div className='auth-form__container'>
            <div className='auth-form__header'>
              <h3 className='auth-form__heading'>Chi tiết sản phẩm</h3>
            </div>
            <div className='auth-form__form'>
              <div className='auth-form__group'>
                <select
                  className={`auth-form__input ${
                    isEdit ? "" : "category__item--disable"
                  }`}
                  name='type'
                  onChange={(e) =>
                    setCateAcc({ ...cateAcc, type: e.target.value })
                  }
                  defaultValue={cateAcc.type}
                  disabled={isEdit ? "" : "disabled"}
                >
                  <option value='null'>Chọn loại</option>
                  <option value='bang-tran'>Băng trán</option>
                  <option value='bang-co-tay'>Băng cổ tay</option>
                  <option value='non'>Nón</option>
                  <option value='tui'>Túi</option>
                  <option value='binh-nuoc'>BÌnh nước</option>
                </select>
              </div>
              <div
                className='auth-form__group'
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className='auth-form__label'>Brand</div>
                <input
                  type='text'
                  className={`auth-form__input ${
                    isEdit ? "" : "category__item--disable"
                  }`}
                  value={cateAcc.brand}
                  onChange={(e) =>
                    setCateAcc({ ...cateAcc, brand: e.target.value })
                  }
                  placeholder='Brand'
                  disabled={isEdit ? "" : "disabled"}
                />
              </div>
              <div
                className='auth-form__group'
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className='auth-form__label'>Brand</div>
                <input
                  type='text'
                  className={`auth-form__input ${
                    isEdit ? "" : "category__item--disable"
                  }`}
                  value={cateAcc.origin}
                  onChange={(e) =>
                    setCateAcc({ ...cateAcc, origin: e.target.value })
                  }
                  placeholder='Origin'
                  disabled={isEdit ? "" : "disabled"}
                />
              </div>
              <div className='auth-form__group'>
                <div className='auth-form__multiple'>
                  <label className='auth-form__multiple-label'>Color:</label>
                  {Colors.map((color, index) => {
                    if (cateAcc.color.includes(color)) {
                      return (
                        <div
                          key={index}
                          className={`auth-form__multiple-choi auth-form__multiple--choice ${
                            isEdit ? "" : "category__multi-choice--disable"
                          }`}
                          onClick={(e) => {
                            isEdit ? rmvArr("color", color) : doNothing(e)
                          }}
                        >
                          {color}
                        </div>
                      )
                    }
                    return (
                      <div
                        key={index}
                        className={`auth-form__multiple-choi ${
                          isEdit ? "" : "category__multi-choice--disable"
                        }`}
                        onClick={(e) => {
                          isEdit ? addArr("color", color) : doNothing(e)
                        }}
                      >
                        {color}
                      </div>
                    )
                  })}
                </div>
              </div>
              <div
                className='auth-form__group'
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className='auth-form__label'>Brand</div>
                <input
                  type='text'
                  className={`auth-form__input ${
                    isEdit ? "" : "category__item--disable"
                  }`}
                  value={cateAcc.material}
                  onChange={(e) =>
                    setCateAcc({ ...cateAcc, material: e.target.value })
                  }
                  placeholder='Chất liệu'
                  disabled={isEdit ? "" : "disabled"}
                />
              </div>

              <div
                className='auth-form__controls'
                style={{ justifyContent: "center" }}
              >
                <button
                  className='btn btn--normal auth-form__controls-back'
                  onClick={() => {
                    setIsDetailInfo(false)
                    clearCateAcc()
                  }}
                >
                  TRỞ LẠI
                </button>
                <button
                  className='btn btn--primary'
                  onClick={(e) => {
                    isEdit ? handleSubmit(e) : setIsEdit(true)
                  }}
                >
                  {isEdit ? "LƯU" : "SỬA THÔNG TIN"}
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

export default Info3
