import React, { useState } from "react"
import { useGlobalContext } from "../../context"
import { Colors, SizeNumber } from "../../data"

function CategoryShoes() {
  const { cateSho, setCateSho } = useGlobalContext()
  const addArr = (type, ele) => {
    let newArr = cateSho[type]
    newArr.push(ele)
    setCateSho({ ...cateSho, [type]: newArr })
  }
  const rmvArr = (type, ele) => {
    let newArr = cateSho[type].filter((item) => {
      if (item !== ele) {
        return item
      }
    })
    setCateSho({ ...cateSho, [type]: newArr })
  }
  return (
    <div className='auth-form__form'>
      <div className='auth-form__group'>
        <select
          className='auth-form__input '
          name='style'
          onChange={(e) => setCateSho({ ...cateSho, style: e.target.value })}
        >
          <option value='null'>Chọn loại</option>
          <option value='da-bong'>Đá bóng</option>
          <option value='chay-bo'>Chạy bộ</option>
          <option value='bong-ro'>Bóng rổ</option>
          <option value='cau-long'>Cầu lông</option>
          <option value='khac'>Khác</option>
        </select>
      </div>
      <div className='auth-form__group'>
        <input
          type='text'
          className='auth-form__input'
          value={cateSho.material}
          onChange={(e) => setCateSho({ ...cateSho, material: e.target.value })}
          placeholder='Chất liệu'
        />
      </div>
      <div className='auth-form__group'>
        <input
          type='text'
          className='auth-form__input'
          value={cateSho.sole}
          onChange={(e) => setCateSho({ ...cateSho, sole: e.target.value })}
          placeholder='Chất liệu của đế'
        />
      </div>
      <div className='auth-form__group'>
        <input
          type='text'
          className='auth-form__input'
          value={cateSho.origin}
          onChange={(e) => setCateSho({ ...cateSho, origin: e.target.value })}
          placeholder='Origin'
        />
      </div>
      <div className='auth-form__group'>
        <input
          type='number'
          className='auth-form__input'
          value={cateSho.height}
          onChange={(e) =>
            setCateSho({ ...cateSho, height: parseFloat(e.target.value) })
          }
          placeholder='Chiều cao'
        />
      </div>
      <div className='auth-form__group'>
        <input
          type='number'
          className='auth-form__input'
          value={cateSho.weight}
          onChange={(e) =>
            setCateSho({ ...cateSho, weight: parseFloat(e.target.value) })
          }
          placeholder='Cân nặng'
        />
      </div>
      <div className='auth-form__group'>
        <input
          type='number'
          className='auth-form__input'
          value={cateSho.warranty}
          onChange={(e) =>
            setCateSho({ ...cateSho, warranty: parseFloat(e.target.value) })
          }
          placeholder='Thời gian bảo hành (tháng)'
        />
      </div>
      <div className='auth-form__group'>
        <div className='auth-form__multiple' style={{ height: "54px" }}>
          <label className='auth-form__multiple-label'>Size:</label>
          <div
            className='auth-form__multiple-list'
            style={{ flexGrow: "1", display: "flex", flexDirection: "column" }}
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
                      className='auth-form__multiple-choice auth-form__multiple--choice'
                      onClick={() => rmvArr("size", size)}
                    >
                      {size}
                    </div>
                  )
                }
                return (
                  <div
                    key={index}
                    className='auth-form__multiple-choice'
                    onClick={() => addArr("size", size)}
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
                      className='auth-form__multiple-choice auth-form__multiple--choice'
                      onClick={() => rmvArr("size", size)}
                    >
                      {size}
                    </div>
                  )
                }
                return (
                  <div
                    key={index + 8}
                    className='auth-form__multiple-choice'
                    onClick={() => addArr("size", size)}
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
                  className='auth-form__multiple-choi auth-form__multiple--choice'
                  onClick={() => rmvArr("color", color)}
                >
                  {color}
                </div>
              )
            }
            return (
              <div
                key={index}
                className='auth-form__multiple-choi'
                onClick={() => addArr("color", color)}
              >
                {color}
              </div>
            )
          })}
        </div>
      </div>
      <div className='auth-form__group'>
        <select
          className='auth-form__input '
          name='gender'
          onChange={(e) => setCateSho({ ...cateSho, gender: e.target.value })}
        >
          <option value=''>Dành cho phái nào?</option>
          <option value='male'>Nam</option>
          <option value='female'>Nữ</option>
        </select>
      </div>
    </div>
  )
}

export default CategoryShoes
