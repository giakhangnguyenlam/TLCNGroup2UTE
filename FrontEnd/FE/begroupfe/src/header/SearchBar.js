import React from "react"
import { AiOutlineDown, AiOutlineSearch, AiOutlineCheck } from "react-icons/ai"

function SearchBar() {
  return (
    <div className='header__search'>
      <div className='header__search-input-warp'>
        <input
          type='text'
          className='header__search-input'
          placeholder='Nhập để tìm kiếm sản phẩm'
        />
        <div className='header__search-history'>
          <h3 className='header__search-history-heading'>Lịch sử tìm kiếm</h3>
          <ul className='header__search-history-list'>
            <li className='header__search-history-item'>
              <a href=''>Máy acer nitro 5</a>
            </li>
            <li className='header__search-history-item'>
              <a href=''>Máy asus tuf 2021</a>
            </li>
            <li className='header__search-history-item'>
              <a href=''>Máy alienware</a>
            </li>
          </ul>
        </div>
      </div>
      <div className='header__search-select'>
        <span className='header__search-select-label'>Trong shop</span>
        <AiOutlineDown className='header__search-select-icon' />
        <ul className='header__search-option'>
          <li className='header__search-option-item --active'>
            <span>Trong shop</span>
            <AiOutlineCheck />
          </li>
          <li className='header__search-option-item'>
            <span>Ngoài shop</span>
            <AiOutlineCheck />
          </li>
        </ul>
      </div>
      <button className='header__search-btn'>
        <AiOutlineSearch className='header__search-btn-icon' />
      </button>
    </div>
  )
}

export default SearchBar
