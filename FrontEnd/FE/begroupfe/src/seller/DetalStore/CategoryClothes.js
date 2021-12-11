import React, { useState } from "react"
import { useGlobalContext } from "../../context"
import { Sizes, Colors } from "../../ultis/data"

function CategoryClothes() {
  const { cateClo, setCateClo } = useGlobalContext()
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
  return (
    <div className='auth-form__form'>
      <div className='auth-form__group'>
        <select
          className='auth-form__input '
          name='type'
          onChange={(e) => setCateClo({ ...cateClo, type: e.target.value })}
        >
          <option value='null'>Chọn loại</option>
          <option value='ao'>Áo</option>
          <option value='quan'>Quần</option>
          <option value='ao-clb'>Áo clb</option>
          <option value='khac'>Khác</option>
        </select>
      </div>
      <div className='auth-form__group'>
        <input
          type='text'
          className='auth-form__input'
          value={cateClo.brand}
          onChange={(e) => setCateClo({ ...cateClo, brand: e.target.value })}
          placeholder='Brand'
        />
      </div>
      <div className='auth-form__group'>
        <input
          type='text'
          className='auth-form__input'
          value={cateClo.origin}
          onChange={(e) => setCateClo({ ...cateClo, origin: e.target.value })}
          placeholder='Origin'
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
      </div>
      <div className='auth-form__group'>
        <div className='auth-form__multiple'>
          <label className='auth-form__multiple-label'>Color:</label>
          {Colors.map((color, index) => {
            if (cateClo.color.includes(color)) {
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
        <input
          type='text'
          className='auth-form__input'
          value={cateClo.material}
          onChange={(e) => setCateClo({ ...cateClo, material: e.target.value })}
          placeholder='Chất liệu'
        />
      </div>
      <div className='auth-form__group'>
        <select
          className='auth-form__input '
          name='gender'
          onChange={(e) => setCateClo({ ...cateClo, gender: e.target.value })}
        >
          <option value=''>Dành cho phái nào?</option>
          <option value='male'>Nam</option>
          <option value='female'>Nữ</option>
        </select>
      </div>
    </div>
  )
}

export default CategoryClothes
