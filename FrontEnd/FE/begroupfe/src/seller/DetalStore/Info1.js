import axios from "axios"
import React, { useState } from "react"
import { useGlobalContext } from "../../context"
import { Colors, Sizes } from "../../ultis/data"
import Loading from "../../ultis/Loading"

function Info1() {
  const jwt = localStorage.getItem("jwt")
  const {
    cateClo,
    setCateClo,
    clearCateClo,
    setIsDetailInfo,
    setRaise,
    loading,
    setLoading,
    setIdStoreProd,
  } = useGlobalContext()
  const [isEdit, setIsEdit] = useState(false)

  const addArr = (type, ele) => {
    let newArr = cateClo[type]
    newArr.push(ele)
    setCateClo({ ...cateClo, [type]: newArr })
  }

  const rmvArr = (type, ele) => {
    let newArr = cateClo[type].filter((item) => {
      if (item !== ele) {
        return item
      }
    })
    setCateClo({ ...cateClo, [type]: newArr })
  }
  const doNothing = (e) => e.preventDefault()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { type, brand, material, size, color, gender, productId, origin } =
      cateClo
    setLoading(true)
    try {
      let res = await axios({
        method: "PUT",
        url: `https://tlcngroup2be.herokuapp.com/seller/product/categoryclothes/${productId}`,
        data: { type, brand, material, size, color, gender, origin },
        headers: { Authorization: `Bearer ${jwt}` },
      })
      if (res.status === 200) {
        setIdStoreProd(null)
        setIsDetailInfo(false)
        clearCateClo()
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
          clearCateClo()
        }}
      ></div>
      <div className='modal__body'>
        <div className='auth-form' style={{ width: "600px" }}>
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
                    setCateClo({ ...cateClo, type: e.target.value })
                  }
                  disabled={isEdit ? "" : "disabled"}
                  defaultValue={cateClo.type}
                >
                  <option value='null'>Chọn loại</option>
                  <option value='ao'>Áo</option>
                  <option value='quan'>Quần</option>
                  <option value='ao-clb'>Áo clb</option>
                  <option value='khac'>Khác</option>
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
                  value={cateClo.brand}
                  onChange={(e) =>
                    setCateClo({ ...cateClo, brand: e.target.value })
                  }
                  placeholder='Brand'
                  disabled={isEdit ? "" : "disabled"}
                />
              </div>
              <div
                className='auth-form__group'
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className='auth-form__label'>Origin</div>
                <input
                  type='text'
                  className={`auth-form__input ${
                    isEdit ? "" : "category__item--disable"
                  }`}
                  value={cateClo.origin}
                  onChange={(e) =>
                    setCateClo({ ...cateClo, origin: e.target.value })
                  }
                  placeholder='Origin'
                  disabled={isEdit ? "" : "disabled"}
                />
              </div>
              <div className='auth-form__group'>
                <div className='auth-form__multiple'>
                  <label className='auth-form__multiple-label'>Size:</label>
                  {Sizes.map((size, index) => {
                    if (cateClo.size.includes(size)) {
                      return (
                        <div
                          key={index}
                          className={`auth-form__multiple-choice auth-form__multiple--choice ${
                            isEdit ? "" : "category__multi-choice--disable"
                          }`}
                          onClick={(e) => {
                            isEdit ? rmvArr("size", size) : doNothing(e)
                          }}
                        >
                          {size}
                        </div>
                      )
                    }
                    return (
                      <div
                        key={index}
                        className={`auth-form__multiple-choice ${
                          isEdit ? "" : "category__multi-choice--disable"
                        }`}
                        onClick={(e) => {
                          isEdit ? addArr("size", size) : doNothing(e)
                        }}
                      >
                        {size}
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className='auth-form__group'>
                <div className='auth-form__multiple'>
                  <label className='auth-form__multiple-label'>Color:</label>
                  {Colors.map((color, index) => {
                    if (cateClo.color.includes(color)) {
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
                <div className='auth-form__label'>Material</div>
                <input
                  type='text'
                  className={`auth-form__input ${
                    isEdit ? "" : "category__item--disable"
                  }`}
                  value={cateClo.material}
                  onChange={(e) =>
                    setCateClo({ ...cateClo, material: e.target.value })
                  }
                  placeholder='Chất liệu'
                  disabled={isEdit ? "" : "disabled"}
                />
              </div>
              <div className='auth-form__group'>
                <select
                  className={`auth-form__input ${
                    isEdit ? "" : "category__item--disable"
                  }`}
                  name='gender'
                  onChange={(e) =>
                    setCateClo({ ...cateClo, gender: e.target.value })
                  }
                  disabled={isEdit ? "" : "disabled"}
                  defaultValue={cateClo.gender}
                >
                  <option value=''>Dành cho phái nào?</option>
                  <option value='male'>Nam</option>
                  <option value='female'>Nữ</option>
                </select>
              </div>

              <div
                className='auth-form__controls'
                style={{ justifyContent: "center" }}
              >
                <button
                  className='btn btn--normal auth-form__controls-back'
                  onClick={() => {
                    setIsDetailInfo(false)
                    clearCateClo()
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

export default Info1
