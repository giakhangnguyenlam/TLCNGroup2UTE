import React, { useEffect, useRef, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { useHistory, useLocation } from "react-router"
import { useGlobalContext } from "../context"

function SearchBar() {
  const { setSearchInfo, body } = useGlobalContext()
  const [valid, setValid] = useState({ state: false, value: "" })
  const [items, setItems] = useState()
  let ref = useRef()
  let ref2 = useRef()
  const history = useHistory()
  let location = useLocation()
  let his = JSON.parse(localStorage.getItem("history")) || []
  const handleSearch = (type) => {
    if (type === "icon") {
      setSearchInfo(ref.current.value)
      if (ref.current.value !== "") {
        his.unshift(ref.current.value)
      }
      let newHis = []
      newHis = [...new Set(his)]
      localStorage.setItem("history", JSON.stringify(newHis))
    } else {
      ref.current.value = type
      setSearchInfo(type)
    }
    ref2.current.style.display = "none"
    setTimeout(() => {
      ref2.current.style = {}
    }, 100)
    if (location !== "/") {
      history.push("/")
    }
  }
  const checkValid = async (e) => {
    if (e.target.value !== "") {
      setValid({ state: true, value: e.target.value })
    }
  }

  useEffect(() => {
    let ar = body
      .filter(
        (item, index) =>
          item.name.toLowerCase().indexOf(valid.value.toLowerCase()) + 1
      )
      .slice(0, body.length > 5 ? 5 : body.length)
    setItems(ar)
  }, [valid.value])

  return (
    <div className='header__search'>
      <div className='header__search-input-warp'>
        <input
          ref={ref}
          type='text'
          className='header__search-input'
          placeholder='Nhập tên sản phẩm để tìm kiếm'
          onChange={(e) => checkValid(e)}
        />
        <div className='header__search-history' ref={ref2}>
          <h3 className='header__search-history-heading'>Lịch sử tìm kiếm</h3>
          <ul className='header__search-history-list'>
            {valid.state
              ? items
                ? items.map((item, index) => {
                    return (
                      <li
                        className='header__search-history-item'
                        key={index}
                        onClick={() => handleSearch(item.name)}
                      >
                        <div>{item.name}</div>
                      </li>
                    )
                  })
                : ""
              : his.length
              ? his
                  .slice(0, his.length > 5 ? 5 : his.length)
                  .map((item, index) => {
                    return (
                      <li
                        className='header__search-history-item'
                        key={index}
                        onClick={() => handleSearch(item)}
                      >
                        <div>{item}</div>
                      </li>
                    )
                  })
              : ""}
          </ul>
        </div>
      </div>
      <button
        className='header__search-btn'
        onClick={() => handleSearch("icon")}
      >
        <AiOutlineSearch className='header__search-btn-icon' />
      </button>
    </div>
  )
}

export default SearchBar
