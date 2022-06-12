import React, { useEffect, useRef, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"

function AdminSearch({ setSearch, data, placeholder }) {
  const [valid, setValid] = useState({ state: false, value: "" })
  const [items, setItems] = useState()
  let ref = useRef()
  let ref2 = useRef()

  const handleSearch = (type) => {
    if (type === "icon") {
      setSearch(ref.current.value)
    } else {
      ref.current.value = type
      setSearch(type)
    }
    ref2.current.style.display = "none"
    setTimeout(() => {
      ref2.current.style = {}
    }, 100)
  }
  const checkValid = async (e) => {
    if (e.target.value !== "") {
      setValid({ state: true, value: e.target.value })
    }
  }

  useEffect(() => {
    if (data) {
      const ar = data
        .filter(
          (item) =>
            item.toString().toLowerCase().indexOf(valid.value.toLowerCase()) + 1
        )
        .slice(0, data.length > 5 ? 5 : data.length)
      setItems(ar)
    }
  }, [valid.value])

  return (
    <div className='header__search' style={{ marginBottom: "10px" }}>
      <div className='header__search-input-warp'>
        <input
          ref={ref}
          type='text'
          className='header__search-input'
          placeholder={placeholder}
          onChange={(e) => checkValid(e)}
          onKeyDown={(e) => (e.key === "Enter" ? handleSearch("icon") : "")}
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
                        onClick={() => handleSearch(item)}
                      >
                        <div>{item}</div>
                      </li>
                    )
                  })
                : "Không tồn tại tên"
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

export default AdminSearch
