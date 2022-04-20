import axios from "axios"
import React, { useState } from "react"
import { useGlobalContext } from "../../context"
import { Colors, SizeNumber } from "../../ultis/data"
import Loading from "../../ultis/Loading"

function Info2() {
  const jwt = localStorage.getItem("jwt")
  const {
    cateSho,
    setCateSho,
    clearCateSho,
    setIsDetailInfo,
    setRaise,
    loading,
    setLoading,
    setIdStoreProd,
  } = useGlobalContext()
  const [isEdit, setIsEdit] = useState(false)
  const addArr = (type, ele) => {
    let newArr = cateSho[type]
    newArr.push(ele)
    setCateSho({ ...cateSho, [type]: newArr })
  }
  const rmvArr = (type, ele) => {
    let newArr = cateSho[type].forEach((item) => {
      if (item !== ele) {
        return item
      }
    })
    setCateSho({ ...cateSho, [type]: newArr })
  }
  const doNothing = (e) => e.preventDefault()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {
      style,
      sole,
      height,
      weight,
      warranty,
      origin,
      size,
      color,
      material,
      gender,
      productId,
    } = cateSho
    setLoading(true)
    try {
      let res = await axios({
        method: "PUT",
        url: `https://tlcngroup2be.herokuapp.com/seller/product/categoryshoes/${productId}`,
        data: {
          style,
          sole,
          height,
          weight,
          warranty,
          origin,
          material,
          size,
          color,
          gender,
        },
        headers: { Authorization: `Bearer ${jwt}` },
      })
      if (res.status === 200) {
        setIdStoreProd(null)
        setIsDetailInfo(false)
        clearCateSho()
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
          clearCateSho()
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
                  name='style'
                  onChange={(e) =>
                    setCateSho({ ...cateSho, style: e.target.value })
                  }
                  defaultValue={cateSho.style}
                  disabled={isEdit ? "" : "disabled"}
                >
                  <option value='null'>Chọn loại</option>
                  <option value='da-bong'>Đá bóng</option>
                  <option value='chay-bo'>Chạy bộ</option>
                  <option value='bong-ro'>Bóng rổ</option>
                  <option value='cau-long'>Cầu lông</option>
                  <option value='khac'>Khác</option>
                </select>
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
                  value={cateSho.material}
                  onChange={(e) =>
                    setCateSho({ ...cateSho, material: e.target.value })
                  }
                  placeholder='Chất liệu'
                  disabled={isEdit ? "" : "disabled"}
                />
              </div>
              <div
                className='auth-form__group'
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className='auth-form__label'>Sole</div>
                <input
                  type='text'
                  className={`auth-form__input ${
                    isEdit ? "" : "category__item--disable"
                  }`}
                  value={cateSho.sole}
                  onChange={(e) =>
                    setCateSho({ ...cateSho, sole: e.target.value })
                  }
                  placeholder='Chất liệu của đế'
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
                  value={cateSho.origin}
                  onChange={(e) =>
                    setCateSho({ ...cateSho, origin: e.target.value })
                  }
                  placeholder='Origin'
                  disabled={isEdit ? "" : "disabled"}
                />
              </div>
              <div
                className='auth-form__group'
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className='auth-form__label'>Cao</div>
                <input
                  type='number'
                  className={`auth-form__input ${
                    isEdit ? "" : "category__item--disable"
                  }`}
                  value={cateSho.height}
                  onChange={(e) =>
                    setCateSho({
                      ...cateSho,
                      height: parseFloat(e.target.value),
                    })
                  }
                  placeholder='Chiều cao'
                  disabled={isEdit ? "" : "disabled"}
                />
              </div>
              <div
                className='auth-form__group'
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className='auth-form__label'>Nặng</div>
                <input
                  type='number'
                  className={`auth-form__input ${
                    isEdit ? "" : "category__item--disable"
                  }`}
                  value={cateSho.weight}
                  onChange={(e) =>
                    setCateSho({
                      ...cateSho,
                      weight: parseFloat(e.target.value),
                    })
                  }
                  placeholder='Cân nặng'
                  disabled={isEdit ? "" : "disabled"}
                />
              </div>
              <div
                className='auth-form__group'
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className='auth-form__label'>Warranty</div>
                <input
                  type='number'
                  className={`auth-form__input ${
                    isEdit ? "" : "category__item--disable"
                  }`}
                  value={cateSho.warranty}
                  onChange={(e) =>
                    setCateSho({
                      ...cateSho,
                      warranty: parseFloat(e.target.value),
                    })
                  }
                  placeholder='Thời gian bảo hành (tháng)'
                  disabled={isEdit ? "" : "disabled"}
                />
              </div>
              <div className='auth-form__group'>
                <div className='auth-form__multiple' style={{ height: "54px" }}>
                  <label className='auth-form__multiple-label'>Size:</label>
                  <div
                    className='auth-form__multiple-list'
                    style={{
                      flexGrow: "1",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      className='auth-form__multiple-l'
                      style={{ marginBottom: "6px" }}
                    >
                      {SizeNumber.slice(0, 8).map((size, index) => {
                        if (cateSho.size.includes(size)) {
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
                    <div className='auth-form__multiple-l'>
                      {SizeNumber.slice(8).map((size, index) => {
                        if (cateSho.size.includes(size)) {
                          return (
                            <div
                              key={index + 8}
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
                            key={index + 8}
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
                </div>
              </div>
              <div className='auth-form__group'>
                <div className='auth-form__multiple'>
                  <label className='auth-form__multiple-label'>Color:</label>
                  {Colors.map((color, index) => {
                    if (cateSho.color.includes(color)) {
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
              <div className='auth-form__group'>
                <select
                  className={`auth-form__input ${
                    isEdit ? "" : "category__item--disable"
                  }`}
                  name='gender'
                  onChange={(e) =>
                    setCateSho({ ...cateSho, gender: e.target.value })
                  }
                  disabled={isEdit ? "" : "disabled"}
                  defaultValue={cateSho.gender}
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
                    clearCateSho()
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

export default Info2
