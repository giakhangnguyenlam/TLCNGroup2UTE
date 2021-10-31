import React, { useState } from "react"
import Product from "./Product"
import { cateCloList, cateShoList, cateAccList } from "./data"
import { useGlobalContext } from "./context"

function Body() {
  const { cate, cateType, setCate, setCateType, setCateName } =
    useGlobalContext()

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
                      setCateName("")
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
                          setCateName(item.name)
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
                      setCateName("")
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
                          setCateName(item.name)
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
                      setCateName("")
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
                          setCateName(item.name)
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
