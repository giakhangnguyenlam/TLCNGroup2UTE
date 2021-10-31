import React from "react"
import { useGlobalContext } from "../../context"
import { Colors } from "../../data"

function CategoryAccessories() {
  const { cateAcc, setCateAcc } = useGlobalContext()
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
  return (
    <div className='auth-form__form'>
      <div className='auth-form__group'>
        <select
          className='auth-form__input '
          name='type'
          onChange={(e) => setCateAcc({ ...cateAcc, type: e.target.value })}
        >
          <option value='null'>Chọn loại</option>
          <option value='bang-trang'>Băng trán</option>
          <option value='bang-co-tay'>Băng cổ tay</option>
          <option value='non'>Nón</option>
          <option value='tui'>Túi</option>
          <option value='binh-nuoc'>BÌnh nước</option>
        </select>
      </div>
      <div className='auth-form__group'>
        <input
          type='text'
          className='auth-form__input'
          value={cateAcc.brand}
          onChange={(e) => setCateAcc({ ...cateAcc, brand: e.target.value })}
          placeholder='Brand'
        />
      </div>
      <div className='auth-form__group'>
        <input
          type='text'
          className='auth-form__input'
          value={cateAcc.origin}
          onChange={(e) => setCateAcc({ ...cateAcc, origin: e.target.value })}
          placeholder='Origin'
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
          value={cateAcc.material}
          onChange={(e) => setCateAcc({ ...cateAcc, material: e.target.value })}
          placeholder='Chất liệu'
        />
      </div>
    </div>
  )
}

export default CategoryAccessories
