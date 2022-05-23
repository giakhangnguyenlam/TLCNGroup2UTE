import React from "react"
import Product from "./Product"
import { cateCloList, cateShoList, cateAccList } from "../ultis/data"
import { useGlobalContext } from "../context"

function Body() {
  const { cate, cateType, setCate, setCateType, setCateName } =
    useGlobalContext()

  return (
    <div className='container'>
      <div className='grid'>
        <div className='grid__row contain'>
          <div className='grid__colum-2'>
            <nav className='category' style={{ marginBottom: "10px" }}>
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
            <Product item={10} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Body
