import React, { useState } from "react"
import Product from "./Product"
import { cateCloList, cateShoList, cateAccList } from "./data"
import { useGlobalContext } from "./context"

function Body() {
  const { cate, cateType, setCate, setCateType } = useGlobalContext()

  return (
    <div className='container'>
      <div className='grid'>
        <div className='grid__row contain'>
          <div className='grid__colum-2'>
            <nav className='category'>
              <h3 className='category__heading'>
                <i className='category__heading-icon fas fa-list'></i>
                Danh mục
              </h3>
              <ul className='category-list'>
                <li
                  className={`category-item ${
                    cate === "1" ? "category-item--active" : ""
                  }`}
                >
                  <div
                    className='category-item__link'
                    onClick={() => {
                      setCate("1")
                      setCateType("")
                    }}
                  >
                    Clothes
                  </div>
                </li>
                {cateCloList.map((item, index) => {
                  return (
                    <div
                      className={`category-item ${
                        cateType === item.value && "category-item--active"
                      }`}
                      style={{ paddingLeft: "10px" }}
                      key={index}
                    >
                      <div
                        className='category-item__link'
                        onClick={() => {
                          setCate("1")
                          setCateType(item.value)
                        }}
                      >
                        {item.name}
                      </div>
                    </div>
                  )
                })}

                <li
                  className={`category-item ${
                    cate === "2" ? "category-item--active" : ""
                  }`}
                >
                  <div
                    className='category-item__link'
                    onClick={() => {
                      setCate("2")
                      setCateType("")
                    }}
                  >
                    Shoes
                  </div>
                </li>
                {cateShoList.map((item, index) => {
                  return (
                    <div
                      className={`category-item ${
                        cateType === item.value && "category-item--active"
                      }`}
                      style={{ paddingLeft: "10px" }}
                      key={index + 4}
                    >
                      <div
                        className='category-item__link'
                        onClick={() => {
                          setCate("2")
                          setCateType(item.value)
                        }}
                      >
                        {item.name}
                      </div>
                    </div>
                  )
                })}

                <li
                  className={`category-item ${
                    cate === "3" ? "category-item--active" : ""
                  }`}
                >
                  <div
                    className='category-item__link'
                    onClick={() => {
                      setCate("3")
                      setCateType("")
                    }}
                  >
                    Accessories
                  </div>
                </li>
                {cateAccList.map((item, index) => {
                  return (
                    <div
                      className={`category-item ${
                        cateType === item.value && "category-item--active"
                      }`}
                      style={{ paddingLeft: "10px" }}
                      key={index + 9}
                    >
                      <div
                        className='category-item__link'
                        onClick={() => {
                          setCate("3")
                          setCateType(item.value)
                        }}
                      >
                        {item.name}
                      </div>
                    </div>
                  )
                })}
              </ul>
            </nav>
          </div>

          <div className='grid__colum-10'>
            {/* <div className='home-filter'>
              <span className='home-filter__label'>Sắp xếp theo</span>
              <button className='home-filter__btn btn'>Phổ biến</button>
              <button className='home-filter__btn btn btn--primary'>
                Mới nhất
              </button>
              <button className='home-filter__btn btn'>Bán chạy</button>

              <div className='select-input'>
                <span className='select-input__label'>Giá</span>
                <i className='fas fa-angle-down'></i>
                <ul className='select-input__list'>
                  <li className='select-input__item'>
                    <a href='/' className='select-input__link'>
                      Giá: Thấp đến cao
                    </a>
                  </li>
                  <li className='select-input__item'>
                    <a href='/' className='select-input__link'>
                      Giá: Cao đến thấp
                    </a>
                  </li>
                </ul>
              </div>

              <div className='home-filter__paging'>
                <span className='home-filter__paging-num'>
                  <span className='home-filter__paging-curr'>1</span>/14
                </span>

                <div className='home-filter__paging-ctrl'>
                  <a
                    href='/'
                    className='home-filter__paging-btn   home-filter__paging-btn--disable'
                  >
                    <i className='fas fa-angle-left'></i>
                  </a>
                  <a href='/' className='home-filter__paging-btn'>
                    <i className='fas fa-angle-right'></i>
                  </a>
                </div>
              </div>
            </div> */}

            <div className='product'>
              <Product />
            </div>

            {/* <ul className='pagination product__pagination'>
              <li className='pagination-item'>
                <a href='/' className='pagination-item__link'>
                  <i className='pagination-item__icon fas fa-angle-left'></i>
                </a>
              </li>
              <li className='pagination-item pagination-item--active'>
                <a href='/' className='pagination-item__link'>
                  1
                </a>
              </li>
              <li className='pagination-item'>
                <a href='/' className='pagination-item__link'>
                  2
                </a>
              </li>
              <li className='pagination-item'>
                <a href='/' className='pagination-item__link'>
                  3
                </a>
              </li>
              <li className='pagination-item'>
                <a href='/' className='pagination-item__link'>
                  4
                </a>
              </li>
              <li className='pagination-item'>
                <a href='/' className='pagination-item__link'>
                  5
                </a>
              </li>
              <li className='pagination-item'>
                <a href='/' className='pagination-item__link'>
                  ...
                </a>
              </li>
              <li className='pagination-item'>
                <a href='/' className='pagination-item__link'>
                  14
                </a>
              </li>
              <li className='pagination-item'>
                <a href='/' className='pagination-item__link'>
                  <i className='pagination-item__icon fas fa-angle-right'></i>
                </a>
              </li>
            </ul> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Body
