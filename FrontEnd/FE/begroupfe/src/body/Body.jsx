import React, { useState, useRef, useEffect } from "react"
import Product from "./Product"
import ProdForU from "./ProdForU"
import { cateCloList, cateShoList, cateAccList } from "../ultis/data"
import { useGlobalContext } from "../context"
import "../assets/css/body.css"

function Body() {
  const [sort, setSort] = useState("none")
  const [display, setDisplay] = useState(false)
  const [filter, setFilter] = useState({ start: 0, end: Infinity })
  const from = useRef()
  const to = useRef()
  const { cate, cateType, setCate, setCateType, setCateName, recomend } =
    useGlobalContext()

  const handleFilter = () => {
    const start = Number(from.current.value) || 0
    const end = Number(to.current.value) || Infinity
    setFilter({ start, end })
  }

  // useEffect(() => {}, [display])

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
            <div className='filter__wrap'>
              <div
                className='filter__item'
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className='filter__label'>Từ:</div>
                <input className='filter__input' type='number' ref={from} />
                <div className='filter__label'>Đến:</div>
                <input className='filter__input' type='number' ref={to} />
                <div
                  className='filter__item filter__btn'
                  onClick={handleFilter}
                >
                  Lọc
                </div>
              </div>
              <div
                className='filter__item filter__btn'
                onClick={() => setSort("desc")}
              >
                Giảm Dần
              </div>
              <div
                className='filter__item filter__btn'
                onClick={() => setSort("inc")}
              >
                Tăng dần
              </div>
              {recomend.length ? (
                <div
                  className='filter__item filter__btn'
                  style={{ marginRight: "auto" }}
                  onClick={() => setDisplay(!display)}
                >
                  {display ? "Tất cả sản phẩm" : "Dành cho bạn"}
                </div>
              ) : (
                ""
              )}
            </div>
            {display ? (
              <ProdForU item={10} sort={sort} filter={filter} />
            ) : (
              <Product item={10} sort={sort} filter={filter} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Body
